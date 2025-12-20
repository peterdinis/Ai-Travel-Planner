<script lang="ts">
import { Sparkles, Plane, Globe, Camera, Map } from "lucide-svelte";
import { fade } from "svelte/transition";

let { destination } = $props();

const messages = [
	"Searching for local gems...",
	"Optimizing travel routes...",
	"Finding the best photo spots...",
	"Checking weather conditions...",
	"Talking to local experts...",
	"Mapping out your adventure...",
];

let currentMessage = $state(messages[0]);
let progress = $state(0);

$effect(() => {
	const interval = setInterval(() => {
		currentMessage = messages[Math.floor(Math.random() * messages.length)];
	}, 1500);

	const progressInterval = setInterval(() => {
		if (progress < 95) progress += Math.random() * 10;
	}, 200);

	return () => {
		clearInterval(interval);
		clearInterval(progressInterval);
	};
});

const icons = [Plane, Globe, Camera, Map];
</script>

<div
	in:fade
	class="min-h-[70vh] flex flex-col items-center justify-center text-center px-6"
>
	<div class="relative w-32 h-32 mb-12">
		<div
			class="absolute inset-0 border-4 border-white/5 rounded-full"
		></div>
		<div
			class="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"
			style="animation-duration: 1s"
		></div>

		<div class="absolute inset-0 flex items-center justify-center">
			<div class="relative">
				{#each icons as Icon, i}
					<div
						class="absolute -translate-x-1/2 -translate-y-1/2"
						style="transform: rotate({i * 90}deg) translateY(-50px)"
					>
						<Icon class="w-5 h-5 text-secondary/40" />
					</div>
				{/each}
				<Sparkles class="w-12 h-12 text-secondary animate-pulse" />
			</div>
		</div>
	</div>

	<div class="space-y-6 max-w-md mx-auto">
		<h2
			class="text-3xl md:text-4xl font-bold font-display text-white tracking-tight"
		>
			{currentMessage}
		</h2>

		<p class="text-slate-400">
			Our AI is crafting a bespoke journey for <span
				class="text-primary font-bold">{destination}</span
			>. This will only take a moment.
		</p>

		<div class="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
			<div
				class="h-full bg-linear-to-r from-primary to-secondary transition-all duration-500"
				style="width: {progress}%"
			></div>
		</div>

		<div
			in:fade
			class="text-[10px] uppercase tracking-widest text-slate-500 font-bold"
		>
			Analyzing millions of data points
		</div>
	</div>
</div>
