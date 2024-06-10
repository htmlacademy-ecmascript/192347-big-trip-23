import AbstractView from '../framework/view/abstract-view.js';
import { DateFormat, formatDate, countDuration } from '../utils.js';

function createEventTemplate(event, offers, destinations, updatedOffers) {
  const { basePrice, dateFrom, dateTo, type, isFavorite } = event;

    //вынести в util
  const typeOffers = offers.find((offer) => offer.type === event.type).offers
  const selectedOffers =  updatedOffers.map(Number) || [];
  const filteredOffers = typeOffers.filter(offer => selectedOffers.includes(offer.id));

  const currentDestination = destinations.find((destination) => destination.id === event.destination);
  const dateAttribute = formatDate(dateFrom, DateFormat.ATTRIBUTE_DATE);
  const eventDate = formatDate(dateFrom, DateFormat.DATE);
  const dateTimeAttributeFrom = formatDate(dateFrom, DateFormat.ATTRIBUTE_DATE_TIME);
  const eventTimeFrom = formatDate(dateFrom, DateFormat.TIME);
  const eventTimeTo = formatDate(dateTo, DateFormat.TIME);
  const dateTimeAttributeTo = formatDate(dateTo, DateFormat.ATTRIBUTE_DATE_TIME);
  const eventDuration = countDuration(dateFrom, event.dateTo);

  return (
    `
    <li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="${dateAttribute}">${eventDate}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${type} ${currentDestination.name}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="${dateTimeAttributeFrom}">${eventTimeFrom}</time>
                    &mdash;
                    <time class="event__end-time" datetime="${dateTimeAttributeTo}">${eventTimeTo}</time>
                  </p>
                  <p class="event__duration">${eventDuration}</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                ${filteredOffers.map((offer) => (
      `<li class="event__offer">
                    <span class="event__offer-title">${offer.title}</span>
                    &plus;&euro;&nbsp;
                    <span class="event__offer-price">${offer.price}</span>
                  </li>`
    )).join('')}
                </ul>
                <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>
    `
  );
}

export default class EventView extends AbstractView {
  #event = null;
  #destinations = null;
  #offers = null;
  #handleEditClick = null;
  #rollupButton = null;
  #handleFavoriteClick = null;
  #updatedOffers = null;

  constructor({ event, destinations, offers, onEditClick, onFavoriteClick, updatedOffers }) {
    super();
    this.#event = event;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#updatedOffers = updatedOffers;
    this.#handleEditClick = onEditClick;
    this.#handleFavoriteClick = onFavoriteClick;

    this.#rollupButton = this.element.querySelector('.event__rollup-btn');
    this.#rollupButton.addEventListener('click', this.#onEditClick);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#onFavoriteClick);
  }

  get template() {
    return createEventTemplate(this.#event, this.#offers, this.#destinations, this.#updatedOffers);
  }

  removeElement() {
    super.removeElement();
    this.#rollupButton.removeEventListener('click', this.#onEditClick);
  }

  #onEditClick = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();

  };

  #onFavoriteClick = () => {
    this.#handleFavoriteClick();
  };
}
