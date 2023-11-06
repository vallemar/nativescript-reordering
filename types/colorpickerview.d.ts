/// <reference path="android-declarations.d.ts"/>

declare module com {
	export module skydoves {
		export module colorpickerview {
			export class ActionMode {
				public static class: java.lang.Class<com.skydoves.colorpickerview.ActionMode>;
				public static ALWAYS: com.skydoves.colorpickerview.ActionMode;
				public static LAST: com.skydoves.colorpickerview.ActionMode;
				public static values(): androidNative.Array<com.skydoves.colorpickerview.ActionMode>;
				public static valueOf(name: string): com.skydoves.colorpickerview.ActionMode;
			}
		}
	}
}

declare module com {
	export module skydoves {
		export module colorpickerview {
			export class AlphaTileView {
				public static class: java.lang.Class<com.skydoves.colorpickerview.AlphaTileView>;
				public constructor(context: globalAndroid.content.Context, attrs: globalAndroid.util.AttributeSet, defStyleAttr: number, defStyleRes: number);
				public constructor(context: globalAndroid.content.Context, attrs: globalAndroid.util.AttributeSet);
				public onSizeChanged(this_: number, width: number, height: number, oldWidth: number): void;
				public setPaintColor(color: number): void;
				public constructor(context: globalAndroid.content.Context);
				public setBackgroundColor(color: number): void;
				public constructor(context: globalAndroid.content.Context, attrs: globalAndroid.util.AttributeSet, defStyleAttr: number);
				public onDraw(canvas: globalAndroid.graphics.Canvas): void;
			}
		}
	}
}

declare module com {
	export module skydoves {
		export module colorpickerview {
			export class ColorEnvelope {
				public static class: java.lang.Class<com.skydoves.colorpickerview.ColorEnvelope>;
				public getHexCode(): string;
				public getColor(): number;
				public getArgb(): androidNative.Array<number>;
				public constructor(color: number);
			}
		}
	}
}

declare module com {
	export module skydoves {
		export module colorpickerview {
			export class ColorHsvPalette {
				public static class: java.lang.Class<com.skydoves.colorpickerview.ColorHsvPalette>;
				public draw(canvas: globalAndroid.graphics.Canvas): void;
				public setColorFilter(colorFilter: globalAndroid.graphics.ColorFilter): void;
				public constructor(resources: globalAndroid.content.res.Resources, bitmap: globalAndroid.graphics.Bitmap);
				public setAlpha(alpha: number): void;
				public getOpacity(): number;
			}
		}
	}
}

