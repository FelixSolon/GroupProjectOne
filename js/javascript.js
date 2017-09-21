/*Partner ID:    193688
Key:    jv7w1oj6pHc*/
/*“Your Zillow Web Services Identification (ZWSID) is: X1-ZWz1fz8njz1yq3_7sxq3”*/

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
    console.log(database.ref())
    // Initial Values
    var job;
    var anythingElse;
    var salary;   //ask about inputting dropdowns

    

    // Firebase watcher + initial loader + order/limit HINT: .on("child_added"
    database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
      // storing the snapshot.val() in a variable for convenience
      var sv = snapshot.val();

      // Console.loging the last user's data
      //console.log(sv.job);
      //console.log(sv.anythingElse);
      //console.log(sv.salary);

      // Change the HTML to reflect
      $("#job-display").html(sv.job);
      $("#address-display").html(sv.addressElse);
      $("#salaryRange-display").html(sv.salary);
      //sets city and state to google maps search
      //$("#city-state-display").html(sv.cityState);
      //$("#pac-input").attr("value",sv.cityState);
      $("#radius-display").html(sv.radius);

      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });


var city="";
var state="";
var jobTitle=""
//To feed into Ajax and get Glassdoor stuff
var glassDoorQueryUrl = "http://api.glassdoor.com/api/api.htm?t.p=193688&t.k=jv7w1oj6pHc&userip=0.0.0.0&useragent=&format=json&v=1&action=employers&city=" + city + "&state=" + state + "&q=" + jobTitle

//To feed into Ajax and get Zillow stuff. More just declared here and actually filled in in the eventual function.
var zillowQueryUrl;

//To feed into Ajax and get Google Maps stuff

var address1 = "2312 Warrington Avenue";
var address2 = "Flower Mound, TX";
var radius = 0;

   
    var job;
    var anythingElse;
    var salary;   //ask about inputting dropdowns

    // Capture Button Click
    $(document).on("click", "#add-user", function(event) {
      event.preventDefault();
      input=$("#pac-input");
      // Grabbed values from text boxes
      job = $("#job-input").val().trim();
      address = $("#address-input").val().trim();
      //cityState = $("#geocomplete").val().trim();
      radius = $("#radius-input").val().trim();
      salary = $("#salaryRange-input").val().trim();
      //state = $("#state-input").val().trim();
      // Code for handling the push
      input.value="apartments near " + address;
      google.maps.event.trigger(input, 'focus');
      google.maps.event.trigger(input, 'keydown', {
          keyCode: 13
      });
      //uses regular expressions to make sure that all inputs are made up of 0-9, a-Z, hypen, or space
      //pops up a modal yelling at the user if it does
      //Actually modified from stack overflow, not just stolen, as it was triggering on Commas, too.
      //Yes, I learned how to use regular expressions for this stupid project.
      if(/^[a-zA-Z0-9- ,]*$/.test(job) == false) {
        $("#validationModal").modal();
        return false;
      }
      if(/^[a-zA-Z0-9- ,]*$/.test(address) == false) {
        $("#validationModal").modal();
        return false;
      }
      if(/^[a-zA-Z0-9- ,]*$/.test(radius) == false) {
        $("#validationModal").modal();
        return false;
      }

      database.ref().push({
        job: job,
        address: address,
        //the cityState variale should get renamed ,to be more self-commenting, but at this point I just don't want to break things.
        //cityState: cityState,
        //state: state,
        salary: salary,
        radius: radius,
        //the dateAdded is probably unnecessary for what we're doing, but it doesn't really hurt anything and means we can order stuff later if necessary.
        dateAdded: firebase.database.ServerValue.TIMESTAMP,
        usaJobsKey:usaJobsKey,
        zillowKey:zillowKey,
        onboardKey:onboardKey,
        googleMapsKey:googleMapsKey,
        glassDoorKey:glassDoorKey
      });
      
      var onboardQueryUrl = "https://search.onboard-apis.com/propertyapi/v1.0.0/property/address?address1=" + address1 + "&address2=" + address2 + "&radius=" + radius + "&page=1&pagesize=5"
      var googleMapsQueryUrl = "https://maps.googleapis.com/maps/api/js?key=" + googleMapsKey + "&libraries=places";
      console.log("Pleeeease" + googleMapsKey)
      runUSAJobsQuery(job, address, salary);
      runGoogleQuery(googleMapsQueryUrl)
      console.log("Things are happening")
      console.log("Address: " + address)
      console.log($("#pac-input"));

    });

    //before
