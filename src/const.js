import dayjs from 'dayjs';

const EVENT_TYPES = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant'
];

const getDefaultEvent = () => ({
  id: '',
  basePrice: 0,
  dateFrom: dayjs(),
  dateTo: dayjs(),
  destination: 0,
  isFavorite: false,
  offers: [],
  type: 'flight'
});

const SORT_TYPES = ['day', 'event', 'time', 'price', 'offers'];

const FilterTypes = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
  PRESENT: 'present',
};

const EventEmptyListMessages = {
  [FilterTypes.EVERYTHING]: 'Click New Event to create your first point',
  [FilterTypes.PAST]: 'There are no past events now',
  [FilterTypes.PRESENT]: 'There are no present events now',
  [FilterTypes.FUTURE]: 'There are no future events now',
};

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

export {EVENT_TYPES, getDefaultEvent, SORT_TYPES, FilterTypes, EventEmptyListMessages, DateFormat};
