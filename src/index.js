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
    let countries = await api.getCountriesList();
    countries = countries.filter((c) => c.population > 0);
    const global = await api.getGlobalInfo();
    global.country = 'Global';
    countries.push(global);
    this.countries = countries;
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
    const viewCases = this.viewMode.cases;
    this.countries
      .sort((a, b) => this.getNumber(b, viewCases) - this.getNumber(a, viewCases))
      .forEach((country) => {
        const li = document.createElement('li');
        li.country = country.country;
        if (country.country === this.country) li.classList.add('selected');
        const flag = country.country !== 'Global' ? `<img src="${country.countryInfo.flag}"` : '';
        li.innerHTML = `${flag}
          <span>${country.country}</span>
          <span>${this.getNumber(country, viewCases)}</span>`;
        list.append(li);
      });
  }

  renderTable() {
    const table = document.querySelector('.table');
    const country = this.countries.find((c) => c.country === this.country);
    table.innerHTML = '';
    table.innerHTML = `<h2>${country.country}</h2>
      <div>confirmed: ${this.getNumber(country, 'cases')}</div>
      <div>deaths: ${this.getNumber(country, 'deaths')}</div>
      <div>recovered: ${this.getNumber(country, 'recovered')}</div>`;
  }

  onCountriesListClick(e) {
    const li = e.target.closest('li');
    this.country = li.country;
    this.render();
  }

  onSelectChange(e) {
    const { name, value } = e.target;
    console.log(name, value);
    document.querySelectorAll(`select[name=${name}]`).forEach((s) => {
      const select = s;
      select.value = value;
    });
    this.viewMode[name] = value;
    this.render();
  }

  registerCallbacks() {
    document.querySelector('.countries').onclick = (e) => this.onCountriesListClick(e);
    document.querySelectorAll('select').forEach((select) => {
      select.addEventListener('change', (e) => this.onSelectChange(e));
    });
  }

  getNumber(country, cases) {
    const keys = {
      total: { cases: 'cases', deaths: 'deaths', recovered: 'recovered' },
      day: { cases: 'todayCases', deaths: 'todayDeaths', recovered: 'todayRecovered' },
    };
    const key = keys[this.viewMode.period][cases];
    let number = country[key];
    if (this.viewMode.numbers === 'per100k') number = Math.round((number / country.population) * 100000);
    return number;
  }
}

window.onload = () => {
  const app = new App();
  app.init();
};
