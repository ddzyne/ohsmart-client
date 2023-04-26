const extractNameValue = (metadata: any): any => {
  let result: any[] = [];
  for (let i = 0; i < metadata.length; i++) {
    let obj = metadata[i];
    if (obj.name && obj.value) {
      result.push({ name: obj.name, value: obj.value });
    }
    if (obj.fields) {
      result = result.concat(extractNameValue(obj.fields.flat()));
    }
  }
  return result;
}

export const formatFormData = async (metadata: any, files?: any) => {
  // get key/value pairs first
  const namesValues = extractNameValue(metadata);

  // add these to a formdata object
  let formData = new FormData();
  namesValues.forEach( (v: any) => { 
    // check for autocomplete and multiselect values, we just need their value, not the entire object
    const value = 
      Array.isArray(v.value) ? 
      v.value.map( (v: any) => v.value ).join(', ') :
      v.value.value ?
      v.value.value :
      v.value;
    formData.append(v.name, value) 
  });

  // now add the files as well, by converting their blob url's back to a js File object
  const fileData = await Promise.all(files?.map((f: any) =>
    fetch(f.url).then((r: any) => r.blob())))
    .then((d: any) => d.map((f: any) => formData.append(f.name, f) ) );

  return formData;
}