var googleMapsKey;
var glassDoorKey;
var onboardKey;
var usaJobsKey;
var zillowKey;
    // Firebase watcher + initial loader + order/limit HINT: .on("child_added"
    database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
      // storing the snapshot.val() in a variable for convenience
      var sv = snapshot.val();

      // Console.loging the last user's data

      // Change the HTML to reflect
      $("#job-display").html(sv.job);
      $("#address-display").html(sv.address);
      $("#salaryRange-display").html(sv.salary);
      //$("#city-state-display").html(sv.cityState);
      $("#radius-display").html(sv.radius + " miles");
      console.log("Google Maps Key: " + sv.googleMapsKey);
      console.log("Onboard Key: " + sv.onboardKey);
      googleMapsKey=sv.googleMapsKey;
      onboardKey=sv.onboardKey;
      glassDoorKey=sv.glassDoorKey;
      usaJobsKey=sv.usaJobsKey;
      zillowKey=sv.zillowKey;
      console.log("After Z " + zillowKey);
      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });
console.log("Please " +   zillowKey);

//make global variables to modify later.
var GoogleData;
var ZillowData;
var GlassdoorData;
var usaJobsData

// Changes XML to JSON to make it reasonable to work with Zillow
//stolen directly from Stack Overflow
//I'm not good enough to code that myself.
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
                //TIL you can call a function inside of itself. -Eric
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

function runZillowQuery(zillowQueryUrl) {
  //Pull data for properties in a radius
  $.ajax({
    url: zillowQueryUrl,
    method: "GET",
    headers: {"key" : "Access-Control-Allow-Origin"}
  }).done(function(ZillowData){
        console.log("------------------------------------");
        console.log("URL: " + zillowQueryUrl);
        console.log("------------------------------------");
        console.log(ZillowData);
        //ToDo: Come up with a better variable name.
        var jsonified = xmlToJson(ZillowData);
        console.log("------------------------------------");
        console.log(jsonified);
        //TIL you can access object key-value pairs by putting a string into an array box. Because that makes sense.
        //But special characters make selecting zpid.#text or response.SearchResults:searchresults difficult.
        console.log(jsonified["SearchResults:searchresults"].response.results.result[1].zpid['#text']);
        //ToDo: Come up with better variable names.
        //This pulls Zillow's proprietary ID for a property so I can feed it into the next API call to get an actual rent estimate.
        var zpidThing = jsonified["SearchResults:searchresults"].response.results.result[1].zpid['#text'];
        $.ajax({
          url: "http://www.zillow.com/webservice/GetZestimate.htm?zws-id=X1-ZWz1fz8njz1yq3_7sxq3&zpid=" + zpidThing + "&rentzestimate=true",
          method: "GET",
          //I don't think this bit actually works.
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

function runGlassdoorQuery(address2, state, job) {
  //Regular expression finds all spaces and replaces them with %20, which is the URL version of a space.
  var secondAddressLine = address2.replace(/\s/g,'%20');
  //Regular expression finds all commas and replaces them with %2C, which is the URL version of a comma.
  var city = secondAddressLine.replace(/\,/g,'%2C'); 
  console.log("city: " + city);
  //Redefining variables are probably unnecessary, but it means I don't screw up the global variable as I do things.
  var selectedState = state;
  console.log("Selected State: " + state);
  var jobTitle = job;
  console.log("Job Title: " + jobTitle);
  var glassdoorQueryUrl = "http://api.glassdoor.com/api/api.htm?t.p=193688&t.k=jv7w1oj6pHc&userip=0.0.0.0&useragent=&format=json&v=1&action=employers&city=" + city + "&state=" + selectedState + "&q=" + jobTitle

  $.ajax({
    url: glassdoorQueryUrl,
    method: "GET"
  }).done(function(GlassdoorData){
        console.log("------------------------------------");
        console.log("URL: " + glassdoorQueryUrl);
        console.log("------------------------------------");

        console.log(GlassdoorData);
        console.log("------------------------------------");
        //Throw Employer stuff into a little panel and display on the sidebar.
        //This is the ugly way. The USA Jobs query has it in the more Best Practice way of creating Divs and such with jQuery, but this is functional.
        //Though even I judge me for this.
        for (var i = 0; i < GlassdoorData.response.employers.length; i++) {
          $("#found-jobs").append('<div class="panel panel-primary"><div class="panel-heading"><h3 class="panel-title">' + GlassdoorData.response.employers[i].name + '</h3></div><div class="panel-body job" id="job' + i + '"><img src="' + GlassdoorData.response.employers[i].squareLogo + '" height=50px class="logoImage"><h5>Employee Rating: ' + GlassdoorData.response.employers[i].ratingDescription + '<h5>Recommend Rating: ' + GlassdoorData.response.employers[i].recommendToFriendRating + '/100</h5></div></div></div>');
        }
  });
};

  function runOnboardQuery(address1, address2, radius) {
      console.log("This is running, just slow.");
      //RegEx things to URLify them.
      //Because it's more efficient than running a for loop through every input character and changing them if necessary.
      //Though I guess that's technically what I'm doing anyhow, but it's less code to write this way.
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
              //Sssh, don't tell anyone the API key.
              //ToDo: Store this in Firebase and retrieve it later to hide it from people inspecting the website.
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

function runGoogleQuery(googleMapsQueryUrl) {
        
  $.ajax({

    url: googleMapsQueryUrl,
    method: "GET",
    dataType: 'jsonp'
  }).done(function(GoogleData){
        initAutocomplete(GoogleData);
    });
};
function initAutocomplete() {
        console.log("The google thing is working")
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 32.8998, lng: -97.0403},
          zoom: 11,
          mapTypeId: 'roadmap'
        });

        // Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        console.log(searchBox);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });

        var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          // Clear out the old markers.
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];

          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
              map: map,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            }));

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
        });
};

