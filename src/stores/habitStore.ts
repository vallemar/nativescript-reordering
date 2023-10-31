import { ObservableArray } from "@nativescript/core";
import { ref } from "nativescript-vue"
import { defineStore } from "pinia"
import { mockData } from "~/mockData"
import { Habit } from "~/types";
import { buildNormalizedWeek } from "~/utils";

export const useHabitStore = defineStore('habit', () => {
    const habits = ref<ObservableArray<Habit>>(new ObservableArray(buildNormalizedWeek(mockData)));

    function get(id: string): Habit {
        return habits.value.find(habit => habit.id === id)!;
    }

    function getIndex(id: string) {
        return habits.value.findIndex(habit => habit.id === id)!;
    }

    function updateItemWeek(id: string, dayIndex: number, value: number) {
        const index = getIndex(id);
        const habit = habits.value.getItem(index)
        habit.week[dayIndex] = value;
        habit.normalizedWeek = buildNormalizedWeek([habit])[0]?.normalizedWeek;
        habits.value.setItem(index, habit);
    }

    function updateItem(habit: Habit) {
        const index = getIndex(habit.id);
        habits.value.setItem(index, habit);
    }

    function applyIndex() {
        habits.value.forEach((element, i) => (element.index = i));
    }

    applyIndex();
    return { habits, get, getIndex, updateItemWeek, applyIndex, updateItem }
})