declare module com {
	export module skydoves {
		export module colorpickerview {
			export class ColorPickerDialog {
				public static class: java.lang.Class<com.skydoves.colorpickerview.ColorPickerDialog>;
				public constructor(context: globalAndroid.content.Context);
			}
			export module ColorPickerDialog {
				export class Builder {
					public static class: java.lang.Class<com.skydoves.colorpickerview.ColorPickerDialog.Builder>;
					public setSingleChoiceItems(adapter: globalAndroid.widget.ListAdapter, checkedItem: number, listener: globalAndroid.content.DialogInterface.OnClickListener): com.skydoves.colorpickerview.ColorPickerDialog.Builder;
					public setTitle(title: string): com.skydoves.colorpickerview.ColorPickerDialog.Builder;
					public setTitle(titleId: number): com.skydoves.colorpickerview.ColorPickerDialog.Builder;
					public getColorPickerView(): com.skydoves.colorpickerview.ColorPickerView;
					public setMultiChoiceItems(cursor: globalAndroid.database.Cursor, isCheckedColumn: string, labelColumn: string, listener: globalAndroid.content.DialogInterface.OnMultiChoiceClickListener): com.skydoves.colorpickerview.ColorPickerDialog.Builder;
					public setCancelable(cancelable: boolean): com.skydoves.colorpickerview.ColorPickerDialog.Builder;
					public setOnCancelListener(onCancelListener: globalAndroid.content.DialogInterface.OnCancelListener): com.skydoves.colorpickerview.ColorPickerDialog.Builder;
					public setMessage(messageId: number): com.skydoves.colorpickerview.ColorPickerDialog.Builder;
					public setColorPickerView(colorPickerView: com.skydoves.colorpickerview.ColorPickerView): com.skydoves.colorpickerview.ColorPickerDialog.Builder;
					public setSingleChoiceItems(cursor: globalAndroid.database.Cursor, checkedItem: number, labelColumn: string, listener: globalAndroid.content.DialogInterface.OnClickListener): com.skydoves.colorpickerview.ColorPickerDialog.Builder;
					public setSingleChoiceItems(items: androidNative.Array<string>, checkedItem: number, listener: globalAndroid.content.DialogInterface.OnClickListener): com.skydoves.colorpickerview.ColorPickerDialog.Builder;
					public setOnKeyListener(onKeyListener: globalAndroid.content.DialogInterface.OnKeyListener): com.skydoves.colorpickerview.ColorPickerDialog.Builder;
					public setItems(items: androidNative.Array<string>, listener: globalAndroid.content.DialogInterface.OnClickListener): com.skydoves.colorpickerview.ColorPickerDialog.Builder;
					public setPositiveButton(textId: number, colorListener: com.skydoves.colorpickerview.listeners.ColorPickerViewListener): com.skydoves.colorpickerview.ColorPickerDialog.Builder;
					public setItems(itemsId: number, listener: globalAndroid.content.DialogInterface.OnClickListener): com.skydoves.colorpickerview.ColorPickerDialog.Builder;
					public setIcon(iconId: number): com.skydoves.colorpickerview.ColorPickerDialog.Builder;
					public setMultiChoiceItems(itemsId: number, checkedItems: androidNative.Array<boolean>, listener: globalAndroid.content.DialogInterface.OnMultiChoiceClickListener): com.skydoves.colorpickerview.ColorPickerDialog.Builder;
					public setSingleChoiceItems(itemsId: number, checkedItem: number, listener: globalAndroid.content.DialogInterface.OnClickListener): com.skydoves.colorpickerview.ColorPickerDialog.Builder;
					public constructor(context: globalAndroid.content.Context, themeResId: number);
					public attachBrightnessSlideBar(value: boolean): com.skydoves.colorpickerview.ColorPickerDialog.Builder;
					public attachAlphaSlideBar(value: boolean): com.skydoves.colorpickerview.ColorPickerDialog.Builder;
					public setCustomTitle(customTitleView: globalAndroid.view.View): com.skydoves.colorpickerview.ColorPickerDialog.Builder;
					public setView(layoutResId: number): com.skydoves.colorpickerview.ColorPickerDialog.Builder;
					public setNeutralButton(text: string, listener: globalAndroid.content.DialogInterface.OnClickListener): com.skydoves.colorpickerview.ColorPickerDialog.Builder;
					public setBottomSpace(bottomSpace: number): com.skydoves.colorpickerview.ColorPickerDialog.Builder;
					public setPositiveButton(text: string, listener: globalAndroid.content.DialogInterface.OnClickListener): com.skydoves.colorpickerview.ColorPickerDialog.Builder;
					public setNeutralButton(textId: number, listener: globalAndroid.content.DialogInterface.OnClickListener): com.skydoves.colorpickerview.ColorPickerDialog.Builder;
					public setOnItemSelectedListener(listener: globalAndroid.widget.AdapterView.OnItemSelectedListener): com.skydoves.colorpickerview.ColorPickerDialog.Builder;
					public create(): androidx.appcompat.app.AlertDialog;
					public setNegativeButton(textId: number, listener: globalAndroid.content.DialogInterface.OnClickListener): com.skydoves.colorpickerview.ColorPickerDialog.Builder;
					public setAdapter(adapter: globalAndroid.widget.ListAdapter, listener: globalAndroid.content.DialogInterface.OnClickListener): com.skydoves.colorpickerview.ColorPickerDialog.Builder;
					public setNegativeButton(text: string, listener: globalAndroid.content.DialogInterface.OnClickListener): com.skydoves.colorpickerview.ColorPickerDialog.Builder;
					public setPositiveButton(textId: number, listener: globalAndroid.content.DialogInterface.OnClickListener): com.skydoves.colorpickerview.ColorPickerDialog.Builder;
					public setOnDismissListener(onDismissListener: globalAndroid.content.DialogInterface.OnDismissListener): com.skydoves.colorpickerview.ColorPickerDialog.Builder;
					public setMultiChoiceItems(items: androidNative.Array<string>, checkedItems: androidNative.Array<boolean>, listener: globalAndroid.content.DialogInterface.OnMultiChoiceClickListener): com.skydoves.colorpickerview.ColorPickerDialog.Builder;
					public setPreferenceName(preferenceName: string): com.skydoves.colorpickerview.ColorPickerDialog.Builder;
					public constructor(context: globalAndroid.content.Context);
					public setCursor(cursor: globalAndroid.database.Cursor, listener: globalAndroid.content.DialogInterface.OnClickListener, labelColumn: string): com.skydoves.colorpickerview.ColorPickerDialog.Builder;
					public setIcon(icon: globalAndroid.graphics.drawable.Drawable): com.skydoves.colorpickerview.ColorPickerDialog.Builder;
					public setIconAttribute(attrId: number): com.skydoves.colorpickerview.ColorPickerDialog.Builder;
					public setView(view: globalAndroid.view.View): com.skydoves.colorpickerview.ColorPickerDialog.Builder;
					public setPositiveButton(text: string, colorListener: com.skydoves.colorpickerview.listeners.ColorPickerViewListener): com.skydoves.colorpickerview.ColorPickerDialog.Builder;
					public setMessage(message: string): com.skydoves.colorpickerview.ColorPickerDialog.Builder;
					public show(): void;
				}
			}
		}
	}
}

