import { initCalendar } from "src/calendar";
import { state } from "src/state";
import { initEvent } from "src/event";

export function initApp(selector) {
  state.$element = document.querySelector(selector);
  initCalendar();

  window.layOutDay = (calendarEvents) => {
    initEvent(calendarEvents);
  }

  initEvent([ {start: 30, end: 150}, {start: 540, end: 600}, {start: 560,
    end: 620}, {start: 610, end: 670} ]);
}