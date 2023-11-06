import { ObservableArray } from "@nativescript/core";
import { toRaw } from "nativescript-vue";

const baseExcludeCompareFields = { startingSide: null, menuOpened: null };

export function useSyncObservableArray<T>(array: T[], observableArray: ObservableArray<T>,
    options: {
        addRemoveByField?: string,
        checkRemoved?: boolean,
        checkAdded?: boolean,
        checkUpdate?: boolean,
        excludeCompareFields?: any
    } = {}) {
    const { checkRemoved = true, checkAdded = true, checkUpdate = true, excludeCompareFields, addRemoveByField = null } = options;
    const excludeFields = { ...baseExcludeCompareFields, ...excludeCompareFields };

    function sync(newArray: any) {
        //console.time("TIME_[useSyncObservableArray]");

        const itemList = newArray ? cloneObject(newArray) : cloneObject(array);

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

/* 
Best performance
 function sync(newArray: any) {
        console.time("label");
        const itemList = newArray ? cloneObject(newArray) : cloneObject(array);
        console.log(itemList.length)

        if (checkRemoved) {
            const removedItems: any[] = [];
            observableArray.forEach((itemObservable: any) => {
                const findItem = addRemoveByField ?
                    itemList.find((item: any) => item[addRemoveByField] === itemObservable[addRemoveByField]) :
                    itemList.find((item: any) => isEqualObject(item, itemObservable, excludeFields));

                if (!findItem) {
                    removedItems.push(itemObservable);
                }
            });

            removedItems.forEach(item => observableArray.splice(observableArray.indexOf(item), 1));
        }

        if (checkAdded) {
            const addedItems: any[] = [];
            itemList.forEach((item: any) => {
                const findItem = addRemoveByField ?
                    observableArray.find((itemObservable: any) => itemObservable[addRemoveByField] === item[addRemoveByField]) :
                    observableArray.find((itemObservable: any) => isEqualObject(itemObservable, item, excludeFields));

                if (!findItem) {
                    addedItems.push(item);
                }
            });

            addedItems.forEach(item => observableArray.push(item));
        }

        if (checkUpdate) {
            itemList.forEach((item: any, index: number) => {
                const itemObservable = observableArray.getItem(index);
                if (!isEqualObject(itemObservable, item, excludeFields)) {
                    observableArray.setItem(index, item);
                }
            });
        }
        console.timeEnd("label");
    }
 */

/* 
  function sync(newArray: any) {
        const itemList = newArray ? cloneObject(newArray) : cloneObject(array);

        if (checkRemoved) {
            const indexRemoved: number[] = [];
            observableArray.forEach((itemObservable: any, index: number) => {
                if (addRemoveByField) {
                    if (!itemList.find((item: any) => item[addRemoveByField] === itemObservable[addRemoveByField])) {
                        indexRemoved.push(index);
                    }
                } else {
                    if (!itemList.find((item: any) => isEqualObject(item, itemObservable, excludeFields))) {
                        indexRemoved.push(index);
                    }
                }
            })
            indexRemoved.forEach(index => observableArray.splice(index, 1))
        }

        if (checkAdded) {
            const indexAdd: number[] = [];
            itemList.forEach((item: any, index: number) => {
                if (addRemoveByField) {
                    if (!observableArray.find((itemObservable: any) => itemObservable[addRemoveByField] === item[addRemoveByField])) {
                        indexAdd.push(index);
                    }
                } else {
                    if (!observableArray.find((itemObservable: any) => isEqualObject(itemObservable, item, excludeFields))) {
                        indexAdd.push(index);
                    }
                }
            })
            indexAdd.forEach(index => (observableArray.splice(index, 0, itemList[index])));
        }

        if (checkUpdate) {
            const indexToUpdate: number[] = [];
            observableArray.forEach((itemObservable: any, index: number) => {
                if (!isEqualObject(itemObservable, itemList.find((item: any) => isEqualObject(item, itemObservable, excludeFields)), excludeFields)) {
                    indexToUpdate.push(index)
                }
            })
            indexToUpdate.forEach(index => (observableArray.setItem(index, itemList[index])));
        }
}*/