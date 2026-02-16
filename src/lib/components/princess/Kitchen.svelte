<script lang="ts">
   import { fade, fly, scale } from 'svelte/transition';
   import { Check, Lock } from 'lucide-svelte';
   import { princessState } from '$lib/stores/princessState';
   import { inventory } from '$lib/stores/inventory';
   import PrincessAvatar from './PrincessAvatar.svelte';
   import PrinceAvatar from './PrinceAvatar.svelte';

   type Step = 'ingredients' | 'mix' | 'bake' | 'decorate' | 'done';
   let currentStep: Step = 'ingredients';

   // Ingredients state
   // Map ingredients to inventory IDs
   let ingredients = [
       { id: 'flour', inventoryId: 'flour', name: 'Flour', icon: '🥡', added: false },
       { id: 'sugar', inventoryId: 'sugar', name: 'Sugar', icon: '🧂', added: false },
       { id: 'eggs', inventoryId: 'eggs', name: 'Eggs', icon: '🥚', added: false },
       { id: 'milk', inventoryId: 'milk', name: 'Milk', icon: '🥛', added: false }
   ];

   let isMixing = false;
   let mixProgress = 0;
   let isBaking = false; 

   function addIngredient(id: string) {
       ingredients = ingredients.map(i => i.id === id ? { ...i, added: true } : i);
       if (ingredients.every(i => i.added)) {
           setTimeout(() => currentStep = 'mix', 800);
       }
   }

   function hasIngredient(inventoryId: string) {
       return $inventory.ownedItems.includes(inventoryId);
   }

   function mix() {
       if (isMixing) return;
       isMixing = true;
       const interval = setInterval(() => {
           mixProgress += 10;
           if (mixProgress >= 100) {
               clearInterval(interval);
               isMixing = false;
               setTimeout(() => currentStep = 'bake', 500);
           }
       }, 200);
   }

   function bake() {
        if (isBaking) return;
        isBaking = true;
        setTimeout(() => {
            isBaking = false;
            currentStep = 'decorate';
        }, 3000); // 3 seconds to bake
   }

   function finish() {
       currentStep = 'done';
       inventory.earnCoins(50);
       // Show coin animation logic could go here, for now just relying on the UI update
   }
</script>

