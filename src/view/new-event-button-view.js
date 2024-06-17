import AbstractView from '../framework/view/abstract-view';

function createNewEventButtonTemplate() {
  return(
    `
    <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>
    
    `
  );
}

export default class NewButtonView extends AbstractView {
  #handleButtonClick = null; 

  constructor({ onButtonClick }) {
    super();
    this.#handleButtonClick = onButtonClick;
    this.element.addEventListener('click', this.#onNewEventButtonClick);
  }

  get template() {
    return createNewEventButtonTemplate();
  }

  #onNewEventButtonClick = (evt) => {
    evt.preventDefault();
    this.#handleButtonClick();
  };

  disable() {
    this.element.disabled = true;
  }

  enable() {
    this.element.disabled = false;
  }
}