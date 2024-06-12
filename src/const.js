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

const DatepickerConfig = {
  dateFormat: 'd/m/y H:i',
  enableTime: true,
  'time_24hr': true,
};

const getDefaultEvent = () => ({
  id: '',
  basePrice: 0,
  dateFrom: '2024-06-11T12:22:13.375Z',
  dateTo: '2024-06-11T16:22:13.375Z',
  destination: 0,
  isFavorite: false,
  offers: [],
  type: 'flight'
});

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers'
};

const DISABLED_SORT_TYPES = [
  SortType.EVENT,
  SortType.OFFERS
];

const FilterTypes = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
  PRESENT: 'present',
};

const DEFAULT_FILTER_TYPE = FilterTypes[-1];

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

const Mode = {
  DEFAULT: 'DEFAULT',
  EDIT: 'EDIT',
};

const UserAction = {
  UPDATE_EVENT: 'UPDATE_EVENT',
  ADD_EVENT: 'ADD_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export {
  EVENT_TYPES,
  getDefaultEvent,
  FilterTypes,
  EventEmptyListMessages,
  DateFormat,
  DEFAULT_FILTER_TYPE,
  Mode,
  SortType,
  DISABLED_SORT_TYPES,
  DatepickerConfig,
  UserAction,
  UpdateType
};
