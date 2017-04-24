import navbarTemplate from './navbar.html';

class NavbarController {
  constructor() {
    this.brand = 'Cartesian Plane Nearest Points';
  }
}

const navbarComponent = {
  template: navbarTemplate,
  controller: NavbarController
};

export default navbarComponent;
