import AbstractView from '../framework/view/abstract-view.js';
import { EventEmptyListMessages } from '../const.js';

function createListEmptyTemplate(filterTypes) {
  const tripEventsMessage = EventEmptyListMessages[filterTypes];

  return (
    `<p class="trip-events__msg">${tripEventsMessage}</p>`
  );
}

export default class EmptyListView extends AbstractView {
  #filterTypes = null;

  constructor({ filterType }) {
    super();
    this.#filterTypes = filterType;
  }

  get template() {
    return createListEmptyTemplate(this.#filterTypes);
  }
}
