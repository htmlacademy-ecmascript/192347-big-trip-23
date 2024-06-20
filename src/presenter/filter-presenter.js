import FilterView from '../view/filter-view';
import { render, replace, remove } from '../framework/render.js';
import { FilterType, UpdateType } from '../const';
import { filter } from '../utils.js';

export default class FilterPresenterPresenter {
  #container = null;
  #filterModel = null;
  #eventModel = null;

  #filterComponent = null;

  constructor({ container, filterModel, eventModel }) {
    this.#container = container;
    this.#filterModel = filterModel;
    this.#eventModel = eventModel;

    this.#eventModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const events = this.#eventModel.events;

    return Object.values(FilterType).map((type) => ({
      type,
      count: filter[type](events).length
    }));
  }

  init() {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView({
      filters,
      currentFilterType: this.#filterModel.filter,
      onFilterTypeChange: this.#handleFilterTypeChange
    });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#container);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filters) => {
    if (this.#filterModel.filter === FilterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filters);
  };
}
