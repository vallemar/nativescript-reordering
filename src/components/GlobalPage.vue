<script lang="ts" setup>
import { useColorPalette } from '@nativescript-use/vue';
import { Palette } from '~/types';

const emits = defineEmits(["navigatingTo"])
const { palette } = useColorPalette<string, Palette>()
</script>

<template>
  <Page @navigatingTo="() => emits('navigatingTo')" actionBarHidden="true"
    :androidStatusBarBackground="palette.colors.bg">

    <!--  <Page actionBarHidden="true" :androidStatusBarBackground="palette.colors.bg" > -->
    <slot></slot>
  </Page>
</template>