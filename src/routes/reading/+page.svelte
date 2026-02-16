<script lang="ts">
    import StoryReader from '$lib/components/StoryReader.svelte';
    import { routine } from '$lib/stores/routine';
    import { goto } from '$app/navigation';
    import Confetti from 'js-confetti';
    import { onMount } from 'svelte';

    // Sample Story Data
    const story = [
        { 
            text: "Today is a beautiful day at the castle. The sun is shining bright!", 
            color: "#60A5FA" 
        },
        { 
            text: "Princess Lucia wants to play in the garden, but she has some tasks to do first.", 
            color: "#F472B6" 
        },
        { 
            text: "First, she needs to learn something new. Reading helps our brains grow strong!", 
            color: "#34D399" 
        },
        { 
            text: "Great job reading! Now let's get ready for the day.", 
            color: "#A78BFA" 
        }
    ];

    let jsConfetti: Confetti;

    onMount(() => {
        jsConfetti = new Confetti();
    });

    async function handleComplete() {
        routine.completeReading();
        await jsConfetti.addConfetti({
            emojis: ['📚', '✨', '👑', '🎉'],
        });
        // Wait a moment for celebration
        setTimeout(() => {
            goto('/');
        }, 2000);
    }
</script>

<StoryReader 
    title="Princess Lucia's Morning" 
    pages={story} 
    on:complete={handleComplete} 
/>
