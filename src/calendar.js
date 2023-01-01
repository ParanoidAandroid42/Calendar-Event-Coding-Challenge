import { getCalendarTotalMinutes, addMinutesToCalendarStartTime, format12HourClock, MINUTE_TO_ADD } from 'src/dates';
import { state } from 'src/state';

export const CALENDAR_PADDING = 10;
export const CALENDAR_WIDTH = 600;
export const CALENDAR_HEIGHT = 700;
export const CALENDAR_TOTAL_HEIGHT = CALENDAR_HEIGHT + 2 * CALENDAR_PADDING;

const template = `
<div class="calendar" style="--calendar-padding: ${CALENDAR_PADDING}px; --calendar-width: ${CALENDAR_WIDTH}px; --calendar-height: ${CALENDAR_HEIGHT}px;"> 
  <div class="inner">
    <div class="date_container"></div>
    <div class="event_container"></div>
  </div> 
</div>`;

export function initCalendar() {
  state.$element.insertAdjacentHTML('beforeend', template);
  state.calendar.$element = state.$element.querySelector('.calendar');
  state.calendar.$event_container = state.$element.querySelector('.event_container');
  updateView();
}

function updateView() {
  let content = '';
  const totalMinutes = getCalendarTotalMinutes();
  const offsetTimeCount = Math.floor(totalMinutes / MINUTE_TO_ADD);
  const cellHeight = Math.floor(CALENDAR_TOTAL_HEIGHT / offsetTimeCount);
  const dateContainer = state.calendar.$element.querySelector('.date_container');

  for (let i = 0; i <= offsetTimeCount; i++) {
    const date = addMinutesToCalendarStartTime(MINUTE_TO_ADD * i);
    content += `<label class="date" style="height: ${cellHeight}px; ">${format12HourClock(date)}</label>`;
  }

  dateContainer.style = `margin-top: -${cellHeight / 2}px`;
  dateContainer.innerHTML = content;
}
