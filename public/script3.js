
var serverAddress="http://localhost:8000";
var url;
var isBuyClicked=false;
var isRentClicked=false;
var globalJsonData;
var maxBedrooms=16;
var currentPage;


function clearSelection(){

	for(var i=1; i<=4; i++){
		document.getElementById("bhk"+i).checked= false;
	}
}


function pageNoClicked(pageNo) {
//     for(var i=1; i<=6; i++) {
//         if(i !== pageNo)
//             document.getElementById("p"+pageNo).style.backgroundColor = "white";
//     }
	window.scrollTo(0,0);
    currentPage = pageNo;
    var url = new URL(serverAddress);
    if(isBuyClicked == true)
        url.searchParams.append("listingCategory","buy");
    else
        url.searchParams.append("listingCategory", "rent");
    var bedroomList = [];
    var isAnyBedroomChecked = false;
    for(var i=1; i<=4; i++) {
        if(document.getElementById("bhk"+i).checked == true) {
            isAnyBedroomChecked = true;
            bedroomList.push(i);
        }
    }
    if(isAnyBedroomChecked == true){
    	url.searchParams.append("beds", bedroomList);
    }
    
    //Apply Bedroom Filter according to the city name in search field

   
    sendRequest(url);
    resetAllPageNoColor();
    document.getElementById("p"+pageNo).style.backgroundColor = "red";

//     //renderProperties();

//     // var startingPropertyNo = (pageNo-1)*20 + 1;
//     // renderProperties(fetchedData, startingPropertyNo);
}

function resetAllPageNoColor() {
    for(var i=1; i<=6; i++) {
        document.getElementById("p"+i).style.backgroundColor = "white";
    }
}

function set1stPageColor() {
    document.getElementById("p1").style.backgroundColor = "red";    
}


function searchCity(){

	var changeName=document.getElementById("sort");
	changeName.innerHTML="Sort";
	if(isBuyClicked==false && isRentClicked==false){
		alert("First click iether Rent or buy");
		return;
	}
	clearSelection();
	currentPage=1;
	url = new URL(serverAddress);

									if(isBuyClicked==true){

												url.searchParams.append('listingCategory',"buy");
									}
									else if(isRentClicked==true){

												url.searchParams.append('listingCategory',"rent");
									}
									else{


									}
									url.searchParams.append("sortOrder","REL");
	url.searchParams.append("cityName",document.getElementById("search").value);
	resetAllPageNoColor();
	set1stPageColor();
	sendRequest(url);
	//alert("Hey i mthere");

}
function sortLowToHigh(){

	
	resetAllPageNoColor();
	set1stPageColor();
	currentPage=1;
	if(isBuyClicked==false && isRentClicked==false){
		alert("First click iether Rent or buy");
	}
	else{
			var changeName=document.getElementById("sort");
			changeName.innerHTML="Sort : Price Low to High";
			/*var sortedData=JSON.parse(JSON.stringify(globalJsonData));
			console.log("Before sort");
			var items=sortedData.data[0].facetedResponse.items;
  			for( var i in items){
  				console.log(items[i].listing.currentListingPrice.price);
  			}
  			sortedData.data[0].facetedResponse.items.sort(function(obj1,obj2){
  			return obj1.listing.currentListingPrice.price - obj2.listing.currentListingPrice.price ;
  			});
  			console.log("Now after sort");
  			var items1=sortedData.data[0].facetedResponse.items;
  			for( var i in items1){
  				console.log(items1[i].listing.currentListingPrice.price);
  			}*/


  				var findArray= new Array();
				var isAnyBed=false;
				for(var i=1; i<=4; i++){
					if( document.getElementById("bhk"+i).checked == true ){
							isAnyBed=true;
						if(i==4)
						{
							for(var j=i; j<=maxBedrooms; j++){
									findArray.push(j);	
							}
							
						}
						else
						{
							findArray.push(i);
						}
					}
				}

				if(isAnyBed==false){

									url = new URL(serverAddress);

									if(isBuyClicked==true){

												url.searchParams.append('listingCategory',"buy");
									}
									else if(isRentClicked==true){

												url.searchParams.append('listingCategory',"rent");
									}
									else{


									}
									url.searchParams.append("sortOrder","ASC");
									sendRequest(url);
				}
				else{
					        url = new URL(serverAddress);
							 url.searchParams.append('beds',findArray);
							if(isBuyClicked==false && isRentClicked==false){
								alert("First click iether Rent or buy");
							}
							else{
									if(isBuyClicked==true){

												url.searchParams.append('listingCategory',"buy");
									}
									else if(isRentClicked==true){

												url.searchParams.append('listingCategory',"rent");
									}
									else{


									}
									url.searchParams.append("sortOrder","ASC");
									console.log("sending url");
									sendRequest(url);		
							}
							
			}


  			//renderResults(sortedData);		
	}

  
}

