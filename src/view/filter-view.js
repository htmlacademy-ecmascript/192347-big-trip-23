import AbstractView from '../framework/view/abstract-view.js';
import { FilterTypes } from '../const.js';

const filterTypes = Object.values(FilterTypes);
const getCheckedClass = (isChecked) => isChecked ? 'checked' : '';

function createFilterItemTemplate(value, isChecked) {
  return (
    `
    <div class="trip-filters__filter">
      <input id="filter-${value}" class="trip-filters__filter-input visually-hidden" type="radio" name="trip-filter" value="${value}" ${getCheckedClass(isChecked)}>
      <label class="trip-filters__filter-label" for="filter-${value}">${value}</label>
    </div>
    `
  );
}

function createFilterTemplate(currentFilterType) {
  return (
    `
    <form class="trip-filters" action="#" method="get">
      ${filterTypes.map((filterType) => createFilterItemTemplate(filterType, filterType === currentFilterType)).join('')}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
    `
  );
}

export default class FilterView extends AbstractView {
  #currentFilter = null;
  #handleFilterTypeChange = null;

  constructor({ currentFilterType, onFilterTypeChange }) {
    super();
    this.#currentFilter = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template() {
    return createFilterTemplate(this.#currentFilter);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.value);
    console.log(evt.target.value);
  };
}
