import { DataDrivers, DataFastestLap, DataRaceResult, DataTeams, FilterDataDrivers, FilterDataFastestLap, FilterDataRaceResult, FilterDataTeams, IdColumnDrivers, IdColumnRaceResult, IdColumnTeams, IdFastestLap } from "./type";

export function getRaceResultsBySearch(data: DataRaceResult[], filterData:  FilterDataRaceResult){
    return data.filter( e =>  e.grandPrix.toUpperCase().includes(filterData.grandPrix.toUpperCase()) && 
                              e.date.toUpperCase().includes(filterData.date.toUpperCase()) &&
                              e.winner.toUpperCase().includes(filterData.winner.toUpperCase()) &&
                              e.car.toUpperCase().includes(filterData.car.toUpperCase())
                        );
}

export function getDrivesResultsBySearch(data: DataDrivers[], filterData: FilterDataDrivers,){
    return data.filter( e => e.car.toUpperCase().includes(filterData.car.toUpperCase()) && 
                            String(e.year).toUpperCase().includes(filterData.year.toUpperCase()) &&
                             e.driver.toUpperCase().includes(filterData.driver.toUpperCase()) && 
                             e.nationality.toUpperCase().includes(filterData.nationality.toUpperCase()) &&
                             e.pos.toUpperCase().includes(filterData.pos.toUpperCase())
    );
}

export function getTeamsResultsBySearch(data: DataTeams[], filterData: FilterDataTeams ){
    return data.filter( e => e.pos.toUpperCase().includes(filterData.pos.toUpperCase()) && 
                             String(e.year).toUpperCase().includes(filterData.year.toUpperCase()) &&
                             e.team.toUpperCase().includes(filterData.team.toUpperCase())
    );
}

export function getFastestLapResultsBySearch(data: DataFastestLap[], filterData: FilterDataFastestLap){
    return data.filter( e => String(e.year).toUpperCase().includes(filterData.year.toUpperCase()) &&
                             e.grandPrix.toUpperCase().includes(filterData.grandPrix.toUpperCase()) &&
                             e.driver.toUpperCase().includes(filterData.driver.toUpperCase()) &&
                             e.car.toUpperCase().includes(filterData.car.toUpperCase())
    );
}