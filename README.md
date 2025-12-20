# AI Travel Planner 🌍

A premium, AI-powered travel planning application built with SvelteKit and OpenAI. Generate personalized, detailed itineraries for any destination in seconds.

![AI Travel Planner](https://raw.githubusercontent.com/sveltejs/branding/master/svelte-logo-horizontal.svg)

## ✨ Features

- **Intelligent Planning**: Powered by OpenAI's GPT-4o-mini for highly personalized itineraries.
- **Dynamic UI**: Modern, glassmorphism-inspired design with fluid animations.
- **Detailed Itineraries**: Includes daily themes, activity descriptions, meal suggestions, and cost estimates.
- **Practical Data**: Provides weather tips, packing lists, and safety advice for every trip.
- **Responsive Design**: Optimized for both desktop and mobile experiences.

## 🚀 Tech Stack

- **Framework**: [SvelteKit](https://kit.svelte.dev/) (Svelte 5)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **AI Engine**: [OpenAI API](https://openai.com/)
- **Icons**: [Lucide Svelte](https://lucide.dev/)
- **Date Handling**: [date-fns](https://date-fns.org/)

## 🛠️ Getting Started

### Prerequisites

- Node.js (v20 or later)
- An OpenAI API Key

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd ai-travel-planner
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory:
   ```env
   OPENAI_API_KEY=your_api_key_here
   ```

### Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

## 🏗️ Building for Production

To create a production-ready build:

```bash
npm run build
```

Preview the build:

```bash
npm run preview
```

## 📄 License

MIT
