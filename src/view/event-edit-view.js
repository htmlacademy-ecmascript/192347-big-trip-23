import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { EVENT_TYPES, DatepickerConfig } from '../const.js';
import { getInteger } from '../utils.js';
import { capitalizeFirstLetter, formatDate, DateFormat, getFilteredSelectedOffers } from '../utils.js';
import he from 'he';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/material_blue.css';

function editEventTemplate(event, destinations, offers) {
  const { basePrice, dateFrom, dateTo, type, isDisabled, isSaving, isDeleting } = event;
  const eventId = event.id;

  const typeOffers = offers.find((offer) => offer.type === event.type).offers;
  const filteredSelectedOffers = getFilteredSelectedOffers(event, typeOffers);

  const totalPrice = basePrice + filteredSelectedOffers.reduce((sum, event) => sum + event.price, 0);

  const currentDestination = destinations.find((destination) => destination.id === event.destination);
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
          <input class="event__input  event__input--destination" id="event-destination-${eventId}" 
          type="text" name="event-destination" value="${he.encode(name || '')}" list="destination-list-${eventId}" required>
          <datalist id="destination-list-${eventId}" required>
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
          <input class="event__input  event__input--price" id="event-price-${eventId}" type="number" name="event-price" value="${totalPrice}" min="1" max="100000">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
        <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>
        ${eventId ? (isDeleting ? 'Deleting...' : 'Delete') : 'Cancel'}</button>
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
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${typeOffer.title}-${eventId}" type="checkbox" name="event-offer-${typeOffer.title}" data-offer-id="${typeOffer.id}" ${filteredSelectedOffers.map((offer) => offer.id).includes(typeOffer.id) ? 'checked' : ''}>
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
  #handleEventDeleteClick = null;

  #datepickerStart = null;
  #datepickerEnd = null;

  constructor({ event, destinations, offers, onFormCancel, onFormSubmit, onFormDelete }) {
    super();
    this._setState(EditEventView.parseEventToState(event));

    this.#destinations = destinations;
    this.#offers = offers;

    this.#handleFormSubmit = onFormSubmit;
    this.#handleFormCancel = onFormCancel;
    this.#handleEventDeleteClick = onFormDelete;
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
    this.element.querySelector('.event__rollup-btn')?.removeEventListener('click', this.#onEventCancel);
    this.element.querySelector('.event__reset-btn')?.removeEventListener('click', this.#onFormDelete);

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
    this.element.querySelector('.event__rollup-btn')?.addEventListener('click', this.#onEventCancel);
    this.element.querySelector('.event__reset-btn')?.addEventListener('click', this.#onFormDelete);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#onEventType);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#onDestinationChange);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#onPriceChange);
    this.element.querySelector('.event__available-offers')?.addEventListener('change', this.#onOfferChange);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#onPriceInput);

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
    if (destination) {
      this.updateElement({
        destination: destination.id
      });
    } else {
      this.updateElement({
        destination: null
      });
    }
  };


  #onPriceChange = (evt) => this._setState({ basePrice: getInteger(evt.target.value) });

  #onPriceInput = (evt) => {
    evt.target.value = getInteger(evt.target.value);
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

  #onFormDelete = (evt) => {
    evt.preventDefault();
    this.#handleEventDeleteClick(EditEventView.parseStateToEvent(this._state));
  };

  #setDatepickers() {
    this.#datepickerStart = flatpickr(this.element.querySelector('[name="event-start-time"]'),
      {
        ...DatepickerConfig,
        defaultDate: this._state.dateFrom,
        // minDate: this._state.dateFrom,

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
    const currentEndDate = this._state.dateTo instanceof Date ? this._state.dateTo : new Date(this._state.dateTo);
    const newDateEnd = new Date(userDate.getTime() + 60000); // +1 минута

    // Проверка и сравнение дат
    if (userDate >= currentEndDate) {
      this.updateElement({
        dateFrom: userDate,
        dateTo: newDateEnd
      });

      this.#datepickerEnd.set('minDate', userDate); // Обновляет minDate для end datepicker
      this.#datepickerEnd.setDate(newDateEnd, false); // Устанавливает новую дату окончания, не вызывая событие изменения
    } else {
      this.updateElement({
        dateFrom: userDate
      });

      this.#datepickerEnd.set('minDate', userDate); // Обновляет minDate для end datepicker
    }
  };


  #onDateEndChange = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  };

  static parseEventToState(event) {

    return {
      ...event,
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };
  }

  static parseStateToEvent(state) {
    const event = { ...state }

    delete event.isDisabled;
    delete event.isSaving;
    delete event.isDeleting;

    return event;
  }
}
