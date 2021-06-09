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
const formattedClubData =[];  // this array is for the cleaned club data
let url = "https://spreadsheets.google.com/feeds/list/16vj49I0vAirmk54P13zE-V70Je4uq9G3jABb8T8OHA0/oxhqdjk/public/values?alt=json"; 
let cluburl = "https://spreadsheets.google.com/feeds/list/16vj49I0vAirmk54P13zE-V70Je4uq9G3jABb8T8OHA0/oo1fzto/public/values?alt=json";

getClubData(cluburl)


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
// function duplicateClubs(club){

// }
function getClubs(club,lookup){
  let clubKey = club.keyword
  // console.log(club)
  // console.log(lookup)
  if (clubKey == lookup){
    let clubName = club.name
    return clubName

  }
  
}


function createClubButton(lookup,id){
  // console.log(formattedClubData)
  console.log(lookup)

  let clubValues = formattedClubData.forEach(club => getClubs(club,lookup))
  // console.log(clubValues)
  // for (let clubDictionary in formattedClubData) {
  //   console.log(clubDictionary)
  //   // console.log(formattedClubData[i] + " ");
  // }
  if (lookup !="#N/A"){
    const newClub = document.createElement("button");
    newClub.innerHTML = lookup
    // newOrg.innerHTML = '<div id="></div>'
    console.log(newClub)
    let targetDiv = document.getElementById(id)
    newClub.setAttribute("clubID",lookup); // sets the latitude
    newClub.addEventListener('click', function(){
    let allModals = document.getElementById(clubModal)
    const theBlackModalThingy = document.createElement("div");
      // step 1: generate the unique modals for each using innerHTML
      // step 1a stylying hint: use the .modal-content class inside of the modal
      // cool black container
    const coolModalContent = document.createElement("div")
    coolModalContent.className = "modal"
    let modalId = "clubModal_"+id
      // end step 1 with something like this:
      theBlackModalThingy.appendChild(coolModalContent)
      // HELLO! MAKE THE UNIQUE MODALS BEFORE STEP 2

      // step 2: assign each modal either Id or keyword as the id for the modal
      

      // // let modal = document.getElementById("modalId
      let modal = document.getElementById(modalId)

      // modal.style.display = "block";
      // step 3: modify the onlick event to display that unique modal on click
       window.onclick = function(event) {
        if (event.target == modal) {
          
          modal.style.display = "block";
        }
      } 
      // this is the last step to add all your modals together
      allModals.appendChild(theBlackModalThingy)
      // window.location = "./CulturalOrgs.html#" +lookup;
      //make function to link to clubs -> JS go to URL (window.location)
      //add anchors
  }) 
    targetDiv.appendChild(newClub)
    return targetDiv
  }

  // // console.log(document.getElementById(thisID))
  // if (document.getElementById(id)){

  // }

  
}

function getClubData(thisurl){
  fetch(thisurl)
  .then(response => {
    return response.json();
    })
    .then(data =>{
                // console.log(data)
                formatClubData(data)
        }
  )
}

function addStories2(data){
 console.log(formattedClubData)

  for(let i = 0; i < data.length; i++)
  {
    const newDiv = document.createElement("div"); // adds a new Div
    newDiv.className = "story";
    let thisID = "story_" + i;  //story_0; story_1;
    newDiv.id = thisID; // gives the button a unique id"

    newDiv.setAttribute("data-step", i);  
    newDiv.setAttribute("lat", data[i].lat); 
    newDiv.setAttribute("lng", data[i].lng); 
    
    let clubKeywords = 0
    if (data[i].keywordsusescripttogeneratebasedonstoryalsoclubs){
      clubKeywords = data[i].keywordsusescripttogeneratebasedonstoryalsoclubs.split(",")
    }
  
    let name = data[i].name; 
    if(name == "")
      name = "Anonymous"; 
    let theHtmlContent = `<h2>` + name + `</h2> <p>${data[i].affirmationstory}</p>`
    // newButton.innerHTML = title; // gives the button a title

    theHtmlContent += '</div>'
    // console.log("htmlContent: "+theHtmlContent)
    newDiv.innerHTML = theHtmlContent
    const spaceForButtons = document.getElementById('sidebar')
    spaceForButtons.appendChild(newDiv);//this adds the button to our page.
    clubKeywords.forEach(club => createClubButton(club,thisID))
    console.log(clubKeywords)
  }
  // let theHtmlContent = "<h2>" + name + "</h2>" +
  // "<p>" + data[i].affirmationstory + "</p>"

}

