import AbstractView from '../framework/view/abstract-view.js';

function createTripInfoTemplate(events) {
  const calculateTotalBasePrice = (events) => {
    return events.reduce((total, event) => total + event.basePrice, 0);
  };
  const totalBasePrice = calculateTotalBasePrice(events);
  return (
    `
    <section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">Amsterdam — Chamonix — Geneva</h1>

      <p class="trip-info__dates">18&nbsp;—&nbsp;20 Mar</p>
    </div>

    <p class="trip-info__cost">
      Total: €&nbsp;<span class="trip-info__cost-value">${totalBasePrice}</span>
    </p>
  </section>
  `
  );
}

export default class TripInfoView extends AbstractView {
  #events = null;

  constructor({ events }) {
    super();
    this.#events = events;
  }
  get template() {
    return createTripInfoTemplate(this.#events);
  }
}
