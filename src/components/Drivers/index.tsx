import React, { useEffect, useState } from 'react';
import getDataResults from '../../utils/handleCsv';
import { ColumnDrivers, DataDrivers, FilterDataDrivers, SearchType } from '../../utils/type';
import DataTable from '../DataTable';
import { getDrivesResultsBySearch } from '../../utils/handleSearch';


export default function Drivers() {
    const columns: ColumnDrivers[] = [
        { id: 'id', label: 'No', minWidth: 50 ,  },
        { id: 'year', label: 'Year', minWidth: 50 ,  },
        { id: 'pos', label: 'Pos', minWidth: 10 ,  },
        {
          id: 'driver',
          label: 'Driver',
          minWidth: 100,
        },
        {
          id: 'nationality',
          label: 'Nationality',
          minWidth: 100,
        },
        {
          id: 'car',
          label: 'Car',
          minWidth: 170,
        },
        {
          id: 'pts',
          label: 'Pts',
          minWidth: 50,
        },
      ];
    
      const [driversResults, setDriversResults] = useState<DataDrivers[]>([]);
      const [driversSearchResults, setDriversSearchResults] = useState<DataDrivers[]>([]);
      const [keywordsSearch, setKeywordsSearch] = useState<FilterDataDrivers>({
        year: '',
        pos: '',
        driver: '',
        nationality: '',
        car: '',
    })

    
      useEffect(() => {
        getDataDrivers();
      }, [])
    
      async function getDataDrivers() {
        setDriversResults(await getDataResults('dataset/drivers.csv'));
        setDriversSearchResults(await getDataResults('dataset/drivers.csv'));
    }

    const handleChangeSearch = (keyword: string, key: string) => {
        if (keywordsSearch.hasOwnProperty(key) ){
            keywordsSearch[key as keyof typeof keywordsSearch] = keyword;
            setDriversSearchResults(getDrivesResultsBySearch(driversResults, keywordsSearch))
        }
    }

  return (
    <div>
        <DataTable columns={columns} resultData={driversSearchResults} typeTable={'driver'} handleChangeSearch={handleChangeSearch} />
    </div>
  )
}
