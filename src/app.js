import { initCalendar } from "src/calendar";
import { state } from "src/state";
import { initEvent } from "src/event";

export function initApp(selector) {
  state.$element = document.querySelector(selector);
  initCalendar();

  window.layOutDay = (calendarEvents) => {
    initEvent(calendarEvents);
  }
}