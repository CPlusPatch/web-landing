// Adapted from https://github.com/mobz/get-timezone-offset/blob/v1/getTimezoneOffset.js

const locale = "en-US";
const usRegex = /(\d+).(\d+).(\d+),?\s+(\d+).(\d+)(.(\d+))?/;

const utcFormatter = new Intl.DateTimeFormat(locale, {
    timeZone: "UTC",
    hour12: false,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
});

const parseDate = (
    dateStr: string,
): [number, number, number, number, number] => {
    const cleaned = dateStr.replace(/[\u200E\u200F]/g, "");

    return [].slice.call(usRegex.exec(cleaned), 1).map(Math.floor) as [
        number,
        number,
        number,
        number,
        number,
    ];
};

const diffMinutes = (
    diff1: [number, number, number, number, number],
    diff2: [number, number, number, number, number],
): number => {
    var d1h = diff1[3] === 24 ? 0 : diff1[3];
    var d2h = diff2[3] === 24 ? 0 : diff2[3];
    var day = diff1[1] - diff2[1];
    var hour = d1h - d2h;
    var min = diff1[4] - diff2[4];

    if (day > 15) day = -1;
    if (day < -15) day = 1;

    return 60 * (24 * day + hour) + min;
};

/**
 * Get the timezone offset in minutes for a given IANA timezone.
 * @param ianaTimezone IANA timezone string
 * @returns Offset in minutes
 */
export const getTimezoneOffset = (ianaTimezone: string): number => {
    const date = new Date();

    const formatter = new Intl.DateTimeFormat(locale, {
        timeZone: ianaTimezone,
        hour12: false,
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    });

    return diffMinutes(
        parseDate(formatter.format(date)),
        parseDate(utcFormatter.format(date)),
    );
};
