import { showPopover, PopoverOptions } from "@nativescript-community/ui-popover";
import { Color, StackLayout, View } from "@nativescript/core";
import { createNativeView, ref } from "nativescript-vue";


export function usePopover(component: any, options?: Omit<PopoverOptions, "anchor">) {
    const isOpen = ref()
    const isPresented = ref()

    function open(viewTarget: View) {
        if (!isOpen.value) {
            const node = createNativeView(component);
            node.mount();
            const view = node.nativeView;
            const stackLayout = new StackLayout();
            stackLayout.addChild(view);
            isOpen.value, isPresented.value = true;

            showPopover(stackLayout,
                Object.assign({
                    anchor: viewTarget,
                    onDismiss: () => (isOpen.value, isPresented.value = false),
                    onTapOutside: () => (isPresented.value = false),
                    backgroundColor: new Color("white")
                }, options)
            );
        }
    }

    return {
        isOpen,
        isPresented,
        open
    }
}