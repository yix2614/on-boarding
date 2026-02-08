export interface CardData {
    id: number;
    emoji: string;
    description: string;
}

const EMOJIS = ['📰', '🎨', '🎵', '🎮', '🍔', '🚀', '💡', '🐶', '🐱', '🌍', '📚', '⚽', '🚗', '✈️', '💻', '📱', '📷', '🎥', '🎤', '🎧', '🎼', '🎹', '🎻', '🎺', '🎷', '🎸', '🏹', '🎣', '🚣', '🏊', '🏄', '🏆'];
const DESCRIPTIONS = [
    "Current affairs", "Art & Design", "Music", "Gaming", "Food", "Space", "Ideas", "Pets",
    "Nature", "World", "Books", "Sports", "Cars", "Travel", "Tech", "Mobile",
    "Photo", "Video", "Audio", "Headphones", "Score", "Piano", "Violin", "Trumpet",
    "Saxophone", "Guitar", "Archery", "Fishing", "Rowing", "Swimming", "Surfing", "Trophy"
];

export const generateCards = (count: number): CardData[] => {
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        emoji: EMOJIS[i % EMOJIS.length],
        description: DESCRIPTIONS[i % DESCRIPTIONS.length] || `Item ${i + 1}`
    }));
};
