import React, { useEffect, useState } from 'react'
import { ColumnFastestLap, DataFastestLap } from '../../utils/type';
import getDataResults from '../../utils/handleCsv';
import DataTable from '../DataTable';

export default function FastestLapAward() {
    const columns:  ColumnFastestLap[] = [
        { id: 'id', label: 'NO', minWidth: 50 ,  },
        { id: 'year', label: 'YEAR', minWidth: 50 ,  },
        { id: 'grandPrix', label: 'GRAND PRIX', minWidth: 10 ,  },
        {
          id: 'driver',
          label: 'DRIVER',
          minWidth: 100,
        },
        {
          id: 'car',
          label: 'CAR',
          minWidth: 170,
        },
        {
          id: 'time',
          label: 'TIME',
          minWidth: 50,
        },
      ];
    
      const [fastestLapResults, setFastestLapResult] = useState<DataFastestLap[]>([]);
    
      useEffect(() => {
        getFastestLap();
      }, [])
    
      async function getFastestLap() {
        setFastestLapResult(await getDataResults('dataset/drivers.csv'));
    }
  return (
    <div>
        <DataTable columns={columns} resultData={fastestLapResults} />
    </div>
  )
}
