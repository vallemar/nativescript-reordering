import { Habit, HabitDay } from "~/types";

export const habitUtils = {
    buildNormalizedWeek(data: Habit[]) {
        data.forEach((item: Habit) => {
            const array = item.week;

            const dayWeekValue = array.map(dayWeek => dayWeek.value);
            const maxOriginalValue = 5;
            const minOriginalValue = 0;

            const originalRange = maxOriginalValue - minOriginalValue;
            const desiredRange = 20 - 5;

            item.normalizedWeek = dayWeekValue.map((value: number, index: number) => {
                // Normalize the value within the new range
                const normalizedValue = 5 + ((value - minOriginalValue) / originalRange) * desiredRange;
                return { date: array[index].date as string, value: normalizedValue } as HabitDay;
            });
        })
        return data;
    }
}