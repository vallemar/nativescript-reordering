import { Color, Utils } from "@nativescript/core";

@NativeClass()
export class ColorPicker {
    onChangeColor: (color: Color) => void = null!

    constructor(onChangeColor: (color: Color) => void) {
        this.onChangeColor = onChangeColor;
    }

    open(color: Color) {
        try {
            const self = this;
            const builder = new com.skydoves.colorpickerview.ColorPickerDialog.Builder(Utils.android.getCurrentActivity())
                .setTitle("ColorPicker Dialog")
                .setPreferenceName("MyColorPickerDialog")
                .setPositiveButton("OK",
                    new com.skydoves.colorpickerview.listeners.ColorEnvelopeListener({
                        onColorSelected(colorEnvelope: com.skydoves.colorpickerview.ColorEnvelope, fromUser: boolean) {
                            if (self.onChangeColor) {
                                const color = java.lang.Integer.parseInt(colorEnvelope.getHexCode(), 16);
                                const red = (color >> 16) & 0xFF;
                                const green = (color >> 8) & 0xFF;
                                const blue = (color) & 0xFF;
                                const alpha = (color >> 24) & 0xFF;
                                self.onChangeColor(new Color(alpha, red, green, blue, "rgb"));
                            }
                        }
                    }))
                .setNegativeButton("Cancel",
                    new android.content.DialogInterface.OnClickListener({
                        onClick(dialogInterface, i) {
                            dialogInterface.dismiss();
                        }
                    }))
                .attachAlphaSlideBar(true) // the default value is true.
                .attachBrightnessSlideBar(true)  // the default value is true.
                .setBottomSpace(12) // set a bottom space between the last slidebar and buttons.
                ;
            const colorPickerView = builder.getColorPickerView();
            const bubbleFlag = new com.skydoves.colorpickerview.flag.BubbleFlag(Utils.android.getCurrentActivity());
            bubbleFlag.setFlagMode(com.skydoves.colorpickerview.flag.FlagMode.FADE);
            colorPickerView.setFlagView(bubbleFlag);
            builder.show()
        } catch (error) {
            console.log(error);
        }
    }
}
