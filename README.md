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
For our landing page, we utilized a hero-image to welcome users to the page and to briefly explain what the website is all about. For the Javascript, we utilized Scrollama and modalities in order to center our focus on the personal stories submitted by SEA Bruins.

## How it can be repurposed
All of our code is open to be changed on https://github.com/jason-muljadi/SEAing-Color/edit/. We believe that our website should always be open to changed to fit the needs of the community.

## Features and screenshots of the mapplication


# Documentation 
Google Sheets: 
Created a copy of the form response google sheet (titled "Cleaned up...") so question titles, picture links, etc. were more programmer-friendly. Inconvenient in that new form responses need to be copy-pasted from the original form response page to show up on the website; maybe look into using a macro(?) to automate this while preserving the original form responses. 


//TODO: add documentation for js functions, css, html formatting 
Scrollama implementation: Each story is a div with the class "story"; init.js adds lat and lng attributes to make flyto faster. 


To-do/Issues: 
- [ ] The website looks different on Github Pages and local machine :(
- [ ] Make it clear which marker is being flown to on scroll; right now there's only an onScrollEnter event  
- [x] Change pictures on enter
- [ ] Make story pictures look prettier
- [ ] Move the scroll events to a different js script to avoid cluttering init
- [ ] Google script appears to not push some lat/lng values to the sheet despite being able to print them to console
- [ ] Keywords
- [x] Ensure that we have a hero-image that details what the website is and how to navigate it through basic means
- [ ] Preset path 