<div class="kitchen-scene">
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

   <div class="countertop"></div>
   
   <div class="work-area">
       {#if currentStep === 'ingredients'}
           <div class="step-container" in:fade>
               <h2 class="step-title">Add Ingredients!</h2>
               <div class="ingredients-list">
                   {#each ingredients as ing}
                       {@const locked = !hasIngredient(ing.inventoryId)}
                       <button 
                           class="ingredient-btn {ing.added ? 'added' : ''} {locked ? 'locked' : ''}"
                           on:click={() => { if (!locked) addIngredient(ing.id); }}
                           disabled={ing.added || locked}
                           title={locked ? "Buy in Grocery Store!" : ""}
                       >
                           <span class="food-icon">{ing.icon}</span>
                           <span class="food-name">{ing.name}</span>
                           {#if ing.added}
                               <div class="check-overlay" in:scale>
                                   <Check size={24} color="white" />
                               </div>
                           {:else if locked}
                                <div class="lock-overlay">
                                    <Lock size={16} />
                                    <span>Buy</span>
                                </div>
                           {/if}
                       </button>
                   {/each}
               </div>
               <div class="bowl ingredients-stage">
                   {#if ingredients.some(i => i.added)}
                       <div class="bowl-contents" style="height: {ingredients.filter(i => i.added).length * 20}%"></div>
                   {/if}
               </div>
           </div>
       {:else if currentStep === 'mix'}
           <div class="step-container" in:fade>
               <h2 class="step-title">Mix it up!</h2>
               <div class="bowl mix-stage" on:click={mix} role="button" tabindex="0" on:keydown={(e) => e.key === 'Enter' && mix()}>
                   <div class="bowl-contents mixed" style="transform: rotate({mixProgress * 2}deg)"></div>
                   {#if isMixing}
                       <div class="whisk" in:fly={{ y: -20, duration: 300 }}>🥣</div>
                   {/if}
               </div>
               <p class="instruction">Tap the bowl to mix!</p>
               <div class="progress-bar">
                   <div class="fill" style="width: {mixProgress}%"></div>
               </div>
           </div>
       {:else if currentStep === 'bake'}
           <div class="step-container" in:fade>
               <h2 class="step-title">Time to Bake!</h2>
               <div class="oven {isBaking ? 'on' : ''}">
                   <div class="oven-window">
                       {#if isBaking}
                           <div class="cake-batter rising"></div>
                       {/if}
                   </div>
                   <div class="controls">
                       <button class="bake-btn" on:click={bake} disabled={isBaking}>
                           {isBaking ? 'Baking...' : 'Start Oven'}
                       </button>
                   </div>
               </div>
           </div>
       {:else if currentStep === 'decorate' || currentStep === 'done'}
           <div class="step-container" in:fade>
               <h2 class="step-title">{currentStep === 'done' ? 'Yummy!' : 'Decorate!'}</h2>
               <div class="cake-display">
                   <div class="cake-base">
                       <div class="frosting"></div>
                       {#if currentStep === 'done'}
                           <div class="toppings" in:scale>🍓🍓🍓</div>
                           <div class="candles" in:scale>ii</div>
                       {/if}
                   </div>
               </div>
               {#if currentStep === 'decorate'}
                    <button class="finish-btn" on:click={finish}>Add Toppings!</button>
               {/if}
               {#if currentStep === 'done'}
                 <button class="restart-btn" on:click={() => {
                        currentStep = 'ingredients';
                        ingredients = ingredients.map(i => ({...i, added: false}));
                        mixProgress = 0;
                 }}>Bake Another!</button>
               {/if}
           </div>
       {/if}
   </div>
</div>

<style>
    .avatars-layer {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        pointer-events: none; /* Let clicks pass through */
        z-index: 1; /* Behind table */
    }

    .princess-pos {
        margin-left: -20px;
        transform: scaleX(-1); /* Face right */
    }
    
    .prince-pos {
        margin-right: -20px;
    }

    .kitchen-scene {
        width: 100%;
        height: 500px;
        background: #FFF3E0;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: var(--radius-lg);
        overflow: hidden;
    }

    .countertop {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 150px;
        background: #e0e0e0;
        border-top: 10px solid #bdbdbd;
        z-index: 5; /* In front of avatars */
    }

    .work-area {
        z-index: 10; /* In front of countertop */
        width: 100%;
        position: relative;
    }

    .ingredient-btn.locked {
        opacity: 0.6;
        cursor: not-allowed;
        background: #eee;
    }

    .lock-overlay {
        position: absolute;
        top: 0;
        right: 0;
        background: #FF5252;
        color: white;
        padding: 2px 6px;
        border-radius: 0 10px 0 10px;
        font-size: 0.7rem;
        display: flex;
        align-items: center;
        gap: 2px;
    }

   .kitchen-scene {
       width: 100%;
       height: 500px;
       background: #FFF3E0;
       position: relative;
       display: flex;
       justify-content: center;
       align-items: center;
       border-radius: var(--radius-lg);
       overflow: hidden;
   }

   .countertop {
       position: absolute;
       bottom: 0;
       width: 100%;
       height: 150px;
       background: #e0e0e0;
       border-top: 10px solid #bdbdbd;
   }

   .step-container {
       z-index: 10;
       text-align: center;
       display: flex;
       flex-direction: column;
       align-items: center;
       gap: 20px;
       width: 100%;
   }

   .ingredients-list {
       display: flex;
       gap: 15px;
       justify-content: center;
   }

   .ingredient-btn {
       width: 80px;
       height: 80px;
       border: 3px solid #FFCB7D;
       background: white;
       border-radius: 12px;
       display: flex;
       flex-direction: column;
       gap: 5px;
       align-items: center;
       justify-content: center;
       cursor: pointer;
       position: relative;
       transition: transform 0.1s;
   }

   .ingredient-btn:active { transform: scale(0.95); }
   .ingredient-btn.added { opacity: 0.7; background: #e0e0e0; }

   .food-icon { font-size: 2rem; }
   .food-name { font-size: 0.8rem; font-weight: bold; color: #555; }

   .check-overlay {
       position: absolute;
       inset: 0;
       display: flex;
       align-items: center;
       justify-content: center;
       background: rgba(76, 175, 80, 0.7);
       border-radius: 9px; /* slightly less than parent */
   }

   .bowl {
       width: 150px;
       height: 80px; 
       background: #FF5722;
       border-radius: 0 0 75px 75px; 
       position: relative;
       margin-top: 20px;
       overflow: hidden;
       border: 4px solid #D84315;
   }

   .bowl-contents {
       position: absolute;
       bottom: 0;
       width: 100%;
       background: #FFF8E1;
       transition: height 0.5s;
   }
   
   .bowl-contents.mixed {
       height: 80%;
       background: repeating-linear-gradient(45deg, #FFF8E1, #FFF8E1 10px, #FFE0B2 10px, #FFE0B2 20px);
   }

   .whisk { font-size: 3rem; position: absolute; top: -40px; left: 50%; transform: translateX(-50%); }

   .progress-bar { width: 200px; height: 10px; background: #eee; border-radius: 5px; overflow: hidden; margin-top: 10px; }
   .fill { height: 100%; background: #4CAF50; transition: width 0.2s; }

   .oven {
       width: 200px;
       height: 220px;
       background: #333;
       border-radius: 10px;
       padding: 10px;
       display: flex;
       flex-direction: column;
       gap: 10px;
   }

   .oven-window {
       flex: 1;
       background: #222;
       border-radius: 5px;
       position: relative;
       overflow: hidden;
       border: 2px solid #555;
   }

   .oven.on .oven-window { background: #4a2c2c; /* Warm glow */ box-shadow: inset 0 0 20px orange; }

   .cake-batter {
       width: 80px;
       height: 40px;
       background: #F48FB1;
       position: absolute;
       bottom: 10px;
       left: 50%;
       transform: translateX(-50%);
       border-radius: 5px 5px 0 0;
   }
   
   .cake-batter.rising {
       animation: rise 3s forwards;
   }

   @keyframes rise {
       to { height: 80px; background: #880E4F; /* Baked color */ }
   }

   .bake-btn, .finish-btn, .restart-btn {
       padding: 10px 20px;
       background: #FF5722;
       color: white;
       border: none;
       border-radius: 5px;
       font-weight: bold;
       cursor: pointer;
   }
   
   .bake-btn:disabled { background: #777; cursor: not-allowed; }

   .cake-display {
       margin: 20px;
   }
   
   .cake-base {
       width: 140px;
       height: 100px;
       background: #880E4F;
       border-radius: 10px 10px 0 0;
       position: relative;
   }

   .frosting {
       height: 30px;
       background: pink;
       width: 100%;
       border-radius: 10px 10px 5px 5px;
   }

   .toppings {
       position: absolute;
       top: -15px;
       width: 100%;
       text-align: center;
       font-size: 1.5rem;
   }
   .candles {
       position: absolute;
       top: -25px;
       width: 100%;
       text-align: center;
       font-size: 1.5rem;   
       color: yellow;
   }
</style>
