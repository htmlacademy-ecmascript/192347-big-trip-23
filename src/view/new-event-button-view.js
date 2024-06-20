import AbstractView from '../framework/view/abstract-view';

function createNewEventButtonTemplate() {
  return(
    `
    <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>
    
    `
  );
}

export default class NewEventButtonView extends AbstractView {
  #handleButtonClick = null;

  constructor({ onNewButtonClick }) {
    super();
    this.#handleButtonClick = onNewButtonClick;
    this.element.addEventListener('click', this.#onNewEventButtonClick);
  }

  get template() {
    return createNewEventButtonTemplate();
  }

  disable() {
    this.element.disabled = true;
  }

  enable() {
    this.element.disabled = false;
  }

  #onNewEventButtonClick = (evt) => {
    evt.preventDefault();
    this.#handleButtonClick();
  };
}
