# SEAing-Color
The SEAing Color website allows current UCLA students inside a Southeast Asian (SEA) community to share their personal experiences and stories in addition to mapping out where their stories unfolded. Each story will have a geographical pin in which a person can look at, and every new story can be viewed by scrolling down the main website.

In addition, there are links to multiple resources and cultural organizations that embody the UCLA SEA community. We also created an About page and, for general inquiries, we have an embedded contact sheet that will be reviewed daily in order to ensure the best user experience of our website.

This map is supplementary to the Southeast Asian Admit Weekend festivities, but we hope to make it more personal through a digital landscape.

## Table of Contents
* [Objective](#objective)
* [Who is being empowered](#who-is-being-empowered)
* [What technology was used](#what-technology-was-used)
* [How it can be repurposed](#how-it-can-be-repurposed)
* [Features and screenshots of the mapplication](#features-and-screenshots-of-the-mapplication)
* [Documentation](#documentation)

## Objective

The objective of this website is to to uplift the stories of POC on UCLA’s campus and make them more accessible to any SEA admits who are unable to attend SEA Admit Weekend, either virtually or in-person. For admitted SEA high schoolers, this may be some of their first times being introduced to the greater APIDA community at UCLA and learning about the history of APIDA groups and student organizing. We hope that this project helps to bridge the knowledge gap from high school to higher education. This showcases classes and APIDA/SEA student orgs focused on POCs in order to help students find their identity, as well as reaffirm that they have spaces to do so. By emphasizing the narratives of current and recent students, this tour seeks to help potential incoming SEA students feel at home and feel seen at UCLA.

## Who is being empowered
The people who will be empowered from this project are prospective and current Southeast Asian UCLA students. We hope that the personal stories and affirmations that are being shared in this website will allow others to feel that kinship in a space that they may or may not have ever visited. We hope that, through looking at the stories and affrimations of Southeast Asian identity, people are able to (re)connect to their Southeast Asian identity, and feel empowered in theirselves. 

In the future, we hope that the future developers of this website will also be empowered to change up the design and the tools so that it may better serve the community. In our team, we currently implemented on what we feel may empower the Southeast Asian community (as some members of our team are a part of the SEA community at UCLA). However, just as the SEA community is always changing, we hope that the website changes as well. We hope that future SEA leaders and technology developers will take up the mantle of upkeeping the website; that is the empowerment we sekk. 

## What technology was used
For our landing page, we utilized a hero-image to welcome users to the page and to briefly explain what the website is all about. For the Javascript, we utilized Scrollama and modals in order to center our focus on the personal stories submitted by SEA Bruins.

## How it can be repurposed
All of our code is open to be changed on https://github.com/jason-muljadi/SEAing-Color/edit/. We believe that our website should always be open to changed to fit the needs of the community.

## Features and screenshots of the mapplication
Modals
![Screen Shot 2021-06-10 at 1 08 15 AM](https://user-images.githubusercontent.com/81584148/121489040-863fde80-c988-11eb-8067-a7d442666fc7.png)
![Screen Shot 2021-06-10 at 1 08 24 AM](https://user-images.githubusercontent.com/81584148/121489044-8809a200-c988-11eb-90f0-a25c864e322a.png)
* Modals have been integrated into the landing page. Buttons corresponding to cultural organizations and resources that survey responses contain can be toggled to open modals, which will reveal supplemental information about these groups. The purpose of these modals are to help touring visitors learn more about the spaces on campus that Bruins have found relevant to their cultural identities.


# Documentation 
*Intended for developers/maintainers of this project, not very relevant for users browsing the site 

###### Form data: 
* Don't use the original Google Forms-generated spreadsheet — created a copy of the form response google sheet so question titles, formatting, etc. were more programmer-friendly.  

###### Adding stories: 
* Publish the form response sheet to web and get the JSON by putting the url into [JSON Returner](https://sandbox.idre.ucla.edu/tools/gsJson/). The sheet data is put into an array of objects; each object represents a row, and row entries are properties. e.g. if the stories are in column 3 and cell A3 contains "affirmationstory", you can access a specific affirmation story using data[i].affirmationstory. 


###### Adding story sections to map: 
* Stories are added by calling addStories2(data), which adds every story in the spreadsheet. ```data``` is the array of formatted data. This is called on the initial load of the webpage in init.js; there's no need to call it afterward. 
* The divs for each story in the map tour are added dynamically into the ```sidebar``` div in index.html, so ```sidebar``` should be empty before init.js is called — hardcoding story divs would probably break the tour.
* Note: All story divs must have ```story``` as the class attribute — the scroll function depends on this to fly to a marker/change the image. 


###### Storymap feature: 
* Scroll functions are in scroll.js 
* The scrolling feature is implemented with a combination of Scrollama and Leaflet and draws heavily from [Scrollamappa by @albertkun](https://github.com/albertkun/scrollamappa). 
* Currently: upon scrolling to a new story, the story image changes, and the map flies to the marker for that story. This is handled in handleScrollEvent, which is called by onStepEnter. 
* Currently the triggers/transitions are rather clunky; we plan to improve this feature so that it's more intuitive which story you're scrolling to. 


###### Planned features: 
* Allow users to filter stories by ethnicity to make the tour more personalized. Plan to implement by de/activating map layers based on checkboxes(?). Currently the map layers are not set up by ethnicity — use the 


To-do/Issues: 
- [ ] Make it clear which marker is being flown to on scroll; right now there's only an onScrollEnter event  
- [ ] Improve story picture transitions
- [ ] Google script appears to not push some lat/lng values to the sheet despite being able to print them to console
- [x] Use keywords from stories to create links to clubs/resources 
- [x] Ensure that we have a hero-image that details what the website is and how to navigate it through basic means
- [ ] Preset tour path 
