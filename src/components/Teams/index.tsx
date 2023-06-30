import React, { useEffect, useState } from 'react';
import getDataResults from '../../utils/handleCsv';
import { ColumnTeams, DataTeams } from '../../utils/type';
import DataTable from '../DataTable';

export default function Teams() {

    const columns: ColumnTeams[] = [
        { id: 'id', label: 'NO', minWidth: 50 ,  },
        { id: 'year', label: 'YEAR', minWidth: 50 ,  },
        { id: 'pos', label: 'POS', minWidth: 10 ,  },
        {
          id: 'team',
          label: 'TEAM',
          minWidth: 100,
        },
        {
          id: 'pts',
          label: 'PTS',
          minWidth: 50,
        },
      ];

      const [teamsResults, setTeamsResults] = useState<DataTeams[]>([]);
    
      useEffect(() => {
        getDataTeams();
      }, [])
    
      async function getDataTeams() {
        setTeamsResults(await getDataResults('dataset/teams.csv'));
      }
    
  return (
    <div>
        <DataTable columns={columns} resultData={teamsResults} />
    </div>
  )
}
