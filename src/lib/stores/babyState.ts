import { writable } from 'svelte/store';

export interface ChildConfig {
    id: number;
    name: string;
    gender: 'girl' | 'boy';
    ageGroup: 'baby' | 'kid' | 'teenager';
    swaddleColor: string;
    clothing: 'onesie' | 'dress' | 'sanfermin' | 'tshirt' | 'pants';
    shoe: 'barefoot' | 'booties' | 'sneakers' | 'sanfermin';
    accessory: 'none' | 'hairbow' | 'cap' | 'bandana';
    eyesClosed: boolean;
    x: number;
    y: number;
}

export const initialChildren: ChildConfig[] = [
    {
        id: 1,
        name: "Baby Lily",
        gender: "girl",
        ageGroup: "baby",
        swaddleColor: "#FFB6C1",
        clothing: "onesie",
        shoe: "barefoot",
        accessory: "hairbow",
        eyesClosed: false,
        x: 250,
        y: 390
    },
    {
        id: 2,
        name: "Kid Leo",
        gender: "boy",
        ageGroup: "kid",
        swaddleColor: "#ADD8E6",
        clothing: "tshirt",
        shoe: "sneakers",
        accessory: "cap",
        eyesClosed: false,
        x: 350,
        y: 390
    }
];

function createBabyStore() {
    const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('princess_babies') : null;
    const startState = stored ? JSON.parse(stored) : initialChildren;

    const { subscribe, set, update } = writable<ChildConfig[]>(startState);

    if (typeof localStorage !== 'undefined') {
        subscribe(val => localStorage.setItem('princess_babies', JSON.stringify(val)));
    }

    return {
        subscribe,
        set,
        update,
        updateBaby: (id: number, config: Partial<ChildConfig>) => update(babies => {
            return babies.map(b => b.id === id ? { ...b, ...config } : b);
        }),
        updatePosition: (id: number, dx: number, dy: number) => update(babies => {
            return babies.map(b => b.id === id ? { ...b, x: b.x + dx, y: b.y + dy } : b);
        }),
        addChild: (ageGroup: 'baby' | 'kid' | 'teenager', gender: 'girl' | 'boy') => update(babies => {
            const newId = babies.length > 0 ? Math.max(...babies.map(b => b.id)) + 1 : 1;
            const newChild: ChildConfig = {
                id: newId,
                name: `${ageGroup.charAt(0).toUpperCase() + ageGroup.slice(1)} ${newId}`,
                gender: gender,
                ageGroup: ageGroup,
                swaddleColor: gender === 'girl' ? '#FFB6C1' : '#ADD8E6',
                clothing: ageGroup === 'baby' ? 'onesie' : 'tshirt',
                shoe: ageGroup === 'baby' ? 'barefoot' : 'sneakers',
                accessory: 'none',
                eyesClosed: false,
                x: 200 + Math.random() * 300,
                y: 390
            };
            return [...babies, newChild];
        }),
        removeChild: (id: number) => update(babies => {
            return babies.filter(b => b.id !== id);
        }),
        reset: () => set(initialChildren)
    };
}

export const babiesStore = createBabyStore();
export const childrenStore = babiesStore; // Alias for semantic clarity
export type ChildConfigType = ChildConfig;
