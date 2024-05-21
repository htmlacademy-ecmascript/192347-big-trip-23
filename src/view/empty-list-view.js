import AbstractView from '../framework/view/abstract-view.js';
import { EventEmptyListMessages } from '../const.js';

function createListEmptyTemplate(filterTypes) {
  return (
    `<p class="trip-events__msg">${EventEmptyListMessages[filterTypes]}</p>`
  );
}

export default class EmptyListView extends AbstractView {
  #filterTypes = '';

  constructor({ filterTypes }) {
    super();
    this.#filterTypes = filterTypes;
  }

  get template() {
    return createListEmptyTemplate(this.#filterTypes);
  }
}