function sortHighToLow(){

	
	resetAllPageNoColor();
	set1stPageColor();
	currentPage=1;
	if(isBuyClicked==false && isRentClicked==false){
		alert("First click either Rent or buy");
	}
	else{
				var changeName=document.getElementById("sort");
				changeName.innerHTML="Sort : Price High to Low";
				var findArray= new Array();
				var isAnyBed=false;
				for(var i=1; i<=4; i++){
					if( document.getElementById("bhk"+i).checked == true ){
							isAnyBed=true;
						if(i==4)
						{
							for(var j=i; j<=maxBedrooms; j++){
									findArray.push(j);	
							}
							
						}
						else
						{
							findArray.push(i);
						}
					}
				}

				if(isAnyBed==false){

									url = new URL(serverAddress);

									if(isBuyClicked==true){

												url.searchParams.append('listingCategory',"buy");
									}
									else if(isRentClicked==true){

												url.searchParams.append('listingCategory',"rent");
									}
									else{


									}
									url.searchParams.append("sortOrder","DESC");
									sendRequest(url);
				}
				else{
					        url = new URL(serverAddress);
							 url.searchParams.append('beds',findArray);
							if(isBuyClicked==false && isRentClicked==false){
								alert("First click iether Rent or buy");
							}
							else{
									if(isBuyClicked==true){

												url.searchParams.append('listingCategory',"buy");
									}
									else if(isRentClicked==true){

												url.searchParams.append('listingCategory',"rent");
									}
									else{


									}
									url.searchParams.append("sortOrder","DESC");
									console.log("sending url");
									sendRequest(url);		
							}
							
			}

  				//renderResults(sortedData);		
	}
  
}

function sortByPopularity(){

	resetAllPageNoColor();
	set1stPageColor();
	currentPage=1;
	if(isBuyClicked==false && isRentClicked==false){
		alert("First click either Rent or buy");
	}
	else{
				var changeName=document.getElementById("sort");
				changeName.innerHTML="Sort : By Popularity";
				var findArray= new Array();
				var isAnyBed=false;
				for(var i=1; i<=4; i++){
					if( document.getElementById("bhk"+i).checked == true ){
							isAnyBed=true;
						if(i==4)
						{
							for(var j=i; j<=maxBedrooms; j++){
									findArray.push(j);	
							}
							
						}
						else
						{
							findArray.push(i);
						}
					}
				}

				if(isAnyBed==false){

									url = new URL(serverAddress);

									if(isBuyClicked==true){

												url.searchParams.append('listingCategory',"buy");
									}
									else if(isRentClicked==true){

												url.searchParams.append('listingCategory',"rent");
									}
									else{


									}
									url.searchParams.append("sortOrder","listingPopularityScore");
									sendRequest(url);
				}
				else{
					        url = new URL(serverAddress);
							 url.searchParams.append('beds',findArray);
							if(isBuyClicked==false && isRentClicked==false){
								alert("First click either Rent or buy");
							}
							else{
									if(isBuyClicked==true){

												url.searchParams.append('listingCategory',"buy");
									}
									else if(isRentClicked==true){

												url.searchParams.append('listingCategory',"rent");
									}
									else{


									}
									url.searchParams.append("sortOrder","listingPopularityScore");
									console.log("sending url");
									sendRequest(url);		
							}
							
			}

  				//renderResults(sortedData);		
	}
}

function bedroomClicked(){

	resetAllPageNoColor();
	set1stPageColor();
	currentPage=1;
	if(isBuyClicked==false && isRentClicked==false){
					alert("First click iether Rent or buy");
					clearSelection();
					return;
				}
	var findArray= new Array();
	var isAnyBed=false;
	for(var i=1; i<=4; i++){
		if( document.getElementById("bhk"+i).checked == true ){
				isAnyBed=true;
			if(i==4)
			{
				for(var j=i; j<=maxBedrooms; j++){
						findArray.push(j);	
				}
				
			}
			else
			{
				findArray.push(i);
			}
		}
	}

	if(isAnyBed==false){

						url = new URL(serverAddress);

						if(isBuyClicked==true){

									url.searchParams.append('listingCategory',"buy");
						}
						else if(isRentClicked==true){

									url.searchParams.append('listingCategory',"rent");
						}
						else{


						}
						sendRequest(url);
	}
	else{
		        url = new URL(serverAddress);
				 url.searchParams.append('beds',findArray);
				if(isBuyClicked==false && isRentClicked==false){
					alert("First click iether Rent or buy");
				}
				else{
						if(isBuyClicked==true){

									url.searchParams.append('listingCategory',"buy");
						}
						else if(isRentClicked==true){

									url.searchParams.append('listingCategory',"rent");
						}
						else{


						}
						console.log("sending url");
						sendRequest(url);		
				}
				//sendRequest(url);
	}
	
	
}
function buyClicked(){

	var changeName=document.getElementById("sort");
	changeName.innerHTML="Sort";
	resetAllPageNoColor();
	set1stPageColor();
	currentPage=1;
	clearSelection();
	isBuyClicked=true;
	 url = new URL(serverAddress);
	url.searchParams.append('listingCategory',"buy");
	url.searchParams.append("sortOrder","REL");
	var changeName=document.querySelector(".dropbtn");
	changeName.innerHTML="Buy";
	sendRequest(url);   

}

