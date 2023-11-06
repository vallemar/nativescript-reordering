<script lang="ts" setup>
import { ObservableArray, View } from '@nativescript/core';
import { ref } from "nativescript-vue";
import Icon from '@/components/Icon.vue';
import Menu from '@/components/Menu.vue';
import ItemWeek from '@/components/ItemWeek.vue';
import Overlay from '@/components/Overlay.vue';
import HabitDetails from '@/views/Habit.vue';
import { useHabitStore } from '@/stores/habitStore';
import { usePopover } from '~/usePopover';
import { HorizontalPosition } from "@nativescript-community/ui-popover"
import { Habit, Periodicity } from '~/types';
import type { CollectionView } from '@nativescript-community/ui-collectionview';
import type { CollectionViewWithSwipeMenu } from '@nativescript-community/ui-collectionview-swipemenu';
import AddHabit from '~/components/AddHabit.vue';
import { ANIMATION, SHADE_COVER } from '~/mockData';
import { unrefView, useRootLayout } from '@nativescript-use/vue';
import { cloneObject, getShowDays, isEqualObject } from '@/utils';
import Undo from '~/components/Undo.vue';
import { StackLayout } from '@akylas/nativescript';
import { useSyncObservableArray } from '~/useSyncObservableArray';
import { storeToRefs } from 'pinia';

const collectionViewRef = ref();
const addHabitStepIndex = ref(0);
const habitStore = useHabitStore();
const { habits: habitRef } = storeToRefs(habitStore);
const { clone, findIndexHabitDay, deleteItemById, addItem, findIndexById } = habitStore;
const { isPresented: isPresentedMenu, open: openMenu } = usePopover(Menu, {
  horizPos: HorizontalPosition.ALIGN_LEFT
});

const items = new ObservableArray(cloneObject(habitRef.value));
const { sync } = useSyncObservableArray(habitRef.value as any, items, { addRemoveByField: "id" });
const showDays = getShowDays();

function syncData() {
  sync(habitRef.value as any)
}

function onItemReordered(e: any) {
  const view = (e.view as StackLayout);
  view.opacity = 1;
  clone(cloneObject(items));
  syncData();
}

function onItemReorderStarting(e: any) {
  const view = (e.view as View);
  view.opacity = 0.7;
}

function addHabit() {
  addHabitStepIndex.value = 1;
  const { show, close } = useRootLayout(AddHabit, {
    rootLayoutOption: {
      shadeCover: SHADE_COVER,
      animation: ANIMATION("noAnimation"),
    },
    on: {
      finish: () => {
        syncData();
        close();
      }
    },
  })
  show();
}

const getValueNormalized = (indexDate: number, habit: Habit) => {
  return (habit?.normalizedWeek && habit?.normalizedWeek[findIndexHabitDay(showDays[indexDate].date, habit)?.index ?? -1]?.value) ?? 0
}

function removeItem(habit: Habit) {
  const swipeMenu = unrefView<CollectionViewWithSwipeMenu>(collectionViewRef);
  const currentIndex = findIndexById(habit.id);
  swipeMenu?.closeCurrentMenu();
  setTimeout(() => {
    deleteItemById(habit.id);
    syncData();
    const { show, close } = useRootLayout(Undo, {
      props: {
        bg: habit.color
      },
      rootLayoutOption: {
        shadeCover: {
          opacity: 0,
          tapToClose: false
        },
        animation: ANIMATION("bottom"),
      },
      on: {
        undo: () => {
          addItem(habit, currentIndex);
          syncData();
          close();
        }
      },
      closeTimerMillis: 4000
    })
    setTimeout(() => {
      show();
    }, 300);
  }, 200);
}
function drawerTranslationFunction(side: string, width: number, value: number, delta: number, progress: number) {
  const result = {
    mainContent: {
      translateX: side === 'right' ? -delta : delta
    },
    backDrop: {
      translateX: side === 'right' ? -delta : delta,
      opacity: progress * 0.00001
    }
  } as any;
  return result;
}
</script>

