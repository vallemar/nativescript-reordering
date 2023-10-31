import { isAndroid, View, Utils } from "@nativescript/core";

import { AnimateOptions, SpringParams } from "~/types";

type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;
type Required<T> = {
    [P in keyof T]-?: T[P];
};
type Params = Required<SpringParams>;
type AnimateOptionsInternal = Overwrite<AnimateOptions, { params: Params }>;

export const animateView = (view: View, options: AnimateOptions) => {
    options.params = Object.assign({}, {
        tension: 150,
        friction: isAndroid ? 0.6 : 10,
        mass: 1,
        velocity: 0,
    } as Params)

    if (isAndroid) {
        animateAndroid(view, options as AnimateOptionsInternal);
    } else {
        animateIOS(view, options as AnimateOptionsInternal);
    }
}

function animateAndroid(view: View, animation: AnimateOptionsInternal) {
    if (typeof animation.translate?.x === "number") {
        const springAnim = new androidx.dynamicanimation.animation.SpringAnimation(
            view.android, androidx.dynamicanimation.animation.DynamicAnimation.TRANSLATION_X,
            Utils.layout.toDevicePixels(
                animation.translate?.x
            )
        );

        springAnim.getSpring().setStiffness(animation.params.tension)
        springAnim.getSpring().setDampingRatio(animation.params.friction)
        springAnim.start();
    }
    if (typeof animation.translate?.y === "number") {
        const springAnim = new androidx.dynamicanimation.animation.SpringAnimation(
            view.android, androidx.dynamicanimation.animation.DynamicAnimation.TRANSLATION_Y,
            Utils.layout.toDevicePixels(
                animation.translate?.y
            )
        );
        springAnim.getSpring().setStiffness(animation.params.tension)
        springAnim.getSpring().setDampingRatio(animation.params.friction)
        springAnim.start();
    }
    if (typeof animation.scale?.x === "number") {
        const springAnim = new androidx.dynamicanimation.animation.SpringAnimation(view.android, androidx.dynamicanimation.animation.DynamicAnimation.SCALE_X)
        const spring = new androidx.dynamicanimation.animation.SpringForce()
            .setFinalPosition(animation.scale?.x)
            .setStiffness(animation.params.tension)
            .setDampingRatio(animation.params.friction)
        springAnim.setSpring(spring)
        springAnim.getSpring().setStiffness(animation.params.tension)
        springAnim.getSpring().setDampingRatio(animation.params.friction)
        springAnim.start();
    }
    if (typeof animation.scale?.y === "number") {
        const springAnim = new androidx.dynamicanimation.animation.SpringAnimation(view.android, androidx.dynamicanimation.animation.DynamicAnimation.SCALE_Y)
        const spring = new androidx.dynamicanimation.animation.SpringForce()
            .setFinalPosition(animation.scale?.y)
            .setStiffness(animation.params.tension)
            .setDampingRatio(animation.params.friction)
        springAnim.setSpring(spring)
        springAnim.getSpring().setStiffness(animation.params.tension)
        springAnim.getSpring().setDampingRatio(animation.params.friction)
        springAnim.start();
    }

    if (typeof animation.size?.width === "number") {
        const scaleWidth = calculateScaleFactor(view.getActualSize().width, animation.size?.width)
        const springAnim = new androidx.dynamicanimation.animation.SpringAnimation(view.android, androidx.dynamicanimation.animation.DynamicAnimation.SCALE_X)
        const spring = new androidx.dynamicanimation.animation.SpringForce()
            .setFinalPosition(scaleWidth)
            .setStiffness(animation.params.tension)
            .setDampingRatio(animation.params.friction)
        springAnim.setSpring(spring)
        springAnim.getSpring().setStiffness(animation.params.tension)
        springAnim.getSpring().setDampingRatio(animation.params.friction)
        springAnim.start();
    }
    if (typeof animation.size?.height === "number") {
        const scaleHeight = calculateScaleFactor(view.getActualSize().height, animation.size?.height)

        const springAnim = new androidx.dynamicanimation.animation.SpringAnimation(view.android, androidx.dynamicanimation.animation.DynamicAnimation.SCALE_Y)
        const spring = new androidx.dynamicanimation.animation.SpringForce()
            .setFinalPosition(scaleHeight)
            .setStiffness(animation.params.tension)
            .setDampingRatio(animation.params.friction)
        springAnim.setSpring(spring)
        springAnim.getSpring().setStiffness(animation.params.tension)
        springAnim.getSpring().setDampingRatio(animation.params.friction)
        springAnim.start();
    }
    if (typeof animation.rotation === "number") {
        const springAnim = new androidx.dynamicanimation.animation.SpringAnimation(
            view.android, androidx.dynamicanimation.animation.DynamicAnimation.ROTATION,
            animation.rotation
        );
        springAnim.getSpring().setStiffness(animation.params.tension)
        springAnim.getSpring().setDampingRatio(animation.params.friction)
        springAnim.start();
    }
    if (typeof animation.alpha === "number") {
        const springAnim = new androidx.dynamicanimation.animation.SpringAnimation(
            view.android, androidx.dynamicanimation.animation.DynamicAnimation.ALPHA,
            animation.alpha
        );
        springAnim.getSpring().setStiffness(animation.params.tension)
        springAnim.getSpring().setDampingRatio(animation.params.friction)
        springAnim.start();
    }


}

function animateIOS(view: View, animation: AnimateOptionsInternal) {
    Utils.ios.animateWithSpring({
        ...animation.params,
        completion: () => {
            if (animation.onCompletion)
                animation.onCompletion(view)

        },
        animations: () => {
            const uiView = <UIView>view.ios;
            const transforms: CGAffineTransform[] = []
            if (animation.onBeforeStartAnimation)
                animation.onBeforeStartAnimation(view)

            if (typeof animation.scale?.x === "number" && typeof animation.scale?.y === "number") {
                transforms.push(CGAffineTransformMakeScale(
                    animation.scale?.x,
                    animation.scale?.y
                ))
            }

            if (typeof animation.size?.width === "number" && typeof animation.size?.height === "number") {
                const currentSize = uiView.frame.size
                const scaleWidth = calculateScaleFactor(currentSize.width, animation.size?.width);
                const scaleHeight = calculateScaleFactor(currentSize.height, animation.size?.height);

                transforms.push(CGAffineTransformMakeScale(
                    scaleWidth,
                    scaleHeight
                ))
            }
            if (typeof animation.translate?.x === "number" && typeof animation.translate?.y === "number") {
                transforms.push(CGAffineTransformMakeTranslation(animation.translate.x, animation.translate?.y
                ))
            }
            if (typeof animation.rotation === "number") {
                transforms.push(CGAffineTransformMakeRotation(animation.rotation * 3.1416 / 180))

            }
            if (animation.alpha || animation.alpha === 0) {
                uiView.layer.opacity = animation.alpha;
            }
            if (transforms.length > 1) {
                let baseTransform = transforms[0];
                transforms.forEach((transform, index) => {
                    if (index != 0) {
                        baseTransform = CGAffineTransformConcat(baseTransform, transform)
                    }
                })
                uiView.transform = CGAffineTransformConcat(uiView.transform, baseTransform);
            }
            else {
                uiView.transform = transforms[0]; //CGAffineTransformConcat(uiView.transform, transforms[0])
            }
        }
    });
}

function calculateScaleFactor(currentSize: number, desiredSize: number) {
    const scaleSize = desiredSize / currentSize

    return scaleSize;
}
