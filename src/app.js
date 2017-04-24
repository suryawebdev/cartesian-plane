import angular from 'angular';
import appTemplate from './app.html'

import Common from './common';
import Components from './components';

import './app.scss';

function bootstrap() {
  angular.bootstrap(document, ['supreme-train'])
}

const appComponent = {
  template: appTemplate,
  controller: class AppController {}
};


angular
  .module('supreme-train', [
    Common,
    Components
  ])
  .component('app', appComponent);

angular
  .element(document)
  .ready(bootstrap);
