import AbstractView from '../framework/view/abstract-view.js';
import { SortType, DISABLED_SORT_TYPE } from '../const.js';

function createSortItemTemplate(type, isChecked) {
  return (
    `
    <div class="trip-sort__item  trip-sort__item--${type}">
    <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${type}" ${isChecked ? 'checked' : ''}
    data-sort-type="${type}" ${DISABLED_SORT_TYPE.includes(type) ? ' disabled' : ''}>
    <label class="trip-sort__btn" for="sort-${type}">${type}</label>
  </div>
    `
  );
}

function createSortTemplate(currentSortType) {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${Object.values(SortType).map((type) => createSortItemTemplate(type, type === currentSortType)).join('')}
  </form>`
  );
}

export default class SortView extends AbstractView {
  #currentSortType = '';
  #handleSortTypeChange = null;

  constructor({currentSortType, onSortTypeChange}) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;
    this.#currentSortType = currentSortType || SortType.DAY;
    this.element.addEventListener('change', this.#onSortTypeChange);
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  #onSortTypeChange = (evt) => {
    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
