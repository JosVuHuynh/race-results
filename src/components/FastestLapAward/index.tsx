import React, { useEffect, useState } from 'react'
import { ColumnFastestLap, DataFastestLap, FilterDataFastestLap } from '../../utils/type';
import getDataResults from '../../utils/handleCsv';
import DataTable from '../DataTable';
import { getFastestLapResultsBySearch } from '../../utils/handleSearch';

export default function FastestLapAward() {
    const columns:  ColumnFastestLap[] = [
        { id: 'id', label: 'No', minWidth: 50 ,  },
        { id: 'year', label: 'Year', minWidth: 50 ,  },
        { id: 'grandPrix', label: 'Grand Prix', minWidth: 10 ,  },
        {
          id: 'driver',
          label: 'Driver',
          minWidth: 100,
        },
        {
          id: 'car',
          label: 'Car',
          minWidth: 170,
        },
        {
          id: 'time',
          label: 'Time',
          minWidth: 50,
        },
      ];
    
    const [fastestLapResults, setFastestLapResult] = useState<DataFastestLap[]>([]);
    const [fastestLapSearchResults, setFastestLapSearchResult] = useState<DataFastestLap[]>([]);
    const [keywordsSearch, setKeywordsSearch] = useState<FilterDataFastestLap>({
        year: '',
        grandPrix: '',
        driver: '',
        car: '',
    })

    useEffect(() => {
        getFastestLap();
    }, [])
    
    async function getFastestLap() {
        setFastestLapResult(await getDataResults('dataset/fastest_laps.csv'));
        setFastestLapSearchResult(await getDataResults('dataset/fastest_laps.csv'));
    }

    const handleChangeSearch = (keyword: string, key: string) => {
        if (keywordsSearch.hasOwnProperty(key) ){
            keywordsSearch[key as keyof typeof keywordsSearch] = keyword;
            setFastestLapSearchResult(getFastestLapResultsBySearch(fastestLapResults, keywordsSearch))
        }

    }
  return (
    <div>
        <DataTable columns={columns} resultData={fastestLapSearchResults} typeTable={'fastestLap'} handleChangeSearch={handleChangeSearch}/>
    </div>
  )
}
