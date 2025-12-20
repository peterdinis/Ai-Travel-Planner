<script lang="ts">
import { ArrowLeft, Share2, Printer } from "lucide-svelte";
import { fade, fly } from "svelte/transition";
import DaySection from "./itinerary/DaySection.svelte";
import CostEstimator from "./itinerary/CostEstimator.svelte";
import PackingList from "./itinerary/PackingList.svelte";
import WeatherTips from "./itinerary/WeatherTips.svelte";

let { itinerary, onBack } = $props();
</script>

<div in:fade class="max-w-6xl mx-auto py-8 px-4">
	<div class="flex items-center justify-between mb-12">
		<button
			onclick={onBack}
			class="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
		>
			<ArrowLeft
				class="w-4 h-4 group-hover:-translate-x-1 transition-transform"
			/>
			<span class="font-display font-medium">Plan another trip</span>
		</button>

		<div class="flex gap-2">
			<button
				class="p-2 hover:bg-white/5 rounded-xl text-slate-400 hover:text-white transition-all"
			>
				<Share2 class="w-5 h-5" />
			</button>
			<button
				class="p-2 hover:bg-white/5 rounded-xl text-slate-400 hover:text-white transition-all"
			>
				<Printer class="w-5 h-5" />
			</button>
		</div>
	</div>

	<header class="mb-16" in:fly={{ y: 15, duration: 500 }}>
		<h1
			class="text-4xl md:text-5xl lg:text-7xl font-black font-display mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-tight"
		>
			{itinerary.tripName}
		</h1>
		<div class="flex flex-wrap gap-3">
			{#each itinerary.tips as tip, i}
				<div
					in:fly={{ x: -10, delay: i * 50, duration: 300 }}
					class="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-300 backdrop-blur-sm"
				>
					{tip}
				</div>
			{/each}
		</div>
	</header>

	<div class="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
		<!-- Left Column: Itinerary -->
		<div
			class="lg:col-span-2 space-y-16"
			in:fly={{ y: 20, delay: 200, duration: 500 }}
		>
			<section>
				<h3
					class="text-2xl font-bold text-white mb-8 font-display flex items-center gap-3"
				>
					<span
						class="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary text-sm font-bold"
						>01</span
					>
					Daily Itinerary
				</h3>
				<div class="space-y-4">
					{#each itinerary.days as day, i}
						<DaySection {day} index={i} />
					{/each}
				</div>
			</section>
		</div>

		<!-- Right Column: Tools & Info -->
		<div class="space-y-8" in:fly={{ x: 20, delay: 300, duration: 500 }}>
			<section>
				<CostEstimator estimatedCosts={itinerary.estimatedCosts} />
			</section>

			<section>
				<WeatherTips weather={itinerary.weather} />
			</section>

			<section>
				<PackingList packingList={itinerary.packingList} />
			</section>
		</div>
	</div>
</div>
