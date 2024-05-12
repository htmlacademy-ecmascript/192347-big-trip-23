import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const DateFormat = {
  DATE: 'MMM DD',
  TIME: 'HH:mm',
  ATTRIBUTE_DATE_TIME: 'YYYY-MM-DDTHH:mm',
  ATTRIBUTE_DATE: 'YYYY-MM-DD',
  EDIT_DATE_TIME: 'DD/MM/YY HH:mm',
  DAY: 'DD[D]',
  HOUR: 'HH[H]',
  MINUTE: 'mm[M]'
};

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

export { DateFormat, formatDate, countDuration, capitalizeFirstLetter };
