import { state } from 'src/app';
import { format12HourClock, addMinutesToCalendarStartTime, getCalendarTotalMinutes } from 'src/dates';
import { CALENDAR_PROPERTIES } from 'src/calendar';

// Main function to initialize events
export function initEvent(events) {
  // Sort events by their start time
  const sortedEvents = getSortedEventsByStartTime(events);
  // Get detailed information about sorted events
  const eventInformation = getEventInformation(sortedEvents);

  // Calculate the event matrix to handle event positions
  calculateEventMatrix(eventInformation);
  // Render events on the calendar
  renderCalendarEvents(eventInformation);
}

function calculateEventMatrix(events) {
  // For the first event, no need to check collision status
  const eventMatrix = [[events[0]]];

  // Check each column until finding an available (no collision) place to add the event
  events.slice(1).forEach((event) => {
    let availablePlaceIndex = 0;
    let foundAvailablePlaceAlready = false;

    // Iterate through the existing columns to find a place without collisions
    eventMatrix.forEach((column, columnIndex) => {
      // Check for collisions with existing events in the current column
      const isCollisionDetected = column.some((compareEvent) => {
        console.log(event.startDate, event.endDate, 'compared with:', compareEvent.startDate, compareEvent.endDate);
        if (compareEvent.start < event.end && compareEvent.end > event.start) {
          console.log('collision detected');
          event.collisionEvents.push(compareEvent);
          return true;
        }
        return false;
      });

      // Determine the appropriate column for the current event
      if (!foundAvailablePlaceAlready) {
        availablePlaceIndex = isCollisionDetected ? availablePlaceIndex + 1 : columnIndex;
        foundAvailablePlaceAlready = !isCollisionDetected;
      }
    });

    // Add the event to the appropriate column or create a new column
    if (eventMatrix[availablePlaceIndex]) {
      eventMatrix[availablePlaceIndex].push(event);
    } else {
      eventMatrix.push([event]);
    }

    // Set the column index and shift left value for the event
    event.columnIndex = availablePlaceIndex;
    event.shiftLeft = availablePlaceIndex;

    // Adjust the maximum shift left value for the event
    setMaxShiftLeft(event);
  });

  // Ensure all events have the correct shift left value
  eventMatrix.forEach((column) => {
    column.forEach((event) => {
      setMaxShiftLeft(event);
    });
  });

  return eventMatrix;
}

// Function to sort events by their start time
function getSortedEventsByStartTime(events) {
  return events.sort((a, b) => {
    if (a.start !== b.start) return a.start - b.start;
    return a.end - b.end;
  });
}

// Function to adjust the maximum shift left value for an event
function setMaxShiftLeft(event) {
  event.collisionEvents.forEach((collisionEvent) => {
    const maxShift = Math.max(event.shiftLeft, collisionEvent.shiftLeft);
    event.shiftLeft = collisionEvent.shiftLeft = maxShift;
  });
  return event;
}

// Function to get detailed information about sorted events
function getEventInformation(sortedEvents) {
  return sortedEvents.map((event) => ({
    start: event.start,
    end: event.end,
    startDate: format12HourClock(addMinutesToCalendarStartTime(event.start)),
    endDate: format12HourClock(addMinutesToCalendarStartTime(event.end)),
    collisionEvents: [],
    columnIndex: 0,
    shiftLeft: 0,
  }));
}

// Function to render events on the calendar
function renderCalendarEvents(eventInformation) {
  let content = '';
  eventInformation.forEach((event) => {
    const { startPos } = getScaledPosition(event.start, event.end);
    const { startDate, endDate } = event;
    const leftColumnWidth = Math.floor(CALENDAR_PROPERTIES.width / (event.shiftLeft + 1));
    const left = event.columnIndex * leftColumnWidth + CALENDAR_PROPERTIES.padding;
    const height = event.end - event.start;

    // Create the HTML content for each event
    content += `
    <div class="event" style="top: ${startPos}px; left: ${left}px; width: ${leftColumnWidth}px; height: ${height}px;">
      <div class="border"></div>
      <div class="title">Sample Event</div>
      <div class="content_text">Event time: ${startDate} - ${endDate}</div>
    </div>`;
  });

  // Insert the generated HTML into the event container
  state.calendar.$event_container.innerHTML = content;
}

/**
 * Scale given event by the total time of the calendar event
 * @param {number} startTime - given event start time
 * @param {number} endTime - given event end time
 * @returns {Object} Scaled positions
 */
function getScaledPosition(startTime, endTime) {
  const totalMinutes = getCalendarTotalMinutes();

  return {
    startPos: Math.floor((CALENDAR_PROPERTIES.totalHeight * startTime) / totalMinutes),
    endPos: Math.floor((CALENDAR_PROPERTIES.totalHeight * endTime) / totalMinutes),
  };
}
