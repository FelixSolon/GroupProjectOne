

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
/*“Your Zillow Web Services Identification (ZWSID) is: X1-ZWz1fz8njz1yq3_7sxq3”*/


//API key for Zillow
var zillowKey = "X1-ZWz1fz8njz1yq3_7sxq3";

//To feed into Ajax and get Zillow stuff
var zillowQueryUrl = "http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=" + zillowKey + "&address=2114+Bigelow+Ave&citystatezip=Seattle%2C+WA";

//start zillow code
var ZillowData;

function runZillowQuery(zillowQueryUrl){

  $.ajax({
    url: zillowQueryUrl,
    method: "GET"
  }).done(function(ZillowData){
       //displaySearch(zillowQueryUrl);

        console.log("------------------------------------");
        console.log( zillowQueryUrl);
        console.log("------------------------------------");

        // Log the NYTData to console, where it will show up as an object
        console.log(ZillowData);
        console.log("------------------------------------");
  });
  function displaySearch(ZillowData){
    $("#zill").empty();
     
 };   
     
};
console.log(zillowQueryUrl);
//end zillow code