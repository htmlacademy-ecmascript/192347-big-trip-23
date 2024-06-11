import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { DateFormat, SortType, FilterTypes } from './const';
dayjs.extend(duration);

function formatDate(date, dateFormat) {
  return dayjs(date).format(dateFormat);
}

const sortEventsBy = {
  [SortType.DAY]: (events) => [...events],
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
  if (hours === 0 && days > 0) {
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

export { DateFormat, formatDate, countDuration, capitalizeFirstLetter, isEmpty, updateData, updateItem, sortEvents, sortEventsBy, filter };
