import AbstractView from '../framework/view/abstract-view.js';
import { getFirstAndLastDates, getInfoTitle, getEventsTotalPrice } from '../utils.js';

function createTripInfoTemplate(events, destinations, offers) {

  const eventDestinations = events.map((event) => {
    const destinationId = event.destination;
    const destination = destinations.find((destinationItem) => destinationItem.id === destinationId);
    return destination;
  });
  const names = eventDestinations.map((city) => city.name);
  const eventsDates = events.map((event) => ({
    dateFrom: event.dateFrom,
    dateTo: event.dateTo
  }));

  const firstAndLastDates = getFirstAndLastDates(eventsDates);
  const tripInfoTitle = getInfoTitle(names);
  const sumOfTotalPrices = getEventsTotalPrice(events, offers);

  function getTripInfoContent(eventList, title, dates, totalPrice) {
    if (eventList.length === 0) {
      return '';
    }

    return `
      <div class="trip-info__main">
        <h1 class="trip-info__title">${title}</h1>
        <p class="trip-info__dates">${dates}</p>
      </div>
      <p class="trip-info__cost">
        Total: €&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
      </p>
    `;
  }

  const tripInfoContent = getTripInfoContent(events, tripInfoTitle, firstAndLastDates, sumOfTotalPrices);

  return `
    <section class="trip-main__trip-info trip-info">
      ${tripInfoContent}
    </section>
  `;
}

export default class TripInfoView extends AbstractView {
  #events = null;
  #destinations = null;
  #offers = null;

  constructor({ events, destinations, offers }) {
    super();
    this.#events = events;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  get template() {
    return createTripInfoTemplate(this.#events, this.#destinations, this.#offers);
  }
}
