import FilterView from '../view/filter-view';
import { render } from '../framework/render';
import { DEFAULT_FILTER_TYPE } from '../const';

export default class FilterPresenterPresenter {
  #container = null;
  #filterModel = null;

  constructor({ container, filterModel }) {
    this.#container = container;
    this.#filterModel = filterModel;
  }

  #renderFilters(filterTypes) {
    render(new FilterView({ filterTypes, currentFilter: DEFAULT_FILTER_TYPE }), this.#container);
  }


  init() {
    this.#renderFilters(this.#filterModel.filterTypes);
  }

}
