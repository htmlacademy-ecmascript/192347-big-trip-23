const AUTHORIZATION = 'Basic msgviwhadaswsasbl';
const END_POINT = 'https://23.objects.htmlacademy.pro/big-trip';


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
  basePrice: 0,
  dateFrom: '',
  dateTo: '',
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

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const DEFAULT_FILTER_TYPE = FilterType[-1];

const EventEmptyListMessage = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.FUTURE]: 'There are no future events now',
};

const DateFormat = {
  DATE_MONTH: 'DD MMM',
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
  INIT: 'INIT',
};

export {
  AUTHORIZATION,
  END_POINT,
  EVENT_TYPES,
  getDefaultEvent,
  FilterType,
  EventEmptyListMessage,
  DateFormat,
  DEFAULT_FILTER_TYPE,
  Mode,
  SortType,
  DISABLED_SORT_TYPES,
  DatepickerConfig,
  UserAction,
  UpdateType
};
