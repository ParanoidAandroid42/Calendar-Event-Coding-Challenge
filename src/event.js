import { state } from 'src/app';
import { format12HourClock, addMinutesToCalendarStartTime, getCalendarTotalMinutes } from 'src/dates';
import { CALENDAR_PROPERTIES } from 'src/calendar';

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

  // Check each column until find available(no collision) place to add the event
  events
    .filter((event) => event != events[0])
    .forEach((event) => {
      let availablePlaceIndex = 0;
      let foundAvailablePlaceAlready = false;
      eventMatrix.forEach((eventMatrix, eventMatrixIndex) => {
        let isCollisionDetected = false;
        eventMatrix.forEach((eventMatrix) => {
          const compareEvent = eventMatrix;
          console.log(event.startDate, event.endDate, 'compared with:', compareEvent.startDate, compareEvent.endDate);
          // check collision
          if (compareEvent.start < event.end && compareEvent.end > event.start) {
            console.log('collision detected');
            event.collisionEvents.push(compareEvent);
            isCollisionDetected = true;
          }
        });

        if (!foundAvailablePlaceAlready) {
          // if collision detected , check the next column
          if (isCollisionDetected) {
            availablePlaceIndex++;
          }
          // if collision not detected , place the event current column
          else {
            availablePlaceIndex = eventMatrixIndex;
            foundAvailablePlaceAlready = true;
          }
        }
      });

      eventMatrix[availablePlaceIndex] ? eventMatrix[availablePlaceIndex].push(event) : eventMatrix.push([event]);
      event.columnIndex = availablePlaceIndex;
      event.shiftLeft = availablePlaceIndex;

      setMaxShiftLeft(event);
  });

  eventMatrix.forEach((eventMatrix) => {
    eventMatrix.forEach((eventMatrix) => {
      setMaxShiftLeft(eventMatrix);
    });
  });

  return eventMatrix;
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

function setMaxShiftLeft(event) {
  event.collisionEvents.forEach((collisionEvent) => {
    if (collisionEvent.shiftLeft > event.shiftLeft) {
      event.shiftLeft = collisionEvent.shiftLeft;
    }
    if (collisionEvent.shiftLeft < event.shiftLeft) {
      collisionEvent.shiftLeft = event.shiftLeft;
    }
  });
  return event;
}

function getEventInformation(sortedEvents) {
  return sortedEvents.reduce((acc, event) => {
    acc.push({
      start: event.start,
      end: event.end,
      startDate: format12HourClock(addMinutesToCalendarStartTime(event.start)),
      endDate: format12HourClock(addMinutesToCalendarStartTime(event.end)),
      collisionEvents: [],
      columnIndex: 0,
      shiftLeft: 0,
    });
    return acc;
  }, []);
}

function renderCalendarEvents(eventInformation) {
  let content = '';
  eventInformation.map((event) => {
    const scaledPos = getScaledPosition(event.start, event.end);
    const { startDate, endDate } = event;
    const leftColumnWidth = Math.floor(CALENDAR_PROPERTIES.width / (event.shiftLeft + 1));
    const left = event.columnIndex * leftColumnWidth + CALENDAR_PROPERTIES.padding;
    const top = scaledPos.startPos;
    const height = event.end - event.start;

    content += `
    <div class="event" style="top: ${top}px; left: ${left}px; width: ${leftColumnWidth}px; height: ${height}px;">
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
    startPos: Math.floor((CALENDAR_PROPERTIES.totalHeight * startTime) / totalMinutes),
    endPos: Math.floor((CALENDAR_PROPERTIES.totalHeight * endTime) / totalMinutes),
  };
}
