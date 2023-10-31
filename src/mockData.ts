import { Habit, Periodicity } from "./types";
import { UUID } from "./utils/uuid";

export const mockData: Habit[] = [
    { id: UUID(), title: 'Meditation', periodicity: Periodicity.Day, color: '#7f73eb', icon: "🧘", week: [2, 4, 1, 5, 3] },
    { id: UUID(), title: 'Coding', periodicity: Periodicity.Day, color: '#6db7fd', icon: "👨‍💻", week: [3, 1, 4, 2, 5] },
    { id: UUID(), title: 'Eat healthy', periodicity: Periodicity.Day, color: '#70d0a5', icon: "🥗", week: [5, 2, 1, 3, 4] },
    { id: UUID(), title: 'Workout', periodicity: Periodicity.Day, color: '#ee7b83', icon: "🏋️", week: [4, 3, 5, 1, 2] },
    { id: UUID(), title: 'Reading', periodicity: Periodicity.Day, color: '#fb9e5b', icon: "📚", week: [1, 5, 2, 4, 3] }
];

export const maxCountDayRange = 5;