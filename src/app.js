import { initCalendar } from 'src/calendar';
import { initEvent } from 'src/event';

const defaultEventData = [
  { start: 30, end: 150 },
  { start: 540, end: 600 },
  { start: 560, end: 620 },
  { start: 610, end: 670 },
];

const testEventData = [
  { id: 5, start: 110, end: 180 },
  { id: 6, start: 170, end: 230 },
  { id: 7, start: 170, end: 240 },
  { id: 8, start: 170, end: 220 },
  { id: 9, start: 190, end: 260 },
  { id: 10, start: 230, end: 300 },
  { id: 11, start: 240, end: 280 },
];

const testEventData2 = [
  { start: 30, end: 150 },
  { start: 540, end: 600 },
  { start: 600, end: 720 },
  { start: 580, end: 720 },
  { start: 560, end: 620 },
  { start: 610, end: 670 },
];

const testEventData3 = [
  { start: 30, end: 150 },
  { start: 540, end: 600 },
  { start: 540, end: 600 },
  { start: 540, end: 600 },
  { start: 0, end: 600 },
  { start: 600, end: 720 },
  { start: 580, end: 720 },
  { start: 560, end: 620 },
  { start: 610, end: 670 },
];

const testEventData4 = [
  { start: 30, end: 150 },
  { start: 30, end: 200 },
  { start: 200, end: 300 },
  { start: 540, end: 600 },
  { start: 540, end: 600 },
  { start: 540, end: 600 },
  { start: 0, end: 600 },
  { start: 600, end: 720 },
  { start: 600, end: 720 },
  { start: 580, end: 720 },
  { start: 560, end: 620 },
  { start: 610, end: 670 },
];

const testEventData5 = [
  { id: 1, start: 0, end: 30 },
  { id: 2, start: 30, end: 100 },
  { id: 3, start: 80, end: 160 },
  { id: 4, start: 110, end: 240 },
  { id: 5, start: 110, end: 180 },
  { id: 6, start: 170, end: 230 },
  { id: 7, start: 170, end: 240 },
  { id: 8, start: 170, end: 220 },
  { id: 9, start: 190, end: 260 },
  { id: 10, start: 230, end: 300 },
  { id: 11, start: 240, end: 280 },
  { id: 12, start: 250, end: 290 },
  { id: 13, start: 300, end: 330 },
  { id: 14, start: 330, end: 400 },
  { id: 15, start: 330, end: 390 },
  { id: 16, start: 330, end: 380 },
  { id: 17, start: 400, end: 500 },
  { id: 18, start: 400, end: 620 },
  { id: 19, start: 600, end: 650 },
  { id: 20, start: 660, end: 720 },
  { id: 21, start: 670, end: 720 },
  { id: 22, start: 680, end: 720 },
  { id: 23, start: 690, end: 720 },
  { id: 24, start: 650, end: 680 },
  { id: 25, start: 650, end: 690 },
];

const testEventData6 = [
  { id: 1, start: 0, end: 30 },
  { id: 2, start: 30, end: 100 },
  { id: 3, start: 80, end: 160 },
  { id: 4, start: 110, end: 240 },
  { id: 5, start: 110, end: 180 },
  { id: 6, start: 170, end: 230 },
  { id: 7, start: 170, end: 240 },
  { id: 8, start: 170, end: 220 },
  { id: 9, start: 190, end: 260 },
  { id: 10, start: 230, end: 300 },
];

export const state = {
  $element: null,
  calendar: {
    $event_container: null,
    $element: null,
  },
};

export function initApp(selector) {
  state.$element = document.querySelector(selector);
  initCalendar();

  window.layOutDay = (calendarEvents) => {
    initEvent(calendarEvents);
  };

  initEvent(testEventData5);
}
