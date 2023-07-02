import { DataRaceResult } from "./type";

export default async function getRaceResultsGroupBy(arr: DataRaceResult[] , property: string){
    let values = [], result = [], val , index;
    for (let i = 0; i < arr.length; i++) {
        val = arr[i][property as keyof typeof arr[0]];
        index = values.indexOf(val);
        if (index > -1)
            result[index].push(arr[i]);
        else {
            values.push(val);
            result.push([arr[i]]);
        }
    }
    return result;
}