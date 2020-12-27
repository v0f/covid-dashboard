import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodataWorldLow from '@amcharts/amcharts4-geodata/worldLow';

const map = am4core.createFromConfig({
  geodata: am4geodataWorldLow,
  projection: 'Miller',
  series: [{
    type: 'MapPolygonSeries',
    useGeodata: true,
    // dataFields: {
    //   value: 'population',
    //   id: 'countryInfo.iso2',
    // },
    exclude: ['AQ'],
    heatRules: [{
      target: 'mapPolygons.template',
      property: 'fill',
      min: '#f9a0a0',
      max: '#fd0707',
      logarithmic: false,
    }],
    tooltip: {
      getFillFromObject: false,
      background: {
        fill: '#fff',
      },
      label: {
        fill: '#000',
        fontSize: 20,
      },
    },
    mapPolygons: {
      // propertyFields: {
      //   dummyData: 'cases',
      // },
      adapter: {
        tooltipText: (text, target) => {
          const data = target.dataItem.dataContext;
          if (data.value === undefined) return `${data.name}: no data`;
          return `${data.name}: ${data.value}`;
        },
      },
      tooltipText: '{name}: {value}',
      fill: '#666',
      states: {
        hover: {
          properties: {
            fill: '#87cefa',
          },
        },
      },
    },
  }],
}, 'map', am4maps.MapChart);

export default map;
