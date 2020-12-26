import api from './api';

class App {
  constructor() {
    // this.cases = 'cases';
    // this.period = 'total';
    // this.numbers = 'absolute';
    this.country = 'global';
    this.viewMode = {
      cases: 'cases',
      period: 'total',
      numbers: 'absolute',
    };
  }

  async init() {
    this.countries = await api.getCountriesList();
    this.global = await api.getGlobalInfo();
    this.global.country = 'Global';
    // Object.assign(this.global, { country: 'Global' });
    this.countries.push(this.global);
    this.render();

    document.querySelector('.preloader').classList.remove('show');
  }

  render() {
    this.renderCountriesList();
    this.renderTable();
  }

  renderCountriesList() {
    const list = document.querySelector('.countries');
    list.innerHTML = '';
    Array.from(this.countries)
      .sort((a, b) => b.cases - a.cases)
      .forEach((country) => {
        const li = document.createElement('li');
        const flag = country.country !== 'Global' ? `<img src="${country.countryInfo.flag}"` : '';
        const isSelected = country === this.country;
        li.innerHTML = `${flag}
          <span class="${isSelected ? 'selected' : ''}">${country.country}</span>
          <span>${country.cases}</span>`;
        list.append(li);
      });
  }

  renderTable() {
    const table = document.querySelector('.table');
    table.innerHTML = '';
    table.innerHTML = `<h2>Global</h2>
      <div>confirmed: ${this.global.cases}</div>
      <div>deaths: ${this.global.deaths}</div>
      <div>recovered: ${this.global.recovered}</div>`;
  }
}

window.onload = () => {
  const app = new App();
  app.init();
};
