
/*Partner ID:    193688
Key:    jv7w1oj6pHc*/


//start glassdoor code
//API key for Glass Door
//var glassDoorKey = "jv7w1oj6pHc";
     
//API key for Google Maps
//var googleMapsKey = "AIzaSyAnpNhNn2dOYuHrpHCd4A80FvWNelv56zM";

//To feed into Ajax and get Glassdoor stuff
var glassDoorQueryUrl = "http://api.glassdoor.com/api/api.htm?v=1&format=json&t.p=193688&t.k=jv7w1oj6pHc&action=employers&q=developer&q=location&q=userip=192.168.43.42&useragent=Mozilla/%2F4.0"
var GlassdoorData;

function runGlassdoorQuery(glassdoorQueryUrl) {
  // The AJAX function uses the queryURL and GETS the JSON data associated with it.
  // The data then gets stored in the variable called: "NYTData"

  $.ajax({
    url: glassDoorQueryUrl,
    method: "GET"
  }).done(function(GlassdoorData){
            runGlassdoorQuery(glassDoorQueryUrl);      
  });//console.log(glassDoorQueryUrl)
};
  

runGlassdoorQuery(GlassdoorData)
     //console.log("------------------------------------");
        //console.log("URL: " + glassDoorQueryUrl);
        //console.log("------------------------------------");

        // Log the NYTData to console, where it will show up as an object
        //console.log("GlassDoorData" + GlassdoorData);
        //console.log("------------------------------------");

