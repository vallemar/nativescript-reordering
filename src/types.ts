import { View } from "@nativescript/core";

export type Habit = {
    id: string,
    title: string,
    periodicity: Periodicity,
    color: string,
    icon: string,
    week: number[],
    normalizedWeek?: number[],
    index?: number
}

export enum Periodicity {
    Day,
    Week
}

export type SpringParams = {
    tension?: number;
    friction?: number;
    mass?: number;
    delay?: number;
    velocity?: number;
}

export type AnimateOptions = {
    translate?: { x?: number, y?: number },
    scale?: { x?: number, y?: number },
    rotation?: number,
    alpha?: number,
    size?: {
        width: number,
        height: number
    },
    params?: SpringParams,
    onBeforeStartAnimation?: (view: View) => void
    onCompletion?: (view: View) => void
}
