<script lang="ts">
import "./layout.css";
import { Compass, Palmtree, Map, User, Menu, X } from "lucide-svelte";
import favicon from "$lib/assets/favicon.svg";
import { page } from "$app/state";
import { fade } from "svelte/transition";

let { children } = $props();
let isMobileMenuOpen = $state(false);

function toggleMobileMenu() {
	isMobileMenuOpen = !isMobileMenuOpen;
}

function closeMobileMenu() {
	isMobileMenuOpen = false;
}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>AI Travel Planner | Craft Your Perfect Journey</title>
</svelte:head>

<div class="relative min-h-screen flex flex-col">
	<nav
		class="sticky top-0 z-50 glass px-4 md:px-6 py-4 flex items-center justify-between mx-2 md:mx-4 mt-4 rounded-2xl transition-all duration-300"
	>
		<div class="flex items-center gap-2">
			<Compass class="text-primary w-6 h-6 md:w-8 md:h-8" />
			<span
				class="text-xl md:text-2xl font-bold font-display tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
			>
				GlobeTrotter AI
			</span>
		</div>

		<div class="hidden md:flex items-center gap-8 text-sm font-medium">
			<a
				href="/"
				class="hover:text-primary transition-colors {page.url
					.pathname === '/'
					? 'text-primary'
					: ''}">Home</a
			>
			<a
				href="/explore"
				class="hover:text-primary transition-colors {page.url
					.pathname === '/explore'
					? 'text-primary'
					: ''}">Explore</a
			>
		</div>

		<div class="flex items-center gap-2 md:gap-4">
			<button
				class="hidden md:block btn-primary py-2 text-sm"
				onclick={() => {
					const hero = document.getElementById("hero-section");
					if (hero) {
						hero.scrollIntoView({ behavior: "smooth" });
					} else if (page.url.pathname !== "/") {
						window.location.href = "/#hero-section";
					}
				}}
			>
				Get Started
			</button>

			<button
				class="md:hidden p-2 hover:bg-white/10 rounded-xl transition-colors text-slate-300"
				onclick={toggleMobileMenu}
				aria-label="Toggle Menu"
			>
				{#if isMobileMenuOpen}
					<X class="w-6 h-6" />
				{:else}
					<Menu class="w-6 h-6" />
				{/if}
			</button>
		</div>

		{#if isMobileMenuOpen}
			<div
				in:fade={{ duration: 200 }}
				out:fade={{ duration: 150 }}
				class="absolute top-full left-0 right-0 mt-2 p-6 glass rounded-2xl border border-white/10 md:hidden flex flex-col gap-6 shadow-2xl z-50"
			>
				<a
					href="/"
					onclick={closeMobileMenu}
					class="text-lg font-medium hover:text-primary transition-colors {page
						.url.pathname === '/'
						? 'text-primary'
						: 'text-slate-300'}">Home</a
				>
				<a
					href="/explore"
					onclick={closeMobileMenu}
					class="text-lg font-medium hover:text-primary transition-colors {page
						.url.pathname === '/explore'
						? 'text-primary'
						: 'text-slate-300'}">Explore</a
				>
				<button
					class="btn-primary w-full py-4 mt-2"
					onclick={() => {
						closeMobileMenu();
						const hero = document.getElementById("hero-section");
						if (hero) {
							hero.scrollIntoView({ behavior: "smooth" });
						} else if (page.url.pathname !== "/") {
							window.location.href = "/#hero-section";
						}
					}}
				>
					Get Started
				</button>
			</div>
		{/if}
	</nav>

	<main class="flex-1 container mx-auto px-4 md:px-6 py-8 md:py-12">
		{#key page.url.pathname}
			<div
				in:fade={{ duration: 150, delay: 150 }}
				out:fade={{ duration: 150 }}
			>
				{@render children()}
			</div>
		{/key}
	</main>

	<footer
		class="py-12 px-6 border-t border-white/5 text-center text-slate-400 text-sm"
	>
		<div class="flex items-center justify-center gap-2 mb-4">
			<Palmtree class="w-5 h-5 text-secondary" />
			<span class="font-bold text-slate-200">GlobeTrotter AI</span>
		</div>
		<p>&copy; 2025 GlobeTrotter AI. Built for modern travelers.</p>
	</footer>
</div>
