const map = L.map('map').setView([34.069311070040534, -118.44530853610334], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

let didFeelAffirmed = L.featureGroup(); 
let maybeAffirmed = L.featureGroup(); 
let notAffirmed = L.featureGroup(); 

let allMapLayers = {
  "Felt affirmed": didFeelAffirmed, 
  "Maybe affirmed": maybeAffirmed, 
  "Did not feel affirmed": notAffirmed
}

const formattedData = [] /* this array will eventually be populated with the contents of the spreadsheet's rows */; 

let url = "https://spreadsheets.google.com/feeds/list/16vj49I0vAirmk54P13zE-V70Je4uq9G3jABb8T8OHA0/oxhqdjk/public/values?alt=json"; 

fetch(url)
	.then(response => {
		return response.json();
		})
    .then(data =>{
                // console.log(data)
                formatData(data)
        }
)

function addMarker(data){
  let name = data.name; 
  if(name == "")
    name = "Anonymous"; 

  //console.log(typeof data.feltaffirmed);
  switch(data.feltaffirmed)
  {
    case "Yes":
      didFeelAffirmed.addLayer(makePopup(data, name));
      break; 
    case "Maybe":
      maybeAffirmed.addLayer(makePopup(data, name));
      break; 
    case "No":
      notAffirmed.addLayer(makePopup(data, name));
      break;
    default: 
      console.log(data.feltaffirmed + " is invalid value for feltaffirmed");
      break;  
  }

  //createButtons(data.location, data); //For testing purposes; can leave in if buttons are placed properly lmao  
}

function makePopup(data, name) //Todo: map each letter to a descriptive name in the google sheet 
{
  return L.marker([data.lat, data.lng]).addTo(map)
  .bindPopup(`<h2>Place: ${data.location}</h2>
              <p>Name: ${name}<p>`);
}

// function createButtons(title, data){
//     const newButton = document.createElement("button"); // adds a new button
//     newButton.id = "button"+title; // gives the button a unique id
//     newButton.innerHTML = title; // gives the button a title
//     let buttonPanel = document.getElementById("temp-buttons"); 
//     newButton.addEventListener('click', function(){
//         map.flyTo([data.lat, data.lng]); 
//     })
  
    
//     buttonPanel.appendChild(newButton); //this adds the button to our page.
//   }


function addStories(data)
{
  //NOTE: very hacky way to find story divs.. 
  let divs = document.getElementById("sidebar").getElementsByTagName("div"); 

  console.log(divs.length);
  for(let i = 0; i < divs.length; i++)
  {
    console.log("adding story"); 
    let name = data[i].name; 
    if(name == "")
      name = "Anonymous"
    divs[i].innerHTML = "<h2>" + name + "</h2>" +
    "<p>" + data[i].affirmationstory + "</p>";

    divs[i].setAttribute("lat",data[i].lat); 
    divs[i].setAttribute("lng",data[i].lng);
  }
}

function addLayersToMap(formattedData)
{
  formattedData.forEach(addMarker);
    
  didFeelAffirmed.addTo(map);
  maybeAffirmed.addTo(map);
  notAffirmed.addTo(map); 
  L.control.layers(null,allMapLayers, {collapsed:false}).addTo(map);
}




function formatData(theData){
    const rows = theData.feed.entry
    for(const row of rows) {
      const formattedRow = {}
      for(const key in row) {
        if(key.startsWith("gsx$")) {
              formattedRow[key.replace("gsx$", "")] = row[key].$t
        }
      }
      formattedData.push(formattedRow)
    }
    console.log(formattedData);

    addLayersToMap(formattedData); //Todo: take these out 
    addStories(formattedData); 
    
}

