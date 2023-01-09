import { getCalendarTotalMinutes, addMinutesToCalendarStartTime, format12HourClock, DATE_PROPERTIES } from 'src/dates';
import { state } from 'src/app';

export const CALENDAR_PROPERTIES = {
  padding: 10,
  width: 600,
  height: 700,
  totalHeight: 720, // width + 2*padding
};

const template = `
<div class="calendar" style="--calendar-padding: ${CALENDAR_PROPERTIES.padding}px; --calendar-width: ${CALENDAR_PROPERTIES.width}px; --calendar-height: ${CALENDAR_PROPERTIES.height}px;"> 
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
  const offsetTimeCount = Math.floor(totalMinutes / DATE_PROPERTIES.offsetMinuteToAdd);
  const cellHeight = Math.floor(CALENDAR_PROPERTIES.totalHeight / offsetTimeCount);
  const dateContainer = state.calendar.$element.querySelector('.date_container');

  for (let i = 0; i <= offsetTimeCount; i++) {
    const date = addMinutesToCalendarStartTime(DATE_PROPERTIES.offsetMinuteToAdd * i);
    if (i%2) {
      content += `<label class="date offset" style="height: ${cellHeight}px; ">${format12HourClock(date).replace('PM', '').replace('AM', '')}</label>`;
    } else {
      content += `<label class="date" style="height: ${cellHeight}px; ">${format12HourClock(date)}</label>`;
    }
  }

  dateContainer.style = `margin-top: -${cellHeight / 2}px`;
  dateContainer.innerHTML = content;
}
