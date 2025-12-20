<script lang="ts">
import Hero from "$lib/components/Hero.svelte";
import PlanForm from "$lib/components/PlanForm.svelte";
import FeatureGrid from "$lib/components/FeatureGrid.svelte";
import LoadingOverlay from "$lib/components/LoadingOverlay.svelte";
import ItineraryDisplay from "$lib/components/ItineraryDisplay.svelte";
import { fade, fly } from "svelte/transition";

import { onMount } from "svelte";
import { page } from "$app/state";

let destination = $state("");
let isGenerating = $state(false);
let itinerary = $state<any>(null);
let error = $state("");
let currentFormData = $state<any>(null);

onMount(() => {
	const destParam = page.url.searchParams.get("dest");
	const durationParam = page.url.searchParams.get("duration");
	const styleParam = page.url.searchParams.get("style");

	if (destParam || durationParam || styleParam) {
		// Pre-fill the form if needed (the form handles its own state, but we could pass it down if we wanted)
		// For now, let's just make sure the handlePlanTrip can be triggered or the form is ready.
		// Actually, the PlanForm holds its own $state, so we should probably pass props to it.
	}
});

async function handlePlanTrip(formData: {
	destination: string;
	duration: number;
	style: string;
}) {
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

		const data = await response.json();
		if (data.error) throw new Error(data.error);

		itinerary = data;
	} catch (e: any) {
		error = e.message || "Something went wrong";
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

			<!-- Background Elements -->
			<div
				class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 pointer-events-none"
			>
				<div
					class="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full"
				></div>
				<div
					class="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 blur-[120px] rounded-full"
				></div>
			</div>
		</section>

		<FeatureGrid />
	{/if}
</div>
