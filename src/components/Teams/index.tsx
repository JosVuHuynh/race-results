import React, { useEffect, useState } from 'react';
import getDataResults from '../../utils/handleCsv';
import { ColumnTeams, DataTeams, FilterDataTeams } from '../../utils/type';
import DataTable from '../DataTable';
import { getTeamsResultsBySearch } from '../../utils/handleSearch';

export default function Teams() {

    const columns: ColumnTeams[] = [
        { id: 'id', label: 'No', minWidth: 50 ,  },
        { id: 'year', label: 'Year', minWidth: 50 ,  },
        { id: 'pos', label: 'Pos', minWidth: 10 ,  },
        {
          id: 'team',
          label: 'Team',
          minWidth: 100,
        },
        {
          id: 'pts',
          label: 'Pts',
          minWidth: 50,
        },
      ];

    const [teamsResults, setTeamsResults] = useState<DataTeams[]>([]);
    const [teamsSearchResults, setTeamsSearchResults] = useState<DataTeams[]>([]);
    const [keywordsSearch, setKeywordsSearch] = useState<FilterDataTeams>({
        year: '',
        pos: '',
        team: '',
    })

    useEffect(() => {
        getDataTeams();
    }, [])
    
    async function getDataTeams() {
        setTeamsResults(await getDataResults('dataset/teams.csv'));
        setTeamsSearchResults(await getDataResults('dataset/teams.csv'));
    }

    const handleChangeSearch = (keyword: string, key: string) => {
        if (keywordsSearch.hasOwnProperty(key) ){
            keywordsSearch[key as keyof typeof keywordsSearch] = keyword;
            setTeamsSearchResults(getTeamsResultsBySearch(teamsResults, keywordsSearch))
        }
    }
  
    return (
        <div>
            <DataTable columns={columns} resultData={teamsSearchResults} typeTable={'team'} handleChangeSearch={handleChangeSearch}/>
        </div>
    )
}
