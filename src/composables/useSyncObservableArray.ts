import { ObservableArray } from "@nativescript/core";
import { toRaw, watch, isReactive, isRef, ref, Ref } from "nativescript-vue";

const baseExcludeCompareFields = { startingSide: null, menuOpened: null };

export function useSyncObservableArray<T>(arrayRef: Ref<T[]> | T[],
    options: {
        addRemoveByField: string,
        excludeCompareFields?: string[],
        watchUpdates?: boolean,
        checkRemoved?: boolean,
        checkAdded?: boolean,
        checkUpdate?: boolean,
    } = { addRemoveByField: "" }) {
    const { checkRemoved = true, checkAdded = true, checkUpdate = true, excludeCompareFields = undefined, addRemoveByField } = options;
    const excludeFields = { ...baseExcludeCompareFields, ...excludeCompareFields?.reduce((a: any, b) => { a[b] = null; return a }, {}) };
    console.log(addRemoveByField);
    watch(arrayRef, sync, { deep: true })

    const observableArray = new ObservableArray<T>(getClearArray(arrayRef));
    /*    let length = arrayRef.length;
       if (options?.watchUpdates && (isReactive(arrayRef) || isRef(arrayRef))) {
           watch(arrayRef, (newValue, oldValue) => {
   
   
               if (length === newValue.length) {
                   //   sync();
               } else {
                   length = newValue.length;
               }
           }, { deep: true })
   
           watch(
               () => arrayRef.length,
               (newValue, oldValue) => {
                   console.log("CALLED");
   
                   console.log(newValue);
                   console.log(oldValue);
                   console.time("TIME_[useSyncObservableArray.length]");
                   if (newValue > oldValue) {
   
                       runAdded(cloneObject(arrayRef));
                   } else {
                       runRemoved(cloneObject(arrayRef));
                   }
                   console.timeEnd("TIME_[useSyncObservableArray.length]");
   
               }
           )
       } */
    /*  function syncdd(newArray?: any) {
         console.time("TIME_[useSyncObservableArray]");
         const itemList = newArray ? cloneObject(newArray) : cloneObject(arrayRef);
         console.log(itemList.length)
         const indexRemoved: number[] = [];
         const indexAdd: number[] = [];
         const indexToUpdate: number[] = [];
         itemList.forEach((item: any, index: number) => {
             if (checkRemoved) {
                 const findIndex = observableArray.findIndex((itemObservable: any) => item[addRemoveByField] === itemObservable[addRemoveByField])
                 if (findIndex != -1) {
                     indexRemoved.push(findIndex);
                 }
             }
 
             if (checkAdded) {
                 const findIndex = observableArray.findIndex((itemObservable: any) => item[addRemoveByField] === itemObservable[addRemoveByField])
                 if (findIndex != -1) {
                     indexRemoved.push(findIndex);
                 }
             }
 
             if (checkUpdate) {
                 const itemObservable = observableArray.getItem(index);
                 if (!isEqualObject(itemObservable, item, excludeFields)) {
                     indexToUpdate.push(index);
                 }
             }
         });
         indexAdd.forEach(index => (observableArray.splice(index, 0, itemList[index])));
         indexAdd.forEach(index => (observableArray.splice(index, 0, itemList[index])));
 
         indexRemoved.forEach(index => observableArray.splice(index, 1));
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
         console.timeEnd("TIME_[useSyncObservableArray]");
     } */
    function sync(newArray?: Ref<T[]> | T[]) {
        console.time("TIME_[useSyncObservableArray]");
        const itemList = newArray ? getClearArray(newArray) : getClearArray(arrayRef);
        console.log(itemList.length)

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
        console.timeEnd("TIME_[useSyncObservableArray]");
    }

    function runUpdates(itemList: any[]) {
        if (checkUpdate) {
            itemList.forEach((item: any, index: number) => {
                const itemObservable = observableArray.getItem(index);
                if (!isEqualObject(itemObservable, item, excludeFields)) {
                    observableArray.setItem(index, item);
                }
            });
        }

    }
    function runAdded(itemList: any[]) {
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
    }
    function runRemoved(itemList: any[]) {
        console.log("runRemoved");

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
    }

    /* function syncs(newArray?: any) {
        console.time("TIME_[useSyncObservableArray]");
        const itemList = newArray ? cloneObject(newArray) : cloneObject(arrayRef);
        console.log(itemList.length)

        runRemoved(checkRemoved, observableArray, addRemoveByField!, itemList, excludeFields);
        runAdded(checkAdded, observableArray, addRemoveByField!, itemList, excludeFields);
        runUpdates(checkUpdate, observableArray, itemList, excludeFields);

        console.timeEnd("TIME_[useSyncObservableArray]");
    } */

    return {
        sync,
        observableArray
    }
}

function getClearArray<T>(array: Ref<T[]> | T[]) {
    return cloneObject(extractArray(array));
  }
  
  function extractArray<T>(array: Ref<T[]> | T[]) {
    return isRef(array) ? array.value : array;
  }
export function isEqualObject(a: any, b: any, excludeFields: any) {
    const aObject = { ...a, ...excludeFields };
    const bObject = { ...b, ...excludeFields };
    return JSON.stringify(aObject) === JSON.stringify(bObject);
}

export function cloneObject(object: any) {
    return JSON.parse(JSON.stringify(toRaw(object)));
}