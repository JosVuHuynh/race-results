export interface ColumnRacesResults {
    id: IdColumnRaceResult;
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}


export interface DataRaceResult {
    id?: number;
    grandPrix: string;
    date: string;
    winner: string;
    car: string;
    laps: string;
    time: string
}

export interface FilterDataRaceResult {
    grandPrix: string;
    date: string;
    winner: string;
    car: string;
}
export interface ColumnDrivers {
    id: IdColumnDrivers;
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

  
export interface DataDrivers {
    id?: number;
    year: number;
    pos: string;
    driver: string;
    nationality: string;
    car: string;
    pts: string;
}


export interface FilterDataDrivers {
    year: string;
    pos: string;
    driver: string;
    nationality: string;
    car: string;
}

export interface ColumnTeams {
    id: IdColumnTeams;
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}
export interface DataTeams {
    id?: number;
    year: number;
    pos: string;
    team: string;
    pts: string;
}
export interface FilterDataTeams {
    year: string;
    pos: string;
    team: string;
}
export interface ColumnFastestLap {
    id: IdFastestLap;
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}
  
export interface DataFastestLap {
    id?: number;
    year: number;
    grandPrix: string;
    driver: string;
    car: string;
    time: string;
}


export interface FilterDataFastestLap {
    year: string;
    grandPrix: string;
    driver: string;
    car: string;
}

export interface SearchType {
    keyword: string;
    key: string;
}
export interface DataTableProps {
    columns: ColumnRacesResults[] | ColumnDrivers[] | ColumnTeams[] | ColumnFastestLap[];
    resultData: DataRaceResult[] | DataDrivers[] | DataTeams[] | DataFastestLap[];
    typeTable: string;
    handleChangeSearch(keyword: string, key: string): void;
}

export type IdColumnRaceResult = 'id' | 'grandPrix' | 'date' | 'winner' | 'car' | 'laps' | 'time';

export type  IdColumnDrivers = 'id' | 'year' | 'pos' | 'driver' | 'nationality' | 'car' | 'pts';

export type IdColumnTeams = 'id' | 'year' | 'pos' | 'team' | 'pts';

export type IdFastestLap = 'id' | 'year' | 'grandPrix' | 'driver' | 'car' | 'time';