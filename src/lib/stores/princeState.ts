import { writable } from 'svelte/store';

export interface PrinceState {
    skinTone: string;
    hair: number;
    shirt: number;
    pants: number;
    cape: number;
    crown: number;
    hairCut: number;
}

const initialState: PrinceState = {
    skinTone: '#FFDFC4',
    hair: 0,
    shirt: 0,
    pants: 0,
    cape: 0,
    crown: 0,
    hairCut: 0
};

function createPrinceState() {
    // Load from localStorage if available
    const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('prince_state') : null;
    const startState = stored ? JSON.parse(stored) : initialState;

    if (startState.hairCut === undefined) {
        startState.hairCut = 0;
    }

    const { subscribe, set, update } = writable<PrinceState>(startState);

    if (typeof localStorage !== 'undefined') {
        subscribe(val => localStorage.setItem('prince_state', JSON.stringify(val)));
    }

    return {
        subscribe,
        set,
        update
    };
}

export const princeState = createPrinceState();

export const princeHairStyles = [
    { id: 0, name: 'Brown', color: '#5D4037', price: 0 },
    { id: 1, name: 'Blonde', color: '#FCD34D', price: 0 },
    { id: 2, name: 'Black', color: '#1F2937', price: 0 },
    { id: 3, name: 'Red', color: '#EF4444', price: 0 },
];

export const princeHairCuts = [
    { id: 0, name: 'Short', price: 0 },
    { id: 1, name: 'Spike', price: 0 },
    { id: 2, name: 'Messy', price: 0 },
];

export const princeShirts = [
    { id: 0, name: 'Blue Tunic', color: '#3B82F6', price: 0 },
    { id: 1, name: 'Red Tunic', color: '#EF4444', price: 50 },
    { id: 2, name: 'Green Tunic', color: '#10B981', price: 100 },
    { id: 3, name: 'Golden Armor', color: '#F59E0B', price: 150 },
];

export const princePants = [
    { id: 0, name: 'Navy Pants', color: '#1E3A8A', price: 0 },
    { id: 1, name: 'Brown Pants', color: '#78350F', price: 40 },
    { id: 2, name: 'Black Pants', color: '#111827', price: 60 },
    { id: 3, name: 'White Leggings', color: '#F3F4F6', price: 80 },
];

export const princeCapes = [
    { id: 0, name: 'Red Cape', color: '#EF4444', price: 0 },
    { id: 1, name: 'No Cape', color: 'transparent', price: 0 },
    { id: 2, name: 'Blue Cape', color: '#3B82F6', price: 60 },
    { id: 3, name: 'Purple Cape', color: '#8B5CF6', price: 120 },
];

export const princeCrowns = [
    { id: 0, name: 'Gold Crown', color: '#FFD700', price: 0 },
    { id: 1, name: 'None', color: 'transparent', price: 0 },
    { id: 2, name: 'Silver Crown', color: '#C0C0C0', price: 75 },
    { id: 3, name: 'Jeweled Crown', color: '#F59E0B', price: 150 },
];