function rentClicked(){
	var changeName=document.getElementById("sort");
	changeName.innerHTML="Sort";
	resetAllPageNoColor();
	set1stPageColor();
	currentPage=1;
	clearSelection();
	isRentClicked=true;
 	url = new URL(serverAddress);
	url.searchParams.append('listingCategory',"rent");
	url.searchParams.append("sortOrder","REL");
	var changeName=document.querySelector(".dropbtn");
	changeName.innerHTML="Rent";
	sendRequest(url);
}

function bedroomFilter(){
	//console.log(globalJsonData);
	var findArray= new Array();
	//var tempJsonData= new Object();
	var isBhk1Selected=document.getElementById("bhk1").checked;
	var isBhk2Selected=document.getElementById("bhk2").checked;
	var isBhk3Selected=document.getElementById("bhk3").checked;
	var isBhk4Selected=document.getElementById("bhk4").checked;
	var bedroomFilteredData;
	for(var i=1; i<=4; i++){
		if( document.getElementById("bhk"+i).checked == true ){
			if(i==4)
			{
				findArray.push(i);
				findArray.push(i+1);
				findArray.push(i+2);
			}
			else
			{
				findArray.push(i);
			}
		}
	}
	console.log("find Aray is "  +findArray);

	if(isBuyClicked==false && isRentClicked==false){
		alert("First choose whether to Buy or Rent");
	}
	else{
			//tempJsonData=globalJsonData;
			bedroomFilteredData=JSON.parse(JSON.stringify(globalJsonData));
			var items=globalJsonData.data[0].facetedResponse.items;

			

			for(var i in items){

				var property=items[i].listing;
				var beds=property.property.bedrooms;
				if(findArray.includes(beds)==false){
							console.log("Romoved data have beds = " + beds)
						bedroomFilteredData.data[0].facetedResponse.items[i]=null;
				}
		}
	}
	console.log(bedroomFilteredData);
	renderResults(bedroomFilteredData);
}

function sendRequest(url){
	//	var enteredText=document.getElementById("txt").value;
	
		//console.log(url.toString());

		url.searchParams.append("pageNumber",currentPage);
		var xhr = new XMLHttpRequest();
		xhr.open('GET',url.toString(), true);
		xhr.send();

		xhr.addEventListener("readystatechange", processRequest, false);

		xhr.onreadystatechange = processRequest;

		function processRequest(e){

		if (xhr.readyState == 4 && xhr.status == 200) {
        
				var jsonResponseData = JSON.parse(xhr.responseText);
				//console.log(jsonResponseData);
				//document.body.innerHTML=jsonResponseData.toString();
				globalJsonData=jsonResponseData;
				console.log("Response is " + jsonResponseData);
				renderResults(jsonResponseData);
				//alert(globalJsonData);
    	}
 
    }
}

