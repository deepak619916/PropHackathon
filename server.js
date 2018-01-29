// /*
// - Client and Server
// - What is Node.js? How JS runs on server? How to create a server in Node.js?
// - what are modules? How to write a module? How are modules created in Node.js?
// */

const express = require('express'),
	http = require('http'),
	cors= require('cors'),
	str= require('string');

	// bodyParser = require('body-parser'),
 //    cookieParser = require('cookie-parser'),
     path = require('path');

// const studentService = require('./services/studentService');

//app.use(express.static(__dirname + "/public"));
// // Creating new express app
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var app = express();
app.use(cors());
app.use(express.static(__dirname + "/public"));
var isCame=false;

// // // Setting the templating engine
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

// // // Adding static path
// app.use(express.static(path.join(__dirname, '/public')));

// // // Parsing body and cookies
// app.use(bodyParser.json({ limit: '100mb' }));
// app.use(cookieParser());



var firstUrl="www.makaan.com/petra/app/v4/listing?selector=";
	var lastUrl="&includeNearbyResults=false&includeSponsoredResults=false&sourceDomain=Makaan";
	var variableUrl = {

		"fields":

		["localityId","displayDate","listing","property","project","builder","displayName","locality","suburb",
		 "city","state","currentListingPrice","companySeller","company","user","id","name","label","listingId",
		 "propertyId","projectId","propertyTitle","unitTypeId","resaleURL","description","postedDate",
		 "verificationDate","size","measure","bedrooms","bathrooms","listingLatitude","listingLongitude",
		 "studyRoom","servantRoom","pricePerUnitArea","price","localityAvgPrice","negotiable","rk","buyUrl",
		 "rentUrl","overviewUrl","minConstructionCompletionDate","maxConstructionCompletionDate","halls",
		 "facingId","noOfOpenSides","bookingAmount","securityDeposit","ownershipTypeId","furnished",
		 "constructionStatusId","tenantTypes","bedrooms","balcony","floor","totalFloors","listingCategory",
		 "possessionDate","activeStatus","type","logo","profilePictureURL","score","assist","contactNumbers",
		 "contactNumber","isOffered","mainImageURL","mainImage","absolutePath","altText","title","imageCount",
		 "geoDistance","defaultImageId","updatedAt","qualityScore","projectStatus","throughCampaign",
		 "addedByPromoter","listingDebugInfo","videos","imageUrl","rk","penthouse","studio","paidLeadCount",
		 "listingSellerTransactionStatuses","allocation","allocationHistory","masterAllocationStatus","status",
		 "sellerCompanyFeedbackCount","companyStateReraRegistrationId"],

		 "filters":

		 {
		 	"and":
		 	[

		 		{ "equal" : { "cityId":11 } },
		 		{ "equal" : { "listingCategory" : ["Primary","Resale"] } },
		 	]
		 },

		 "paging":

		 {
		 	"start" : 0 , "rows" : 20
		 }

		
    } ;


var server = http.createServer(app).listen(8000, function() {
    console.log('info', 'Express server listening on port ' + 8000);
});


// // Setup api routes

