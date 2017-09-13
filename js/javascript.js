


//API key for Onboard, which we can use to at least 
var onboardKey = "12e4d72b8d365ddf02371786955fb155"




//To feed into Ajax and get Google Maps stuff
var googleMapsQueryUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAnpNhNn2dOYuHrpHCd4A80FvWNelv56zM&callback=initMap&libraries=places";



// Initialize Firebase
var config = {
    apiKey: "AIzaSyBk-N1sODC49DzdCFBCiAHwo1_WbtOMS6s",
    authDomain: "job-search-app.firebaseapp.com",
    databaseURL: "https://job-search-app.firebaseio.com",
    projectId: "job-search-app",
    storageBucket: "job-search-app.appspot.com",
    messagingSenderId: "768755547077"
};


//firebase.initializeApp(config);

//make global variables to modify later.
var GoogleData;




//Not sure I need three of these, but I'm creating it now so if code diverges it'll be easier to mess with.
//ToDo: Refactor if necessary


 //sets google maps query

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
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 32.8998, lng: -97.0403},
          zoom: 11,
          mapTypeId: 'roadmap'
        });

        // Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
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


    console.log("This is working")




//--------------------------------------------------->
//-----Marker Clustering Documentation--------------->
//adds markers to additional locations NOT WORKING YET
//--------------------------------------------------->
         //var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

          //var markers = locations.map(function(location, i) {
          //return new google.maps.Marker({
           // position: location,
           // label: labels[i % labels.length]
          //});
        //});

 
        // Add a marker clusterer to manage the markers.
        //var markerCluster = new MarkerClusterer(map, markers,
           // {imagePath: 'markerclusterer.js'});
      
      //var locations = [
       // {lat: 31.563910, lng: -147.154312},
       // {lat: 33.718234, lng: -150.363181}
        
      //]
};

//end of google maps code




//runZillowQuery(zillowQueryUrl);
runGoogleQuery(googleMapsQueryUrl);