import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { DateFormat, SortType, FilterTypes } from './const';
dayjs.extend(duration);

function calculateTotalBasePrice(events) {
  return events.reduce((total, event) => total + event.basePrice, 0);
}

function getFirstAndLastDates(datesArray) {
  if (datesArray.length === 0) {
    return ' ';
  } else {
    const firstDateFrom = formatDate(datesArray[0].dateFrom, DateFormat.DATE_MONTH);
    const lastDateTo = formatDate(datesArray[datesArray.length - 1].dateTo, DateFormat.DATE_MONTH);

    const firstDateMonth = dayjs(datesArray[0].dateFrom).format('MMM');
    const lastDateMonth = dayjs(datesArray[datesArray.length - 1].dateTo).format('MMM');

    if (firstDateMonth === lastDateMonth) {
      const firstDateDay = dayjs(datesArray[0].dateFrom).format('DD');
      const lastDateDay = dayjs(datesArray[datesArray.length - 1].dateTo).format('DD');
      return `${firstDateDay} - ${lastDateDay} ${firstDateMonth}`;
    } else {
      return `${firstDateFrom} - ${lastDateTo}`;
    }
  }
}

function formatDate(date, dateFormat) {
  return dayjs(date).format(dateFormat);
}

function getInfoTitle(names) {
  if (names.length > 3) {
    return `${names[0]} - ... - ${names[names.length - 1]}`;
  } else if (names.length === 3) {
    return names.join(' — ');
  } else if (names.length === 2) {
    return names.join(' — ');
  } else if (names.length === 1) {
    return names[0];
  }
  return '';
}

const sortEventsBy = {
  [SortType.DAY]: (events) => [...events].sort((a, b) => dayjs(a.dateFrom).diff(dayjs(b.dateFrom))),
  [SortType.TIME]: (events) => [...events].sort((a, b) => getTimeDifference(b.dateFrom, b.dateTo) - getTimeDifference(a.dateFrom, a.dateTo)),
  [SortType.PRICE]: (events) => [...events].sort((a, b) => b.basePrice - a.basePrice),
};
const sortEvents = (events, sortType) => sortEventsBy[sortType](events);

function getTimeDifference(dateFrom, dateTo) {
  const start = dayjs(dateFrom);
  const end = dayjs(dateTo);

  return end.diff(start);
}

function countDuration(dateFrom, dateTo) {
  const timeDifference = getTimeDifference(dateFrom, dateTo);

  const days = dayjs.duration(timeDifference).days();
  const hours = dayjs.duration(timeDifference).hours();
  const minutes = dayjs.duration(timeDifference).minutes();

  const eventDuration = [];

  if (days > 0) {
    eventDuration.push(dayjs(timeDifference).format(DateFormat.DAY));
  }
  if (hours > 0 || (hours === 0 && days > 0)) {
    eventDuration.push(dayjs(timeDifference).format(DateFormat.HOUR));
  }
  if (minutes >= 0) {
    eventDuration.push(dayjs(timeDifference).format(DateFormat.MINUTE));

    return eventDuration.join(' ');
  }
}

function capitalizeFirstLetter(str) {
  return str.replace(str[0], str[0].toUpperCase());
}

const isEmpty = (list) => list.length === 0;

const updateData = (data, update) => data.map((item) => item.id === update.id ? update : item);
const updateItem = (item, prop) => ({ ...item, ...prop });

const now = dayjs();

const filter = {
  [FilterTypes.EVERYTHING]: (events) => [...events],
  [FilterTypes.FUTURE]: (events) => [...events].filter(({ dateFrom }) => dayjs(dateFrom).isAfter(now)),
  [FilterTypes.PRESENT]: (events) => [...events].filter(({ dateFrom, dateTo }) => {
    const start = dayjs(dateFrom);
    const end = dayjs(dateTo);
    return start.isBefore(now) && end.isAfter(now);
  }),
  [FilterTypes.PAST]: (events) => events.filter(({ dateTo }) => dayjs(dateTo).isBefore(now)),
};

function getFilteredSelectedOffers(event, typeOffers, updatedOffers = []) {
  const selectedOffers = (updatedOffers.length > 0 ? updatedOffers : event.offers).map(String);
  return typeOffers.filter((offer) => selectedOffers.includes(offer.id));
}

const getInteger = (input) => {

  const parsedNumber = Number(input.replace(/\D/g, ''));
  return isNaN(parsedNumber) ? 0 : parsedNumber;

};

export { DateFormat, formatDate, countDuration, capitalizeFirstLetter, isEmpty, updateData, updateItem, sortEvents, sortEventsBy, filter, getFilteredSelectedOffers, getInteger, getInfoTitle, getFirstAndLastDates, calculateTotalBasePrice };
