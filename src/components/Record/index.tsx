import React, { useEffect, useState } from 'react'
import { DataRaceResult, SeriesData } from '../../utils/type';
import getDataResults from '../../utils/handleCsv';
import getRaceResultsGroupBy from '../../utils/handleRecord';
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";


export default function Record() {

    const [raceResults, setRaceResults] = useState<DataRaceResult[]>([]);
    const [raceResultGroupByWinner, setRaceResultGroupByWinner] = useState<DataRaceResult[][]>();
    const [raceResultGroupByCar, setRaceResultGroupByCar] = useState<DataRaceResult[][]>();

    useEffect(() => {
        getDataRaceResults();

    }, [])

    let seriesDrivers: SeriesData[] =[{
        data: []
    }];

    let seriesTeams: SeriesData[] =[{
        data: []
    }];

    let  optionsDrivers : ApexOptions =  {
        chart: {
          type: 'bar',
          height: 380
        },
        plotOptions: {
          bar: {
            barHeight: '100%',
            distributed: true,
            horizontal: true,
            dataLabels: {
              position: 'bottom'
            },
          }
        },
        colors: ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e',
          '#f48024', '#69d2e7'
        ],
        dataLabels: {
          enabled: true,
          textAnchor: 'start',
          style: {
            colors: ['#fff']
          },
          formatter: function (val, opt) {
            return +val
          },
          offsetX: 0,
          dropShadow: {
            enabled: true
          }
        },
        stroke: {
          width: 1,
          colors: ['#fff']
        },
        xaxis: {
          categories: [
          ],
        },
        yaxis: {
          labels: {
            show: true
          }
        },
        title: {
            text: '',
            align: 'center',
            floating: true
        },
        subtitle: {
            text: '',
            align: 'center',
        },
        tooltip: {
          theme: 'dark',
          x: {
            show: true
          },
          y: {
            title: {
              formatter: function () {
                return ''
              }
            }
          }
        }
    }

    let  optionsTeams : ApexOptions =  {
        chart: {
          type: 'bar',
          height: 380
        },
        plotOptions: {
          bar: {
            barHeight: '100%',
            distributed: true,
            horizontal: true,
            dataLabels: {
              position: 'bottom'
            },
          }
        },
        colors: ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e',
          '#f48024', '#69d2e7'
        ],
        dataLabels: {
          enabled: true,
          textAnchor: 'start',
          style: {
            colors: ['#fff']
          },
          formatter: function (val, opt) {
            return +val
          },
          offsetX: 0,
          dropShadow: {
            enabled: true
          }
        },
        stroke: {
          width: 1,
          colors: ['#fff']
        },
        xaxis: {
          categories: [
          ],
        },
        yaxis: {
          labels: {
            show: true
          }
        },
        title: {
            text: '',
            align: 'center',
            floating: true
        },
        subtitle: {
            text: '',
            align: 'center',
        },
        tooltip: {
          theme: 'dark',
          x: {
            show: true
          },
          y: {
            title: {
              formatter: function () {
                return ''
              }
            }
          }
        }
    }

    if (raceResultGroupByWinner && raceResultGroupByWinner.length > 0){
        for (let i = 0; i < 10; i++) {
            seriesDrivers[0].data.push(raceResultGroupByWinner[i].length);
            optionsDrivers.xaxis?.categories.push(raceResultGroupByWinner[i][0].winner);
        }
    }  

    if (raceResultGroupByCar && raceResultGroupByCar.length > 0){
        for (let i = 0; i < 10; i++) {
            seriesTeams[0].data.push(raceResultGroupByCar[i].length);
            optionsTeams.xaxis?.categories.push(raceResultGroupByCar[i][0].car);
        }
    }  
  
    async function getDataRaceResults() {
        let raceResults =  await getDataResults('dataset/race_results.csv');
        let raceResultWinner = await getRaceResultsGroupBy(raceResults, 'winner')
        let raceResultWinnerSort =  await raceResultWinner.sort((a,b) => b.length - a.length);
        setRaceResultGroupByWinner(raceResultWinnerSort);
        let raceResultTeams = await getRaceResultsGroupBy(raceResults, 'car');
        let raceResultTeamsort =  await raceResultTeams.sort((a,b) => b.length - a.length);
        setRaceResultGroupByCar(raceResultTeamsort);
    }

    return (
        <div style={{width: '80%', margin: '0 auto'}}>
            <h2>Top 10 Best Drivers Since 1950</h2>
            <ReactApexChart options={optionsDrivers} series={seriesDrivers} type="bar" height={380} width={1000}/>
            <h2 style={{marginTop: '100px'}}>Top 10 Best Teams Since 1950</h2>
            <ReactApexChart options={optionsTeams} series={seriesTeams} type="bar" height={380} width={1000}/>
        </div>
    )
}