function renderResults(jsonResponseData){

	var items=jsonResponseData.data[0].facetedResponse.items;
	var showResult= document.querySelector(".ShowResult");
	
	while (showResult.firstChild) {
    	showResult.removeChild(showResult.firstChild);
	}
	console.log(showResult);
	//
	//showResult=null;
	var resaleURLs=[];
	for(var i in items){

		if(items[i]==null || items[i]==undefined){
			continue;
		}
		var property=items[i].listing;

		/*console.log(property.mainImageURL);
		console.log("No. oif beds are" + property.property.bedrooms);
		console.log(property.property.project.locality.suburb.city.label);
		console.log("--------------");
		console.log("price is " + property.currentListingPrice.price);*/
		console.log("Printing Data");
		console.log(property);

		resaleURLs.push(property.resaleURL.toString());

		var card = document.createElement('div');
		card.className = "card";

				var property_image = document.createElement('div');
				property_image.className = "property-image";
				
						var img = document.createElement('img');
						img.src = property.mainImageURL.toString();
						//img.style = "width:100%";

				property_image.appendChild(img);


		card.appendChild(property_image);


		// <div class="property-content">
		var property_content = document.createElement('div');

		property_content.style.fontWeight="bold";

		property_content.className = "property-content";
		var propertyTitle = document.createElement("h3");
		propertyTitle.className = "property-title";
		property_content.appendChild(propertyTitle);
		var text = document.createTextNode(property.property.bedrooms.toString() + "  " + "BHK" + "  " + property.property.unitType.toString());
		property_content.appendChild(text);
		var location = document.createTextNode(property.property.project.locality.label.toString() + " , " + property.property.project.locality.suburb.city.label.toString());
		property_content.appendChild(document.createElement('br'));
		property_content.appendChild(document.createElement('br'));
		property_content.appendChild(location);

		card.appendChild(property_content);
		//</div>


		//<div class="listing-highlights">
		var listing_highlights = document.createElement('div');
		listing_highlights.className = "listing-highlights";


			//<div class="hcol">
			var hcol=document.createElement('div');
			hcol.className="hcol";

					//<div class="price">
					var price=document.createElement('div');
					price.className="price";
					price.style.fontWeight="bold";

								//<sup class="rupee">
								var rupee=document.createElement('STRONG');
								rupee.className="rupee";

										var txt1=document.createTextNode("Rs " + " ");
										rupee.appendChild(txt1);

								price.appendChild(rupee);
								//</sup>


								//<span class="val">
								var val=document.createElement('span');
								val.className="val";

										var txt2=document.createTextNode(convertPrice(property.currentListingPrice.price).val + "  ");
										val.appendChild(txt2);

								price.appendChild(val);
								//</span>



								//<span class="unit">
								var unit=document.createElement('span');
								unit.className="unit";

										var txt3=document.createTextNode(convertPrice(property.currentListingPrice.price).unit + "  ");
										unit.appendChild(txt3);

								price.appendChild(unit);
								//</span>

					hcol.appendChild(price);
					//</div>


					//<div class="lbl">
					var lbl=document.createElement('div');
					lbl.className="lbl";

								var txt4=document.createTextNode(property.currentListingPrice.pricePerUnitArea + "    / sq ft ");
								lbl.appendChild(txt4);


					hcol.appendChild(lbl);
					//</div>

			listing_highlights.appendChild(hcol);
			//</div>

			//<div class="hcol">
			var hcol1=document.createElement('div');
			hcol1.className="hcol";

					//<div class="size">
					var size=document.createElement('div');
					size.className="size";
					size.style.fontWeight="bold";
								//<span class="val">
								var val1=document.createElement('span');
								val1.className="val";

										var txt5=document.createTextNode(property.property.size);
										//txt5.style.fontWeight="bold";
										val1.appendChild(txt5);

								size.appendChild(val1);
								//</span>

					hcol1.appendChild(size);
					//</div>



					//<div class="lbl">
					var lbl1=document.createElement('div');
					lbl1.className="lbl";

							var txt5=document.createTextNode("Area in sq ft");
							lbl1.appendChild(txt5);

					hcol1.appendChild(lbl1);
					//</div>

			listing_highlights.appendChild(hcol1);
			//</div>

		card.appendChild(listing_highlights);
		//</div>



		//<div class="listing-details">
		var listing_details=document.createElement('div');
		listing_details.className="listing-details";

					//<span class="listing-details-data">
					var listing_details_data=document.createElement('span');
					listing_details_data.className="listing-details-data";


									var x = document.createElement("STRONG");
									var str="Possession By  : " + convDate(property.property.project.possessionDate);
    								var t = document.createTextNode(str);
    								//x.style.fontWeight="bold";
    								x.appendChild(t);
    								listing_details_data.appendChild(x);

    				listing_details.appendChild(document.createElement('br'));
					listing_details.appendChild(listing_details_data);
					//</span>



		card.appendChild(listing_details);
		//</div>




		showResult.appendChild(card);
		//showResult.innerHTML = card.innerHTML;
	}


    var allContents = document.querySelectorAll(".card");
    for(var i=0; i<allContents.length; i++) {
        let currentURL = resaleURLs[i];
        //console.log(currentURL);
        allContents[i].addEventListener("click", function(){
            var propertyProductionURL = "http://www.makaan.com/" + currentURL;
            //console.log(currentURL);
            var propertyPage = window.open(propertyProductionURL);
            propertyPage.focus();
        });
    }

	//console.log("hey i m here");
	//console.log(golobalJsonData);
}

  convertPrice = function (num) {
    if(num>=10000000) {
      return {'val': Number(num/10000000).toFixed(2), 'unit': 'Cr'};
    }
    else if(num>=100000) {
      return {'val' : Number(num/100000).toFixed(2), 'unit': 'L'};
    }
    else {
      return {'val': Number(num/1000).toFixed(2), 'unit': 'K'};
    }
  }
  convDate = function(d) {
  	if(d==undefined){
  		return "Not Available";
  	}
    d = new Date(d);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return (months[d.getUTCMonth()] + ' ' + d.getUTCFullYear());
  }
