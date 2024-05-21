import FilterView from '../view/filter-view';
import { render } from '../framework/render';

export default class FilterPresenterPresenter {
  // #filterComponent = new FilterView();
  #container = null;
  #eventModel = null;

  constructor({ container, eventModel }) {
    this.#container = container;
    this.#eventModel = eventModel;
  }

  #renderFilters(filterTypes) {
    render(new FilterView({ filterTypes, currentFilter: filterTypes[-1] }), this.#container);
  }

  init() {
    this.#renderFilters(this.#eventModel.filterTypes);
  }

}
