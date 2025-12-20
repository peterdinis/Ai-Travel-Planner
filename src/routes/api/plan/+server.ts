import { json } from '@sveltejs/kit';
import OpenAI from 'openai';
import { env } from '$env/dynamic/private';

const openai = new OpenAI({
    apiKey: env.OPENAI_API_KEY
});

export async function POST({ request }: { request: Request }) {
    const { destination, duration, style } = await request.json();

    if (!destination || !duration) {
        return json({ error: 'Missing destination or duration' }, { status: 400 });
    }

    const prompt = `
You are a professional travel planner specializing in creating personalized itineraries.

Create a detailed ${duration}-day travel itinerary for ${destination} with a ${style} style.

CRITICAL INSTRUCTIONS:
1. Return ONLY valid JSON with EXACTLY this structure
2. All costs in USD as numbers (not strings)
3. ${duration} days exactly - no more, no less
4. Activities must match the ${style} style
5. Be realistic and practical
6. Locations should be specific and real places
7. Include 3 activities per day (morning, afternoon, evening)
8. Meal recommendations should be actual restaurants/cafes when possible

ITINERARY REQUIREMENTS:
- Trip name: Creative and catchy
- Each day: Day number, theme, 3 activities with time slots, meal recommendations
- Tips: 3 practical insider tips
- Estimated costs: Realistic USD amounts for budget planning
- Packing list: 6 essential items specific to this trip
- Weather: Practical information and safety advice

IMPORTANT FORMATTING RULES:
- "estimatedCosts" values must be NUMBERS, not strings
- Activities array must have EXACTLY 3 items per day
- Use double quotes for all JSON strings
- No markdown, no additional text outside JSON

JSON STRUCTURE TO FOLLOW:
{
    "tripName": "Creative trip name here",
    "days": [
        {
            "dayNumber": 1,
            "theme": "Theme for the day",
            "activities": [
                {
                    "time": "Morning",
                    "title": "Activity title",
                    "description": "Detailed description (2-3 sentences)",
                    "location": "Specific location/address"
                },
                {
                    "time": "Afternoon",
                    "title": "Activity title",
                    "description": "Detailed description (2-3 sentences)",
                    "location": "Specific location/address"
                },
                {
                    "time": "Evening",
                    "title": "Activity title",
                    "description": "Detailed description (2-3 sentences)",
                    "location": "Specific location/address"
                }
            ],
            "meals": {
                "breakfast": "Restaurant/cafe recommendation with brief reason",
                "lunch": "Restaurant/cafe recommendation with brief reason",
                "dinner": "Restaurant/cafe recommendation with brief reason"
            }
        }
    ],
    "tips": [
        "First practical insider tip",
        "Second practical insider tip",
        "Third practical insider tip"
    ],
    "estimatedCosts": {
        "accommodation": 0,
        "food": 0,
        "transport": 0,
        "misc": 0
    },
    "packingList": [
        "Item 1",
        "Item 2",
        "Item 3",
        "Item 4",
        "Item 5",
        "Item 6"
    ],
    "weather": {
        "expectations": "Seasonal weather patterns and what to expect",
        "bestTime": "Best months/seasons to visit",
        "safetyTip": "Specific weather-related safety advice"
    }
}

NOW CREATE THE ITINERARY FOR: ${destination} (${duration} days, ${style} style)
`;

    try {
        if (!env.OPENAI_API_KEY) {
            throw new Error('OpenAI API key not found');
        }

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { 
                    role: "system", 
                    content: `You are a travel planning expert. You respond ONLY with valid JSON. 
                    Never add explanations, notes, or text outside the JSON structure. 
                    Ensure all field names match exactly and values are properly formatted.`
                },
                { role: "user", content: prompt }
            ],
            response_format: { type: "json_object" },
            temperature: 0.7,
            max_tokens: 3000
        });

        const text = response.choices[0].message.content;

        if (!text) {
            throw new Error('Failed to generate itinerary');
        }

        // Parse and validate the response
        const itinerary = JSON.parse(text);
        
        // Additional validation
        if (!itinerary.days || itinerary.days.length !== parseInt(duration)) {
            throw new Error(`Expected ${duration} days but got ${itinerary.days?.length || 0}`);
        }
        
        // Ensure cost fields are numbers
        if (itinerary.estimatedCosts) {
            Object.keys(itinerary.estimatedCosts).forEach(key => {
                if (typeof itinerary.estimatedCosts[key] === 'string') {
                    itinerary.estimatedCosts[key] = parseFloat(itinerary.estimatedCosts[key]) || 0;
                }
            });
        }

        return json(itinerary);
    } catch (error) {
        // Type-safe error handling
        console.error('Error generating itinerary:', error);
        
        // Define error properties safely
        let errorMessage = 'Failed to generate itinerary.';
        let errorDetails = '';
        
        if (error instanceof Error) {
            errorMessage = error.message;
            if (error instanceof SyntaxError) {
                errorMessage = 'Invalid response format from AI service.';
            }
        } else if (typeof error === 'string') {
            errorMessage = error;
        } else if (error && typeof error === 'object' && 'message' in error) {
            errorMessage = String(error.message);
        }
        
        // Check for API key errors
        if (errorMessage.includes('API key') || errorMessage.includes('authentication')) {
            errorMessage = 'Service configuration error. Please check API key.';
        }
        
        return json({ 
            error: errorMessage,
            suggestion: 'Try adjusting your trip parameters or try again later.'
        }, { status: 500 });
    }
}