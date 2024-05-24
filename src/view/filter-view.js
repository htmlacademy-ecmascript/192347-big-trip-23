import AbstractView from '../framework/view/abstract-view.js';
import { FilterTypes } from '../const.js';

const filterTypes = Object.values(FilterTypes);
const getCheckedClass = (isChecked) => isChecked ? 'checked' : '';

function createFilterItemTemplate(value, isChecked) {
  return (
    `
    <div class="trip-filters__filter">
    <input id="filter-${value}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${value}" ${getCheckedClass(isChecked)}>
    <label class="trip-filters__filter-label" for="filter-${value}">${value}</label>
    </div>
    `
  );
}

function createFilterTemplate(currentFilter) {
  return (
    `
    <form class="trip-filters" action="#" method="get">
    ${filterTypes.map((filterType) => createFilterItemTemplate(filterType, filterType === currentFilter)).join('')}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>
  `
  );
}

export default class FilterView extends AbstractView {
  #currentFilter = '';

  constructor({ currentFilter }) {
    super();
    this.#currentFilter = currentFilter;
  }

  get template() {
    return createFilterTemplate(filterTypes, this.#currentFilter);
  }
}
