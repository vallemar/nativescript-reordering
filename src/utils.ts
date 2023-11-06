import { toRaw } from "nativescript-vue";
import { Habit, HabitDay } from "./types";
import dayjs from 'dayjs'

export function getRandomColor() {
  return `hsla(${~~(360 * Math.random())}, 70%,  72%, 0.8)`;
}

export function UUID() { // Public Domain/MIT
  var d = new Date().getTime();//Timestamp
  var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16;//random number between 0 and 16
    if (d > 0) {//Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {//Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

export function buildRandomDayWeek() {
  const habitDays: HabitDay[] = [];
  for (let index = 4; index >= 0; index--) {
    habitDays.push({
      date: dayjs().subtract(index, 'day').format('YYYY-MM-DD'),
      value: Math.floor(Math.random() * (5 - 1 + 1) + 1)
    })
  }
  return habitDays;
}

export function isEqualObject(a: any, b: any){
  return JSON.stringify(a) === JSON.stringify(b);
}

export function cloneObject(object: any){
  return JSON.parse(JSON.stringify(toRaw(object)));
}