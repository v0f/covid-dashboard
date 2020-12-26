import api from './api';

class App {
  constructor() {
    // this.cases = 'cases';
    // this.period = 'total';
    // this.numbers = 'absolute';
    this.country = 'Global';
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
    this.registerCallbacks();

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
        li.country = country.country;
        if (country.country === this.country) li.classList.add('selected');
        const flag = country.country !== 'Global' ? `<img src="${country.countryInfo.flag}"` : '';
        li.innerHTML = `${flag}
          <span>${country.country}</span>
          <span>${country.cases}</span>`;
        list.append(li);
      });
  }

  renderTable() {
    const table = document.querySelector('.table');
    const country = this.countries.find((c) => c.country === this.country);
    table.innerHTML = '';
    table.innerHTML = `<h2>${country.country}</h2>
      <div>confirmed: ${country.cases}</div>
      <div>deaths: ${country.deaths}</div>
      <div>recovered: ${country.recovered}</div>`;
  }

  onCountriesListClick(e) {
    const li = e.target.closest('li');
    this.country = li.country;
    this.render();
  }

  registerCallbacks() {
    document.querySelector('.countries').onclick = (e) => this.onCountriesListClick(e);
  }
}

window.onload = () => {
  const app = new App();
  app.init();
};
