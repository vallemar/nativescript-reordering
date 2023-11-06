<script lang="ts" setup>
import { Color, FlexboxLayout, GridLayout, StackLayout, View } from '@nativescript/core';
import { ref } from 'nativescript-vue';
import { Habit, Periodicity } from '~/types';
import { getRandomColor } from '~/utils';
import { UUID } from '~/utils';
import PeriodicityHabit from './PeriodicityHabit.vue';
import AddHabitSteps from './AddHabitSteps.vue';
import { ColorPicker } from "@/native/ColorPicker"
import { unrefView, useEventListener } from '@nativescript-use/vue';
import Emoji from './Emoji.vue';
import { useBottomSheet } from '@nativescript-community/ui-material-bottomsheet/vue3';
import { addHabitHeightSteps } from '@/utils/mockData';
import { useHabitStore } from '~/stores/habitStore';
import dayjs from 'dayjs';
import { getTodayDayFormat } from '~/utils/dateUtils';

const emit = defineEmits(["finish"]);
const addHabitRef = ref();
const step = ref(0);
const { addItem } = useHabitStore();
const { showBottomSheet } = useBottomSheet();

const habit = ref<Habit>({
  id: UUID(),
  title: "",
  periodicity: Periodicity.Day,
  color: getRandomColor(),
  icon: "🚀",
  week: [{ date: getTodayDayFormat(), value: 1 }],
})
const colorPicker = new ColorPicker((color: Color) => {
  habit.value.color = color.hex
})
useEventListener(addHabitRef, {
  layoutChanged(args: { object: View }) {
    setTimeout(() => {
      args.object.animate({
        translate: {
          y: 0,
          x: 0
        }
      })
    }, 10);
  }
})

function pickerColor() {
  colorPicker.open(new Color(habit.value.color));
}

function updatePeriodicity(periodicity: Periodicity) {
  habit.value.periodicity = periodicity;
}

function openEmojiSheet() {
  showBottomSheet(Emoji, {
    view: unrefView(addHabitRef),
    peekHeight: 600,
    trackingScrollView: "collectionView",
    transparent: true, on: {
      select(emoji: string) {
        habit.value.icon = emoji;
      }
    }
  })
}
function selectedIndexChanged(event: { newIndex: number }) {
  step.value = event.newIndex;
  unrefView<View>(addHabitRef)?.animate({
    height: addHabitHeightSteps[step.value + 1],
    duration: 250
  })
}


function change(index: number) {
  if (index >= 0 && index <= 4) {
    step.value = index;
  }
}

function addHabit() {
  //unrefView<LottieView>(lottieRef)?.playAnimation()
  addItem(habit.value);
  emit("finish");
}
</script>

<template>
  <StackLayout top="0" verticalAlignment="bottom" originY="1" class="w-full">
    <GridLayout class="w-full bg-white shadow ios:rounded-3xl android:rounded-t-3xl pt-1" height="260" translateY="200"
      ref="addHabitRef">
      <GridLayout height="200" class="mt-4" verticalAlignment="top">
        <MDTabs @selectedIndexChanged="selectedIndexChanged" horizontalAlignment="left" verticalAlignment="top"
          :selectedIndex="step">
          <MDTabContentItem>
            <StackLayout class="px-3 py-1 ">
              <Label text="Habit title" class=" text-3xl font-bold uber text-center"></Label>
              <TextField v-model="habit.title" class="bg-gray-200 rounded-xl text-xl p-2 mt-3 "></TextField>
            </StackLayout>
          </MDTabContentItem>
          <MDTabContentItem>
            <StackLayout class="px-3 py-1 text-center">
              <Label text="Icon" class=" text-3xl uber"></Label>
              <Label :text="`${habit.icon}`" class="text-4xl mt-4 text-center" @tap="openEmojiSheet"></Label>
            </StackLayout>
          </MDTabContentItem>
          <MDTabContentItem>
            <StackLayout class="px-3 py-1 text-center">
              <Label text="Color" class=" text-3xl uber"></Label>
              <FlexboxLayout class="mt-4 justify-center">
                <Label :text="habit.icon" class="text-4xl rounded-full h-[80] w-[80] text-center " @tap="pickerColor"
                  :backgroundColor="habit.color"></Label>
              </FlexboxLayout>
            </StackLayout>
          </MDTabContentItem>
          <MDTabContentItem>
            <StackLayout class="px-3 py-1 text-center">
              <Label text="Periodicity" class=" text-3xl uber"></Label>
              <PeriodicityHabit :habit="habit" @update="updatePeriodicity" class="mt-2"></PeriodicityHabit>
            </StackLayout>
          </MDTabContentItem>
          <MDTabContentItem>
            <GridLayout>
              <!--  <LottieView ref="lottieRef" height="100%" :isUserInteractionEnabled="false" horizontalAlignment="center"
                verticalAlignment="bottom" src="~/assets/lottie/confetti.json" :loop="true" :autoPlay="false" class="">
              </LottieView> -->
              <FlexboxLayout class="px-3 py-1 text-center justify-center items-center flex-col" verticalAlignment="top">
                <Label text="Finish 🎉" class=" text-center text-3xl uber"></Label>
                <Label @tap="addHabit" text="Add" class="text-2xl text-center mt-6 text-white rounded-full px-16 h-[40]"
                  :backgroundColor="habit.color"></Label>
              </FlexboxLayout>
            </GridLayout>
          </MDTabContentItem>
        </MDTabs>
      </GridLayout>
      <AddHabitSteps @change="change" :index="step" :color="habit.color" :icon="habit.icon" horizontalAlignment="center"
        verticalAlignment="bottom"></AddHabitSteps>
    </GridLayout>
  </StackLayout>
</template>
~/views/mockData