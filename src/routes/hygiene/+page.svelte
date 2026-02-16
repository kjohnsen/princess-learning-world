<script lang="ts">
    import { routine } from '$lib/stores/routine';
    import { Check, User, Droplets, Shirt } from 'lucide-svelte';
    import { fly, scale } from 'svelte/transition';
    import { goto } from '$app/navigation';
    import { base } from '$app/paths';
    import Confetti from 'js-confetti';
    import { onMount } from 'svelte';

    let jsConfetti: Confetti;

    onMount(() => {
        jsConfetti = new Confetti();
    });

    const icons = {
        teeth: User, // Using User as a proxy for face/teeth if specific icon missing, or Smile
        wash: Droplets,
        pajamas: Shirt
    };

    function handleTaskClick(taskId: string) {
        routine.completeHygieneTask(taskId);
        
        // Check if all done after this update (store updates sync)
        const task = $routine.hygiene.tasks.find(t => t.id === taskId);
        if (task?.completed) {
            // Celebrate task completion
            jsConfetti.addConfetti({
                emojis: ['✨', '🧼', '🦷'],
                confettiNumber: 30,
            });
        }

        if ($routine.hygiene.completed) {
            routine.unlockGames(); // Unlock the games!
            setTimeout(async () => {
                await jsConfetti.addConfetti();
                setTimeout(() => goto(`${base}/`), 2000);
            }, 500);
        }
    }
</script>

<div class="hygiene-container">
    <header>
        <h1>Hygiene Time!</h1>
        <p>Let's get sparkly clean!</p>
    </header>

    <div class="tasks">
        {#each $routine.hygiene.tasks as task (task.id)}
            <button 
                class="task-card {task.completed ? 'completed' : ''}"
                on:click={() => handleTaskClick(task.id)}
                in:scale
            >
                <div class="icon-wrapper">
                    <svelte:component this={icons[task.id] || User} size={48} />
                </div>
                <span class="task-title">{task.title}</span>
                <div class="check-circle">
                    {#if task.completed}
                        <Check size={32} />
                    {/if}
                </div>
            </button>
        {/each}
    </div>

    {#if $routine.hygiene.completed}
        <div class="all-done" in:fly={{ y: 50 }}>
            <h2>All Clean!</h2>
            <p>You're ready for games!</p>
        </div>
    {/if}
</div>

<style>
    .hygiene-container {
        max-width: 800px;
        margin: 0 auto;
        padding: var(--spacing-lg);
        text-align: center;
    }

    .tasks {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: var(--spacing-lg);
        margin-top: var(--spacing-xl);
    }

    .task-card {
        background: white;
        border: none;
        border-radius: var(--radius-lg);
        padding: var(--spacing-lg);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--spacing-md);
        box-shadow: var(--shadow-md);
        transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        cursor: pointer;
    }

    .task-card:hover {
        transform: translateY(-5px);
        box-shadow: var(--shadow-lg);
    }

    .task-card.completed {
        background: var(--color-success);
        color: white;
        transform: scale(0.95);
        opacity: 0.9;
    }

    .icon-wrapper {
        color: var(--color-primary);
        background: var(--color-background);
        width: 80px;
        height: 80px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .task-card.completed .icon-wrapper {
        color: var(--color-success);
        background: white;
    }

    .task-title {
        font-size: 1.25rem;
        font-weight: 700;
    }

    .check-circle {
        width: 40px;
        height: 40px;
        border: 2px solid #E5E7EB;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
    }

    .task-card.completed .check-circle {
        border-color: white;
        background: white;
        color: var(--color-success);
    }
</style>
