<script lang="ts">
	import { Wallet, Car, Utensils, Home, MoreHorizontal } from 'lucide-svelte';
	import { fade } from 'svelte/transition';

	let { estimatedCosts } = $props();

	const categories = [
		{ id: 'accommodation', label: 'Accommodation', icon: Home, color: 'text-blue-400' },
		{ id: 'food', label: 'Food & Dining', icon: Utensils, color: 'text-orange-400' },
		{ id: 'transport', label: 'Transport', icon: Car, color: 'text-emerald-400' },
		{ id: 'misc', label: 'Miscellaneous', icon: MoreHorizontal, color: 'text-purple-400' }
	];

    let total = $derived(
        Object.values(estimatedCosts).reduce((acc: number, val: any) => acc + (typeof val === 'number' ? val : 0), 0)
    );
</script>

<div in:fade class="glass p-8 rounded-3xl border-primary/20">
    <div class="flex items-center gap-3 mb-8">
        <div class="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
            <Wallet class="text-primary w-6 h-6" />
        </div>
        <h3 class="text-2xl font-bold text-white font-display">Budget Estimator</h3>
    </div>

    <div class="space-y-6">
        {#each categories as cat}
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                    <div class="p-2 rounded-lg bg-white/5 border border-white/10">
                        <cat.icon class="w-5 h-5 {cat.color}" />
                    </div>
                    <span class="text-slate-300 font-medium">{cat.label}</span>
                </div>
                <span class="text-lg font-bold text-white font-display">${estimatedCosts[cat.id] || 0}</span>
            </div>
            <div class="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div 
                    class="h-full bg-primary/60 rounded-full" 
                    style="width: {(estimatedCosts[cat.id] / total) * 100}%"
                ></div>
            </div>
        {/each}
    </div>

    <div class="mt-8 pt-8 border-t border-white/10 flex items-center justify-between">
        <span class="text-slate-400 font-medium">Estimated Total</span>
        <span class="text-3xl font-black text-primary-light font-display">${total}</span>
    </div>
</div>

