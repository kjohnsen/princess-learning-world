<script lang="ts">
    import { routine } from '$lib/stores/routine';
    import { BookOpen, Sparkles, Gamepad2, CheckCircle2, Circle } from 'lucide-svelte';
    import { base } from '$app/paths';

    // Subscribe to store
    // usage: $routine.currentPhase, $routine.reading.completed, etc.
</script>

<div class="dashboard container">
    <header class="hero">
        <h1>Welcome to Your Day!</h1>
        <p>Let's learn and play together!</p>
    </header>

    <div class="progress-track">
        <!-- Reading Node -->
        <div class="node {$routine.reading.completed ? 'completed' : 'active'}">
            <div class="icon-circle">
                {#if $routine.reading.completed}
                    <CheckCircle2 size={32} />
                {:else}
                    <BookOpen size={32} />
                {/if}
            </div>
            <span class="label">Reading</span>
            {#if !$routine.reading.completed}
                <a href="{base}/reading" class="btn btn-primary action-btn">Start</a>
            {/if}
        </div>

        <div class="connector {$routine.reading.completed ? 'filled' : ''}"></div>

        <!-- Hygiene Node -->
        <div class="node {$routine.hygiene.completed ? 'completed' : ($routine.reading.completed ? 'active' : 'locked')}">
            <div class="icon-circle">
                {#if $routine.hygiene.completed}
                    <CheckCircle2 size={32} />
                {:else}
                    <Sparkles size={32} />
                {/if}
            </div>
            <span class="label">Hygiene</span>
            {#if $routine.reading.completed && !$routine.hygiene.completed}
                <a href="{base}/hygiene" class="btn btn-primary action-btn">Start</a>
            {:else if !$routine.reading.completed}
                <span class="status-text">Locked</span>
            {/if}
        </div>

        <div class="connector {$routine.hygiene.completed ? 'filled' : ''}"></div>

        <!-- Games Node -->
        <div class="node {$routine.games.unlocked ? 'unlocked' : 'locked'}">
            <div class="icon-circle">
                <Gamepad2 size={32} />
            </div>
            <span class="label">Games</span>
            {#if $routine.games.unlocked}
                <a href="{base}/games" class="btn btn-primary action-btn">Play!</a>
            {:else}
                <span class="status-text">Finish tasks first!</span>
            {/if}
        </div>
    </div>
</div>

<style>
    .hero {
        text-align: center;
        margin-bottom: var(--spacing-xl);
    }
    
    .progress-track {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--spacing-sm);
        margin-top: var(--spacing-xl);
    }

    .node {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--spacing-sm);
        position: relative;
        z-index: 2;
        width: 120px;
    }

    .icon-circle {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: var(--color-surface);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: var(--shadow-md);
        border: 4px solid var(--color-surface);
        color: var(--color-text-light);
        transition: all 0.3s ease;
    }

    .node.active .icon-circle {
        border-color: var(--color-primary);
        color: var(--color-primary);
        transform: scale(1.1);
        box-shadow: var(--shadow-lg);
    }

    .node.completed .icon-circle {
        background: var(--color-success);
        color: white;
        border-color: var(--color-success);
    }
    
    .node.unlocked .icon-circle {
        border-color: var(--color-accent);
        background: var(--color-accent);
        color: white;
        transform: scale(1.1);
        animation: bounce 2s infinite;
    }

    .connector {
        flex: 1;
        height: 8px;
        background: #E5E7EB;
        margin: 0 -20px;
        z-index: 1;
        max-width: 100px;
        border-radius: 4px;
    }
    
    .connector.filled {
        background: var(--color-success);
    }

    .label {
        font-weight: 700;
        font-size: 1.2rem;
        color: var(--color-text);
    }

    .status-text {
        font-size: 0.9rem;
        color: var(--color-text-light);
    }

    .action-btn {
        margin-top: var(--spacing-xs);
    }

    @keyframes bounce {
        0%, 100% { transform: scale(1.1) translateY(0); }
        50% { transform: scale(1.1) translateY(-10px); }
    }
</style>
