
export const collectionViewUtils = {
    drawerTranslationFunction(side: string, width: number, value: number, delta: number, progress: number) {
        const result = {
            mainContent: {
                translateX: side === 'right' ? -delta : delta
            },
            backDrop: {
                translateX: side === 'right' ? -delta : delta,
                opacity: progress * 0.00001
            }
        } as any;
        return result;
    }
}