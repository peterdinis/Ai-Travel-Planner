<script lang="ts">
import { Sparkles } from "lucide-svelte";
import { fly } from "svelte/transition";

let { children } = $props();
</script>

<div class="max-w-4xl mx-auto text-center relative z-10">
    <div
        in:fly={{ y: 15, duration: 400 }}
        class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-primary-light text-sm font-medium mb-8"
    >
        <Sparkles class="w-4 h-4" />
        <span>AI-Powered Travel Planning</span>
    </div>

    <h1
        in:fly={{ y: 15, duration: 400, delay: 100 }}
        class="text-4xl md:text-6xl lg:text-8xl font-black font-display leading-[1.1] mb-6 md:mb-8 text-white"
    >
        Your Next Adventure, <br />
        <span
            class="bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
            >Perfectly Planned.</span
        >
    </h1>

    <p
        in:fly={{ y: 15, duration: 400, delay: 200 }}
        class="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-8 md:mb-12"
    >
        Tell us where you want to go, and our AI will craft a personalized,
        day-by-day itinerary tailored to your style and budget.
    </p>

    {@render children?.()}
</div>
