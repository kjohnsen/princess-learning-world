<script lang="ts">
    import { babiesStore, type ChildConfig } from "$lib/stores/babyState";
    import BabyAvatar from "./BabyAvatar.svelte";
    import { RotateCcw } from "lucide-svelte";

    // Track active child index
    let activeBabyIdx = 0;

    // Guard out-of-bounds index and get active child
    $: activeBabyIdx = $babiesStore.length > 0 ? Math.max(0, Math.min(activeBabyIdx, $babiesStore.length - 1)) : 0;
    $: activeBaby = $babiesStore[activeBabyIdx] as ChildConfig | undefined;

    const colors = [
        { name: "Pink", hex: "#FFB6C1" },
        { name: "Blue", hex: "#ADD8E6" },
        { name: "Lavender", hex: "#E0B0FF" },
        { name: "Mint", hex: "#98FB98" },
        { name: "Yellow", hex: "#FFF9C4" }
    ];

    function updateBabyProp(key: keyof ChildConfig, value: any) {
        if (!activeBaby) return;
        babiesStore.updateBaby(activeBaby.id, { [key]: value });
    }
</script>

<div class="baby-dressup-container">
    {#if $babiesStore.length === 0}
        <div class="empty-state-card">
            <h3>No children in the family yet 👨‍👩‍👧‍👦</h3>
            <p>Please go to the <strong>Family Planning</strong> tab to add a baby, kid, or teenager first!</p>
        </div>
    {:else if activeBaby}
        <!-- Selection Bar -->
        <div class="baby-selector">
            {#each $babiesStore as baby, idx}
                <button
                    class="selector-btn {activeBabyIdx === idx ? 'active' : ''} {baby.gender}"
                    on:click={() => (activeBabyIdx = idx)}
                >
                    <div class="selector-avatar-wrapper">
                        <BabyAvatar
                            scale={0.3}
                            clothing={baby.clothing}
                            swaddleColor={baby.swaddleColor}
                            shoe={baby.shoe}
                            accessory={baby.accessory}
                            eyesClosed={baby.eyesClosed}
                            gender={baby.gender}
                            ageGroup={baby.ageGroup}
                        />
                    </div>
                    <span class="baby-selector-name">{baby.name}</span>
                    <span class="baby-gender-tag">
                        {baby.ageGroup.charAt(0).toUpperCase() + baby.ageGroup.slice(1)} • {baby.gender === 'girl' ? '🎀' : '👟'}
                    </span>
                </button>
            {/each}
        </div>

        <div class="main-customize-area">
            <!-- Preview -->
            <div class="preview-area">
                <BabyAvatar
                    scale={0.9}
                    clothing={activeBaby.clothing}
                    swaddleColor={activeBaby.swaddleColor}
                    shoe={activeBaby.shoe}
                    accessory={activeBaby.accessory}
                    eyesClosed={activeBaby.eyesClosed}
                    gender={activeBaby.gender}
                    ageGroup={activeBaby.ageGroup}
                />
                <div class="baby-card-details">
                    <h3>{activeBaby.name}</h3>
                    <input
                        type="text"
                        value={activeBaby.name}
                        on:input={(e) => updateBabyProp('name', (e.target as HTMLInputElement).value)}
                        placeholder="Enter name"
                        class="name-input"
                    />
                </div>
            </div>

            <!-- Controls -->
            <div class="controls-area">
                <!-- Awake/Asleep -->
                <div class="category">
                    <h3>State</h3>
                    <div class="options">
                        <button
                            class="option-btn {!activeBaby.eyesClosed ? 'active' : ''}"
                            on:click={() => updateBabyProp('eyesClosed', false)}
                        >
                            Awake 👀
                        </button>
                        <button
                            class="option-btn {activeBaby.eyesClosed ? 'active' : ''}"
                            on:click={() => updateBabyProp('eyesClosed', true)}
                        >
                            Asleep 💤
                        </button>
                    </div>
                </div>

                <!-- Clothing -->
                <div class="category">
                    <h3>Clothing Style</h3>
                    <div class="options">
                        {#if activeBaby.ageGroup === 'baby'}
                            <button
                                class="option-btn {activeBaby.clothing === 'onesie' ? 'active' : ''}"
                                on:click={() => updateBabyProp('clothing', 'onesie')}
                            >
                                Onesie 👶
                            </button>
                        {:else}
                            <button
                                class="option-btn {activeBaby.clothing === 'tshirt' ? 'active' : ''}"
                                on:click={() => updateBabyProp('clothing', 'tshirt')}
                            >
                                T-Shirt 👕
                            </button>
                            <button
                                class="option-btn {activeBaby.clothing === 'pants' ? 'active' : ''}"
                                on:click={() => updateBabyProp('clothing', 'pants')}
                            >
                                Pants 👖
                            </button>
                        {/if}
                        
                        {#if activeBaby.gender === 'girl'}
                            <button
                                class="option-btn {activeBaby.clothing === 'dress' ? 'active' : ''}"
                                on:click={() => updateBabyProp('clothing', 'dress')}
                            >
                                Dress 👗
                            </button>
                        {/if}
                        
                        <button
                            class="option-btn sanfermin-btn {activeBaby.clothing === 'sanfermin' ? 'active' : ''}"
                            on:click={() => updateBabyProp('clothing', 'sanfermin')}
                        >
                            San Fermín 🧣
                        </button>
                    </div>
                </div>

                <!-- Swaddle/Onesie/Tshirt Color (hidden if San Fermin active) -->
                {#if activeBaby.clothing !== 'sanfermin'}
                    <div class="category">
                        <h3>Outfit Color</h3>
                        <div class="options">
                            {#each colors as c}
                                <button
                                    class="color-btn {activeBaby.swaddleColor === c.hex ? 'active' : ''}"
                                    style="background-color: {c.hex}"
                                    on:click={() => updateBabyProp('swaddleColor', c.hex)}
                                    aria-label="Select {c.name}"
                                ></button>
                            {/each}
                        </div>
                    </div>
                {/if}

                <!-- Shoes -->
                <div class="category">
                    <h3>Shoes</h3>
                    <div class="options">
                        <button
                            class="option-btn {activeBaby.shoe === 'barefoot' ? 'active' : ''}"
                            on:click={() => updateBabyProp('shoe', 'barefoot')}
                        >
                            Barefoot 🦶
                        </button>
                        {#if activeBaby.ageGroup === 'baby'}
                            <button
                                class="option-btn {activeBaby.shoe === 'booties' ? 'active' : ''}"
                                on:click={() => updateBabyProp('shoe', 'booties')}
                            >
                                Booties 🧦
                            </button>
                        {:else}
                            <button
                                class="option-btn {activeBaby.shoe === 'sneakers' ? 'active' : ''}"
                                on:click={() => updateBabyProp('shoe', 'sneakers')}
                            >
                                Sneakers 👟
                            </button>
                        {/if}
                        <button
                            class="option-btn sanfermin-btn {activeBaby.shoe === 'sanfermin' ? 'active' : ''}"
                            on:click={() => updateBabyProp('shoe', 'sanfermin')}
                        >
                            Alpargatas 👟
                        </button>
                    </div>
                </div>

                <!-- Accessories -->
                <div class="category">
                    <h3>Head Accessory</h3>
                    <div class="options">
                        <button
                            class="option-btn {activeBaby.accessory === 'none' ? 'active' : ''}"
                            on:click={() => updateBabyProp('accessory', 'none')}
                        >
                            <RotateCcw size={18} />
                        </button>
                        {#if activeBaby.gender === 'girl'}
                            <button
                                class="option-btn {activeBaby.accessory === 'hairbow' ? 'active' : ''}"
                                on:click={() => updateBabyProp('accessory', 'hairbow')}
                            >
                                Hair Bow 🎀
                            </button>
                        {/if}
                        <button
                            class="option-btn {activeBaby.accessory === 'cap' ? 'active' : ''}"
                            on:click={() => updateBabyProp('accessory', 'cap')}
                        >
                            Cap 🧢
                        </button>
                        <button
                            class="option-btn sanfermin-btn {activeBaby.accessory === 'bandana' ? 'active' : ''}"
                            on:click={() => updateBabyProp('accessory', 'bandana')}
                        >
                            Bandana 🧣
                        </button>
                    </div>
                </div>
            </div>
        </div>
    {/if}
</div>

<style>
    .baby-dressup-container {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-lg);
        width: 100%;
        max-width: 750px;
        margin: 0 auto;
    }

    .empty-state-card {
        background: white;
        padding: var(--spacing-xl);
        text-align: center;
        border-radius: var(--radius-lg);
        border: 2px dashed #E5E7EB;
        color: #6B7280;
    }

    .empty-state-card h3 {
        color: #374151;
        margin-bottom: 8px;
    }

    .baby-selector {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
        gap: var(--spacing-sm);
        background: white;
        padding: var(--spacing-sm);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-sm);
        border: 1px solid #E5E7EB;
    }

    .selector-btn {
        background: #F9FAFB;
        border: 3px solid transparent;
        border-radius: var(--radius-md);
        padding: var(--spacing-xs) var(--spacing-sm);
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .selector-btn:hover {
        background: #F3F4F6;
        transform: translateY(-2px);
    }

    .selector-btn.active {
        background: #FFF0F5;
        border-color: var(--color-primary);
        box-shadow: var(--shadow-md);
    }
    
    .selector-btn.active.boy {
        background: #E0F7FA;
        border-color: var(--color-secondary);
    }

    .selector-avatar-wrapper {
        height: 60px;
        width: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }

    :global(.selector-avatar-wrapper .avatar-container) {
        transform: scale(0.25) !important;
        transform-origin: center center;
    }

    .baby-selector-name {
        font-weight: bold;
        font-size: 0.9rem;
        margin-top: 4px;
        color: #374151;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        width: 100%;
        text-align: center;
    }

    .baby-gender-tag {
        font-size: 0.7rem;
        color: #6B7280;
        margin-top: 1px;
    }

    .main-customize-area {
        display: flex;
        gap: var(--spacing-lg);
        flex-wrap: wrap;
        justify-content: center;
        background: white;
        padding: var(--spacing-lg);
        border-radius: var(--radius-lg);
        border: 1px solid #E5E7EB;
        box-shadow: var(--shadow-sm);
    }

    .preview-area {
        padding: var(--spacing-md);
        flex: 1;
        min-width: 250px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 15px;
        border-right: 1px solid #F3F4F6;
    }

    @media (max-width: 640px) {
        .preview-area {
            border-right: none;
            border-bottom: 1px solid #F3F4F6;
            padding-bottom: var(--spacing-lg);
        }
    }

    .baby-card-details {
        text-align: center;
        width: 100%;
    }

    .baby-card-details h3 {
        margin-bottom: 8px;
        color: var(--color-primary-dark);
    }

    .name-input {
        width: 80%;
        padding: var(--spacing-xs) var(--spacing-sm);
        border-radius: var(--radius-full);
        border: 2px solid #E5E7EB;
        text-align: center;
        font-weight: bold;
        color: #374151;
        font-family: inherit;
        font-size: 1rem;
    }

    .name-input:focus {
        border-color: var(--color-primary);
        outline: none;
    }

    .controls-area {
        padding: var(--spacing-md);
        flex: 1.5;
        min-width: 300px;
    }

    .category {
        margin-bottom: var(--spacing-md);
    }

    .category h3 {
        margin-bottom: var(--spacing-xs);
        font-size: 1rem;
        color: #4B5563;
    }

    .options {
        display: flex;
        gap: var(--spacing-sm);
        flex-wrap: wrap;
    }

    .color-btn {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 0 0 2px #e5e7eb;
        cursor: pointer;
        transition: transform 0.2s;
    }

    .color-btn.active {
        box-shadow: 0 0 0 2px var(--color-primary);
        transform: scale(1.1);
    }

    .option-btn {
        padding: 6px 12px;
        border-radius: var(--radius-full);
        border: 2px solid #e5e7eb;
        background: white;
        font-size: 0.9rem;
        font-weight: bold;
        color: #4B5563;
        cursor: pointer;
        transition: all 0.2s ease;
        display: inline-flex;
        align-items: center;
        gap: 5px;
    }

    .option-btn:hover {
        border-color: #D1D5DB;
        background: #F9FAFB;
    }

    .option-btn.active {
        border-color: var(--color-primary);
        color: var(--color-primary);
        background: #FFF0F5;
    }

    .option-btn.sanfermin-btn.active {
        border-color: #EF4444;
        color: #EF4444;
        background: #FFEBEE;
    }
</style>
