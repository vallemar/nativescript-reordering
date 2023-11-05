import dayjs from "dayjs";
import { ref } from "nativescript-vue"
import { defineStore } from "pinia"
import { DAY_DATE_FORMAT } from "~/mockData"
import { habitRepository } from "~/repositories/habitRepository";
import { HabitDay, Habit } from "~/types";
import { buildNormalizedWeek } from "~/utils";

export const useHabitStore = defineStore('habit', () => {
    const habits = ref<Habit[]>(habitRepository.findAll());

    function findById(id: string): Habit | undefined {
        return habits.value.find(habit => habit.id === id);
    }

    function getIndex(id: string) {
        return habits.value.findIndex(habit => habit.id === id)!;
    }

    function deleteItemById(id: string) {
        habits.value.splice(findIndexById(id), 1)
        habitRepository.saveAll(habits.value);
    }

    function findIndexById(id: string) {
        return habits.value.findIndex(habit => habit.id === id);
    }

    function updateOrAddItemWeek(id: string, habitDay: HabitDay, value: number) {
        const index = getIndex(id);
        const habit = habits.value[index];
        const storedHabitDay = findIndexHabitDay(habitDay.date, habit);
        const updatedOrAddDay = storedHabitDay?.habitDay ?? habitDay;
        updatedOrAddDay.value = value;
        if (storedHabitDay?.index) {
            habit.week[storedHabitDay?.index] = updatedOrAddDay;
        } else {
            habit.week.push(updatedOrAddDay);
        }
        habit.normalizedWeek = buildNormalizedWeek([habit])[0]?.normalizedWeek;
        habits.value[index] = habit;
        habitRepository.saveAll(habits.value);
    }

    function updateItem(habit: Habit) {
        const index = getIndex(habit.id);
        habits.value[index] = habit;
        habitRepository.saveAll(habits.value);
    }

    function addItem(habit: Habit, index?: number) {
        habit.normalizedWeek = buildNormalizedWeek([habit])[0]?.normalizedWeek;
        if (typeof index === "number") {
            habits.value.splice(index, 0, habit);
        } else {
            habits.value.push(habit);
        }

        applyIndex();
        habitRepository.saveAll(habits.value);
    }

    function findIndexHabitDay(targetDate: String, habitTarget?: Habit): { habit: Habit, habitDay: HabitDay, index: number } | undefined {
        for (let habitIndex = 0; habitIndex < habits.value.length; habitIndex++) {
            const habit = habits.value[habitIndex];
            if (habitTarget && habitTarget?.id != habit.id) {
                continue;
            }

            const dateIndex = habit.week.findIndex((day) => day.date === targetDate);
            if (dateIndex !== -1) {
                return { habit, habitDay: habit.week[dateIndex], index: dateIndex };
            }
        }
        return undefined;
    }

    function getTodayHabitDayIndex(habit: Habit) {
        return findIndexHabitDay(dayjs().format(DAY_DATE_FORMAT), habit)?.index;
    }

    function applyIndex() {
        habits.value.forEach((element, i) => (element.index = i));
    }

    applyIndex();
    return { habits, findById, getIndex, getTodayHabitDayIndex, updateOrAddItemWeek, applyIndex, updateItem, addItem, findIndexHabitDay, findIndexById, deleteItemById }
})