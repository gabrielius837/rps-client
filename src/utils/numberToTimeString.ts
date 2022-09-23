const padNumber = (value: number): string => {
    return value.toString().padStart(2, '0');
}

const numberToTimeString = (value: number) => {
    const hours = Math.floor(value / 3600);
    const minutes = Math.floor(value % 3600 / 60);
    const seconds = Math.floor(value % 3600 % 60);

    const values: string[] = [];

    if (hours) values.push(`${hours}h`);
    if (minutes) values.push(`${hours ? padNumber(minutes) : minutes}min`);
    if (seconds) values.push(`${hours || minutes ? padNumber(seconds) : seconds}s`);

    return values.join(' ');
}

export default numberToTimeString;