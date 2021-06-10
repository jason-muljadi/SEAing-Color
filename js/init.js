const map = L.map('map').setView([34.069311070040534, -118.44530853610334], 15);
//should fix map
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
}).addTo(map);

let didFeelAffirmed = L.featureGroup(); 
let maybeAffirmed = L.featureGroup(); 
let notAffirmed = L.featureGroup(); 

let closeId =""

let allMapLayers = {
  //Todo: 
  //Make layers based on the ethnicity that people entered in the form 
  //One marker can be in multiple layers 
  "Felt affirmed": didFeelAffirmed, 
  "Maybe affirmed": maybeAffirmed, 
  "Did not feel affirmed": notAffirmed
}


function getEthnicities(){
  //Look through string, have an enum of SEA ethnicities 
  //If reached end of string, exit 
}

const formattedData = [] /* this array will eventually be populated with the contents of the spreadsheet's rows */; 
const formattedClubData =[];  // this array is for the cleaned club data
let url = "https://spreadsheets.google.com/feeds/list/16vj49I0vAirmk54P13zE-V70Je4uq9G3jABb8T8OHA0/oxhqdjk/public/values?alt=json"; 
let cluburl = "https://spreadsheets.google.com/feeds/list/16vj49I0vAirmk54P13zE-V70Je4uq9G3jABb8T8OHA0/oo1fzto/public/values?alt=json";

getClubData(cluburl)


let keywords = []; 



fetch(url)
	.then(response => {
		return response.json();
		})
    .then(data =>{ formatData(data) 
    })

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

// function newFunction(){
//   let allModals = document.getElementById("clubModal")
//   const theBlackModalThingy = document.createElement("div");
// // step 1: generate the unique modals for each using innerHTML
// // step 1a stylying hint: use the .modal-content class inside of the modal
// // cool black container
//   const coolModalContent = document.createElement("div")
//   coolModalContent.className = "modal-content"

//   let modalId = "clubModal_"+id
//     theBlackModalThingy.setAttribute("clubModalId",modalId)
//   // coolModalContent.innerHTML = 
//   // `<span class="close">&times;</span> 
//   // <iframe src="/${formattedClubData.category}.html#${lookup}"></iframe>`; 

// // or ???
// coolModalContent.innerHTML = `<h3>${formattedClubData.clubname}</h3><p>${formattedClubData.description}`;

// // end step 1 with something like this:
//   theBlackModalThingy.appendChild(coolModalContent)
// // HELLO! MAKE THE UNIQUE MODALS BEFORE STEP 2
// // step 2: assign each modal either Id or keyword as the id for the modal
//   let modal = document.getElementById(modalId)
// // modal.style.display = "block";
// // step 3: modify the onlick event to display that unique modal on click
//   window.onclick = function(event) {
//     if (event.target == modal) {
//       modal.style.display = "block";
//     }
//   } 
// // this is the last step to add all your modals together
//  allModals.appendChild(theBlackModalThingy)
// targetDiv.appendChild(newClub)
// return targetDiv
// }

function createClubButton(lookup,id){
  // console.log(formattedClubData)
  console.log(lookup)

  let clubValues = formattedClubData.forEach(clubname => getClubs(clubname,lookup))
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
    newClub.setAttribute("clubID",lookup); 

    newClub.addEventListener('click', function(event)
    {
        // console.log(event.target.innerText)
        let targetID = "clubModal_"+event.target.innerText
        closeId = targetID
        //JX Note: thisModal sometimes shows up as undefined for me, sometimes not -- I think it might be a problem with the order in which some code is executed
        let thisModal = document.getElementById(targetID)
        console.log(targetID)
        //if(thisModal)
          thisModal.style.display = "block"

    })

   
      // EP: clubModal undefined??? i dont know what is supposed to go here
      // EP: am i supposed to make clubModal a string like this?? it used to be a variable
      // EP: or was i supposed to create the allModals div???
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
    let thisID = "story_"+i //story_0; story_1;
    newDiv.id = thisID; // gives the button a unique id"
    
    newDiv.setAttribute("datastep", i);
    newDiv.setAttribute("lat", data[i].lat); 
    newDiv.setAttribute("lng", data[i].lng); 

    
    let clubKeywords = 0
    if (data[i].keywordsusescripttogeneratebasedonstoryalsoclubs){
      clubKeywords = data[i].keywordsusescripttogeneratebasedonstoryalsoclubs.split(",")
    }
  
  let name = data[i].name; 
  if (name == "")
    name = "Anonymous";
  let theHtmlContent = `<h2>` + name + `</h2> <p>${data[i].affirmationstory}</p>`
  // newButton.innerHTML = title; // gives the button a title

  // <div class="btn-group">

  // clubKeywords.forEach(data => data+1)
  // console.log(thisID)
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

    //Todo: Add buttons based on the keywords in the story 
  }
}

