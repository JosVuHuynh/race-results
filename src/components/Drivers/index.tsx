import React, { useEffect, useState } from 'react';
import getDataResults from '../../utils/handleCsv';
import { ColumnDrivers, DataDrivers } from '../../utils/type';
import DataTable from '../DataTable';


export default function Drivers() {
    const columns: ColumnDrivers[] = [
        { id: 'id', label: 'NO', minWidth: 50 ,  },
        { id: 'year', label: 'YEAR', minWidth: 50 ,  },
        { id: 'pos', label: 'POS', minWidth: 10 ,  },
        {
          id: 'driver',
          label: 'DRIVER',
          minWidth: 100,
        },
        {
          id: 'nationality',
          label: 'NATIONALITY',
          minWidth: 100,
        },
        {
          id: 'car',
          label: 'CAR',
          minWidth: 170,
        },
        {
          id: 'pts',
          label: 'PTS',
          minWidth: 50,
        },
      ];
    
      const [driversResults, setDriversResults] = useState<DataDrivers[]>([]);
    
      useEffect(() => {
        getDataDrivers();
      }, [])
    
      async function getDataDrivers() {
        setDriversResults(await getDataResults('dataset/drivers.csv'));
    }
  return (
    <div>
        <DataTable columns={columns} resultData={driversResults} />
    </div>
  )
}
