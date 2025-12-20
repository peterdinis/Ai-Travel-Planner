<script lang="ts">
	import { Plane, Sparkles, Calendar } from 'lucide-svelte';
</script>

<section class="grid grid-cols-1 md:grid-cols-3 gap-8 pb-20">
    <div class="glass p-8 rounded-3xl hover:border-primary/50 transition-colors">
        <div class="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center mb-6">
            <Plane class="text-primary w-6 h-6" />
        </div>
        <h3 class="text-xl font-bold mb-4 font-display text-white">Smart Logistics</h3>
        <p class="text-slate-400">Optimized routes and travel times between your chosen destinations.</p>
    </div>
    
    <div class="glass p-8 rounded-3xl hover:border-secondary/50 transition-colors">
        <div class="w-12 h-12 bg-secondary/20 rounded-2xl flex items-center justify-center mb-6">
            <Sparkles class="text-secondary w-6 h-6" />
        </div>
        <h3 class="text-xl font-bold mb-4 font-display text-white">AI Curation</h3>
        <p class="text-slate-400">Unique experiences and hidden gems suggested by our advanced AI model.</p>
    </div>
    
    <div class="glass p-8 rounded-3xl hover:border-accent/50 transition-colors">
        <div class="w-12 h-12 bg-accent/20 rounded-2xl flex items-center justify-center mb-6">
            <Calendar class="text-accent w-6 h-6" />
        </div>
        <h3 class="text-xl font-bold mb-4 font-display text-white">Day-by-Day</h3>
        <p class="text-slate-400">Detailed schedules including morning, afternoon, and evening recommendations.</p>
    </div>
</section>
