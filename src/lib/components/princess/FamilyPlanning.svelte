<script lang="ts">
    import { babiesStore, type ChildConfig } from "$lib/stores/babyState";
    import BabyAvatar from "./BabyAvatar.svelte";
    import { UserPlus, Trash2, Baby, Smile, GraduationCap } from "lucide-svelte";

    let newAgeGroup: 'baby' | 'kid' | 'teenager' = 'baby';
    let newGender: 'girl' | 'boy' = 'girl';

    function handleAdd() {
        babiesStore.addChild(newAgeGroup, newGender);
    }

    function handleRemove(id: number) {
        babiesStore.removeChild(id);
    }

    function updateProp(id: number, key: keyof ChildConfig, value: any) {
        // Correctly update properties like name, gender, ageGroup, and adjust dependent properties
        const updates: Partial<ChildConfig> = { [key]: value };
        
        // If changing ageGroup, also adjust appropriate defaults for clothing/shoe
        if (key === 'ageGroup') {
            if (value === 'baby') {
                updates.clothing = 'onesie';
                updates.shoe = 'barefoot';
            } else {
                updates.clothing = 'tshirt';
                updates.shoe = 'sneakers';
            }
        }
        
        // If changing gender, update defaults
        if (key === 'gender') {
            updates.swaddleColor = value === 'girl' ? '#FFB6C1' : '#ADD8E6';
        }

        babiesStore.updateBaby(id, updates);
    }
</script>

