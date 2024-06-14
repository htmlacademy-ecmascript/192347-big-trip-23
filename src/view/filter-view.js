import AbstractView from '../framework/view/abstract-view.js';

function createFilterTemplate(currentFilterType, filters) {
  return (
    `
    <form class="trip-filters" action="#" method="get">
    ${filters.map((filter) =>
      `
    <div class="trip-filters__filter">
      <input id="filter-${filter.type}" class="trip-filters__filter-input visually-hidden" type="radio" name="trip-filter" value="${filter.type}" ${filter.count === 0 ? 'disabled' : ''} ${filter.type === currentFilterType ? 'checked' : ''}>
      <label class="trip-filters__filter-label" for="filter-${filter.type}">${filter.type}</label>
    </div>
    `
    ).join('')}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
    `
  );
}

export default class FilterView extends AbstractView {
  #currentFilter = null;
  #handleFilterTypeChange = null;
  #filters = null;

  constructor({ currentFilterType, onFilterTypeChange, filters }) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('change', this.#onFilterTypeChange);
  }

  get template() {
    return createFilterTemplate(this.#currentFilter, this.#filters);
  }

  #onFilterTypeChange = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.value);

  };
}
