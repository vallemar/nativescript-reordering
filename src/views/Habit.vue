<script lang="ts" setup>
import { unrefView, useEventListener } from '@nativescript-use/vue';
import { Dialogs, StackLayout, isAndroid } from '@nativescript/core';
import { computed, ref, $navigateBack } from 'nativescript-vue';
import Icon from '~/components/Icon.vue';
import PeriodicityHabit from '~/components/PeriodicityHabit.vue';
import { animateView } from "@/utils/animation"
import { useHabitStore } from '~/stores/habitStore';
import { maxCountDayRange } from '@/utils/mockData';
import { Periodicity } from '~/types';
import { getTodayDayFormat } from '~/utils/dateUtils';

const { id } = defineProps({
  id: {
    type: String,
    required: true
  }
});

const { findById, getTodayHabitDayIndex, updateOrAddItemWeek, updateItem: updateItemStore, deleteItemById } = useHabitStore();
const habit = findById(id)!;
const habitCountRef = ref();

let rotations = 0;
const dayPositionInArray = ref(getTodayHabitDayIndex(habit));

const currentDayValue = computed(() => {
  if (typeof dayPositionInArray.value === "number") {
    return habit.week[dayPositionInArray.value]?.value
  } else {
    return 0
  }
});

useEventListener(habitCountRef, {
  loaded: () => applyScale(currentDayValue.value > 0)
})

function updateItem(value: number) {
  const habitDay = dayPositionInArray.value ? habit.week[dayPositionInArray.value] : { date: getTodayDayFormat(), value };
  updateOrAddItemWeek(id, habitDay, value);
  dayPositionInArray.value = typeof dayPositionInArray.value === "number" ? dayPositionInArray.value : habit.week.length - 1;
  applyScale();
}

function add() {
  if (dayPositionInArray.value == undefined || habit.week[dayPositionInArray.value].value < maxCountDayRange || (habit.week.length == 0 && currentDayValue.value + 1 <= 5)) {
    updateItem(currentDayValue.value + 1);
  }
}

function remove() {
  if (dayPositionInArray.value == undefined || habit.week[dayPositionInArray.value].value > 0 || (habit.week.length == 0 && currentDayValue.value - 1 >= 0)) {
    updateItem(currentDayValue.value - 1);
  }
}

function applyScale(plus = true) {
  const view = unrefView<StackLayout>(habitCountRef) as StackLayout;
  animateView(view, {
    scale: {
      x: currentDayValue.value * 1.2,
      y: currentDayValue.value * 1.2,
    }
  })

  rotations += plus ? 1 : -1;
  const viewRotation = isAndroid ? view : view?.getChildAt(0);
  animateView(viewRotation, {
    rotation: rotations * 180
  })
}

function updatePeriodicity(periodicity: Periodicity) {
  habit.periodicity = periodicity;
  updateItemStore(habit);
}

function removeItem() {
  Dialogs.confirm({
    title: 'Confirm delete',
    message: 'Are you sure about eliminating this habit?',
    okButtonText: 'Delete',
    cancelButtonText: 'Cancel',
  }).then((result) => {
    if (result) {
      deleteItemById(habit.id);
      $navigateBack();
    }
  })
}

</script>

<template>
  <Page actionBarHidden="true" androidStatusBarBackground="white">
    <GridLayout rows="auto, *">
      <!-- PERIOCITY HABIT SWITCH -->
      <StackLayout>
        <FlexboxLayout class=" justify-between px-3">
          <Icon icon="menu"></Icon>
          <Icon icon="delete" @tap="removeItem()"></Icon>
        </FlexboxLayout>
        <StackLayout class="mt-10">
          <Label verticalAlignment="top" horizontalAlignment="center" :text="habit?.title"
            class="font-bold text-4xl"></Label>
          <PeriodicityHabit :habit="habit" @update="updatePeriodicity"></PeriodicityHabit>
        </StackLayout>

      </StackLayout>

      <!-- HABIT ANIMATION COUNT -->
      <GridLayout row="1" class="mb-24 ">
        <FlexboxLayout verticalAlignment="middle" ref="habitCountRef" row="1" horizontalAlignment="center" height="50"
          width="50">
          <StackLayout class="rounded-2xl p-8" height="100%" width="100%" :backgroundColor="habit?.color">
          </StackLayout>
        </FlexboxLayout>
        <label :text="currentDayValue" verticalAlignment="middle" horizontalAlignment="center" class="text-2xl font-bold"
          :class="[currentDayValue === 0 ? 'text-black' : 'text-white']"></label>
      </GridLayout>

      <!-- HABIT BUTTONS -->
      <FlexboxLayout row="2" verticalAlignment="bottom" horizontalAlignment="center" class="mb-16 flex-col items-center">
        <StackLayout class="text-center" orientation="horizontal">
          <label text="Today" class="text-lg"></label>
          <Label :text="habit?.title.toLowerCase()" class="text-lg ml-1"></Label>
        </StackLayout>
        <FlexboxLayout class="bg-gray-200 rounded-2xl justify-between items-center mt-2" height="80" width="200">
          <Icon icon="add" @tap="add" width="50%"></Icon>
          <label class="border-r-2"></label>
          <Icon icon="remove" @tap="remove" width="50%"></Icon>
        </FlexboxLayout>
      </FlexboxLayout>
    </GridLayout>
  </Page>
</template>
~/views/mockData