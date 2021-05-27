  //On github for reference 


let latitudes = [['lat']]; //what is this double bracket thing 
  let longitudes = [['lng']];


function getLatLng() {
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Form Responses 1"); //Find a better way than name maybe 
   
  const range = sheet.getDataRange();
  const allcells = range.getValues();

  const length = allcells.length; 
  for(let i = 1; i < length; i++)
  {
    let textLocationColumn = allcells[i][6]; 
    let lat = lng = 0; 

    if(textLocationColumn)
    {
      const areaCode = textLocationColumn; 
      console.log(areaCode); 
      areaCodeToLatLng(areaCode); 
      
    }
    else
    {
      console.log("????");
    }
  }

  sheet.getRange('N1') // write to latitude column
    .offset(0, 0, latitudes.length).setValues(latitudes);
  sheet.getRange('O1') //  write to longitude column
    .offset(0, 0, longitudes.length).setValues(longitudes);
}

function areaCodeToLatLng(areaCode)
{
  let areaCodeSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Geocoding");
  const range = areaCodeSheet.getDataRange();
  const allcells = range.getValues();

  let code = areaCode.toString().charCodeAt(0); 
  code -= 65; 
  //console.log(areaCode + " " + code); 
  
  //Then jump to the correct cell in the second sheet 
  if(code > 12 || code < 0)
  {
    console.log("Invalid area code"); 
    return; 
  }

  let lat = allcells[code + 1][1]; //Get the lat and lng from a given row 
  let lng = allcells[code + 1][2]; 
  console.log(areaCode + " lat: " + lat + "lng: " + lng); 

  latitudes.push([lat]); //dddoesn't work 
  longitudes.push([lng]); 

  //how do javascript objects/return values work 
  
}
