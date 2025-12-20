<script lang="ts">
import { fade, fly } from "svelte/transition";
import {
	Compass,
	Clock,
	MapPin,
	Search,
	ChevronLeft,
	ChevronRight,
} from "lucide-svelte";
import { goto } from "$app/navigation";
import tokyoImg from "$lib/assets/images/tokyo.png";
import amalfiImg from "$lib/assets/images/amalfi.png";
import santoriniImg from "$lib/assets/images/santorini.png";

const destinations = [
	{
		id: "tokyo",
		name: "Tokyo, Japan",
		description: "A neon-lit metropolis where tradition meets future tech.",
		image: tokyoImg,
		style: "modern",
		duration: 7,
		tags: ["Cyberpunk", "Gourmet", "Culture"],
	},
	{
		id: "amalfi",
		name: "Amalfi Coast, Italy",
		description:
			"Dramatic cliffs, turquoise waters, and sun-drenched lemon groves.",
		image: amalfiImg,
		style: "relaxed",
		duration: 5,
		tags: ["Romantic", "Scenic", "Beach"],
	},
	{
		id: "santorini",
		name: "Santorini, Greece",
		description:
			"Iconic white-washed buildings and unforgettable caldera sunsets.",
		image: santoriniImg,
		style: "luxury",
		duration: 4,
		tags: ["Luxury", "Historic", "Views"],
	},
	{
		id: "paris",
		name: "Paris, France",
		description: "The city of light, world-class art, and romantic boulevards.",
		image: santoriniImg, // Placeholder
		style: "cultural",
		duration: 4,
		tags: ["Art", "Romance", "Gastronomy"],
	},
	{
		id: "bali",
		name: "Bali, Indonesia",
		description: "Tropical paradise with lush jungles and tranquil beaches.",
		image: amalfiImg, // Placeholder
		style: "relaxing",
		duration: 10,
		tags: ["Tropical", "Wellness", "Nature"],
	},
	{
		id: "reykjavik",
		name: "Reykjavik, Iceland",
		description: "Lava fields, hot springs, and the magical Northern Lights.",
		image: tokyoImg, // Placeholder
		style: "adventure",
		duration: 6,
		tags: ["Nature", "Adventure", "Landscape"],
	},
	{
		id: "kyoto",
		name: "Kyoto, Japan",
		description: "Ancient temples, traditional tea houses, and serene gardens.",
		image: tokyoImg, // Placeholder
		style: "cultural",
		duration: 5,
		tags: ["Traditional", "Spiritual", "Zen"],
	},
	{
		id: "barcelona",
		name: "Barcelona, Spain",
		description:
			"Stunning architecture, vibrant street life, and golden beaches.",
		image: amalfiImg, // Placeholder
		style: "modern",
		duration: 5,
		tags: ["Architecture", "Urban", "Mediterranean"],
	},
	{
		id: "new-york",
		name: "New York City, USA",
		description:
			"The empire state: iconic skyline, Broadway, and endless energy.",
		image: tokyoImg, // Placeholder
		style: "modern",
		duration: 5,
		tags: ["City", "Shopping", "Culture"],
	},
	{
		id: "cairo",
		name: "Cairo, Egypt",
		description:
			"Gateway to the pyramids and thousands of years of human history.",
		image: santoriniImg, // Placeholder
		style: "cultural",
		duration: 6,
		tags: ["Ancient", "Desert", "Adventure"],
	},
	{
		id: "zermatt",
		name: "Zermatt, Switzerland",
		description: "Alpine wonderland at the foot of the iconic Matterhorn.",
		image: amalfiImg, // Placeholder
		style: "adventure",
		duration: 4,
		tags: ["Skiing", "Mountain", "Luxury"],
	},
	{
		id: "machu-picchu",
		name: "Machu Picchu, Peru",
		description: "Mystical Incan citadel hidden high in the Andes mountains.",
		image: tokyoImg, // Placeholder
		style: "adventure",
		duration: 3,
		tags: ["History", "Hiking", "Inca"],
	},
];

let searchQuery = $state("");
let currentPage = $state(1);
const itemsPerPage = 6;

let filteredResults = $derived(
	destinations.filter(
		(dest) =>
			dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			dest.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
			dest.tags.some((tag) =>
				tag.toLowerCase().includes(searchQuery.toLowerCase()),
			),
	),
);

