<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { ChevronRight, ChevronLeft, Check } from 'lucide-svelte';
    import { fly, fade } from 'svelte/transition';

    export let title: string;
    export let pages: { text: string; image?: string; color: string }[];

    const dispatch = createEventDispatcher();
    let currentPage = 0;

    function nextPage() {
        if (currentPage < pages.length - 1) {
            currentPage++;
        } else {
            dispatch('complete');
        }
    }

    function prevPage() {
        if (currentPage > 0) {
            currentPage--;
        }
    }
</script>

<div class="story-container">
    <div class="book">
        <header>
            <h1>{title}</h1>
            <div class="progress">
                Page {currentPage + 1} of {pages.length}
            </div>
        </header>

        <div class="page-content" class:final-page={currentPage === pages.length - 1}>
            {#key currentPage}
                <div 
                    class="card"
                    in:fly={{ x: 200, duration: 400, delay: 200 }}
                    out:fly={{ x: -200, duration: 400 }}
                    style="border-top: 8px solid {pages[currentPage].color}"
                >
                    <p class="story-text">{pages[currentPage].text}</p>
                </div>
            {/key}
        </div>

        <nav class="controls">
            <button 
                class="btn btn-secondary" 
                disabled={currentPage === 0}
                on:click={prevPage}
            >
                <ChevronLeft size={24} /> Previous
            </button>

            {#if currentPage < pages.length - 1}
                <button class="btn btn-primary" on:click={nextPage}>
                    Next <ChevronRight size={24} />
                </button>
            {:else}
                <button class="btn btn-success" on:click={nextPage}>
                    Finish Reading <Check size={24} />
                </button>
            {/if}
        </nav>
    </div>
</div>

<style>
    .story-container {
        display: flex;
        justify-content: center;
        padding: var(--spacing-md);
        min-height: 100%;
    }

    .book {
        max-width: 800px;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: var(--spacing-md);
    }

    header {
        text-align: center;
    }

    .page-content {
        flex: 1;
        display: grid;
        place-items: center;
        min-height: 300px;
        position: relative;
        overflow: hidden; /* For transitions */
    }

    .card {
        padding: var(--spacing-xl);
        font-size: 1.5rem;
        line-height: 1.6;
        text-align: center;
        background: white;
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-lg);
        width: 100%;
        max-width: 600px;
        position: absolute; /* Stack for transitions */
    }

    .controls {
        display: flex;
        justify-content: space-between;
        margin-top: var(--spacing-md);
    }

    .btn-success {
        background-color: var(--color-success);
        color: white;
        box-shadow: 0 4px 0 #059669;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: var(--spacing-sm) var(--spacing-lg);
        border-radius: var(--radius-full);
        font-weight: 600;
        transition: all 0.2s ease;
        border: none;
        font-size: 1.1rem;
        gap: var(--spacing-sm);
    }
    
    .btn-success:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 0 #059669;
    }
</style>
