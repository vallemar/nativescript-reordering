import { Habit, Periodicity } from "../types";
import { UUID } from "../utils";
import { buildRandomDayWeek } from "../utils";

export const mockData: Habit[] = [
    { id: UUID(), title: 'Meditation', periodicity: Periodicity.Day, color: '#7f73eb', icon: "🧘", week: buildRandomDayWeek() },
    { id: UUID(), title: 'Coding', periodicity: Periodicity.Day, color: '#6db7fd', icon: "👨‍💻", week: buildRandomDayWeek() },
    { id: UUID(), title: 'Eat healthy', periodicity: Periodicity.Day, color: '#70d0a5', icon: "🥗", week: buildRandomDayWeek() },
    { id: UUID(), title: 'Workout', periodicity: Periodicity.Day, color: '#ee7b83', icon: "🏋️", week: buildRandomDayWeek() },
    { id: UUID(), title: 'Reading', periodicity: Periodicity.Day, color: '#fb9e5b', icon: "📚", week: buildRandomDayWeek() }
];

export const maxCountDayRange = 5;

export const addHabitHeightSteps = [0, 260, 260, 260, 260, 260];

export const DAY_DATE_FORMAT = 'YYYY-MM-DD';


