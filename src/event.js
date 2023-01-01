import { state } from 'src/state';
import { format12HourClock, addMinutesToCalendarStartTime, getCalendarTotalMinutes } from 'src/dates';
import { CALENDAR_TOTAL_HEIGHT, CALENDAR_WIDTH, CALENDAR_PADDING } from 'src/calendar';

export function initEvent(events) {
  // sort all events to set column/row indexes properly
  const sortedEvents = getSortedEventsByStartTime(events);
  const eventInformation = getEventInformation(sortedEvents);

  calculateEventMatrix(eventInformation);
  renderCalendarEvents(eventInformation);
}

function calculateEventMatrix(events) {
  // for the first event, no need to check collision status
  const eventMatrix = [[events[0]]];

   // Check each column events until find available(no collision) column and start from first event
  events
    .filter((event) => event != events[0])
    .forEach((event) => {
      let isCollisionDetected = false;
      let isAdded = false;

      eventMatrix.forEach((eventMatrix, eventMatrixIndex) => {
        eventMatrix.forEach((eventMatrix) => {
          const compareEvent = eventMatrix;
          console.log(event.startDate, event.endDate, 'compared with:', compareEvent.startDate, compareEvent.endDate);
          if (compareEvent.start < event.end && compareEvent.end > event.start) {
            console.log('collision detected');
            isCollisionDetected = true;
            event.collisionEvents.push(compareEvent);
          }
        });

        if (!isCollisionDetected) {
          eventMatrix.push(event);
          event.columnIndex = eventMatrixIndex;
          isAdded = true;
        }
      });

      if (!isAdded) {
        eventMatrix.push([event]);
        event.columnIndex = eventMatrix.length - 1;
        event.rowIndex = event.columnIndex;
      }   
  });

  // Check collision events for each events to find row index and start from first event 
  for (let i = events.length - 1; i >= 0; i--) {
    events[i].collisionEvents.forEach((collisionEvent) => {
      if (collisionEvent.columnIndex > events[i].columnIndex) {
        events[i].rowIndex = collisionEvent.rowIndex;
      }
      if (collisionEvent.columnIndex < events[i].columnIndex) {
        collisionEvent.rowIndex = events[i].rowIndex;
      }
    });
  }
}

function getSortedEventsByStartTime(events) {
  events.sort(function (a, b) {
    if (a.start > b.start) return 1;
    if (a.start < b.start) return -1;
    if (a.end > b.end) return 1;
    if (a.end < b.end) return -1;
    return 0;
  });
  return events;
}

function getEventInformation(sortedEvents) {
  return sortedEvents.reduce((acc, event) => {
    acc.push({
      start: event.start,
      end: event.end,
      startDate: format12HourClock(addMinutesToCalendarStartTime(event.start)),
      endDate: format12HourClock(addMinutesToCalendarStartTime(event.end)),
      isCollisionChecked: false,
      collisionEvents: [],
      rowIndex: 0,
      columnIndex: 0,
    });
    return acc;
  }, []);
}

function renderCalendarEvents(eventInformation) {
  let content = '';
  eventInformation.map((event) => {
    const scaledPos = getScaledPosition(event.start, event.end);
    const { startDate, endDate } = event;

    const width = Math.floor(CALENDAR_WIDTH / (event.rowIndex + 1));
    const left = event.columnIndex * width + CALENDAR_PADDING;
    const top = scaledPos.startPos;
    const height = scaledPos.endPos - scaledPos.startPos;

    content += `
    <div class="event" style="top: ${top}px; left: ${left}px; width: ${width}px; height: ${height}px;">
       <div class="border"></div>
       <div class="title">Sample Event</div>
       <div class="content_text">Event time: ${startDate}-${endDate}</div>
    </div>`;
  });
  state.calendar.$event_container.innerHTML = content;
}

/**
 * Scale given event by the total time of the calendar event
 * @param {number} startTime - given event start time
 * @param {number} endTime - given event end time
 * @returns
 */
function getScaledPosition(startTime, endTime) {
  const totalMinutes = getCalendarTotalMinutes();

  return {
    startPos: Math.floor((CALENDAR_TOTAL_HEIGHT * startTime) / totalMinutes),
    endPos: Math.floor((CALENDAR_TOTAL_HEIGHT * endTime) / totalMinutes),
  };
}
