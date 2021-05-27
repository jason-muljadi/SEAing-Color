const map = L.map('map').setView([34.069311070040534, -118.44530853610334], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);



let url = "https://spreadsheets.google.com/feeds/list/1saTqG7FBGlnyCDwon8SGppg_FO2Rpd2r3cXHTuRuStk/oxhqdjk/public/values?alt=json"; 

function addMarker(data){
    L.marker([data.lat, data.lng]).addTo(map)
    .bindPopup(`<h2>${data.wheredoyoubelieveyourracialethnicidentityaffirmationtookplace}</h2>`);

    createButtons(data.wheredoyoubelieveyourracialethnicidentityaffirmationtookplace, data); 
}

function createButtons(title, data){
    const newButton = document.createElement("button"); // adds a new button
    newButton.id = "button"+title; // gives the button a unique id
    newButton.innerHTML = title; // gives the button a title
    let buttonPanel = document.getElementById("story-buttons"); 
    newButton.addEventListener('click', function(){
        map.flyTo([data.lat, data.lng]); 
        putStory(data); 
    })
  
    
    buttonPanel.appendChild(newButton); //this adds the button to our page.
  }


//Todo: on scroll, change the story 
function putStory(data){
    document.getElementById("story").innerHTML = `<p>${data.whathappenedatthisplaceandhowdoyoubelieveitaffirmedyourracialethnicidentity}</p>`;
}

fetch(url)
	.then(response => {
		return response.json();
		})
    .then(data =>{
                // console.log(data)
                formatData(data)
        }
)


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
        console.log(formattedData)
        formattedData.forEach(addMarker)        
}