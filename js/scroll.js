
let scroller = scrollama(); 
//setUpScroll(); 


function setUpScroll()
{
  console.log("setting up scroll");
    scroller
    .setup({
        step: ".story" // this is the name of the class that we are using to step into
    })
    // do something when you enter a "step":
    .onStepEnter((response) => {
        // you can access these objects: { element, index, direction }
        // use the function to use element attributes of the button 
        // it contains the lat/lng: 
        console.log("Attempting to change something on scroll...");
        handleScrollEvent(response.element.attributes); //Attributes of the html element...
    })
    .onStepExit((response) => {
        // { element, index, direction }
        // left this in case you want something to happen when someone
        // steps out of a div to know what story they are on.
    });
    //Todo: refine steps, make more streamlined 

    console.log("finished setup"); 
}

function changePicture(step){
    //const i = parseInt(step.data-step.value); 
    const i = step.datastep.value;
    console.log("index " + i); 
    //console.log(typeof i + ": " + i); 

    // if(formattedClubData[i].storypicture){
    //     const imgsrc = formattedClubData[i].storypicture; 

    // }
    let imgsrc = "images/" + i + ".jpg"; 
    let  imagehtml ='<img src = "' + imgsrc + '" alt = "">'; 
    console.log(imagehtml);
    document.getElementById("story-image").innerHTML = imagehtml;

}

function handleScrollEvent(thisStep){
    // optional: console log the step data attributes:
    console.log("changing stuff for story: " + thisStep.index); 
    let thisLat = thisStep.lat.value;
    let thisLng = thisStep.lng.value;
    // tell the map to fly to this step's lat/lng pair:
    map.flyTo([thisLat,thisLng]);
  
    //Todo: Change picture 
    changePicture(thisStep); 
  }
  
