<script lang="ts">
import Hero from "$lib/components/Hero.svelte";
import PlanForm from "$lib/components/PlanForm.svelte";
import FeatureGrid from "$lib/components/FeatureGrid.svelte";
import LoadingOverlay from "$lib/components/LoadingOverlay.svelte";
import ItineraryDisplay from "$lib/components/ItineraryDisplay.svelte";
import { fade } from "svelte/transition";
import { page } from "$app/state";
import type { Itinerary, FormData, ApiError } from "../interfaces/ItneraryI";


let destination = $state("");
let isGenerating = $state(false);
let itinerary = $state<Itinerary | null>(null);
let error = $state("");
let currentFormData = $state<FormData | null>(null);

async function handlePlanTrip(formData: FormData) {
	destination = formData.destination;
	currentFormData = formData;
	if (!destination) {
		error = "Please enter a destination";
		return;
	}

	isGenerating = true;
	error = "";
	itinerary = null;

	try {
		const response = await fetch("/api/plan", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(formData),
		});

		const data: Itinerary | ApiError = await response.json();
		
		if ('error' in data) {
			throw new Error((data as ApiError).error);
		}

		itinerary = data as Itinerary;
	} catch (e) {
		error = e instanceof Error ? e.message : "Something went wrong";
	} finally {
		isGenerating = false;
	}
}

function resetTrip() {
	itinerary = null;
	destination = "";
}
</script>

<div class="flex flex-col gap-24">
	{#if isGenerating}
		<LoadingOverlay {destination} />
	{:else if itinerary}
		<ItineraryDisplay {itinerary} onBack={resetTrip} />
	{:else}
		<section id="hero-section" class="relative py-20 overflow-hidden">
			<Hero>
				{#if error}
					<div
						in:fade
						class="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-2xl mb-8 max-w-md mx-auto"
					>
						{error}
					</div>
				{/if}
				<PlanForm
					onPlan={handlePlanTrip}
					isBusy={isGenerating}
					initialDestination={page.url.searchParams.get("dest") || ""}
					initialDuration={parseInt(
						page.url.searchParams.get("duration") || "7",
					)}
					initialStyle={page.url.searchParams.get("style") ||
						"relaxing"}
				/>
			</Hero>

			<div
				class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 pointer-events-none"
			>
				<div
					class="absolute top-0 right-0 w-125 h-125 bg-primary/20 blur-[120px] rounded-full"
				></div>
				<div
					class="absolute bottom-0 left-0 w-125 h-125 bg-secondary/10 blur-[120px] rounded-full"
				></div>
			</div>
		</section>

		<FeatureGrid />
	{/if}
</div>