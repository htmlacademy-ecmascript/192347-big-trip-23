import AbstractView from '../framework/view/abstract-view.js';
import { calculateTotalBasePrice, getFirstAndLastDates, getInfoTitle } from '../utils.js';

function createTripInfoTemplate(events, destinations) {

  const eventDestinations = events.map((event) => {
    const destinationId = event.destination;
    const destination = destinations.find((dest) => dest.id === destinationId);
    return destination;
  });
  const names = eventDestinations.map((city) => city.name);
  const datesArray = events.map((event) => ({
    dateFrom: event.dateFrom,
    dateTo: event.dateTo
  }));

  const firstAndLastDates = getFirstAndLastDates(datesArray);
  const tripInfoTitle = getInfoTitle(names);
  const totalBasePrice = calculateTotalBasePrice(events);

  return (
    `
    <section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${tripInfoTitle}</h1>

      <p class="trip-info__dates">${firstAndLastDates}</p>
    </div>

    <p class="trip-info__cost">
      Total: €&nbsp;<span class="trip-info__cost-value">${totalBasePrice}</span>
    </p>
  </section>
  `
  );
}

export default class TripInfoView extends AbstractView{
  #events = null;
  #destinations = null;

  constructor({ events, destinations}) {
    super();
    this.#events = events;
    this.#destinations = destinations;
  }

  get template() {
    return createTripInfoTemplate(this.#events, this.#destinations);
  }
}
