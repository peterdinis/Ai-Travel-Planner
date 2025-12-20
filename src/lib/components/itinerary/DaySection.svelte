<script lang="ts">
	import { UtensilsCrossed, Coffee } from 'lucide-svelte';
	import ActivityCard from './ActivityCard.svelte';
	import { fly } from 'svelte/transition';

	let { day, index } = $props();
</script>

<div in:fly={{ y: 20, delay: index * 100 }} class="relative pl-8 border-l border-white/10 pb-12 last:pb-0">
    <!-- Day Marker -->
    <div class="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary shadow-[0_0_10px_rgba(79,70,229,0.5)]"></div>
    
    <div class="mb-6">
        <h2 class="text-2xl font-bold text-white mb-2 font-display">Day {day.dayNumber}: {day.theme}</h2>
        <div class="flex flex-wrap gap-4">
            <div class="flex items-center gap-1 text-sm text-slate-400">
                <UtensilsCrossed class="w-4 h-4 text-secondary" />
                <span>{day.meals.lunch} (Lunch)</span>
            </div>
        </div>
    </div>

    <div class="grid gap-6">
        {#each day.activities as activity}
            <ActivityCard {activity} />
        {/each}
    </div>

    <div class="mt-8 p-4 rounded-2xl bg-secondary/5 border border-secondary/10 flex items-start gap-3">
        <Coffee class="w-5 h-5 text-secondary shrink-0 mt-1" />
        <div>
            <h4 class="text-sm font-bold text-secondary-light mb-1 font-display">Dining Recommendation</h4>
            <p class="text-xs text-slate-400 italic font-['Inter']">"Don't miss out on {day.meals.dinner} for an authentic taste of the area."</p>
        </div>
    </div>
</div>

