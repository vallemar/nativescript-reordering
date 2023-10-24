<script lang="ts" setup>
import { ref, watch } from 'nativescript-vue';
import { useFadeElement } from "@nativescript-use/vue"

const prop = defineProps({ show: Boolean });

const overlayRef = ref();
const { isVisible } = useFadeElement(overlayRef);

watch(() => prop.show, () => {
  isVisible.value = prop.show;
})

</script>

<template>
  <StackLayout ref="overlayRef" height="100%" class="bg-[#20202046]"></StackLayout>
</template>