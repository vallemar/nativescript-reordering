import { showPopover, PopoverOptions } from "@nativescript-community/ui-popover";
import { useColorPalette } from "@nativescript-use/vue";
import { Color, StackLayout, View } from "@nativescript/core";
import { createNativeView, ref } from "nativescript-vue";
import { Palette } from "~/types";

const popovers: any[] = []

export function usePopover(component?: any, options?: Omit<PopoverOptions, "anchor">) {
    const isOpen = ref();
    const isPresented = ref();
    const { palette } = useColorPalette<string, Palette>();

    function open(viewTarget: View) {
        if (!isOpen.value) {
            const node = createNativeView(component);
            node.mount();
            const view = node.nativeView;
            const stackLayout = new StackLayout();
            stackLayout.addChild(view);
            isOpen.value, isPresented.value = true;

            const { close } = showPopover(stackLayout,
                Object.assign({
                    anchor: viewTarget,
                    onDismiss: () => (isOpen.value, isPresented.value = false),
                    onTapOutside: () => (isPresented.value = false),
                    backgroundColor: new Color(palette.value.colors.bgSecondary)
                }, options)
            );
            popovers.push(close);
        }
    }

    function close() {
        if (popovers.length > 0) {
            popovers[popovers.length - 1]();
            popovers.pop();
        }
    }

    return {
        isOpen,
        isPresented,
        open,
        close
    }
}