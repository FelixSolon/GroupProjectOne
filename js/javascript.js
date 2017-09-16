/*Partner ID:    193688
Key:    jv7w1oj6pHc*/
/*“Your Zillow Web Services Identification (ZWSID) is: X1-ZWz1fz8njz1yq3_7sxq3”*/

//API key for Onboard, which we can use to at least 
var onboardKey = "12e4d72b8d365ddf02371786955fb155"

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
var zillowQueryUrl;

//To feed into Ajax and get Google Maps stuff
var googleMapsQueryUrl = "https://maps.googleapis.com/maps/api/js?key=" + googleMapsKey + "&libraries=places";

var address1 = "2312 Warrington Avenue";
var address2 = "Flower Mound, TX";
var radius = 0;
var onboardQueryUrl = "https://search.onboard-apis.com/propertyapi/v1.0.0/property/address?address1=" + address1 + "&address2=" + address2 + "&radius=" + radius + "&page=1&pagesize=5"

    // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD6byBIx9RMcfhESzbA7P95LHhANnW4BhA",
    authDomain: "zedprojectone.firebaseapp.com",
    databaseURL: "https://zedprojectone.firebaseio.com",
    projectId: "zedprojectone",
    storageBucket: "zedprojectone.appspot.com",
    messagingSenderId: "954689702432"
    };

    firebase.initializeApp(config);

    // Create a variable to reference the database.
    var database = firebase.database();

    // Initial Values
    var job;
    var anythingElse;
    var salary;   //ask about inputting dropdowns

    // Capture Button Click
    $(document).on("click", "#add-user", function(event) {
      event.preventDefault();

      // Grabbed values from text boxes
      job = $("#job-input").val().trim();
      address = $("#address-input").val().trim();
      console.log("Address: " + address);
      cityState = $("#city-state-input").val().trim();
      console.log("CityState: " + cityState);
      radius = $("#radius-input").val().trim();
      console.log(radius);
      salary = $("#salaryRange-input").val().trim();
      console.log(salary);
      // Code for handling the push
      database.ref().push({
        job: job,
        address: address,
        cityState: cityState,
        salary: salary,
        radius: radius,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });
      runOnboardQuery(address, cityState, radius);
    });

    // Firebase watcher + initial loader + order/limit HINT: .on("child_added"
    database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
      // storing the snapshot.val() in a variable for convenience
      var sv = snapshot.val();

      // Console.loging the last user's data

      // Change the HTML to reflect
      $("#job-display").html(sv.job);
      $("#address-display").html(sv.address);
      $("#salaryRange-display").html(sv.salary);
      $("#city-state-display").html(sv.cityState);
      $("#radius-display").html(sv.radius + " miles");

      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

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

//Not sure I need four of these, but I'm creating it now so if code diverges it'll be easier to mess with.
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

        console.log(GoogleData);
        console.log("------------------------------------");
  });
};

function runZillowQuery(zillowQueryUrl) {

  $.ajax({
    url: zillowQueryUrl,
    method: "GET",
    headers: {"key" : "Access-Control-Allow-Origin"}
  }).done(function(ZillowData){
        console.log("------------------------------------");
        console.log("URL: " + zillowQueryUrl);
        console.log("------------------------------------");
        console.log(ZillowData);
        var jsonified = xmlToJson(ZillowData);
        console.log("------------------------------------");
        console.log(jsonified);
        console.log(jsonified["SearchResults:searchresults"].response.results.result[1].zpid['#text']);
        var zpidThing = jsonified["SearchResults:searchresults"].response.results.result[1].zpid['#text'];
        $.ajax({
          url: "http://www.zillow.com/webservice/GetZestimate.htm?zws-id=X1-ZWz1fz8njz1yq3_7sxq3&zpid=" + zpidThing + "&rentzestimate=true",
          method: "GET",
          headers: {"key" : "Access-Control-Allow-Origin"}
        }).done(function(ZillowZestimateData){
              console.log("------------------------------------");
              console.log("ZestimateURL: " + "http://www.zillow.com/webservice/GetZestimate.htm?zws-id=" + zillowKey + "&zpid=" + zpidThing + "&rentzestimate=true");
              console.log("------------------------------------");
              console.log(ZillowZestimateData);
              var jsonified = xmlToJson(ZillowZestimateData);
              console.log("------------------------------------");
              console.log(jsonified);
              //console.log(jsonified["Zestimate:zestimate"].response.zestimate.amount['#text']);
        });
  });
};

function runGlassdoorQuery(glassdoorQueryUrl) {


  $.ajax({
    url: glassdoorQueryUrl,
    method: "GET"
  }).done(function(GlassdoorData){
        console.log("------------------------------------");
        console.log("URL: " + glassdoorQueryUrl);
        console.log("------------------------------------");

        console.log("GlassDoor Data" + GlassdoorData);
        console.log("------------------------------------");
  });
};

  function runOnboardQuery(address1, address2, radius) {
      console.log("This is running, just slow.");
      var firstAddressLine = address1.replace(/\s/g,'%20');
      var secondAddressLine = address2.replace(/\s/g,'%20');
      firstAddressLine = firstAddressLine.replace(/\,/g,'%2C');
      secondAddressLine = secondAddressLine.replace(/\,/g,'%2C');
      var selectedRadius = radius;
      var onboardQueryUrl = "https://search.onboard-apis.com/propertyapi/v1.0.0/property/address?address1=" + firstAddressLine + "&address2=" + secondAddressLine + "&radius=" + selectedRadius + "&page=1&pagesize=5&propertytype=APARTMENT&orderby=distance"
      console.log("This is the Onboard URL: " + onboardQueryUrl)
      $.ajax({
              url: onboardQueryUrl,
              type: "GET",
              dataType: "json",
              headers: { "apikey": "12e4d72b8d365ddf02371786955fb155" }
      }).done(function(response) {
          console.log(response);
          var addressLine1 = response.property[1].address.line1;
          addressLine1 = addressLine1.replace(/\s/g,'-');
          var addressLine2 = response.property[1].address.line2;
          addressLine2 = addressLine2.replace(/\s/g,'-');
          addressLine1 = addressLine1.replace(/\,/g,'%2C');
          addressLine2 = addressLine2.replace(/\,/g,'%2C');
          
          console.log("This might work: " + addressLine1 + " " + addressLine2);
          var zillowQueryUrl = "https://www.zillow.com/webservice/GetSearchResults.htm?zws-id=" + zillowKey + "&address=" + addressLine1 + "&citystatezip=" + addressLine2;
          console.log("This should have no spaces: " + zillowQueryUrl);
          runZillowQuery(zillowQueryUrl);
          });
  };