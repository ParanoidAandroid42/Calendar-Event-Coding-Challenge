const START_TIME = new Date();
START_TIME.setHours(9, 0);
const END_TIME = new Date();
END_TIME.setHours(21, 0);

export const DATE_PROPERTIES = {
  startTime: START_TIME,
  endTime: END_TIME,
  offsetMinuteToAdd: 30,
  minuteMilliseconds: 60_000
}

/**
 * @param {Date} date 
 * @returns {String}
 */
export function format12HourClock(date) {
  console.log( 'assss', date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }))
  return date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
}

/**
 * @return {float}
 */
export function getCalendarTotalMinutes() {
  return (DATE_PROPERTIES.endTime.getTime() - DATE_PROPERTIES.startTime.getTime()) / DATE_PROPERTIES.minuteMilliseconds;
}

/**
 * 
 * @param {number} minute 
 * @returns 
 */
export function addMinutesToCalendarStartTime(minute) {
  const date = new Date(DATE_PROPERTIES.startTime);
  date.setMinutes(DATE_PROPERTIES.startTime.getMinutes() + minute);
  return date;
}
