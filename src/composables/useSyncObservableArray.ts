import { ObservableArray } from "@nativescript/core";
import { toRaw, watch, isReactive, isRef } from "nativescript-vue";

const baseExcludeCompareFields = { startingSide: null, menuOpened: null };

export function useSyncObservableArray<T>(array: T[], observableArray: ObservableArray<T>,
    options: {
        addRemoveByField?: string,
        excludeCompareFields?: any,
        watchUpdates?: boolean,
        checkRemoved?: boolean,
        checkAdded?: boolean,
        checkUpdate?: boolean,
    } = {}) {
    const { checkRemoved = true, checkAdded = true, checkUpdate = true, excludeCompareFields, addRemoveByField = null } = options;
    const excludeFields = { ...baseExcludeCompareFields, ...excludeCompareFields };

    if (options?.watchUpdates && (isReactive(array) || isRef(array))) {
        watch(array, () => {
            sync();
        })
    }

    function sync(newArray?: any) {
        //console.time("TIME_[useSyncObservableArray]");
        const itemList = newArray ? cloneObject(array) : cloneObject(array);

        if (checkRemoved) {
            const indexRemoved: number[] = [];
            observableArray.forEach((itemObservable: any, index: number) => {
                const findItem = addRemoveByField ?
                    itemList.find((item: any) => item[addRemoveByField] === itemObservable[addRemoveByField]) :
                    itemList.find((item: any) => isEqualObject(item, itemObservable, excludeFields))
                if (!findItem) {
                    indexRemoved.push(index);
                }
            })
            indexRemoved.forEach(index => observableArray.splice(index, 1));
        }

        if (checkAdded) {
            const indexAdd: number[] = [];
            itemList.forEach((item: any, index: number) => {
                const findItem = addRemoveByField ?
                    observableArray.find((itemObservable: any) => itemObservable[addRemoveByField] === item[addRemoveByField]) :
                    observableArray.find((itemObservable: any) => isEqualObject(itemObservable, item, excludeFields))
                if (!findItem) {
                    indexAdd.push(index);
                }
            })
            indexAdd.forEach(index => (observableArray.splice(index, 0, itemList[index])));
        }

        if (checkUpdate) {
            itemList.forEach((item: any, index: number) => {
                const itemObservable = observableArray.getItem(index);
                if (!isEqualObject(itemObservable, item, excludeFields)) {
                    observableArray.setItem(index, item);
                }
            });
        }
        //console.timeEnd("TIME_[useSyncObservableArray]");
    }

    return {
        sync,
        observableArray
    }
}

export function isEqualObject(a: any, b: any, excludeFields: any) {
    const aObject = { ...a, ...excludeFields };
    const bObject = { ...b, ...excludeFields };
    return JSON.stringify(aObject) === JSON.stringify(bObject);
}

export function cloneObject(object: any) {
    return JSON.parse(JSON.stringify(toRaw(object)));
}