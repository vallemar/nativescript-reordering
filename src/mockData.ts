import { CoreTypes } from "@nativescript/core";
import { Habit, HabitDay, Periodicity } from "./types";
import { UUID } from "./utils";
import { buildRandomDayWeek } from "./utils";
import { CubicBezierAnimationCurve } from "@nativescript/core/ui/animation";

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

export const SHEET_CURVE = CoreTypes.AnimationCurve.cubicBezier(
    0.17,
    0.89,
    0.24,
    1.11
);


export const SHADE_COVER = {
    color: '#000', // Set the color of the shade cover
    opacity: 0.5, // Set the opacity of the shade cover
    tapToClose: true, // Allow tapping on the shade cover to close the bottom sheet
};

const COORDS = {
    noAnimation: { trans: 'translateY', enter: 0, exit: 400 },
    top: { trans: 'translateY', enter: -100, exit: -400 },
    bottom: { trans: 'translateY', enter: 100, exit: 100 },
    left: { trans: 'translateX', enter: -100, exit: -400 },
    right: { trans: 'translateX', enter: 100, exit: 400 },
};


export type DIRECTION = keyof typeof COORDS;

export const ANIMATION = (
    direction: DIRECTION,
    duration: number = 300,
    curve: string | CubicBezierAnimationCurve = SHEET_CURVE
) => ({
    enterFrom: {
        [COORDS[direction].trans]: COORDS[direction].enter,
        duration,
        curve,
    },
    exitTo: {
        [COORDS[direction].trans]: COORDS[direction].exit,
        duration,
        curve,
        opacity:0
    },
});