//Because Glassdoor isn't working as I need it to. And also I'm too cheap to pay for the access to the actual APIs we'd need to do what we want with them.
  function runUSAJobsQuery (jobTitle, address, minSalary){
    var title = jobTitle;
    var selectedCity = address;
    //var selectedState = state;
    var queryUrl = "https://data.usajobs.gov/api/Search?Keyword=" + title + "&LocationName=" + selectedCity + "&RemunerationMinimumAmount=" + minSalary;
    console.log(queryUrl);
    $.ajax({
              url: queryUrl,
              type: "GET",
              dataType: "json",
              headers: { "Authorization-Key": "nweEhXPjqsflfJtnqIjGim20VIaTtP0ReR4+f9jM2Jk=" }
      }).done(function(response) {
        console.log(response);
        //Clear out the "Found Jobs" panel each search before adding new stuff in.
        if (response.SearchResult.SearchResultCount == "0"){
          $("#alertModal").modal();
        }
        $("#found-jobs").empty();
        for (var i = 0; i < response.SearchResult.SearchResultItems.length; i++) {
        var div = $("<div>")
        var panelHeading = $("<div>");
        var panelTitle = $("<h3>");
        var panelBody = $("<div>");
        var applyText = $("<h5>");
        var departmentText = $("<h5>");
        var closeDate = $("<h5>");
        div.addClass("panel panel-info");
        panelHeading.addClass("panel-heading");
        panelTitle.addClass("panel-title");
        panelBody.addClass("panel-body");
        panelTitle.text(response.SearchResult.SearchResultItems[i].MatchedObjectDescriptor.PositionTitle)
        div.append(panelHeading);
        panelHeading.append(panelTitle);
        div.append(panelBody);
        applyText.html('<a href="' + response.SearchResult.SearchResultItems[i].MatchedObjectDescriptor.ApplyURI[0] + '">Apply</a>');
        departmentText.text(response.SearchResult.SearchResultItems[i].MatchedObjectDescriptor.DepartmentName)
        panelBody.append(departmentText);
        closeDate.text("Application Close Date: " + response.SearchResult.SearchResultItems[i].MatchedObjectDescriptor.ApplicationCloseDate)
        panelBody.append(closeDate);

        panelBody.append(applyText);
        
        $("#found-jobs").append(div);


      }

      /*if (response.SearchResult.SearchResultCount == "0"){
          $("#alertModal").modal();
        }*/
  });

};