function generateQueryString(params){

	if(params.listingCategory=="buy"){
			variableUrl.filters.and[1].equal.listingCategory=["Primary","Resale"];
	}

	else if(params.listingCategory=="rent"){

			variableUrl.filters.and[1].equal.listingCategory="Rental";
	}

	else{

	}
	console.log("CAme in query generation function");
   console.log(params.beds);
   
	if(params.beds !== undefined){
		//var bedObject= { "equal" : { "bedrooms" : []}}
		console.log("came in be function");


		   var splitted= params.beds.split(',');
		   var beds= new Array();
		   for(var i in splitted){
		    	beds.push(parseInt(splitted[i]));
		   }
		   console.log("Array is ");
		   console.log(beds);
		  // bedObject.equal.bedrooms=beds;
		variableUrl.filters.and[2].equal.bedrooms=beds;
		//console.log(queryString);
	}
	else{
			if(isCame==false){
					variableUrl.filters.and.push({"equal" : { "bedrooms" : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16] }});
					isCame=true;
				}
			else{
					variableUrl.filters.and[2].equal.bedrooms= [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
			}
	}

	if(params.sortOrder !== undefined) {
        var sortOrder = params.sortOrder;
        console.log(sortOrder);

        if(sortOrder=="REL"){
        		delete variableUrl.sort;
        }
        else if(sortOrder == "ASC") {
                variableUrl.sort = [{"field":"price","sortOrder":"ASC"}];
            }
        else if(sortOrder == "DESC"){
                variableUrl.sort = [{"field":"price","sortOrder":"DESC"}];
        }
       else if(sortOrder == "listingPopularityScore"){
            variableUrl.sort = [{"field":"listingPopularityScore","sortOrder":"DESC"}];
        }
    }
    

    	var cityNameInRequest = params.cityName;
    	//console.log(cityNameInRequest);
    	let cityId=11;
     	if(params.hasOwnProperty("cityName")) {
        	let cityLoweCaseName = cityNameInRequest.toLowerCase();
        		//console.log(cityLoweCaseName);
	        if(cityLoweCaseName == "gurgaon") cityId = 11;
	        if(cityLoweCaseName == "hyderabad") cityId = 12;
	          if(cityLoweCaseName == "indore") cityId = 13;
	          if(cityLoweCaseName == "mumbai") cityId = 18;
	         if(cityLoweCaseName == "kolkata") cityId = 16;
	         if(cityLoweCaseName == "noida") cityId = 20;
	         if(cityLoweCaseName == "pune") cityId = 21;
	         if(cityLoweCaseName == "lucknow") cityId = 23;
	         if(cityLoweCaseName == "chandigarh") cityId = 24;
	         if(cityLoweCaseName == "nagpur") cityId = 25;

	         variableUrl.filters.and[0].equal.cityId = cityId;
	   }
     

	   var startingPropertyNo = (params.pageNumber-1)*20;
    	console.log(startingPropertyNo); 
    	variableUrl.paging.start = startingPropertyNo;

    var queryString=firstUrl+JSON.stringify(variableUrl)+lastUrl;

    console.log(queryString);
    return queryString;
}

app.get('/', function(req, res) {
	//var myname=req.query.name;
	
		console.log("Query is");
		console.log(req.query);
	   var queryString=generateQueryString(req.query);
    //console.log("camne before calling fiunction");
    //console.log(firstUrl+JSON.stringify(variableUrl)+lastUrl);

    	var xhr = new XMLHttpRequest();
		xhr.open('GET',"https://"+queryString, true);
		//console.log("request Sent");
		xhr.send();
		var jsonResponse;
		//xhr.addEventListener("readystatechange", processRequest, false);

		xhr.onreadystatechange = processRequest;

		function processRequest(){
		//		console.log("Came for Process Response Event Handler");
		if (xhr.readyState == 4 && xhr.status == 200) {
        		console.log("response is positive");
				jsonResponse = JSON.parse(xhr.responseText);
				console.log(jsonResponse);
				res.send(jsonResponse);
			
			}
		}
}); 

/*function callAPI(queryString,res)
{
		var xhr = new XMLHttpRequest();
		xhr.open('GET',"https://"+queryString, true);
		console.log("request Sent");
		xhr.send();
		var jsosnResponse;
		//xhr.addEventListener("readystatechange", processRequest, false);

		xhr.onreadystatechange = processRequest;

		function processRequest(){
				console.log("Came for Process Response Event Handler");
		if (xhr.readyState == 4 && xhr.status == 200) {
        		console.log("response is positive");
				this.jsosnResponse = JSON.parse(xhr.responseText);
				console.log(this.jsosnResponse);
				//res.send(jsosnResponse);
				//jsosnResponse=response;
    	}

    }
    console.log("Data which is returned");
    console.log(jsosnResponse);
    if(xhr.readyState==4)
    return (JSON.parse(xhr.responseText));
} */

// app.get('/students', sayHello, studentService.getStudentsPage);
// app.get('/toppers', sayHello, studentService.getToppers);

// function sayHello(req, res, next) {
//     console.log("hello", req.url);
//     next();
//     // next("ERROR");
// }

// function gotError(err, req, res, next) {
//     console.log("error", err);
//     // next();
//     next(err);
// }

// // // Error handler
// app.use(function(err, req, res, next) {
//     console.log("ERROR OCCURRED !!", err);
//     //next(err);
//     next("Some error occurred");
// });

