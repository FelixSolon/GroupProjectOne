# Group Project One
------
## ZED: Migrate
------
### Team Members

* Zack Henry
* Dwayne Obenshain
* Eric Stanulis

### Project Description

ZED: Migrate allows jub hunters to search for jobs and apartments in other cities.

### Motivation

Job hunting is one of the the more painful processes of modern life. Apartment hunting is little better. ZED: Migrate seeks to combine the two to reduce the pain points facing people looking to pick up their roots and work in a new town.

### Results
Due to technical and access limitations of the APIs available, we were forced to reduce the scope of the project from one that would pull down Glassdoor's job listings and combine them with Zillow's rent estimates, to one that accesses the USAJobs API to find state and federal jobs in a chosen city, and combined that with Google's Maps API to show apartments available.

### Team Efforts
* Zack did front end
* Dwayne focused on Google Maps
* Eric integrated the USAJobs API and integrated the final code.

### Individual Responsibilities

Eric: 
* Responsible for finding the Job Hunt API and incorporating it into the website, as well as getting the Firebase storage working to hold the API keys so they weren't publically visible on our website and incorporating the Google Maps search into the HTML of the website.

Zack:
* Responsible for the Landing Page, Background, and incorporating Canvas/HTML5 

Dwayne:
* Responsible for finding and initiating the Google Maps API, and identifing the HTML elements to be used in the project.
The Google Maps search has multiple options to choose from. Finding the option that works for us was a bit of a challenge.

### Challenges
* Our initial APIs wound up being less than ideal for our purposes. The Glassdoor API doesn't allow pulling job listings without becoming a Glassdoor Partner, which was beyond the time and resources we had for this project. Eventually, we switched to a different API to allow us to provide a proof of concept.
* The Zillow API also wound up only allowing searches for one specific address, rather than all addresses within a radius, and didn't allow getting the rent or price estimate off of just an address search, requiring their specific property ID number. Eventually I was able to incorporate another API, from Onboard Informatics, to allow searches for properties within a radius, then fed the addresses back into Zillow, then took the ID for that property and fed it back into a different Zillow API call, which returned an XML object that I was able to convert to JSON and extract the rent estimate from. Unfortunately, between Cross Origin Resource Sharing issues and an extremely slow API call (10+ seconds to call the Onboard API), we eventually moved away from that to the Google Maps API.
* The Google Maps API does allow searches near an address, but we have as yet been unable to automatically search off the submit button. We can move data from the address input to the maps search box, but haven't been able to programmatically trigger a search.

### Improvements
* Go through the process necessary to become a Glassdoor partner to get job listings that aren't strictly government jobs.
* Figure out a way to pull addresses from the Google Maps searches and feed them into the Zillow API to get rent estimates.
* Figure out the Zillow CORS problems, or host an actual server such that CORS works correctly.

### Requirements:
Must use at least two APIs
* Google Maps and USAJobs

Must use AJAX to pull data
* Used with both APIs

Must utilize at least one new library or technology we haven't discussed
* Used Postman to format API calls without having to change the Javascript and reload a webpage.
* Used regular expressions to do user input validation.
* Used modals to give user feedback in the event of errors.

Must have a polished frontend / UI

Must meed good quality coding standards

Must not use alerts, confirms, or prompts
* Modals were used in place of alerts.
* A form was used in place of prompts

Must have some sort of repeating element
* Jobs listings pop up in repeating panels.
* Bootstrap columns used.

Must use Bootstrap or alternative CSS framework
* Bootstrap used.

Must be Deployed (Github Pages)
* Deployed to Github Pages.

Must have User Input Validation
* Done by way of regular expressions to ensure only valid characters are entered in the job/address/radius boxes.

Utilize Firebase for persistent data storage
* Used to hold our API keys so they aren't exposed on the website.
