import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { DateFormat, SortType, FilterTypes } from './const';
dayjs.extend(duration);

function getEventsTotalPrice(events, offers) {

  const offerPriceMap = offers.reduce((acc, offerGroup) => {
    offerGroup.offers.forEach((offer) => {
      acc[offer.id] = offer.price;
    });
    return acc;
  }, {});

  const eventsTotalPrice = events.map((event) => {
    const offerPrices = event.offers.map((offerId) => offerPriceMap[offerId] || 0);
    const totalPrice = event.basePrice + offerPrices.reduce((acc, price) => acc + price, 0);
    return totalPrice;
  });

  return eventsTotalPrice.reduce((acc, price) => acc + price, 0);
}

function getFirstAndLastDates(datesArray) {
  if (datesArray.length === 0) {
    return ' ';
  } else {
    const firstDateFrom = formatDate(datesArray[0].dateFrom, DateFormat.DATE_MONTH);
    const lastDateTo = formatDate(datesArray[datesArray.length - 1].dateTo, DateFormat.DATE_MONTH);

    return `${firstDateFrom} - ${lastDateTo}`;
  }
}


function formatDate(date, dateFormat) {
  return date ? dayjs(date).format(dateFormat) : '';
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
  const start = dayjs(dateFrom);
  const end = dayjs(dateTo);

  const resultDays = end.diff(start, 'day');
  const resultHours = end.diff(start, 'hour');
  const restHours = (resultHours % 24).toString().padStart(2, '0');
  const restMinutes = (end.diff(start, 'minute') % 60).toString().padStart(2, '0');

  const resultParts = [];
  resultParts.push(
    (resultDays ? `${resultDays.toString().padStart(2, '0')}D` : ''),
    (resultHours ? `${restHours}H` : ''),
    `${restMinutes}M`);
  return resultParts.join(' ').trim();
}

function capitalizeFirstLetter(str) {
  return str.replace(str[0], str[0].toUpperCase());
}

const isEmpty = (list) => list.length === 0;

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

export {
  DateFormat,
  formatDate,
  countDuration,
  capitalizeFirstLetter,
  isEmpty,
  sortEvents,
  sortEventsBy,
  filter,
  getFilteredSelectedOffers,
  getInteger,
  getInfoTitle,
  getFirstAndLastDates,
  getEventsTotalPrice
};
