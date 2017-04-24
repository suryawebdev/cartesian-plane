import angular from 'angular';
import cartesianComponent from './cartesian/cartesian';

const module = angular
  .module('components', [])
  .component('cartesian', cartesianComponent)
  .name;

export default module;
