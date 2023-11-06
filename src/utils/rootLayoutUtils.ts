import { CoreTypes } from "@nativescript/core";
import { CubicBezierAnimationCurve } from "@nativescript/core/ui/animation";

export const SHEET_CURVE = CoreTypes.AnimationCurve.cubicBezier(
    0.17,
    0.89,
    0.24,
    1.11
);

export const SHADE_COVER = {
    color: '#000', // Set the color of the shade cover
    opacity: 0.5, // Set the opacity of the shade cover
    tapToClose: true, // Allow tapping on the shade cover to close the bottom sheet
};

const COORDS = {
    noAnimation: { trans: 'translateY', enter: 0, exit: 400 },
    top: { trans: 'translateY', enter: -100, exit: -400 },
    bottom: { trans: 'translateY', enter: 100, exit: 100 },
    left: { trans: 'translateX', enter: -100, exit: -400 },
    right: { trans: 'translateX', enter: 100, exit: 400 },
};


export type DIRECTION = keyof typeof COORDS;

export const ANIMATION = (
    direction: DIRECTION,
    duration: number = 300,
    curve: string | CubicBezierAnimationCurve = SHEET_CURVE
) => ({
    enterFrom: {
        [COORDS[direction].trans]: COORDS[direction].enter,
        duration,
        curve,
    },
    exitTo: {
        [COORDS[direction].trans]: COORDS[direction].exit,
        duration,
        curve,
        opacity: 0
    },
});