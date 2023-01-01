export const START_TIME = new Date();
START_TIME.setHours(9, 0);
export const END_TIME = new Date();
END_TIME.setHours(21, 0);
export const MINUTE_TO_ADD = 30;
export const MINUTE_MILLISECONDS = 60_000;

/**
 * @param {Date} date 
 * @returns {String}
 */
export function format12HourClock(date) {
  return date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
}

/**
 * @return {float}
 */
export function getCalendarTotalMinutes() {
  return (END_TIME.getTime() - START_TIME.getTime()) / MINUTE_MILLISECONDS;
}

/**
 * 
 * @param {number} minute 
 * @returns 
 */
export function addMinutesToCalendarStartTime(minute) {
  const date = new Date(START_TIME);
  date.setMinutes(START_TIME.getMinutes() + minute);
  return date;
}
