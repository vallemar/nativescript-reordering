import { useStorage } from "@nativescript-use/vue";
import { Habit } from "~/types";

const storage = useStorage();


export const habitRepository = {
    key: "habits",
    findAll() {
        return storage.getObject<Habit[]>(habitRepository.key) ?? [];
    },
    saveAll(habits: Habit[]) {
        storage.setObject(habitRepository.key, habits);
    },
    removeAll() {
        storage.remove(habitRepository.key);
    }
}