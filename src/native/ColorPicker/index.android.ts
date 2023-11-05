import { Color, Utils } from "@nativescript/core";

@NativeClass()
export class ColorPicker {
    onChangeColor: (color: Color) => void = null!

    constructor(onChangeColor: (color: Color) => void) {
        this.onChangeColor = onChangeColor;
    }

    open(color: Color) {
        try {
            const builder = new com.skydoves.colorpickerview.ColorPickerDialog.Builder(Utils.android.getCurrentActivity())
                .setTitle("ColorPicker Dialog")
                .setPreferenceName("MyColorPickerDialog")
                //.setInitialColor(new Color("blue").android)

                .setPositiveButton("OK",
                    new com.skydoves.colorpickerview.listeners.ColorEnvelopeListener({
                        onColorSelected(colorEnvelope: com.skydoves.colorpickerview.ColorEnvelope, fromUser boolean) {
                            console.log(colorEnvelope.getColor())
                            console.log("#" + colorEnvelope.getHexCode())
                            console.log("#" + java.lang.Integer.toHexString(colorEnvelope.getColor()).substring(2))
                            console.log("#" + java.lang.Integer.toHexString(colorEnvelope.getColor()))
                            //   if (onChangeColor)
                            //   onChangeColor(new Color("#" + java.lang.Integer.toHexString(colorEnvelope.getColor()).substring(2));
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
