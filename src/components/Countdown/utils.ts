const padNumber = (time: number): string => {
    return time.toString().padStart(2, '0');
}

export const formatCountdown = (countdown: number) => {
    const hours = Math.floor(countdown / 3600);
    const minutes = Math.floor(countdown % 3600 / 60);
    const seconds = Math.floor(countdown % 3600 % 60);
    
    const values: string[] = [];

    if (hours > 0) values.push(padNumber(hours));
    if (hours > 0 || minutes > 0) values.push(padNumber(minutes));
    values.push(padNumber(seconds));

    return values.join(':');
}
