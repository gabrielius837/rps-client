const isTouchDevice = (): boolean => {
    return (
        typeof window !== 'undefined' &&
        ('ontouchstart' in window || navigator.maxTouchPoints > 0)
        // remove || navigator.msMaxTouchPoints > 0 condition
    );
};

export default isTouchDevice;
