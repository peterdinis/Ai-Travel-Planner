<script lang="ts">
import { CheckSquare, Square, PackageCheck } from "lucide-svelte";
import { fade} from "svelte/transition";

let { packingList } = $props();
let checkedItems = $state(new Set());

function toggle(item: string) {
	if (checkedItems.has(item)) {
		checkedItems.delete(item);
	} else {
		checkedItems.add(item);
	}
	checkedItems = new Set(checkedItems);
}
</script>

<div in:fade class="glass p-8 rounded-3xl border-secondary/20">
    <div class="flex items-center gap-3 mb-8">
        <div class="w-10 h-10 bg-secondary/20 rounded-xl flex items-center justify-center">
            <PackageCheck class="text-secondary w-6 h-6" />
        </div>
        <h3 class="text-2xl font-bold text-white font-display">Packing Essentials</h3>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        {#each packingList as item}
            <button 
                onclick={() => toggle(item)}
                class="flex items-center gap-3 p-4 rounded-2xl border transition-all text-left {checkedItems.has(item) ? 'bg-secondary/10 border-secondary/30 text-secondary-light' : 'bg-white/5 border-white/5 text-slate-400 hover:border-white/10'}"
            >
                {#if checkedItems.has(item)}
                    <CheckSquare class="w-5 h-5 shrink-0" />
                {:else}
                    <Square class="w-5 h-5 shrink-0" />
                {/if}
                <span class="text-sm font-medium {checkedItems.has(item) ? 'line-through' : ''}">{item}</span>
            </button>
        {/each}
    </div>
</div>

