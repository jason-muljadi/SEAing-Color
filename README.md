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

## What technology was used

## How it can be repurposed

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

