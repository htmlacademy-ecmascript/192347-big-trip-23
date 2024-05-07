import { events } from '../mock/events';
import { destinations } from '../mock/destination';
import { offers } from '../mock/offers';

export default class EventModel {
  constructor() {
    this.events = [];
    this.destinations = [];
    this.offers = [];
  }

  init() {
    this.events = events;
    this.destinations = destinations;
    this.offers = offers;
  }

  getEvents() {
    return this.events;
  }

  getDestinations() {
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }
}
