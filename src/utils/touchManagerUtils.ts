import { CoreTypes, TouchManager, View } from "@nativescript/core";

const originalTransform = Symbol('originalTransform');
TouchManager.enableGlobalTapAnimations = true;
TouchManager.animations = {
  down: (view: View) => {
    if (global.isIOS) {
      UIView.animateWithDurationDelayUsingSpringWithDampingInitialSpringVelocityOptionsAnimationsCompletion(
        0.3,
        0,
        0.5,
        3,
        UIViewAnimationOptions.CurveEaseInOut | UIViewAnimationOptions.AllowUserInteraction,
        () => {
          if (view?.ios) {
            // @ts-ignore
            view[originalTransform] = view[originalTransform] ?? view.ios.transform;

            view.ios.transform = CGAffineTransformConcat(
              // @ts-ignore
              view[originalTransform],
              CGAffineTransformMakeScale(0.97, 0.97)
            );
          }
        },
        null!
      );
    } else {
      view
        ?.animate({
          scale: { x: 0.97, y: 0.97 },
          duration: 120,
          curve: CoreTypes.AnimationCurve.easeInOut,
        })
        .then(() => { })
        .catch(() => { });
    }
  },
  up: (view: View) => {
    if (global.isIOS) {
      UIView.animateWithDurationDelayUsingSpringWithDampingInitialSpringVelocityOptionsAnimationsCompletion(
        0.3,
        0,
        0.5,
        3,
        UIViewAnimationOptions.CurveEaseInOut | UIViewAnimationOptions.AllowUserInteraction,
        () => {
          if (view?.ios) {
            // @ts-ignore
            view.ios.transform = view[originalTransform] ?? CGAffineTransformMakeScale(1, 1);
          }
        },
        null!
      );
    } else {
      view
        ?.animate({
          scale: { x: 1, y: 1 },
          duration: 120,
          curve: CoreTypes.AnimationCurve.easeInOut,
        })
        .then(() => { })
        .catch(() => { });
    }
  },
};

export const touchAnimationIcon = {
  down: (view: View) => {
    if (global.isIOS) {
      UIView.animateWithDurationDelayUsingSpringWithDampingInitialSpringVelocityOptionsAnimationsCompletion(
        0.6,
        0,
        0.8,
        200,
        UIViewAnimationOptions.CurveEaseInOut | UIViewAnimationOptions.AllowUserInteraction,
        () => {
          if (view?.ios) {
            // @ts-ignore
            view[originalTransform] = view[originalTransform] ?? view.ios.transform;

            view.ios.transform = CGAffineTransformConcat(
              // @ts-ignore
              view[originalTransform],
              CGAffineTransformMakeScale(0.97, 0.97)
            );
          }
        },
        null!
      );
    } else {
      view
        ?.animate({
          scale: { x: 0.85, y: 0.85 },
          duration: 120,
          curve: CoreTypes.AnimationCurve.easeInOut,
        })
        .then(() => { })
        .catch(() => { });
    }
  },
  up: (view: View) => {
    if (global.isIOS) {
      UIView.animateWithDurationDelayUsingSpringWithDampingInitialSpringVelocityOptionsAnimationsCompletion(
        0.3,
        0,
        0.5,
        3,
        UIViewAnimationOptions.CurveEaseInOut | UIViewAnimationOptions.AllowUserInteraction,
        () => {
          if (view?.ios) {
            // @ts-ignore
            view.ios.transform = view[originalTransform] ?? CGAffineTransformMakeScale(1, 1);
          }
        },
        null!
      );
    } else {
      view
        ?.animate({
          scale: { x: 1, y: 1 },
          duration: 120,
          curve: CoreTypes.AnimationCurve.easeInOut,
        })
        .then(() => { })
        .catch(() => { });
    }
  },
};