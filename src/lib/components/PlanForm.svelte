<script lang="ts">
    import {
        MapPin,
        Calendar,
        Globe,
        Zap,
        Shield,
        Sparkles,
        ArrowRight,
        Users,
        Heart,
        Wallet,
        Trees,
        Laptop,
    } from "lucide-svelte";
    import { fly } from "svelte/transition";

    let {
        onPlan,
        isBusy,
        initialDestination = "",
        initialDuration = 7,
        initialStyle = "relaxing",
    } = $props();

    let destination = $state(initialDestination);
    let duration = $state(initialDuration);
    let selectedStyle = $state(initialStyle);

    $effect(() => {
        if (initialDestination) destination = initialDestination;
        if (initialDuration) duration = initialDuration;
        if (initialStyle) selectedStyle = initialStyle;
    });

    const tripStyles = [
        { id: "relaxing", label: "Relaxing", icon: Globe },
        { id: "adventure", label: "Adventure", icon: Zap },
        { id: "cultural", label: "Cultural", icon: Shield },
        { id: "luxury", label: "Luxury", icon: Sparkles },
        { id: "family", label: "Family", icon: Users },
        { id: "romantic", label: "Romantic", icon: Heart },
        { id: "budget", label: "Budget", icon: Wallet },
        { id: "nature", label: "Nature", icon: Trees },
        { id: "nomad", label: "Nomad", icon: Laptop },
    ];

    function handleSubmit() {
        onPlan({ destination, duration, style: selectedStyle });
    }
</script>

<div
    in:fly={{ y: 15, duration: 400, delay: 300 }}
    class="glass p-5 md:p-8 rounded-[2rem] max-w-3xl mx-auto shadow-2xl"
>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div class="text-left">
            <label
                for="destination"
                class="block text-sm font-medium text-slate-400 mb-2 font-display"
                >Where to?</label
            >
            <div class="relative">
                <MapPin
                    class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500"
                />
                <input
                    id="destination"
                    type="text"
                    bind:value={destination}
                    placeholder="Tokyo, Paris, Bali..."
                    class="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-white font-['Inter']"
                />
            </div>
        </div>

        <div class="text-left">
            <label
                for="duration"
                class="block text-sm font-medium text-slate-400 mb-2 font-display"
                >Duration (Days)</label
            >
            <div class="relative">
                <Calendar
                    class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500"
                />
                <input
                    id="duration"
                    type="number"
                    bind:value={duration}
                    min="1"
                    max="30"
                    class="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-white font-['Inter']"
                />
            </div>
        </div>
    </div>

    <div
        class="flex flex-wrap justify-between items-center gap-4 border-t border-white/5 pt-8"
    >
        <div class="flex flex-wrap gap-2 w-full md:w-auto">
            {#each tripStyles as style}
                <button
                    onclick={() => (selectedStyle = style.id)}
                    class="flex-1 md:flex-none px-4 py-2.5 rounded-xl text-sm font-medium transition-all {selectedStyle ===
                    style.id
                        ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105'
                        : 'bg-white/5 text-slate-400 hover:bg-white/10'}"
                >
                    {style.label}
                </button>
            {/each}
        </div>

        <button
            onclick={handleSubmit}
            disabled={isBusy}
            class="btn-primary w-full md:w-auto flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed py-4 md:py-3"
        >
            <span>Plan My Trip</span>
            <ArrowRight
                class="w-5 h-5 group-hover:translate-x-1 transition-transform"
            />
        </button>
    </div>
</div>
