import cartesianTemplate from './cartesian.html';
import './cartesian.scss';

class CartesianController {
  static get $inject() {
    return [
      '$scope',
      '$http'
    ]
  }

  constructor($scope, $http) {
    this.$scope = $scope;
    this.$http = $http;
    this.points = [];

    this.xCoord = 0;
    this.yCoord = 0;

    this.$scope.$watchGroup(['$ctrl.xCoord', '$ctrl.yCoord'], () => {
      this.$scope.$evalAsync(() => {
        this.calcDistance();
      });
    });
  }

  $onInit() {
    this.$http.get('data.json').then(({data}) => {
      this.points = data;
      this.calcDistance();
    });
  }

  calcDistance() {
    var x = 0;
    var y = 0;
    var coords = [];
    var distance = 0;

    this.points.forEach(point => {
      coords = point.value.split(",");
      x = Number(coords[0]);
      y = Number(coords[1]);
      distance = Math.sqrt((this.xCoord - x) * (this.xCoord - x) + (this.yCoord - y) * (this.yCoord - y));
      point.distance = distance;
    });
  }
}

const cartesianComponent = {
  template: cartesianTemplate,
  controller: CartesianController
};

export default cartesianComponent;
