<script lang="ts">
    import PrincessGame from '$lib/components/princess/PrincessGame.svelte';
    import { routine } from '$lib/stores/routine';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation'; // Import goto
    import { base } from '$app/paths';

    onMount(() => {
       // Optional: Redirect if not unlocked
       // if (!$routine.games.unlocked) goto(`${base}/`);
    });
</script>

<div class="games-container container">
    <header>
        <h1>Game Center</h1>
        <p>You did it! Time to play!</p>
        <a href="{base}/" class="btn btn-secondary back-btn">Back to Routine</a>
    </header>

    {#if $routine.games.unlocked}
        <div class="game-wrapper">
            <h2>Princess Dress Up</h2>
            <PrincessGame />
        </div>
    {:else}
        <div class="locked-message">
            <h2>Locked!</h2>
            <p>Complete your Reading and Hygiene lessons first!</p>
            <a href="{base}/" class="btn btn-primary">Go to Routine</a>
        </div>
    {/if}
</div>

<style>
    .games-container {
        text-align: center;
        padding-top: var(--spacing-xl);
        padding-bottom: var(--spacing-xl); /* Add bottom padding */
    }

    .back-btn {
        margin-top: var(--spacing-md);
        font-size: 0.9rem;
        padding: var(--spacing-xs) var(--spacing-md);
    }

    .game-wrapper {
        margin-top: var(--spacing-xl);
        background: #FFF0F5; /* Light pink bg for game area */
        padding: var(--spacing-xl);
        border-radius: var(--radius-xl); /* Use larger radius if defined, else fallback */
        border-radius: 2rem;
        display: inline-block; /* To wrap content */
    }

    .locked-message {
        margin-top: var(--spacing-xl);
        padding: var(--spacing-xl);
        background: #F3F4F6;
        border-radius: var(--radius-lg);
    }
</style>