declare module com {
	export module skydoves {
		export module colorpickerview {
			export class ColorPickerView {
				public static class: java.lang.Class<com.skydoves.colorpickerview.ColorPickerView>;
				public colorListener: com.skydoves.colorpickerview.listeners.ColorPickerViewListener;
				public getColor(): number;
				public getFlagView(): com.skydoves.colorpickerview.flag.FlagView;
				public setInitialColor(color: number): void;
				public attachAlphaSlider(alphaSlideBar: com.skydoves.colorpickerview.sliders.AlphaSlideBar): void;
				public constructor(context: globalAndroid.content.Context);
				public setInitialColorRes(colorRes: number): void;
				public getPreferenceName(): string;
				public getSelector(): globalAndroid.widget.ImageView;
				public getAlpha(): number;
				public setPureColor(color: number): void;
				public setCoordinate(x: number, y: number): void;
				public selectByHsvColorRes(resource: number): void;
				public setDebounceDuration(debounceDuration: number): void;
				public getDebounceDuration(): number;
				public setSelectorDrawable(drawable: globalAndroid.graphics.drawable.Drawable): void;
				public getColorFromBitmap(radius: number, hsv: number): number;
				public setHsvPaletteDrawable(): void;
				public constructor(context: globalAndroid.content.Context, attrs: globalAndroid.util.AttributeSet);
				public isHuePalette(): boolean;
				public getSelectorY(): number;
				public fireColorListener(this_: number, color: boolean): void;
				public getPureColor(): number;
				public selectByHsvColor(centerX: number): void;
				public setLifecycleOwner(lifecycleOwner: androidx.lifecycle.LifecycleOwner): void;
				public onCreateByBuilder(builder: com.skydoves.colorpickerview.ColorPickerView.Builder): void;
				public getColorEnvelope(): com.skydoves.colorpickerview.ColorEnvelope;
				public selectCenter(): void;
				public setActionMode(actionMode: com.skydoves.colorpickerview.ActionMode): void;
				public getAlphaSlideBar(): com.skydoves.colorpickerview.sliders.AlphaSlideBar;
				public setColorListener(colorListener: com.skydoves.colorpickerview.listeners.ColorPickerViewListener): void;
				public constructor(context: globalAndroid.content.Context, attrs: globalAndroid.util.AttributeSet, defStyleAttr: number, defStyleRes: number);
				public setEnabled(this_: boolean): void;
				public onSizeChanged(this_: number, width: number, height: number, oldWidth: number): void;
				public setPreferenceName(preferenceName: string): void;
				public getSelectorX(): number;
				public removeLifecycleOwner(lifecycleOwner: androidx.lifecycle.LifecycleOwner): void;
				public moveSelectorPoint(x: number, y: number, color: number): void;
				public getActionMode(): com.skydoves.colorpickerview.ActionMode;
				public getSelectedPoint(): globalAndroid.graphics.Point;
				public constructor(context: globalAndroid.content.Context, attrs: globalAndroid.util.AttributeSet, defStyleAttr: number);
				public setSelectorPoint(x: number, y: number): void;
				public setFlagView(flagView: com.skydoves.colorpickerview.flag.FlagView): void;
				public onTouchEvent(event: globalAndroid.view.MotionEvent): boolean;
				public getBrightnessSlider(): com.skydoves.colorpickerview.sliders.BrightnessSlideBar;
				public onDestroy(): void;
				public setPaletteDrawable(drawable: globalAndroid.graphics.drawable.Drawable): void;
				public attachBrightnessSlider(brightnessSlider: com.skydoves.colorpickerview.sliders.BrightnessSlideBar): void;
			}
			export module ColorPickerView {
				export class Builder {
					public static class: java.lang.Class<com.skydoves.colorpickerview.ColorPickerView.Builder>;
					public setBrightnessSlideBar(brightnessSlideBar: com.skydoves.colorpickerview.sliders.BrightnessSlideBar): com.skydoves.colorpickerview.ColorPickerView.Builder;
					public setAlphaSlideBar(alphaSlideBar: com.skydoves.colorpickerview.sliders.AlphaSlideBar): com.skydoves.colorpickerview.ColorPickerView.Builder;
					public setInitialColor(initialColor: number): com.skydoves.colorpickerview.ColorPickerView.Builder;
					public setSelectorDrawable(selector: globalAndroid.graphics.drawable.Drawable): com.skydoves.colorpickerview.ColorPickerView.Builder;
					public setFlagAlpha(alpha: number): com.skydoves.colorpickerview.ColorPickerView.Builder;
					public setFlagIsFlipAble(isFlipAble: boolean): com.skydoves.colorpickerview.ColorPickerView.Builder;
					public setWidth(width: number): com.skydoves.colorpickerview.ColorPickerView.Builder;
					public setLifecycleOwner(lifecycleOwner: androidx.lifecycle.LifecycleOwner): com.skydoves.colorpickerview.ColorPickerView.Builder;
					public setColorListener(colorPickerViewListener: com.skydoves.colorpickerview.listeners.ColorPickerViewListener): com.skydoves.colorpickerview.ColorPickerView.Builder;
					public setFlagView(flagView: com.skydoves.colorpickerview.flag.FlagView): com.skydoves.colorpickerview.ColorPickerView.Builder;
					public setHeight(height: number): com.skydoves.colorpickerview.ColorPickerView.Builder;
					public setPaletteDrawable(palette: globalAndroid.graphics.drawable.Drawable): com.skydoves.colorpickerview.ColorPickerView.Builder;
					public setPreferenceName(preferenceName: string): com.skydoves.colorpickerview.ColorPickerView.Builder;
					public constructor(context: globalAndroid.content.Context);
					public setActionMode(actionMode: com.skydoves.colorpickerview.ActionMode): com.skydoves.colorpickerview.ColorPickerView.Builder;
					public build(): com.skydoves.colorpickerview.ColorPickerView;
					public setSelectorSize(size: number): com.skydoves.colorpickerview.ColorPickerView.Builder;
					public setInitialColorRes(initialColorRes: number): com.skydoves.colorpickerview.ColorPickerView.Builder;
					public setSelectorAlpha(alpha: number): com.skydoves.colorpickerview.ColorPickerView.Builder;
					public setDebounceDuration(debounceDuration: number): com.skydoves.colorpickerview.ColorPickerView.Builder;
				}
			}
		}
	}
}

