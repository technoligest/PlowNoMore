

export function convertToSQLDate (jsDate: string): string {
  console.log('oldDate:' + jsDate);
  const result = !jsDate ? '' : new Date(jsDate).toISOString().slice(0,19).replace('T',' '); 
  console.log('newDate:' + result);
  return result;
}

export function convertToSQLBoolean (jsBoolean: boolean): string {
  return jsBoolean ? '1': '0';
}

