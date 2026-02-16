import { writable } from 'svelte/store';

export interface InventoryState {
    coins: number;
    ownedItems: string[]; // IDs of items: 'dress_1', 'crown_1', 'makeup_1', etc.
}

const initialState: InventoryState = {
    coins: 200, // Starter money
    ownedItems: [
        'dress_0', 'dress_1',
        'hair_0', 'hair_1', 'hair_2', 'hair_3',
        'crown_0',
        'makeup_0',
        'flour', 'sugar', 'eggs', 'milk' // Basic ingredients
    ]
};

function createInventory() {
    // Load from localStorage if available
    const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('princess_inventory') : null;
    const startState = stored ? JSON.parse(stored) : initialState;

    const { subscribe, update, set } = writable<InventoryState>(startState);

    // Subscribe and save to localStorage
    if (typeof localStorage !== 'undefined') {
        subscribe(val => localStorage.setItem('princess_inventory', JSON.stringify(val)));
    }

    return {
        subscribe,
        addCoins: (amount: number) => update(s => ({ ...s, coins: s.coins + amount })),
        earnCoins: (amount: number) => update(s => ({ ...s, coins: s.coins + amount })), // Alias for clarity
        spendCoins: (amount: number) => update(s => {
            if (s.coins >= amount) {
                return { ...s, coins: s.coins - amount };
            }
            return s;
        }),
        addItem: (itemId: string) => update(s => {
            if (!s.ownedItems.includes(itemId)) {
                return { ...s, ownedItems: [...s.ownedItems, itemId] };
            }
            return s;
        }),
        hasItem: (itemId: string, state: InventoryState) => state.ownedItems.includes(itemId),
        reset: () => set(initialState) // specific reset for debugging
    };
}

export const inventory = createInventory();
