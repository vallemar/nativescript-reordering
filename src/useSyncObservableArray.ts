import { ObservableArray } from "@nativescript/core";
import { toRaw } from "nativescript-vue";

export function useSyncObservableArray(array: any[], observableArray: ObservableArray<any>, field: string) {

    function sync() {
        const itemList = cloneObject(array);
        const indexRemoved: number[] = [];
        const indexAdd: number[] = [];
        const indexToUpdate: number[] = [];

        observableArray.forEach((itemObservable, index) => {
            if (!itemList.find((item: any) => isEqualObject(item, itemObservable))) {
                indexRemoved.push(index)
            }
        })
        indexRemoved.forEach(index => observableArray.splice(index, 1))

        itemList.forEach((item: any, index: number) => {
            if (!observableArray.find(itemObservable => isEqualObject(itemObservable, item))) {
                indexAdd.push(index)
            }
        })
        indexAdd.forEach(index => (observableArray.splice(index, 0, itemList[index])))

        observableArray.forEach((itemObservable, index) => {
            if (!isEqualObject(itemObservable, itemList.find((item: any) => isEqualObject(item, itemObservable)))) {
                indexToUpdate.push(index)
            }
        })
        indexToUpdate.forEach(index => (observableArray.setItem(index, toRaw(itemList[index]))))
    }
    return {
        sync
    }
}

export function isEqualObject(a: any, b: any) {
    return JSON.stringify(a) === JSON.stringify(b);
}

export function cloneObject(object: any) {
    return JSON.parse(JSON.stringify(toRaw(object)));
}