declare module com {
	export module skydoves {
		export module colorpickerview {
			export class ColorUtils {
				public static class: java.lang.Class<com.skydoves.colorpickerview.ColorUtils>;
				public static getHexCode(color: number): string;
				public static getColorARGB(color: number): androidNative.Array<number>;
			}
		}
	}
}

declare module com {
	export module skydoves {
		export module colorpickerview {
			export class Dp {
				public static class: java.lang.Class<com.skydoves.colorpickerview.Dp>;
				/**
				 * Constructs a new instance of the com.skydoves.colorpickerview.Dp interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
				 */
				public constructor(implementation: {
				});
				public constructor();
			}
		}
	}
}

declare module com {
	export module skydoves {
		export module colorpickerview {
			export class FadeUtils {
				public static class: java.lang.Class<com.skydoves.colorpickerview.FadeUtils>;
				public static fadeIn(view: globalAndroid.view.View): void;
				public static fadeOut(view: globalAndroid.view.View): void;
				public constructor();
			}
		}
	}
}

declare module com {
	export module skydoves {
		export module colorpickerview {
			export class PointMapper {
				public static class: java.lang.Class<com.skydoves.colorpickerview.PointMapper>;
				public static getColorPoint(colorPickerView: com.skydoves.colorpickerview.ColorPickerView, point: globalAndroid.graphics.Point): globalAndroid.graphics.Point;
			}
		}
	}
}

