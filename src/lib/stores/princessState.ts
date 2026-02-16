import { writable } from 'svelte/store';

export interface PrincessState {
    skinTone: string;
    dress: number;
    hair: number;
    accessory: number;
    crown: number;
    makeup: number;
}

const initialState: PrincessState = {
    skinTone: '#FFDFC4',
    dress: 0,
    hair: 0,
    accessory: 0,
    crown: 0,
    makeup: 0
};

function createPrincessState() {
    // Load from localStorage if available
    const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('princess_state') : null;
    const startState = stored ? JSON.parse(stored) : initialState;

    const { subscribe, set, update } = writable<PrincessState>(startState);

    if (typeof localStorage !== 'undefined') {
        subscribe(val => localStorage.setItem('princess_state', JSON.stringify(val)));
    }

    return {
        subscribe,
        set,
        update
    };
}

export const princessState = createPrincessState();

export const dresses = [
    { id: 0, name: 'None', color: 'transparent', price: 0 },
    { id: 1, name: 'Pink Gown', color: '#FF6B97', price: 0 }, // Starter
    { id: 2, name: 'Blue Sparkle', color: '#60A5FA', price: 50 },
    { id: 3, name: 'Golden Ball', color: '#FCD34D', price: 100 },
    { id: 4, name: 'Purple Royal', color: '#9C27B0', price: 150 },
];

export const hairStyles = [
    { id: 0, name: 'Blonde', color: '#FCD34D', price: 0 },
    { id: 1, name: 'Brown', color: '#78350F', price: 0 },
    { id: 2, name: 'Black', color: '#1F2937', price: 0 },
    { id: 3, name: 'Red', color: '#EF4444', price: 0 },
];

export const crowns = [
    { id: 0, name: 'None', color: 'transparent', price: 0 },
    { id: 1, name: 'Gold Crown', color: '#FFD700', price: 50 },
    { id: 2, name: 'Silver Tiara', color: '#C0C0C0', price: 75 },
    { id: 3, name: 'Floral Wreath', color: '#8BC34A', price: 25 }
];

export const makeupStyles = [
    { id: 0, name: 'Natural', blush: 'transparent', shadow: 'transparent', price: 0 },
    { id: 1, name: 'Rosy', blush: 'rgba(255, 105, 180, 0.3)', shadow: 'transparent', price: 30 },
    { id: 2, name: 'Glam', blush: 'rgba(255, 105, 180, 0.4)', shadow: 'rgba(128, 0, 128, 0.2)', price: 60 },
];
