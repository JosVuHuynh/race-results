import Papa from 'papaparse';

async function fetchCsv(path: string) {
    const response = await fetch(path);
    const reader = response.body?.getReader();
    const result = await reader?.read();
    const decoder = new TextDecoder('utf-8');
    const csv = await decoder.decode(result?.value);
    return csv;
}
 
function addId(arr: any) {
    return arr.map((obj: any, index: number) =>{
      return Object.assign({}, obj, { id: index });
    });
  };

export default async function getDataResults(path: string) {
    const data = Papa.parse(await fetchCsv(path), {header: true});
    return addId(data.data);
}