function addStories(data)
{
  //NOTE: very hacky way to find story divs.. 
  let divs = document.getElementById("sidebar").getElementsByTagName("div"); 

  console.log(divs.length);
  for(let i = 0; i < divs.length; i++)
  {
    console.log("adding story");
    // let name;
    // if (data[i].name){
    //    name = data[i].name;
    // }
    // if(name == ""){
    //   name = "Anonymous"
    // }
    // else{
    //   name = "Anonymous"
    // }
    console.log(data)
    let name = data[i].name;
    if(name == ""){
      name = "Anonymous"
    }
    console.log(data[i].keywordsusescripttogeneratebasedonstoryalsoclubs)
    divs[i].innerHTML = "<h2>" + name + "</h2>" +
    "<p>" + data[i].affirmationstory + "</p>"
    // +'<div class="btn-group"><button onclick="window.location.href=\'About.html\';">Apple</button>  <button onclick="window.location.href=\'About.html\';">Samsung</button>  <button onclick="window.location.href=\'About.html\';">Sony</button>  </div>'
    // ^^ poor attempt to add a button without the quotes escaping;; it did not work :')
    ;
    
    divs[i].setAttribute("lat",data[i].lat); 
    divs[i].setAttribute("lng",data[i].lng);
  }
}

function addClubModals(clubData){
  let newModalDiv = document.createElement("div")
  newModalDiv.className = "modal-content"
  newModalDiv.innerHTML = `<h3>${clubData.name}</h3><p>${clubData.contents}`
  newModalDiv.id = clubData.id
  let modalLocal = document.getElementById('modal')
  modalLocal.appendChild(newModalDiv)

}

function addLayersToMap(formattedData)
{
  formattedData.forEach(addMarker);
    
  didFeelAffirmed.addTo(map);
  maybeAffirmed.addTo(map);
  notAffirmed.addTo(map); 
  L.control.layers(null,allMapLayers, {collapsed:false}).addTo(map);
}


function formatClubData(clubData){
  const rows = clubData.feed.entry
  for(const row of rows) {
    const formattedClubRow = {}
    for(const key in row) {
      if(key.startsWith("gsx$")) {
            formattedClubRow[key.replace("gsx$", "")] = row[key].$t
      }
    }
    formattedClubData.push(formattedClubRow)
  }
  console.log(formattedClubData);
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
    console.log(formattedClubData)
    addStories2(formattedData); 
    addClubModals(formattedClubData)
    setUpScroll(); 
}

function handleScrollEvent(thisStep){
  // optional: console log the step data attributes:
  // console.log("you are in thisStep: "+thisStep)
  let thisLat = thisStep.lat.value;
  let thisLng = thisStep.lng.value;
  // tell the map to fly to this step's lat/lng pair:
  map.flyTo([thisLat,thisLng]);

  //Todo: Change picture 

  changePicture(thisStep); 
}

function changePicture(step){

  // we get the what step we are on here:
  let thisValue = step['data-step'].value
  const i = parseInt(thisValue); 
  //console.log(typeof i + ": " + i); 
  console.log(i)
  // we change the photo based on the step here:
  if(formattedData[i].storypicture){
      let imgsrc = formattedData[i].storypicture;
      //
      if (imgsrc.includes("https:")){
        imgsrc = imgsrc
        console.log('on the imgsrc:')
      }
      else{
        imgsrc = `../images/${imgsrc}`
      }
      let  imagehtml ='<img src = "' + imgsrc + '" alt = "">'; 
      console.log(imagehtml);
      document.getElementById("story-image").innerHTML = imagehtml;
  }
}