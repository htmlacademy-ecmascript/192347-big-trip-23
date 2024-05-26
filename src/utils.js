import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { DateFormat } from './const';
dayjs.extend(duration);

function formatDate(date, dateFormat) {
  return dayjs(date).format(dateFormat);
}

function countDuration(dateFrom, dateTo) {
  const start = dayjs(dateFrom);
  const end = dayjs(dateTo);

  const diffMilliseconds = end.diff(start);

  const days = dayjs.duration(diffMilliseconds).days();
  const hours = dayjs.duration(diffMilliseconds).hours();
  const minutes = dayjs.duration(diffMilliseconds).minutes();

  const eventDuration = [];

  if (days > 0) {
    eventDuration.push(dayjs(diffMilliseconds).format(DateFormat.DAY));
  }
  if (hours === 0 && days > 0) {
    eventDuration.push(dayjs(diffMilliseconds).format(DateFormat.HOUR));
  }
  if (minutes >= 0) {
    eventDuration.push(dayjs(diffMilliseconds).format(DateFormat.MINUTE));

    return eventDuration.join(' ');
  }
}

function capitalizeFirstLetter(str) {
  return str.replace(str[0], str[0].toUpperCase());
}


const isEmpty = (list) => list.length === 0;

const updateData = (data, update) => data.map((item) => item.id === update.id ? update : item);
const updateItem = (item, prop) => ({ ...item, ...prop });

export { DateFormat, formatDate, countDuration, capitalizeFirstLetter, isEmpty, updateData, updateItem };
