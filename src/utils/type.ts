export interface ColumnRacesResults {
    id: 'id' | 'grandPrix' | 'date' | 'winner' | 'car' | 'laps' | 'time';
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

export interface ColumnDrivers {
    id: 'id' | 'year' | 'pos' | 'driver' | 'nationality' | 'car' | 'pts';
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

export interface ColumnTeams {
    id: 'id' | 'year' | 'pos' | 'team' | 'pts';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}
  
export interface DataTeams {
    id?: number;
    year: number;
    pos: string;
    driver: string;
    nationality: string;
    car: string;
    pts: string;
}

export interface ColumnFastestLap {
    id: 'id' | 'year' | 'grandPrix' | 'driver' | 'car' | 'time';
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

export interface DataTableProps {
    columns: ColumnRacesResults[] | ColumnDrivers[] | ColumnTeams[] | ColumnFastestLap[];
    resultData: DataRaceResult[] | DataDrivers[] | DataTeams[] | DataFastestLap[];
}

