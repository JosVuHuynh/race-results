import React, { useEffect, useState } from 'react';
import getDataResults from '../../utils/handleCsv';
import DataTable from '../DataTable';
import { ColumnRacesResults , DataRaceResult, FilterDataRaceResult} from '../../utils/type';
import { getRaceResultsBySearch } from '../../utils/handleSearch';


export default function Races() {

    const columns: ColumnRacesResults[] = [
        { id: 'id', label: 'No', minWidth: 50 },
        { id: 'grandPrix', label: 'GrandPrix', minWidth: 150 },
        {
          id: 'date',
          label: 'Date',
          minWidth: 100,
        },
        {
          id: 'winner',
          label: 'Winner',
          minWidth: 170,
        },
        {
          id: 'car',
          label: 'Car',
          minWidth: 200,
        },
        {
          id: 'laps',
          label: 'Laps',
          minWidth: 70,
        },
        {
          id: 'time',
          label: 'Time',
          minWidth: 90,
        },
    ];

    const [raceResults, setRaceResults] = useState<DataRaceResult[]>([]);
    const [raceSearchResults, setRaceSearchResults] = useState<DataRaceResult[]>([]);
    const [keywordsSearch, setKeywordsSearch] = useState<FilterDataRaceResult>({
        grandPrix: '',
        date: '',
        winner: '',
        car: '',
    })
    
    useEffect(() => {
        getDataRaceResults();
    }, [])
  
    async function getDataRaceResults() {
        setRaceResults(await getDataResults('dataset/race_results.csv'));
        setRaceSearchResults(await getDataResults('dataset/race_results.csv'))
    }
   
    const handleChangeSearch = (keyword: string, key: string) => {
        if (keywordsSearch.hasOwnProperty(key) ){
            keywordsSearch[key as keyof typeof keywordsSearch] = keyword;
            setRaceSearchResults(getRaceResultsBySearch(raceResults, keywordsSearch))
        }
    }
  
  return (
    <div>
        <DataTable columns={columns} resultData={raceSearchResults} typeTable={'race'} handleChangeSearch={handleChangeSearch}/>
    </div>
  )
}