declare module com {
	export module skydoves {
		export module colorpickerview {
			export class SizeUtils {
				public static class: java.lang.Class<com.skydoves.colorpickerview.SizeUtils>;
				public static dp2Px(context: globalAndroid.content.Context, dp: number): number;
			}
		}
	}
}

declare module com {
	export module skydoves {
		export module colorpickerview {
			export module databinding {
				export class ColorpickerviewDialogColorpickerBinding {
					public static class: java.lang.Class<com.skydoves.colorpickerview.databinding.ColorpickerviewDialogColorpickerBinding>;
					public alphaSlideBar: com.skydoves.colorpickerview.sliders.AlphaSlideBar;
					public alphaSlideBarFrame: globalAndroid.widget.FrameLayout;
					public brightnessSlideBar: com.skydoves.colorpickerview.sliders.BrightnessSlideBar;
					public brightnessSlideBarFrame: globalAndroid.widget.FrameLayout;
					public colorPickerView: com.skydoves.colorpickerview.ColorPickerView;
					public colorPickerViewFrame: globalAndroid.widget.FrameLayout;
					public spaceBottom: globalAndroid.widget.Space;
					public getRoot(): globalAndroid.widget.ScrollView;
					public static bind(alphaSlideBar: globalAndroid.view.View): com.skydoves.colorpickerview.databinding.ColorpickerviewDialogColorpickerBinding;
					public static inflate(inflater: globalAndroid.view.LayoutInflater): com.skydoves.colorpickerview.databinding.ColorpickerviewDialogColorpickerBinding;
					public static inflate(inflater: globalAndroid.view.LayoutInflater, parent: globalAndroid.view.ViewGroup, attachToParent: boolean): com.skydoves.colorpickerview.databinding.ColorpickerviewDialogColorpickerBinding;
				}
			}
		}
	}
}

declare module com {
	export module skydoves {
		export module colorpickerview {
			export module databinding {
				export class ColorpickerviewFlagBubbleBinding {
					public static class: java.lang.Class<com.skydoves.colorpickerview.databinding.ColorpickerviewFlagBubbleBinding>;
					public bubble: androidx.appcompat.widget.AppCompatImageView;
					public layout: globalAndroid.widget.FrameLayout;
					public static bind(bubble: globalAndroid.view.View): com.skydoves.colorpickerview.databinding.ColorpickerviewFlagBubbleBinding;
					public getRoot(): globalAndroid.widget.FrameLayout;
					public static inflate(inflater: globalAndroid.view.LayoutInflater): com.skydoves.colorpickerview.databinding.ColorpickerviewFlagBubbleBinding;
					public static inflate(inflater: globalAndroid.view.LayoutInflater, parent: globalAndroid.view.ViewGroup, attachToParent: boolean): com.skydoves.colorpickerview.databinding.ColorpickerviewFlagBubbleBinding;
				}
			}
		}
	}
}

declare module com {
	export module skydoves {
		export module colorpickerview {
			export module flag {
				export class BubbleFlag extends com.skydoves.colorpickerview.flag.FlagView {
					public static class: java.lang.Class<com.skydoves.colorpickerview.flag.BubbleFlag>;
					public onFlipped(isFlipped: java.lang.Boolean): void;
					public constructor(context: globalAndroid.content.Context);
					public onRefresh(colorEnvelope: com.skydoves.colorpickerview.ColorEnvelope): void;
					public constructor(context: globalAndroid.content.Context, layout: number);
				}
			}
		}
	}
}

