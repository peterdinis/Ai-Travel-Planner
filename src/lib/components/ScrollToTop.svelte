<script lang="ts">
import { onMount, onDestroy } from "svelte";
import { tweened } from "svelte/motion";
import { cubicOut } from "svelte/easing";

// Props
export let threshold: number = 300; // When to show button (px from top)
export let showAfter: number = 500; // Delay before showing (ms)
export let smooth: boolean = true; // Smooth scrolling
export let position: "bottom-right" | "bottom-left" | "bottom-center" =
	"bottom-right";
export let buttonSize: "sm" | "md" | "lg" = "md";
export let customClass: string = "";
export let icon: "arrow" | "chevron" | "caret" | "custom" = "arrow";

// Reactive state
let isVisible: boolean = false;
let showTimeout: number | null = null;
let progress = tweened(0, { duration: 200, easing: cubicOut });

// Sizes configuration
const sizes = {
	sm: "w-10 h-10",
	md: "w-12 h-12",
	lg: "w-14 h-14",
};

// Position classes
const positions = {
	"bottom-right": "bottom-6 right-6",
	"bottom-left": "bottom-6 left-6",
	"bottom-center": "bottom-6 left-1/2 transform -translate-x-1/2",
};

// Icons
const icons = {
	arrow: "M5 10l7-7m0 0l7 7m-7-7v18",
	chevron: "M5 15l7-7 7 7",
	caret: "M5 11l7-7 7 7",
};

// Handle scroll
const handleScroll = () => {
	const scrolled = window.scrollY;
	isVisible = scrolled > threshold;

	// Calculate scroll progress (0 to 1)
	const docHeight = document.documentElement.scrollHeight - window.innerHeight;
	if (docHeight > 0) {
		progress.set(Math.min(scrolled / docHeight, 1));
	}
};

// Scroll to top function
const scrollToTop = () => {
	if (smooth) {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	} else {
		window.scrollTo(0, 0);
	}

	// Optional: Dispatch custom event
	dispatch("scrolled");
};

// Keyboard support
const handleKeyDown = (e: KeyboardEvent) => {
	if (e.key === "Enter" || e.key === " ") {
		e.preventDefault();
		scrollToTop();
	}
};

// Dispatch events
import { createEventDispatcher } from "svelte";
const dispatch = createEventDispatcher();

// Lifecycle
onMount(() => {
	window.addEventListener("scroll", handleScroll, { passive: true });

	// Delay initial check
	showTimeout = setTimeout(() => {
		handleScroll();
	}, showAfter);

	return () => {
		if (showTimeout) clearTimeout(showTimeout);
		window.removeEventListener("scroll", handleScroll);
	};
});

onDestroy(() => {
	if (showTimeout) clearTimeout(showTimeout);
});
</script>

<svelte:window on:scroll={handleScroll} />

<div
    class="fixed z-50 transition-all duration-300 {positions[position]} 
  {isVisible
        ? 'opacity-100 translate-y-0'
        : 'opacity-0 translate-y-10 pointer-events-none'}"
>
    <!-- Main Button -->
    <button
        class="group relative flex items-center justify-center rounded-full shadow-lg
           bg-linear-to-br from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800
           text-white transition-all duration-300 hover:shadow-xl hover:scale-105
           active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
           {sizes[buttonSize]} {customClass}"
        on:click={scrollToTop}
        on:keydown={handleKeyDown}
        aria-label="Scroll to top"
        title="Scroll to top"
        tabindex={isVisible ? 0 : -1}
    >
        <!-- Progress Ring (Optional) -->
        {#if $progress > 0}
            <svg
                class="absolute inset-0 w-full h-full transform -rotate-90"
                viewBox="0 0 100 100"
            >
                <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.3)"
                    stroke-width="4"
                />
                <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="white"
                    stroke-width="4"
                    stroke-dasharray="283"
                    stroke-dashoffset={283 - $progress * 283}
                    stroke-linecap="round"
                />
            </svg>
        {/if}

        <!-- Icon -->
        <div
            class="relative z-10 transition-transform duration-300 group-hover:-translate-y-0.5"
        >
            {#if icon === "custom"}
                <slot name="icon">
                    <!-- Default custom icon -->
                    <svg
                        class="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5 10l7-7m0 0l7 7m-7-7v18"
                        />
                    </svg>
                </slot>
            {:else}
                <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d={icons[icon]}
                    />
                </svg>
            {/if}
        </div>

        <!-- Tooltip (Optional) -->
        <div
            class="absolute bottom-full mb-2 px-3 py-1 text-sm font-medium text-white bg-gray-900
                rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200
                whitespace-nowrap pointer-events-none"
        >
            Scroll to top
            <div
                class="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0
                  border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent
                  border-t-gray-900"
            ></div>
        </div>
    </button>

    <!-- Optional: Scroll indicator text -->
    {#if isVisible && $progress > 0}
        <div class="mt-2 text-center">
            <span
                class="text-xs font-medium text-gray-600 dark:text-gray-300 bg-white/80 dark:bg-gray-800/80
                   px-2 py-1 rounded-full shadow-sm"
            >
                {Math.round($progress * 100)}%
            </span>
        </div>
    {/if}
</div>

<style lang="postcss">
    /* Smooth transitions */
    button {
        transition-property: transform, box-shadow, background;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* Reduce motion for accessibility */
    @media (prefers-reduced-motion: reduce) {
        button,
        div {
            transition-duration: 0.01ms !important;
        }
    }

    /* Dark mode support */
    @media (prefers-color-scheme: dark) {
        button {
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.5);
        }
    }
</style>