// this is where we create the modals!
function addClubModals(clubData){
    let modalId = "clubModal_"+clubData.keyword
    console.log(clubData.keyword)
    console.log("Hello")
    // we are going to add our modals to the existing (in html) clubModal div
    let allModals = document.getElementById("clubModal")
    

    // this is our black modal container
    const theBlackModalThingy = document.createElement("div");
    // step 1: generate the unique modals for each using innerHTML
    // step 1a stylying hint: use the .modal-content class inside of the modal
    theBlackModalThingy.id = modalId
    theBlackModalThingy.className = "modal"
    console.log(theBlackModalThingy)
    // this is club container
    const coolModalContent = document.createElement("div")
    coolModalContent.className = "modal-content"


    coolModalContent.innerHTML = `<span class="close">&times;</span> <h3>${clubData.clubname}</h3><p>${clubData.description}`;

    // const closeModal = document.createElement("button");
    //   closeModal.type - "button"
    // closeModal.className = "close"
    //   closeModal.setAttribute("data-dismiss",modal)
    //   closeModal.innerHTML = "close"
    //   console.log(closeModal)

    // coolModalContent.appendChild(closeModal)

    theBlackModalThingy.appendChild(coolModalContent)

      // this is the last step to add all your modals together
    allModals.appendChild(theBlackModalThingy)

let modal = document.getElementsByClassName("modal-content")

  var span = document.getElementsByClassName("close")[0];
  span.onclick = function() {
  modal.style.display = "none";
}

console.log(modal);
console.log("ADDED A MODAL"); 
    // targetDiv.appendChild(newClub)

    // let modal1 = document.getElementById(modalId)
    //   console.log(modal1)
    //   window.onclick = function(event) {
    //   if (event.target == modal1) {
    //   modal1.style.display = "none";
    //    }
    //  } 

    // let newModalDiv = document.createElement("div");
    // newModalDiv.className = "modal-content";
    // newModalDiv.innerHTML = `<h3>${formattedClubData.clubname}</h3><p>${formattedClubData.description}`;
    // newModalDiv.id = formattedClubData.id;
    // let modalLocal = document.getElementById('modal');
    // modalLocal.appendChild(newModalDiv);
    
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
  
    
    formattedClubData.forEach(data=>addClubModals(data))
    console.log("Done setting up modals"); 
    addStories2(formattedData); 
    setUpScroll();
}

function handleScrollEvent(thisStep){
  // optional: console log the step data attributes:
  // console.log("you are in thisStep: "+thisStep)
  let thisLat = thisStep.lat.value;
  let thisLng = thisStep.lng.value;
  // tell the map to fly to this step's lat/lng pair:
  map.flyTo([thisLat,thisLng], 15);

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

// console.log(formattedClubData.keyword)
// let modal = document.getElementById('clubModalId')
let modal = document.getElementById('clubModal')
// console.log(modal)


window.onclick = function(event) {
  if(event.target.attributes.id != undefined){
    let clubModalName = event.target.attributes.id.value
    console.log(clubModalName)
    console.log(event.target.attributes.class.value); 

    
    if(event.target.attributes.class.value != null && event.target.attributes.class.value == "modal")
      event.target.style.display = "none";
  }
  // let theXbutton = document.getElementsByClassName('close').getElementById(thisIDtoClose)
   //JM: Add an ID to the button, using classes
   //JM: Same concept as 441's closemodal. Instead of closeModal, we need a class called close + the ID
   //JM: We need to append whatever the closeModal would be. Remember to add
//   let closeModal = document.getElementById(thisIDtoClose)
//  // let theCloseButton = document.getElementById("close_"+thisIDtoClose) // close_clubModal_VSU
//     if (event.target == closeModal) {
//       let clubModalDiv = document.getElementById("clubModal");
//       clubModalDiv.style.display = "none";
//       console.log("please no cry")
//     }
//     console.log("please i cry")
  } 

  // window.onclick = function(event) {
  //   let thisIDtoClose = event.target.attributes.id.value
  //   console.log(event.target.attributes.id.value)
  //   // let theXbutton = document.getElementsByClassName('close').getElementById(thisIDtoClose)
  //    //JM: Add an ID to the button, using classes
  //    //JM: Same concept as 441's closemodal. Instead of closeModal, we need a class called close + the ID
  //    //JM: We need to append whatever the closeModal would be. Remember to add
  //   let closeModal = document.getElementById(thisIDtoClose)
  //  // let theCloseButton = document.getElementById("close_"+thisIDtoClose) // close_clubModal_VSU
  //     if (event.target == closeModal) {
  //       let clubModalDiv = document.getElementById("clubModal");
  //       clubModalDiv.style.display = "none";
  //       console.log("please no cry")
  //     }
  //     console.log("please i cry")
  //   } 
