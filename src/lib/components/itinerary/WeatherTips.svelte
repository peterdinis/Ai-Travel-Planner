<script lang="ts">
import { CloudSun, Wind, Thermometer, ShieldAlert } from "lucide-svelte";
import { fade } from "svelte/transition";

let { weather } = $props();
</script>

<div in:fade class="glass p-8 rounded-3xl border-accent/20 h-full">
    <div class="flex items-center gap-3 mb-8">
        <div class="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center">
            <CloudSun class="text-accent w-6 h-6" />
        </div>
        <h3 class="text-2xl font-bold text-white font-display">Weather & Safety</h3>
    </div>

    <div class="space-y-6">
        <div class="flex items-start gap-4">
            <div class="p-2 rounded-lg bg-accent/10">
                <Thermometer class="w-5 h-5 text-accent" />
            </div>
            <div>
                <h4 class="text-slate-200 font-bold mb-1 text-sm">Climate Info</h4>
                <p class="text-xs text-slate-400 leading-relaxed">{weather.expectations}</p>
            </div>
        </div>

        <div class="flex items-start gap-4">
            <div class="p-2 rounded-lg bg-blue-500/10">
                <Wind class="w-5 h-5 text-blue-400" />
            </div>
            <div>
                <h4 class="text-slate-200 font-bold mb-1 text-sm">Best Time to Visit</h4>
                <p class="text-xs text-slate-400 leading-relaxed">{weather.bestTime}</p>
            </div>
        </div>

        <div class="mt-6 p-4 rounded-2xl bg-red-500/5 border border-red-500/10 flex items-start gap-3">
            <ShieldAlert class="w-5 h-5 text-red-400 shrink-0" />
            <p class="text-xs text-red-300 italic leading-relaxed">
                <span class="font-bold">Safety Tip:</span> {weather.safetyTip}
            </p>
        </div>
    </div>
</div>

