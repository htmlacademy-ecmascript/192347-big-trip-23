import AbstractView from '../framework/view/abstract-view.js';
import { EventEmptyListMessages } from '../const.js';

function createListEmptyTemplate(filterType) {
  return (
    `<p class="trip-events__msg">${EventEmptyListMessages[filterType]}</p>`
  );
}

export default class EmptyListView extends AbstractView {
  #filterType = '';

  constructor({ filterType }) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createListEmptyTemplate(this.#filterType);
  }
}
