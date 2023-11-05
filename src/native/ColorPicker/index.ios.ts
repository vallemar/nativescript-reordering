import { Color, Utils } from "@nativescript/core";

@NativeClass()
export class ColorPicker
    extends NSObject
    implements UIColorPickerViewControllerDelegate {
    static ObjCProtocols = [UIColorPickerViewControllerDelegate];

    onChangeColor: (color: Color) => void = null!

    constructor(onChangeColor: (color: Color) => void) {
        super();
        this.onChangeColor = onChangeColor;
    }

    open(color: Color) {
        const picker = UIColorPickerViewController.alloc().init();
        const colorDelegate = this;
        picker.delegate = colorDelegate;
        picker.selectedColor = color.ios;
        Utils.ios
            .getRootViewController()
            .presentViewControllerAnimatedCompletion(picker, true, null!);
    }

    colorPickerViewControllerDidFinish(
        viewController: UIColorPickerViewController
    ) {
        console.log(
            'DidFinish:',
            Color.fromIosColor(viewController.selectedColor).hex
        );

        if (this.onChangeColor)
            this.onChangeColor(Color.fromIosColor(viewController.selectedColor))

    }

    colorPickerViewControllerDidSelectColorContinuously(
        viewController: UIColorPickerViewController,
        color: UIColor,
        continuously: boolean
    ) {
        console.log(
            'DidSelectColor:',
            Color.fromIosColor(viewController.selectedColor).hex,
            'continuously?',
            continuously
        );
    }
}
