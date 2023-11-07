import { createApp, registerElement } from 'nativescript-vue';
import Home from './views/Home.vue';
import CollectionView from '@nativescript-community/ui-collectionview/vue3';
import { CoreTypes, TouchManager } from '@nativescript/core'
import { createPinia } from 'pinia';
import TabsPlugin from '@nativescript-community/ui-material-tabs/vue';
import LottieView from '@nativescript-community/ui-lottie/vue';
import { habitRepository } from './repositories/habitRepository';
import { habitUtils } from './utils/habitUtils';
import { mockData } from './utils/mockData';
import SwipeMenuPlugin from '@nativescript-community/ui-collectionview-swipemenu/vue3';
import { BottomSheetPlugin } from '@nativescript-community/ui-material-bottomsheet/vue3';
import { install as installBottomSheet } from "@nativescript-community/ui-material-bottomsheet";
import '@formatjs/intl-getcanonicallocales/polyfill';
import '@formatjs/intl-locale/polyfill';
import '@formatjs/intl-pluralrules/polyfill';
import "@formatjs/intl-numberformat/polyfill";

// Locale data for en
import "@formatjs/intl-pluralrules/locale-data/en";
import "@formatjs/intl-numberformat/locale-data/en";
(global as any).window = {
  // @ts-ignore
  requestAnimationFrame(callback: any) {
    return global.requestAnimationFrame(callback);
  }
};
registerElement("Canvas", () => require("@nativescript/canvas").Canvas)


installBottomSheet();

registerElement('BottomSheet', () => require('@nativescript-community/ui-persistent-bottomsheet').PersistentBottomSheet, {
  model: {
    prop: 'stepIndex',
    event: 'stepIndexChange',
  },
  overwriteExisting: true,
  // @ts-ignore
  nodeOps: {
    insert(child, parent) {
      if (child.nativeView['~bottomSheet'] === '') {
        parent.nativeView.bottomSheet = child.nativeView;
      }
    }
  }
});

TouchManager.enableGlobalTapAnimations = true
TouchManager.animations = {
  down: {
    scale: { x: 0.95, y: 0.95 },
    duration: 200,
    curve: CoreTypes.AnimationCurve.easeInOut,
  },
  up: {
    scale: { x: 1, y: 1 },
    duration: 200,
    curve: CoreTypes.AnimationCurve.easeInOut,
  },
}
habitRepository.removeAll();
if (habitRepository.findAll().length === 0) {
  console.log("ADDING ITEMS TO STORAGE");
  habitRepository.saveAll(habitUtils.buildNormalizedWeek(mockData));
}

const pinia = createPinia();
const app = createApp(Home);
// @ts-ignore
app.use(pinia);
app.use(CollectionView);
app.use(TabsPlugin);
app.use(BottomSheetPlugin);
app.use(LottieView);
app.use(SwipeMenuPlugin);

app.start();