<template>
  <Frame>
    <Page actionBarHidden="true" androidStatusBarBackground="white" @navigatingTo="syncData">
      <RootLayout>
        <GridLayout>
          <StackLayout>
            <!-- HEADER -->
            <FlexboxLayout class="justify-between mx-2">
              <Icon icon="more_horiz" @tap="(event) => openMenu(event.object)"></Icon>
              <Icon icon="add" @tap="addHabit"></Icon>
            </FlexboxLayout>

            <!-- HEADER weekdays -->
            <GridLayout columns="*,  155" height="70" class="mx-2">
              <Label text="Habits" class="font-bold text-2xl"></Label>
              <GridLayout paddingRight="5" col="2" horizontalAlignment="right" columns="30,30,30,30,30">
                <Label class="text-gray-400 text-right" :text="showDays[4].dayName"></Label>
                <Label col="1" class="text-gray-400 text-right" :text="showDays[3].dayName"></Label>
                <Label col="2" class="text-gray-400 text-right" :text="showDays[2].dayName"></Label>
                <Label col="3" class="text-gray-400 text-right" :text="showDays[1].dayName"></Label>
                <Label col="4" class="text-gray-400 text-right" :text="showDays[0].dayName"></Label>
              </GridLayout>
            </GridLayout>

            <!-- ITEM LIST -->
            <CollectionView ref="collectionViewRef" height="100%" :items="items" rowHeight="100" reorderEnabled
              @itemReorderStarting="onItemReorderStarting" @itemReordered="onItemReordered"
              :reorderLongPressEnabled="true" :autoReloadItemOnLayout="true">
              <template #default="{ item, index }">
                <SwipeMenu rightSwipeDistance="500" :translationFunction="drawerTranslationFunction"
                  :startingSide="item.startingSide">
                  <StackLayout ~mainContent class="mx-2 bg-white"
                    @tap="$navigateTo(HabitDetails, { props: { id: item.id } })" ignoreTouchAnimation="true">
                    <GridLayout paddingLeft="5" columns="68, *, 155" class="rounded-2xl">
                      <Label :text="item.icon" :backgroundColor="item.color" class="rounded-full text-center text-4xl"
                        height="68" width="68" />
                      <FlexboxLayout col="1" class="ml-2 flex-col justify-center">
                        <Label :text="item.title" class="font-bold text-base" />
                        <Label :text="item.periodicity === Periodicity.Day ? 'Every day' : 'Every Week'"
                          class="text-gray-400 text-base mt-1" />
                      </FlexboxLayout>
                      <GridLayout paddingRight="5" col="2" horizontalAlignment="right" columns="30,30,30,30,30">
                        <ItemWeek :size="getValueNormalized(4, item)" :color="item.color">
                        </ItemWeek>
                        <ItemWeek col="1" :size="getValueNormalized(3, item)" :color="item.color"></ItemWeek>
                        <ItemWeek col="2" :size="getValueNormalized(2, item)" :color="item.color"></ItemWeek>
                        <ItemWeek col="3" :size="getValueNormalized(1, item)" :color="item.color"></ItemWeek>
                        <ItemWeek col="4" :size="getValueNormalized(0, item)" :color="item.color"></ItemWeek>
                      </GridLayout>
                    </GridLayout>
                  </StackLayout>
                  <Stacklayout ~rightDrawer orientation="horizontal" width="100" class="text-center">
                    <Icon icon="delete" class="mr-8" @tap="removeItem(item)"></Icon>
                  </Stacklayout>
                </SwipeMenu>
              </template>
            </CollectionView>
          </StackLayout>
          <Overlay :show="isPresentedMenu"></Overlay>
          <!--      <AddHabit horizontalAlignment="left" verticalAlignment="bottom"></AddHabit> -->
          <!--      <AddHabit horizontalAlignment="left" verticalAlignment="bottom"></AddHabit> -->
          <!--   <BottomSheet  v-model="addHabitStepIndex" :gestureEnabled="false" height="100%" width="100%" horizontalAlignment="left" verticalAlignment="bottom" 
          :steps="addHabitHeightSteps">
                 <AddHabit @next="addHabitNext" @back="addHabitBack" ~bottomSheet></AddHabit>
        </BottomSheet> -->
        </GridLayout>
      </RootLayout>
    </Page>

  </Frame>
</template>