declare module com {
	export module skydoves {
		export module colorpickerview {
			export module flag {
				export class FlagMode {
					public static class: java.lang.Class<com.skydoves.colorpickerview.flag.FlagMode>;
					public static ALWAYS: com.skydoves.colorpickerview.flag.FlagMode;
					public static LAST: com.skydoves.colorpickerview.flag.FlagMode;
					public static FADE: com.skydoves.colorpickerview.flag.FlagMode;
					public static valueOf(name: string): com.skydoves.colorpickerview.flag.FlagMode;
					public static values(): androidNative.Array<com.skydoves.colorpickerview.flag.FlagMode>;
				}
			}
		}
	}
}

declare module com {
	export module skydoves {
		export module colorpickerview {
			export module flag {
				export abstract class FlagView {
					public static class: java.lang.Class<com.skydoves.colorpickerview.flag.FlagView>;
					public onRefresh(param0: com.skydoves.colorpickerview.ColorEnvelope): void;
					public onFlipped(param0: java.lang.Boolean): void;
					public receiveOnTouchEvent(event: globalAndroid.view.MotionEvent): void;
					public visible(): void;
					public setFlipAble(flipAble: boolean): void;
					public setFlagMode(flagMode: com.skydoves.colorpickerview.flag.FlagMode): void;
					public getFlagMode(): com.skydoves.colorpickerview.flag.FlagMode;
					public isFlipAble(): boolean;
					public gone(): void;
					public constructor(context: globalAndroid.content.Context, layout: number);
				}
			}
		}
	}
}

