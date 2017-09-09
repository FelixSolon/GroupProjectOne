/*Partner ID:    193688
Key:    jv7w1oj6pHc*/
/*“Your Zillow Web Services Identification (ZWSID) is: X1-ZWz1fz8njz1yq3_7sxq3”*/

//API key for Glass Door
var glassDoorKey = "jv7w1oj6pHc";

//API key for Zillow
var zillowKey = "X1-ZWz1fz8njz1yq3_7sxq3";

//API key for Google Maps
var googleMapsKey = "AIzaSyAnpNhNn2dOYuHrpHCd4A80FvWNelv56zM";

//To feed into Ajax and get Glassdoor stuff
var glassDoorQueryUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
  glassDoorKey + "&q=";

//To feed into Ajax and get Zillow stuff
var zillowQueryUrl = "http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=" + zillowKey + "&address=2114+Bigelow+Ave&citystatezip=Seattle%2C+WA";

//To feed into Ajax and get Google Maps stuff
var googleMapsQueryUrl = "https://maps.googleapis.com/maps/api/js?key=" + googleMapsKey + "&libraries=places";

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBk-N1sODC49DzdCFBCiAHwo1_WbtOMS6s",
    authDomain: "job-search-app.firebaseapp.com",
    databaseURL: "https://job-search-app.firebaseio.com",
    projectId: "job-search-app",
    storageBucket: "job-search-app.appspot.com",
    messagingSenderId: "768755547077"
};

firebase.initializeApp(config);

//make global variables to modify later.
var GoogleData;
var ZillowData;
var GlassdoorData;

// Changes XML to JSON to make it reasonable to work with Zillow
function xmlToJson(xml) {
    
    // Create the return object
    var obj = {};

    if (xml.nodeType == 1) { // element
        // do attributes
        if (xml.attributes.length > 0) {
        obj["@attributes"] = {};
            for (var j = 0; j < xml.attributes.length; j++) {
                var attribute = xml.attributes.item(j);
                obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
            }
        }
    } else if (xml.nodeType == 3) { // text
        obj = xml.nodeValue;
    }

    // do children
    if (xml.hasChildNodes()) {
        for(var i = 0; i < xml.childNodes.length; i++) {
            var item = xml.childNodes.item(i);
            var nodeName = item.nodeName;
            if (typeof(obj[nodeName]) == "undefined") {
                obj[nodeName] = xmlToJson(item);
            } else {
                if (typeof(obj[nodeName].push) == "undefined") {
                    var old = obj[nodeName];
                    obj[nodeName] = [];
                    obj[nodeName].push(old);
                }
                obj[nodeName].push(xmlToJson(item));
            }
        }
    }
    return obj;
};  

//Not sure I need three of these, but I'm creating it now so if code diverges it'll be easier to mess with.
//ToDo: Refactor if necessary
function runGoogleQuery(googleMapsQueryUrl) {
        console.log("This is working")
  $.ajax({
    url: googleMapsQueryUrl,
    method: "GET",
    dataType: 'jsonp'
  }).done(function(GoogleData){
        console.log("------------------------------------");
        console.log("URL: " + googleMapsQueryUrl);
        console.log("------------------------------------");

        // Log the NYTData to console, where it will show up as an object
        console.log(GoogleData);
        console.log("------------------------------------");
  });
};

function runZillowQuery(zillowQueryUrl) {

  $.ajax({
    url: zillowQueryUrl,
    method: "GET"
  }).done(function(ZillowData){
        console.log("------------------------------------");
        console.log("URL: " + zillowQueryUrl);
        console.log("------------------------------------");

        // Log the NYTData to console, where it will show up as an object
        console.log(ZillowData);
        console.log("------------------------------------");
  });
};

function runGlassdoorQuery(glassdoorQueryUrl) {

  // The AJAX function uses the queryURL and GETS the JSON data associated with it.
  // The data then gets stored in the variable called: "NYTData"

  $.ajax({
    url: glassdoorQueryUrl,
    method: "GET"
  }).done(function(GlassdoorData){
        console.log("------------------------------------");
        console.log("URL: " + glassdoorQueryUrl);
        console.log("------------------------------------");

        // Log the NYTData to console, where it will show up as an object
        console.log("GlassDoor Data" + GlassdoorData);
        console.log("------------------------------------");
  });
};

runGoogleQuery(googleMapsQueryUrl);