<script lang="ts" setup>
import { StackLayout, View } from '@nativescript/core';
import { ref, watch } from "nativescript-vue";
import Icon from '@/components/Icon.vue';
import Menu from '@/components/Menu.vue';
import ItemWeek from '@/components/ItemWeek.vue';
import Overlay from '@/components/Overlay.vue';
import HabitDetails from '@/views/Habit.vue';
import { useHabitStore } from '@/stores/habitStore';
import { usePopover } from '@/composables/usePopover';
import { HorizontalPosition } from "@nativescript-community/ui-popover"
import { Habit, Palette, Periodicity } from '~/types';
import type { CollectionView } from '@nativescript-community/ui-collectionview';
import type { CollectionViewWithSwipeMenu } from '@nativescript-community/ui-collectionview-swipemenu';
import AddHabit from '~/components/AddHabit.vue';
import { ANIMATION, SHADE_COVER } from '@/utils/rootLayoutUtils';
import { unrefView, useColorPalette, useDark, useRootLayout, useSyncObservableArray } from '@nativescript-use/vue';
import { cloneObject } from '@/utils';
import Undo from '~/components/Undo.vue';
import { storeToRefs } from 'pinia';
import { collectionViewUtils } from '~/utils/collectionViewUtils';
import { getShowDays } from '~/utils/dateUtils';
import { useBottomSheet } from '@nativescript-community/ui-material-bottomsheet/vue3';

const collectionViewRef = ref();
const habitStore = useHabitStore();
const { habits: habitRef } = storeToRefs(habitStore);
const { clone, findIndexHabitDay, deleteItemById, addItem, findIndexById } = habitStore;
const { observableArray: items } = useSyncObservableArray<Habit>(
  habitRef,
  { addRemoveByField: "id", watchUpdates: true }
);
const { isPresented: isPresentedMenu, open: openMenu } = usePopover(Menu, {
  horizPos: HorizontalPosition.ALIGN_LEFT
});
const { palette } = useColorPalette<string, Palette>()
const isDark = useDark();
watch(isDark, () => {
  unrefView<CollectionView>(collectionViewRef)?.refresh();
})
const showDays = getShowDays();

function onItemReordered(e: any) {
  const view = (e.view as StackLayout);
  view.opacity = 1;
  clone(cloneObject(items));
}

function onItemReorderStarting(e: any) {
  const view = (e.view as View);
  view.opacity = 0.7;
}

function addHabit() {
  const { showBottomSheet, closeBottomSheet } = useBottomSheet();
  showBottomSheet(AddHabit, {
    view: unrefView<View>(collectionViewRef),
    transparent: true,
    ignoreBottomSafeArea: true,
    ignoreTopSafeArea: true,
    ignoreKeyboardHeight: false,
    animated: true,
    on: {
      finish: () => {
        closeBottomSheet();
      }
    },
  })

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
          close();
        }
      },
      closeTimerMillis: 4000
    })
    show();
  }, 200);
}

</script>

<template>
  <Frame :backgroundColor="palette?.colors.bg">
    <Page actionBarHidden="true" :androidStatusBarBackground="palette.colors.bg">
      <RootLayout>
        <GridLayout>
          <StackLayout>
            <!-- HEADER -->
            <FlexboxLayout class="justify-between mx-2">
              <Icon icon="more_horiz" @tap="(event) => openMenu(event.object)"></Icon>
              <Icon icon="add" @tap="addHabit"></Icon>
            </FlexboxLayout>

            <!-- HEADER -->
            <GridLayout columns="*,  155" height="70" class="mx-2">
              <Label text="Habits" class="font-bold text-2xl"></Label>
              <!--  <GridLayout paddingRight="5" col="2" horizontalAlignment="right" columns="30,30,30,30,30">
                <Label class="text-gray-400 text-right" :text="showDays[4].dayWeekName"></Label>
                <Label col="1" class="text-gray-400 text-right" :text="showDays[3].dayWeekName"></Label>
                <Label col="2" class="text-gray-400 text-right" :text="showDays[2].dayWeekName"></Label>
                <Label col="3" class="text-gray-400 text-right" :text="showDays[1].dayWeekName"></Label>
                <Label col="4" class="text-gray-400 text-right" :text="showDays[0].dayWeekName"></Label>
              </GridLayout> -->
            </GridLayout>

            <StackLayout v-if="habitRef.length === 0">
              <LottieView ref="emptyAnimationRef" height="150" horizontalAlignment="center"
                src="~/assets/lottie/empty.json" :loop="true" :autoPlay="true" class="">
              </LottieView>
              <Label text="Doesn't have any habits yet" class="text-center" />
            </StackLayout>
            <!-- ITEM LIST -->
            <CollectionView iosOverflowSafeArea="true" ref="collectionViewRef" class="px-1" height="100%" :items="items"
              rowHeight="200" colWidth="50%" reorderEnabled @itemReorderStarting="onItemReorderStarting"
              @itemReordered="onItemReordered" :reorderLongPressEnabled="true" :autoReloadItemOnLayout="true">
              <template #default="{ item, index }">
                <SwipeMenu rightSwipeDistance="100" :translationFunction="collectionViewUtils.drawerTranslationFunction"
                  :startingSide="item.startingSide">
                  <StackLayout ~mainContent class="mx-1 bg-secondary rounded-2xl  py-3 my-1 "
                    @tap="$navigateTo(HabitDetails, { props: { id: item.id } })" ignoreTouchAnimation="true">
                    <Label :text="item.icon" :backgroundColor="item.color" class="rounded-full text-center text-4xl"
                      height="68" width="68" />
                    <StackLayout class="ml-2 flex-col  mt-1">
                      <Label :text="item.title" class="font-bold text-base text-center" />
                      <Label :text="item.periodicity === Periodicity.Day ? 'Every day' : 'Every Week'"
                        class="text-gray-400 text-base mt-1 text-center" />
                    </StackLayout>
                    <GridLayout horizontalAlignment="center" columns="30,30,30,30,30">
                      <ItemWeek :size="getValueNormalized(4, item)" :color="item.color">
                      </ItemWeek>
                      <ItemWeek col="1" :size="getValueNormalized(3, item)" :color="item.color"></ItemWeek>
                      <ItemWeek col="2" :size="getValueNormalized(2, item)" :color="item.color"></ItemWeek>
                      <ItemWeek col="3" :size="getValueNormalized(1, item)" :color="item.color"></ItemWeek>
                      <ItemWeek col="4" :size="getValueNormalized(0, item)" :color="item.color"></ItemWeek>
                    </GridLayout>

                  </StackLayout>
                  <Stacklayout ~rightDrawer orientation="horizontal" width="70" class="text-center">
                    <Icon icon="delete" class="mr-6" @tap="removeItem(item)"></Icon>
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