declare module com {
	export module skydoves {
		export module colorpickerview {
			export module any {
				export class ColorPickerDsl {
					public static class: java.lang.Class<com.skydoves.colorpickerview.any>;
					/**
					 * Constructs a new instance of the com.skydoves.colorpickerview.any interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
					});
					public constructor();
				}
			}
		}
	}
}

declare module com {
	export module skydoves {
		export module colorpickerview {
			export module listeners {
				export class ColorEnvelopeListener extends com.skydoves.colorpickerview.listeners.ColorPickerViewListener {
					public static class: java.lang.Class<com.skydoves.colorpickerview.listeners.ColorEnvelopeListener>;
					/**
					 * Constructs a new instance of the com.skydoves.colorpickerview.listeners.ColorEnvelopeListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						onColorSelected(param0: com.skydoves.colorpickerview.ColorEnvelope, param1: boolean): void;
					});
					public constructor();
					public onColorSelected(param0: com.skydoves.colorpickerview.ColorEnvelope, param1: boolean): void;
				}
			}
		}
	}
}

declare module com {
	export module skydoves {
		export module colorpickerview {
			export module listeners {
				export class ColorListener extends com.skydoves.colorpickerview.listeners.ColorPickerViewListener {
					public static class: java.lang.Class<com.skydoves.colorpickerview.listeners.ColorListener>;
					/**
					 * Constructs a new instance of the com.skydoves.colorpickerview.listeners.ColorListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						onColorSelected(param0: number, param1: boolean): void;
					});
					public constructor();
					public onColorSelected(param0: number, param1: boolean): void;
				}
			}
		}
	}
}

declare module com {
	export module skydoves {
		export module colorpickerview {
			export module listeners {
				export class ColorPickerViewListener {
					public static class: java.lang.Class<com.skydoves.colorpickerview.listeners.ColorPickerViewListener>;
					/**
					 * Constructs a new instance of the com.skydoves.colorpickerview.listeners.ColorPickerViewListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
					});
					public constructor();
				}
			}
		}
	}
}

declare module com {
	export module skydoves {
		export module colorpickerview {
			export module preference {
				export class ColorPickerPreferenceManager {
					public static class: java.lang.Class<com.skydoves.colorpickerview.preference.ColorPickerPreferenceManager>;
					public static COLOR: string = "_COLOR";
					public static SelectorX: string = "_SELECTOR_X";
					public static SelectorY: string = "_SELECTOR_Y";
					public static AlphaSlider: string = "_SLIDER_ALPHA";
					public static BrightnessSlider: string = "_SLIDER_BRIGHTNESS";
					public getSelectorXName(name: string): string;
					public setColor(name: string, color: number): com.skydoves.colorpickerview.preference.ColorPickerPreferenceManager;
					public clearSavedBrightnessSlider(name: string): com.skydoves.colorpickerview.preference.ColorPickerPreferenceManager;
					public getAlphaSliderName(name: string): string;
					public setBrightnessSliderPosition(name: string, position: number): com.skydoves.colorpickerview.preference.ColorPickerPreferenceManager;
					public getBrightnessSliderPosition(name: string, defaultPosition: number): number;
					public restoreColorPickerData(defaultPoint: com.skydoves.colorpickerview.ColorPickerView): void;
					public static getInstance(context: globalAndroid.content.Context): com.skydoves.colorpickerview.preference.ColorPickerPreferenceManager;
					public clearSavedSelectorPosition(name: string): com.skydoves.colorpickerview.preference.ColorPickerPreferenceManager;
					public getAlphaSliderPosition(name: string, defaultPosition: number): number;
					public clearSavedAlphaSliderPosition(name: string): com.skydoves.colorpickerview.preference.ColorPickerPreferenceManager;
					public setSelectorPosition(name: string, position: globalAndroid.graphics.Point): com.skydoves.colorpickerview.preference.ColorPickerPreferenceManager;
					public getSelectorYName(name: string): string;
					public clearSavedAllData(): com.skydoves.colorpickerview.preference.ColorPickerPreferenceManager;
					public clearSavedColor(name: string): com.skydoves.colorpickerview.preference.ColorPickerPreferenceManager;
					public setAlphaSliderPosition(name: string, position: number): com.skydoves.colorpickerview.preference.ColorPickerPreferenceManager;
					public getColor(name: string, defaultColor: number): number;
					public getColorName(name: string): string;
					public saveColorPickerData(this_: com.skydoves.colorpickerview.ColorPickerView): void;
					public getBrightnessSliderName(name: string): string;
					public getSelectorPosition(name: string, defaultPoint: globalAndroid.graphics.Point): globalAndroid.graphics.Point;
				}
			}
		}
	}
}

declare module com {
	export module skydoves {
		export module colorpickerview {
			export module sliders {
				export abstract class AbstractSlider {
					public static class: java.lang.Class<com.skydoves.colorpickerview.sliders.AbstractSlider>;
					public colorPickerView: com.skydoves.colorpickerview.ColorPickerView;
					public colorPaint: globalAndroid.graphics.Paint;
					public borderPaint: globalAndroid.graphics.Paint;
					public selectorPosition: number;
					public selectedX: number;
					public selectorDrawable: globalAndroid.graphics.drawable.Drawable;
					public borderSize: number;
					public borderColor: number;
					public color: number;
					public selector: globalAndroid.widget.ImageView;
					public preferenceName: string;
					public getAttrs(param0: globalAndroid.util.AttributeSet): void;
					public updatePaint(param0: globalAndroid.graphics.Paint): void;
					public updateSelectorX(x: number): void;
					public constructor(context: globalAndroid.content.Context, attrs: globalAndroid.util.AttributeSet);
					public setSelectorPosition(selectorPosition: number): void;
					public getSelectorPosition(): number;
					public constructor(context: globalAndroid.content.Context, attrs: globalAndroid.util.AttributeSet, defStyleAttr: number, defStyleRes: number);
					public getPreferenceName(): string;
					public constructor(context: globalAndroid.content.Context, attrs: globalAndroid.util.AttributeSet, defStyleAttr: number);
					public setBorderSize(borderSize: number): void;
					public notifyColor(): void;
					public setBorderColor(color: number): void;
					public getSelectedX(): number;
					public assembleColor(): number;
					public onInflateFinished(): void;
					public getColor(): number;
					public setBorderSizeRes(resource: number): void;
					public setPreferenceName(preferenceName: string): void;
					public onTouchEvent(event: globalAndroid.view.MotionEvent): boolean;
					public attachColorPickerView(colorPickerView: com.skydoves.colorpickerview.ColorPickerView): void;
					public setEnabled(enabled: boolean): void;
					public setSelectorDrawable(drawable: globalAndroid.graphics.drawable.Drawable): void;
					public setBorderColorRes(resource: number): void;
					public getBorderHalfSize(): number;
					public getSelectorSize(): number;
					public onDraw(canvas: globalAndroid.graphics.Canvas): void;
					public constructor(context: globalAndroid.content.Context);
					public setSelectorDrawableRes(resource: number): void;
					public setSelectorByHalfSelectorPosition(selectorPosition: number): void;
				}
			}
		}
	}
}

declare module com {
	export module skydoves {
		export module colorpickerview {
			export module sliders {
				export class AlphaSlideBar extends com.skydoves.colorpickerview.sliders.AbstractSlider {
					public static class: java.lang.Class<com.skydoves.colorpickerview.sliders.AlphaSlideBar>;
					public constructor(context: globalAndroid.content.Context, attrs: globalAndroid.util.AttributeSet, defStyleAttr: number, defStyleRes: number);
					public getAttrs(this_: globalAndroid.util.AttributeSet): void;
					public assembleColor(): number;
					public onSizeChanged(this_: number, width: number, height: number, oldWidth: number): void;
					public onInflateFinished(): void;
					public constructor(context: globalAndroid.content.Context, attrs: globalAndroid.util.AttributeSet, defStyleAttr: number);
					public constructor(context: globalAndroid.content.Context, attrs: globalAndroid.util.AttributeSet);
					public onDraw(canvas: globalAndroid.graphics.Canvas): void;
					public constructor(context: globalAndroid.content.Context);
					public updatePaint(colorPaint: globalAndroid.graphics.Paint): void;
				}
			}
		}
	}
}

declare module com {
	export module skydoves {
		export module colorpickerview {
			export module sliders {
				export class AlphaTileDrawable {
					public static class: java.lang.Class<com.skydoves.colorpickerview.sliders.AlphaTileDrawable>;
					public constructor(builder: com.skydoves.colorpickerview.sliders.AlphaTileDrawable.Builder);
					public constructor();
					public draw(canvas: globalAndroid.graphics.Canvas): void;
					public setAlpha(alpha: number): void;
					public setColorFilter(colorFilter: globalAndroid.graphics.ColorFilter): void;
					public getOpacity(): number;
				}
				export module AlphaTileDrawable {
					export class Builder {
						public static class: java.lang.Class<com.skydoves.colorpickerview.sliders.AlphaTileDrawable.Builder>;
						public constructor();
						public build(): com.skydoves.colorpickerview.sliders.AlphaTileDrawable;
						public getTileOddColor(): number;
						public getTileEvenColor(): number;
						public getTileSize(): number;
						public setTileSize(tileSize: number): com.skydoves.colorpickerview.sliders.AlphaTileDrawable.Builder;
						public setTileEvenColor(color: number): com.skydoves.colorpickerview.sliders.AlphaTileDrawable.Builder;
						public setTileOddColor(color: number): com.skydoves.colorpickerview.sliders.AlphaTileDrawable.Builder;
					}
				}
			}
		}
	}
}

declare module com {
	export module skydoves {
		export module colorpickerview {
			export module sliders {
				export class BrightnessSlideBar extends com.skydoves.colorpickerview.sliders.AbstractSlider {
					public static class: java.lang.Class<com.skydoves.colorpickerview.sliders.BrightnessSlideBar>;
					public constructor(context: globalAndroid.content.Context, attrs: globalAndroid.util.AttributeSet, defStyleAttr: number, defStyleRes: number);
					public getAttrs(this_: globalAndroid.util.AttributeSet): void;
					public assembleColor(): number;
					public onInflateFinished(): void;
					public constructor(context: globalAndroid.content.Context, attrs: globalAndroid.util.AttributeSet, defStyleAttr: number);
					public constructor(context: globalAndroid.content.Context, attrs: globalAndroid.util.AttributeSet);
					public constructor(context: globalAndroid.content.Context);
					public updatePaint(colorPaint: globalAndroid.graphics.Paint): void;
				}
			}
		}
	}
}

//Generics information:

