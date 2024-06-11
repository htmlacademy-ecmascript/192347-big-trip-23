import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { EVENT_TYPES, DatepickerConfig } from '../const.js';
import { capitalizeFirstLetter, formatDate, DateFormat } from '../utils.js';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/material_blue.css';



function editEventTemplate(event, destinations, offers) {
  const { basePrice, dateFrom, dateTo, type } = event;


  //вынести в util
  const typeOffers = offers.find((offer) => offer.type === event.type).offers;
  const selectedOffers =  event.offers.map(Number) || [];
  const filteredOffers = typeOffers.filter(offer => selectedOffers.includes(offer.id));
  
  const currentDestination = destinations.find((destination) => destination.id === event.destination);
  const eventId = event.id;
  const { name, description, pictures } = currentDestination || {};

  const dateTimeEditTo = formatDate(dateTo, DateFormat.EDIT_DATE_TIME);
  const dateTimeEditFrom = formatDate(dateFrom, DateFormat.EDIT_DATE_TIME);



  return (
    `
    <li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-${eventId}">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${eventId}" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>

              ${EVENT_TYPES.map((eventType) => (`<div class="event__type-item">
          <input id="event-type-${eventType}-${eventId}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${eventType}" ${eventType === type ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--${eventType}" for="event-type-${eventType}-${eventId}">${capitalizeFirstLetter(eventType)}</label>
              </div>`
    )).join('')}

            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-${eventId}">
            ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-${eventId}" type="text" name="event-destination" value="${name || ''}" list="destination-list-${eventId}">
          <datalist id="destination-list-${eventId}">
          ${destinations.map((destination) => `<option value="${destination.name}"></option>`).join('')}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-${eventId}">From</label>
          <input class="event__input  event__input--time" id="event-start-time-${eventId}" type="text" name="event-start-time" value="${dateTimeEditFrom}">
          —
          <label class="visually-hidden" for="event-end-time-${eventId}">To</label>
          <input class="event__input  event__input--time" id="event-end-time-${eventId}" type="text" name="event-end-time" value="${dateTimeEditTo}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-${eventId}">
            <span class="visually-hidden">Price</span>
            €
          </label>
          <input class="event__input  event__input--price" id="event-price-${eventId}" type="text" name="event-price" value="${basePrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">${eventId ? 'Delete' : 'Cancel'}</button>
        ${eventId ? (
      `<button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>`
    ) : ''}
        
      </header>
      <section class="event__details">
      ${typeOffers.length ?
      `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
      ${typeOffers.map((typeOffer) => (
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${typeOffer.title}-${eventId}" type="checkbox" name="event-offer-${typeOffer.title}" data-offer-id="${typeOffer.id}" ${filteredOffers.map((offer) => offer.id).includes(typeOffer.id) ? 'checked' : ''}>
        <label class="event__offer-label" for="event-offer-${typeOffer.title}-${eventId}">
          <span class="event__offer-title">${typeOffer.title}</span>
          +€&nbsp;
          <span class="event__offer-price">${typeOffer.price}</span>
        </label>
      </div>`
    )).join('')}
      </div>
      </section>`
      : ''}
    ${currentDestination ? (
      `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${description}</p>
    ${pictures.length ? (
        `<div class="event__photos-container">
        <div class="event__photos-tape">
          ${pictures.map((pic) => `<img class="event__photo" src="${pic.src}" alt="${pic.description}">`)}
        </div>
      </div>`
      ) : ''}
    </section>`
    ) : ''}
      </section>
    </form>
  </li>`
  );
}

export default class EditEventView extends AbstractStatefulView {
  #destinations = null;
  #offers = null;
  #handleFormSubmit = null;
  #handleFormCancel = null;
  #handleFormDelete = null;

  #datepickerStart = null;
  #datepickerEnd = null;

  constructor({ event, destinations, offers, onFormCancel, onFormSubmit, onFormDelete }) {
    super();
    this._setState(EditEventView.parseEventToState(event));

    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleFormCancel = onFormCancel;
    this.#handleFormDelete = onFormDelete;
    this._restoreHandlers();
    this.#setDatepickers();
  }

  get template() {
    return editEventTemplate(this._state, this.#destinations, this.#offers);
  }

  reset(event) {
    this.updateElement(
      EditEventView.parseEventToState(event)
    );
  }

  removeElement() {
    super.removeElement();
    this.element.removeEventListener('submit', this.#onEventSubmit);
    this.element.querySelector('.event__rollup-btn').removeEventListener('click', this.#onEventCancel);
    this.element.querySelector('.event__reset-btn').removeEventListener('click', this.#onEventDelete);

    if (this.#datepickerStart) {
      this.#datepickerStart.destroy();
      this.#datepickerStart = null;
    }

    if (this.#datepickerEnd) {
      this.#datepickerEnd.destroy();
      this.#datepickerEnd = null;
    }
  }

  _restoreHandlers() {
    this.element.addEventListener('submit', this.#onEventSubmit);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#onEventCancel);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#onEventDelete);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#onEventType);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#onDestinationChange);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#onPriceChange);
    this.element.querySelector('.event__available-offers')?.addEventListener('change', this.#onOfferChange);
    this.#setDatepickers();
  }

  #onEventType = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value
    });
  }; 

  #onDestinationChange = (evt) => {
    evt.preventDefault();
    const destination = this.#destinations.find((element) => element.name === evt.target.value);
    this.updateElement({
      destination: destination.id
    });
  };

  #onPriceChange = (evt) => {
    this._setState({
      basePrice: evt.target.value
    });
  };

  #onOfferChange = (evt) => {
    evt.preventDefault();
    const selectedOffers = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));
    const realOffers = selectedOffers.map((item) => item.dataset.offerId);

    this._setState({
      offers: realOffers
    });
  };

  #onEventSubmit = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditEventView.parseStateToEvent(this._state));
  };

  #onEventCancel = (evt) => {
    evt.preventDefault();
    this.#handleFormCancel();
  };

  #onEventDelete = (evt) => {
    evt.preventDefault();
    this.#handleFormDelete(EditEventView.parseStateToEvent(this._state));
  }

  #setDatepickers() {
    this.#datepickerStart = flatpickr(this.element.querySelector('[name="event-start-time"]'),
      {
        ...DatepickerConfig,
        defaultDate: this._state.dateFrom,
        maxDate: this._state.dateTo,
        onChange: this.#onDateStartChange,
      },
    );

    this.#datepickerEnd = flatpickr(this.element.querySelector('[name="event-end-time"]'),
      {
        ...DatepickerConfig,
        defaultDate: this._state.dateTo,
        minDate: this._state.dateFrom,
        onChange: this.#onDateEndChange,
      },
    );
  }

  #onDateStartChange = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  };

  #onDateEndChange = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  };


  static parseEventToState(event) {
    return { ...event };
  }

  static parseStateToEvent(state) {
    return { ...state };
  }
}
