import { createApp } from 'nativescript-vue';
import Home from './views/Home.vue';
import CollectionView from '@nativescript-community/ui-collectionview/vue3';
import { CoreTypes, TouchManager } from '@nativescript/core'
import { createPinia } from 'pinia';

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

const pinia = createPinia()

const app = createApp(Home);
// @ts-ignore
app.use(pinia);
app.use(CollectionView);

app.start();
