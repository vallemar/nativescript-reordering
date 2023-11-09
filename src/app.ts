import { createApp, registerElement } from 'nativescript-vue';
import Home from './views/Home.vue';
import CollectionView from '@nativescript-community/ui-collectionview/vue3';
import { createPinia } from 'pinia';
import TabsPlugin from '@nativescript-community/ui-material-tabs/vue';
import LottieView from '@nativescript-community/ui-lottie/vue';
import { habitRepository } from './repositories/habitRepository';
import { habitUtils } from './utils/habitUtils';
import { mockData } from './utils/mockData';
import SwipeMenuPlugin from '@nativescript-community/ui-collectionview-swipemenu/vue3';
import { BottomSheetPlugin } from '@nativescript-community/ui-material-bottomsheet/vue3';
import { install as installBottomSheet } from "@nativescript-community/ui-material-bottomsheet";
import { useColorMode, useColorPalette } from '@nativescript-use/vue';
import "@/utils/touchManagerUtils"
installBottomSheet();

useColorMode();
useColorPalette({
  palettes: [
    { theme: "light", colors: { bg: "#FFFFFF", bgSecondary: "#f5f5f5e5", textColor: "black" } },
    { theme: "dark", colors: { bg: "#1C2128", bgSecondary: "#21272f", textColor: "#white" } }
  ]
});

habitRepository.removeAll()
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





/* registerElement('BottomSheet', () => require('@nativescript-community/ui-persistent-bottomsheet').PersistentBottomSheet, {
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
}); */