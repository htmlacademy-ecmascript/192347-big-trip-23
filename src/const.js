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
  dateFrom: dayjs(new Date()),
  dateTo: dayjs(new Date()),
  destination: 0,
  isFavorite: false,
  offers: [],
  type: 'flight'
});

export {EVENT_TYPES, getDefaultEvent};
