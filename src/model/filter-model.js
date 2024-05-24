import { FilterTypes } from '../const';

export default class FilterModel {

  #filterTypes = Object.values(FilterTypes);

  get filterTypes() {
    return this.#filterTypes;
  }
}
