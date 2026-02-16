<script lang="ts">
   import { fade, scale } from 'svelte/transition';
   import { Heart, Lock } from 'lucide-svelte';
   import { princessState } from '$lib/stores/princessState';
   import { inventory } from '$lib/stores/inventory';
   import PrincessAvatar from './PrincessAvatar.svelte';
   import PrinceAvatar from './PrinceAvatar.svelte';

   const pets = [
       { id: 'cat', name: 'Mimi', emoji: '🐱', color: '#FFF3E0' },
       { id: 'dog', name: 'Buddy', emoji: '🐶', color: '#EFEBE9' },
       { id: 'bunny', name: 'Lulu', emoji: '🐰', color: '#F3E5F5' },
       { id: 'unicorn', name: 'Sparkle', emoji: '🦄', color: '#E1BEE7' }
   ];

   let selectedPet = 2; // Default to bunny
   let hearts: { id: number, x: number, y: number }[] = [];
   let nextHeartId = 0;
   let fedPets: string[] = []; // Track who has been fed in this session

   function showLove(event: MouseEvent) {
       const rect = (event.target as HTMLElement).getBoundingClientRect();
       const x = event.clientX - rect.left;
       const y = event.clientY - rect.top;

       const heart = { id: nextHeartId++, x, y };
       hearts = [...hearts, heart];

       setTimeout(() => {
           hearts = hearts.filter(h => h.id !== heart.id);
       }, 1000);
   }

   function feedPet() {
       if ($inventory.ownedItems.includes('pet_food')) {
           fedPets = [...fedPets, pets[selectedPet].id];
           // Consume? Maybe not, keep it simple for kids, one bag of food lasts forever or session
           // Or actually consume it? User said "can't use them". Let's assume infinite use if owned for now (easier for kids),
           // OR consume 1 unit. Let's consume 1 unit to make it "real".
           // inventory.spendItem('pet_food'); // We don't have spendItem yet.
           // Let's just check ownership for now to "unlock" the ability to feed.
           alert(`Yum! ${pets[selectedPet].name} loved the food! 🦴`);
       } else {
           alert("You need to buy Pet Food in the Grocery Store first! 🦴");
       }
   }
       
   $: hasFood = $inventory.ownedItems.includes('pet_food');
</script>

<div class="pet-store">
    <div class="avatars-layer">
        <div class="princess-pos">
           <PrincessAvatar 
                skinTone={$princessState.skinTone}
                dressId={$princessState.dress}
                hairId={$princessState.hair}
                crownId={$princessState.crown}
                makeupId={$princessState.makeup}
                scale={0.45}
           />
       </div>
       <div class="prince-pos">
            <PrinceAvatar scale={0.45} />
       </div>
    </div>

    <h2>Adopt a Pet!</h2>
    <div class="pets-display">
        {#each pets as pet, i}
             <button 
                class="pet-card {selectedPet === i ? 'selected' : ''}"
                style="background-color: {pet.color}"
                on:click={() => selectedPet = i}
             >
                <div class="pet-emoji">{pet.emoji}</div>
                <div class="pet-name">{pet.name}</div>
             </button>
        {/each}
    </div>

    <div class="pet-interaction-area">
        {#if selectedPet !== null}
             <div 
                class="active-pet" 
                on:click={showLove}
                role="button"
                tabindex="0"
                on:keydown={() => {}}
             >
                 <span class="giant-emoji" in:scale={{ duration: 400 }}>{pets[selectedPet].emoji}</span>
                 <p class="pet-message">Click to pet {pets[selectedPet].name}!</p>
                 
                 {#each hearts as heart (heart.id)}
                     <div 
                        class="floating-heart"
                        style="left: {heart.x}px; top: {heart.y}px;"
                        in:scale
                        out:fade
                    >
                        <Heart fill="red" color="red" size={24} />
                    </div>
                 {/each}
             </div>
             
             <div class="controls">
                 <button class="feed-btn" disabled={!hasFood} on:click={feedPet}>
                    <span>{hasFood ? 'Feed Pet 🦴' : 'Need Food 🦴'}</span>
                    {#if !hasFood}<Lock size={16} />{/if}
                 </button>
             </div>
        {/if}
    </div>
</div>

<style>
    .pet-store {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 30px;
        padding-top: 20px;
        position: relative;
        /* Ensure z-index context */
        z-index: 1; 
    }
    
    .avatars-layer {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        display: flex;
        justify-content: space-between;
        pointer-events: none;
        z-index: -1; /* Behind everything */
        opacity: 0.8;
    }

    .princess-pos {
        margin-left: -10px;
        transform: scaleX(-1);
    }
    
    .prince-pos {
        margin-right: -10px;
    }

    .pets-display {
        display: flex;
        gap: 20px;
        justify-content: center;
        flex-wrap: wrap;
    }

    .pet-card {
        padding: 20px;
        border-radius: 20px;
        border: 4px solid transparent;
        cursor: pointer;
        transition: transform 0.2s, box-shadow 0.2s;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .pet-card:hover { transform: translateY(-5px); }
    .pet-card.selected {
        border-color: #9C27B0;
        box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        transform: scale(1.05);
    }

    .pet-emoji { font-size: 3rem; }
    .pet-name { font-weight: bold; margin-top: 5px; color: #555; }

    .pet-interaction-area {
        margin-top: 20px;
        width: 100%;
        height: 300px;
        background: radial-gradient(circle, #fff, #f5f5f5);
        border-radius: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        overflow: hidden;
    }

    .active-pet {
        text-align: center;
        cursor: grab;
        padding: 50px;
        border-radius: 50%; /* Click target area */
    }
    
    .active-pet:active { cursor: grabbing; transform: scale(0.95); transition: transform 0.1s; }

    .giant-emoji { display: block; font-size: 8rem; user-select: none; }
    .pet-message { margin-top: 10px; color: #888; font-style: italic; user-select: none; }

    .floating-heart {
        position: absolute;
        pointer-events: none;
        animation: floatUp 1s ease-out forwards;
        z-index: 10;
        transform: translate(-50%, -50%);
    }

    @keyframes floatUp {
        0% { transform: translate(-50%, -50%) scale(0.5); opacity: 1; }
        100% { transform: translate(-50%, -150px) scale(1.5); opacity: 0; }
    }

    .controls {
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
    }

    .feed-btn {
        background: #FF9800;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 20px;
        font-weight: bold;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 5px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    
    .feed-btn:disabled {
        background: #CCC;
        cursor: not-allowed;
    }
</style>
