import { events } from '../mock/events';
import { destinations } from '../mock/destination';
import { offers } from '../mock/offers';

export default class EventModel {
  events = events;
  destinations = destinations;
  offers = offers;

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
