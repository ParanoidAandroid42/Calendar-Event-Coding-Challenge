import { getCalendarTotalMinutes, addMinutesToCalendarStartTime, format12HourClock, DATE_PROPERTIES } from 'src/dates';
import { state } from 'src/app';

export const CALENDAR_PROPERTIES = {
  padding: 10,
  width: 600,
  height: 700,
  totalHeight: 720,
};

const calendarTemplate = `
<div class="calendar" style="--calendar-padding: ${CALENDAR_PROPERTIES.padding}px; --calendar-width: ${CALENDAR_PROPERTIES.width}px; --calendar-height: ${CALENDAR_PROPERTIES.height}px;"> 
  <div class="inner">
    <div class="date_container"></div>
    <div class="event_container"></div>
  </div> 
</div>`;

export function initCalendar() {
  state.$element.insertAdjacentHTML('beforeend', calendarTemplate);
  const calendar = state.$element.querySelector('.calendar');
  const eventContainer = state.$element.querySelector('.event_container');

  state.calendar = {
    $element: calendar,
    $event_container: eventContainer
  };

  updateCalendarView();
}

function updateCalendarView() {
  const totalMinutes = getCalendarTotalMinutes();
  const offsetTimeCount = Math.floor(totalMinutes / DATE_PROPERTIES.offsetMinuteToAdd);
  const cellHeight = Math.floor(CALENDAR_PROPERTIES.totalHeight / offsetTimeCount);
  const dateContainer = state.calendar.$element.querySelector('.date_container');

  const dateLabels = generateDateLabels(offsetTimeCount, cellHeight);

  dateContainer.style.marginTop = `-${cellHeight / 2}px`;
  dateContainer.innerHTML = dateLabels;
}

function generateDateLabels(count, height) {
  return Array.from({ length: count + 1 }, (_, i) => {
    const date = addMinutesToCalendarStartTime(DATE_PROPERTIES.offsetMinuteToAdd * i);
    const formattedDate = format12HourClock(date).replace('PM', '').replace('AM', '');
    const labelClass = i % 2 ? "date offset" : "date";
    return `<label class="${labelClass}" style="height: ${height}px;">${formattedDate}</label>`;
  }).join('');
}