let totalPages = $derived(Math.ceil(filteredResults.length / itemsPerPage));
let paginatedResults = $derived(
	filteredResults.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage,
	),
);

function handleExplore(dest: any) {
	goto(
		`/?dest=${encodeURIComponent(dest.name)}&duration=${dest.duration}&style=${dest.style}#hero-section`,
	);
}

function nextPage() {
	if (currentPage < totalPages) currentPage++;
}

function prevPage() {
	if (currentPage > 1) currentPage--;
}

$effect(() => {
	// Reset to page 1 when searching
	if (searchQuery) currentPage = 1;
});
</script>

<div class="space-y-12">
	<div class="text-center space-y-6 max-w-3xl mx-auto">
		<h1
			class="text-4xl md:text-5xl font-bold font-display bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
		>
			Explore the World
		</h1>
		<p class="text-slate-400">
			Discover curated destinations for your next adventure. Search by
			city, activity, or style to find your perfect match.
		</p>

		<div class="relative max-w-xl mx-auto mt-8">
			<Search
				class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500"
			/>
			<input
				type="text"
				bind:value={searchQuery}
				placeholder="Search destinations, tags, or styles..."
				class="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-white"
			/>
		</div>
	</div>

	{#if paginatedResults.length > 0}
		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each paginatedResults as dest, i (dest.id)}
				<div
					in:fly={{ y: 15, delay: i * 50, duration: 400 }}
					class="group relative overflow-hidden rounded-3xl glass border border-white/10 hover:border-primary/50 transition-all duration-500"
				>
					<div class="relative h-64 overflow-hidden">
						<img
							src={dest.image}
							alt={dest.name}
							class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
						/>
						<div
							class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
						></div>
						<div
							class="absolute bottom-4 left-4 flex gap-2 flex-wrap"
						>
							{#each dest.tags as tag}
								<span
									class="px-2 py-1 text-[10px] uppercase tracking-wider font-bold bg-white/10 backdrop-blur-md rounded-lg border border-white/10"
								>
									{tag}
								</span>
							{/each}
						</div>
					</div>

					<div class="p-6 space-y-4 text-left">
						<div class="flex items-start justify-between">
							<div>
								<h3 class="text-xl font-bold text-slate-100">
									{dest.name}
								</h3>
								<div
									class="flex items-center gap-1 text-slate-400 text-sm"
								>
									<MapPin class="w-3 h-3" />
									<span class="capitalize"
										>{dest.style} style</span
									>
								</div>
							</div>
							<div
								class="flex items-center gap-1 text-primary text-sm font-bold"
							>
								<Clock class="w-4 h-4" />
								<span>{dest.duration} Days</span>
							</div>
						</div>

						<p
							class="text-slate-400 text-sm leading-relaxed h-10 overflow-hidden text-ellipsis line-clamp-2"
						>
							{dest.description}
						</p>

						<button
							onclick={() => handleExplore(dest)}
							class="w-full py-3 rounded-xl bg-white/5 hover:bg-primary text-white font-bold transition-all duration-300 flex items-center justify-center gap-2 group/btn"
						>
							Explore Plan
							<Compass
								class="w-4 h-4 group-hover/btn:rotate-180 transition-transform duration-500"
							/>
						</button>
					</div>
				</div>
			{/each}
		</div>

		{#if totalPages > 1}
			<div class="flex items-center justify-center gap-6 pt-8">
				<button
					onclick={prevPage}
					disabled={currentPage === 1}
					class="p-2 rounded-xl glass border border-white/10 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
				>
					<ChevronLeft class="w-6 h-6" />
				</button>
				<span class="text-sm font-medium text-slate-400">
					Page <span class="text-white">{currentPage}</span> of {totalPages}
				</span>
				<button
					onclick={nextPage}
					disabled={currentPage === totalPages}
					class="p-2 rounded-xl glass border border-white/10 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
				>
					<ChevronRight class="w-6 h-6" />
				</button>
			</div>
		{/if}
	{:else}
		<div
			class="py-20 text-center space-y-4 glass rounded-3xl border border-dashed border-white/10"
		>
			<Search class="w-12 h-12 text-slate-600 mx-auto" />
			<p class="text-slate-400">
				No destinations found for "{searchQuery}"
			</p>
			<button
				onclick={() => (searchQuery = "")}
				class="text-primary font-bold hover:underline"
				>Clear search</button
			>
		</div>
	{/if}
</div>