<div class="family-planning-container">
    <div class="header-card">
        <h2>Family Planning Center 🏥</h2>
        <p>Design your kingdom's children. Add, remove, and customize children of any age group.</p>
    </div>

    <!-- Creator Form -->
    <div class="creator-card">
        <h3>Create a New Family Member</h3>
        <div class="creator-form">
            <div class="form-group">
                <label>Age Group</label>
                <div class="segmented-control">
                    <button 
                        class="segment-btn {newAgeGroup === 'baby' ? 'active' : ''}" 
                        on:click={() => newAgeGroup = 'baby'}
                    >
                        <Baby size={16} />
                        <span>Baby</span>
                    </button>
                    <button 
                        class="segment-btn {newAgeGroup === 'kid' ? 'active' : ''}" 
                        on:click={() => newAgeGroup = 'kid'}
                    >
                        <Smile size={16} />
                        <span>Kid</span>
                    </button>
                    <button 
                        class="segment-btn {newAgeGroup === 'teenager' ? 'active' : ''}" 
                        on:click={() => newAgeGroup = 'teenager'}
                    >
                        <GraduationCap size={16} />
                        <span>Teenager</span>
                    </button>
                </div>
            </div>

            <div class="form-group">
                <label>Gender</label>
                <div class="segmented-control">
                    <button 
                        class="segment-btn {newGender === 'girl' ? 'active pink' : ''}" 
                        on:click={() => newGender = 'girl'}
                    >
                        <span>Girl 🎀</span>
                    </button>
                    <button 
                        class="segment-btn {newGender === 'boy' ? 'active blue' : ''}" 
                        on:click={() => newGender = 'boy'}
                    >
                        <span>Boy 👟</span>
                    </button>
                </div>
            </div>

            <button class="add-btn" on:click={handleAdd}>
                <UserPlus size={18} />
                <span>Add to Family</span>
            </button>
        </div>
    </div>

    <!-- Family List -->
    <div class="family-list-card">
        <h3>Current Children ({$babiesStore.length})</h3>
        
        {#if $babiesStore.length === 0}
            <div class="empty-state">
                <Baby size={48} class="empty-icon" />
                <p>No children in the family yet. Create one above!</p>
            </div>
        {:else}
            <div class="children-grid">
                {#each $babiesStore as child (child.id)}
                    <div class="child-card {child.gender}">
                        <div class="child-preview-container">
                            <div class="avatar-holder">
                                <BabyAvatar
                                    scale={0.4}
                                    clothing={child.clothing}
                                    swaddleColor={child.swaddleColor}
                                    shoe={child.shoe}
                                    accessory={child.accessory}
                                    eyesClosed={child.eyesClosed}
                                    gender={child.gender}
                                    ageGroup={child.ageGroup}
                                />
                            </div>
                        </div>

                        <div class="child-details">
                            <div class="detail-row">
                                <input
                                    type="text"
                                    value={child.name}
                                    on:input={(e) => updateProp(child.id, 'name', (e.target as HTMLInputElement).value)}
                                    placeholder="Name"
                                    class="name-input"
                                />
                            </div>

                            <div class="detail-row controls-row">
                                <div class="mini-control">
                                    <span class="label-hint">Age</span>
                                    <select 
                                        value={child.ageGroup} 
                                        on:change={(e) => updateProp(child.id, 'ageGroup', (e.target as HTMLSelectElement).value)}
                                        class="select-control"
                                    >
                                        <option value="baby">Baby 🍼</option>
                                        <option value="kid">Kid 🧸</option>
                                        <option value="teenager">Teenager 🎒</option>
                                    </select>
                                </div>

                                <div class="mini-control">
                                    <span class="label-hint">Gender</span>
                                    <select 
                                        value={child.gender} 
                                        on:change={(e) => updateProp(child.id, 'gender', (e.target as HTMLSelectElement).value)}
                                        class="select-control"
                                    >
                                        <option value="girl">Girl 🎀</option>
                                        <option value="boy">Boy 👟</option>
                                    </select>
                                </div>
                            </div>

                            <div class="action-row">
                                <button class="delete-btn" on:click={() => handleRemove(child.id)} aria-label="Remove child">
                                    <Trash2 size={16} />
                                    <span>Remove</span>
                                </button>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        {/if}
    </div>
</div>

<style>
    .family-planning-container {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-lg);
        width: 100%;
        max-width: 750px;
        margin: 0 auto;
    }

    .header-card {
        background: linear-gradient(135deg, #FFF0F5 0%, #E6F3FF 100%);
        padding: var(--spacing-lg);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-sm);
        border: 1px solid rgba(0, 0, 0, 0.03);
    }

    .header-card h2 {
        color: #374151;
        margin-bottom: 6px;
    }

    .header-card p {
        color: #6B7280;
        font-size: 0.95rem;
    }

    .creator-card, .family-list-card {
        background: white;
        padding: var(--spacing-lg);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-sm);
        border: 1px solid #E5E7EB;
    }

    .creator-card h3, .family-list-card h3 {
        color: #4B5563;
        margin-bottom: var(--spacing-md);
        font-size: 1.15rem;
        border-bottom: 2px solid #F3F4F6;
        padding-bottom: 6px;
    }

    .creator-form {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: var(--spacing-md);
        align-items: flex-end;
    }

    .form-group {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-xs);
    }

    .form-group label {
        font-size: 0.85rem;
        font-weight: bold;
        color: #4B5563;
    }

    .segmented-control {
        display: flex;
        background: #F3F4F6;
        padding: 3px;
        border-radius: var(--radius-md);
        gap: 3px;
    }

    .segment-btn {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        padding: 8px 12px;
        background: none;
        border: none;
        border-radius: var(--radius-sm);
        font-size: 0.85rem;
        font-weight: bold;
        color: #4B5563;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .segment-btn.active {
        background: white;
        color: #1F2937;
        box-shadow: var(--shadow-sm);
    }

    .segment-btn.active.pink {
        background: #FFF0F5;
        color: var(--color-primary);
    }

    .segment-btn.active.blue {
        background: #E6F3FF;
        color: var(--color-secondary);
    }

    .add-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        background: var(--color-primary);
        color: white;
        border: none;
        border-radius: var(--radius-md);
        padding: var(--spacing-md) var(--spacing-lg);
        font-weight: bold;
        cursor: pointer;
        transition: all 0.2s ease;
        box-shadow: var(--shadow-sm);
        height: 40px;
    }

    .add-btn:hover {
        opacity: 0.9;
        transform: translateY(-1px);
    }

    .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--spacing-md);
        padding: var(--spacing-xl) 0;
        color: #9CA3AF;
        text-align: center;
    }

    .empty-icon {
        opacity: 0.5;
    }

    .children-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: var(--spacing-md);
    }

    .child-card {
        display: flex;
        background: #F9FAFB;
        border: 2px solid #E5E7EB;
        border-radius: var(--radius-md);
        overflow: hidden;
        transition: all 0.2s ease;
    }

    .child-card:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-md);
    }

    .child-card.girl {
        border-color: #FFF0F5;
        background: #FFF9FA;
    }

    .child-card.boy {
        border-color: #E6F3FF;
        background: #F4F9FF;
    }

    .child-preview-container {
        width: 100px;
        background: rgba(0, 0, 0, 0.02);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
    }

    .avatar-holder {
        height: 120px;
        width: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }

    :global(.avatar-holder .avatar-container) {
        transform: scale(0.35) !important;
        transform-origin: center center;
    }

    .child-details {
        flex: 1;
        padding: var(--spacing-sm);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 8px;
    }

    .name-input {
        width: 100%;
        padding: 4px var(--spacing-xs);
        border: 1px solid #D1D5DB;
        border-radius: var(--radius-sm);
        font-weight: bold;
        font-family: inherit;
        color: #374151;
    }

    .name-input:focus {
        outline: none;
        border-color: var(--color-primary);
    }

    .controls-row {
        display: flex;
        gap: var(--spacing-sm);
    }

    .mini-control {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 2px;
    }

    .label-hint {
        font-size: 0.7rem;
        color: #9CA3AF;
        text-transform: uppercase;
        font-weight: bold;
    }

    .select-control {
        padding: 4px;
        border: 1px solid #D1D5DB;
        border-radius: var(--radius-sm);
        font-size: 0.8rem;
        background: white;
        cursor: pointer;
    }

    .action-row {
        display: flex;
        justify-content: flex-end;
    }

    .delete-btn {
        display: flex;
        align-items: center;
        gap: 4px;
        background: none;
        border: none;
        color: #EF4444;
        font-weight: bold;
        font-size: 0.8rem;
        cursor: pointer;
        padding: 2px var(--spacing-xs);
        border-radius: var(--radius-sm);
    }

    .delete-btn:hover {
        background: #FEE2E2;
    }
</style>
