async function getCountriesList() {
  return fetch('https://disease.sh/v3/covid-19/countries')
    .then((response) => response.json());
}

async function getGlobalInfo() {
  return fetch('https://disease.sh/v3/covid-19/all')
    .then((response) => response.json());
}

export default {
  getCountriesList,
  getGlobalInfo,
};
