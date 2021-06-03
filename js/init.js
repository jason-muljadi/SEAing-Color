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

  switch(data.feltaffirmed) //Note: doesn't work -- might not be string type??
  {
    case "Yes":
      didFeelAffirmed.addLayer(makePopup(data, name));
    case "Maybe":
      maybeAffirmed.addLayer(makePopup(data, name));
    case "No":
      notAffirmed.addLayer(makePopup(data, name));
    default: 
      console.log(data.feltaffirmed + " is invalid value for feltaffirmed"); 
  }

  createButtons(data.location, data); //For testing purposes; can leave in if buttons are placed properly lmao  
}

function makePopup(data, name) //Todo: map each letter to a descriptive name in the google sheet 
{
  return L.marker([data.lat, data.lng]).addTo(map)
  .bindPopup(`<h2>Place: ${data.location}</h2>
              <p>Name: ${name}<p>`);
}

function createButtons(title, data){
    const newButton = document.createElement("button"); // adds a new button
    newButton.id = "button"+title; // gives the button a unique id
    newButton.innerHTML = title; // gives the button a title
    let buttonPanel = document.getElementById("temp-buttons"); 
    newButton.addEventListener('click', function(){
        map.flyTo([data.lat, data.lng]); 
        putStory(data); 
    })
  
    
    buttonPanel.appendChild(newButton); //this adds the button to our page.
  }



function changePicture(data){
    if(data.storypicture){
        const imgsrc = data.storypicture; 
        let  imagehtml ='<img src = "' + imgsrc + '" alt = "">'; 
        console.log(imagehtml);
        document.getElementById("story-image").innerHTML = imagehtml;
    }
}

function addStories(data)
{
  //NOTE: very hacky way to find story divs.. 
  let divs = document.getElementById("sidebar").getElementsByTagName("div"); 

  console.log(divs.length);
  for(let i = 0; i < divs.length; i++)
  {
    let name = data[i].name; 
    if(name == "")
      name = "Anonymous"
    divs[i].innerHTML = "<h2>" + name + "</h2>" +
    "<p>" + data[i].affirmationstory + "</p>";


    console.log("adding story"); 
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

let scroller = scrollama(); 
function setUpScroll()
{
    scroller
    .setup({
        step: ".step", // this is the name of the class that we are using to step into, it is called "step", not very original
    })
    // do something when you enter a "step":
    .onStepEnter((response) => {
        // you can access these objects: { element, index, direction }
        // use the function to use element attributes of the button 
        // it contains the lat/lng: 
        scrollStepper(response.element.attributes)
    })
    .onStepExit((response) => {
        // { element, index, direction }
        // left this in case you want something to happen when someone
        // steps out of a div to know what story they are on.
    });
}

function formatData(theData){
    const formattedData = [] /* this array will eventually be populated with the contents of the spreadsheet's rows */
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

    addLayersToMap(formattedData); 
    addStories(formattedData); 
}

function scrollStepper(thisStep){
  // optional: console log the step data attributes:
  // console.log("you are in thisStep: "+thisStep)
  let thisLat = thisStep.lat.value;
  let thisLng = thisStep.lng.value;
  // tell the map to fly to this step's lat/lng pair:
  map.flyTo([thisLat,thisLng]);

  //Todo: Change picture 

}