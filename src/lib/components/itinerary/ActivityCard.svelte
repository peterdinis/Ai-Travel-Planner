<script lang="ts">
import { Clock, MapPin } from "lucide-svelte";
import { fade } from "svelte/transition";

let { activity } = $props();
</script>

<div in:fade class="glass p-6 rounded-2xl border-white/5 hover:border-white/10 transition-colors">
    <div class="flex items-start justify-between mb-4">
        <div class="flex items-center gap-2 bg-primary/10 text-primary-light px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">
            <Clock class="w-3 h-3" />
            <span>{activity.time}</span>
        </div>
        <div class="flex items-center gap-1 text-xs text-slate-500">
            <MapPin class="w-3 h-3" />
            <span>{activity.location}</span>
        </div>
    </div>
    <h3 class="text-lg font-bold text-slate-100 mb-2 font-display">{activity.title}</h3>
    <p class="text-sm text-slate-400 leading-relaxed font-['Inter']">{activity.description}</p>
</div>

