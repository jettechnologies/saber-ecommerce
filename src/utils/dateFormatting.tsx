export const formatTimeDays = (seconds: number): string => {
    const days = Math.floor(seconds / (24 * 3600));
    seconds %= 24 * 3600;
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60);
    seconds %= 60;
    return `${days}:${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export const formatTimeWeeks = (seconds: number): string => {
    const weeks = Math.floor(seconds / (7 * 24 * 3600));
    seconds %= 7 * 24 * 3600;
    const days = Math.floor(seconds / (24 * 3600));
    seconds %= 24 * 3600;
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60);
    seconds %= 60;
    return `${weeks}:${days}:${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export const timeToSeconds = (time: number, type: "days" | "weeks"): number => {
    let convertedTime: number;
    if (type === "days") {
        convertedTime = time * 24 * 60 * 60; // Days to seconds
    } else if (type === "weeks") {
        convertedTime = time * 7 * 24 * 60 * 60; // Weeks to seconds
    } else {
        throw new Error("Invalid time type");
    }

    return convertedTime;
};