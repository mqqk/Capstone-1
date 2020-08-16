'use strict'
//function to ensure parameters return as a string
function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }
  //fetch the city info to pull ORI, the fetch for the stats requires ORI, but user won't necessarily know the ORI
  //create a function that changes the parameter City name to the ORI so that the statistic collection will return appropriately

    



  function getCityReturn(city,ori,year,clickCityCount){
    
    //console.log("getReturn started")
   
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };


    const params={
        "ori":ori,
        "begin year":year,
    };
    //new url /api/summarized/agencies/{ori}/offenses/{since}/{until}
    const baseUrl='https://api.usa.gov/crime/fbi/sapi/api/summarized/agencies/'+ori+'/offenses/'+year+'/'+year+'?api_key='

    //const queryString=formatQueryParams(params)
    const url=baseUrl+apiKey;    

   console.log(url);
    
    fetch(url, requestOptions)
      .then(response => {
      if(response.status===200){return response.json();
      }else
      alert("Invalid Department Name or Year")
      })
      .then(responseJson => cityValues(city,ori,year,responseJson,clickCityCount))
      //.catch(error => console.log('error', error));
      //return alert("incorrect abbreviation")
    
}



//this function now parses the response values to pair with the key
function cityValues(city,ori,year,responseJson,clickCityCount){
    console.log('running arrayValues');
    console.log(responseJson.results);
    let results=responseJson.results;
    let keys=[];
    let crimes=[];
    let reported=[];
    let solved=[];
    let jsResults='js-results'+clickCityCount

        
    $('#mainBox').append(`
        <div id="${jsResults}" class="resultsBox">
        <h4>${city} ${year}</h4>            </div>
    `)

    for(let i=0;i<results.length;i++){
        crimes.push(results[i].offense);
        reported.push(results[i].actual);
        solved.push(results[i].cleared);
        //keys.push([offense])

    }
    console.log(crimes);
    console.log(reported);
    console.log(solved);
    //console.log(offense);
    //console.log("hi");
    //console.log(keys);
    //for(let i=0;i<responseJson.data.length;i++){
      //keys.push(responseJson.data[i].key);
      //values.push(responseJson.data[i].value);
    
    //}
    //console.log('bye');
    //console.log(keys);
    displayCityResults(crimes,reported,solved,clickCityCount);
}

//dropbox function
//will populate text box with options for crimes to search
//function ddlselect(){
  //const d=document.getElementById("ddselect");
  //console.log(d);
 // const displaytext=d.options[d.selectedIndex].text;
  //console.log(displaytext);
  
  //document.getElementById("txtvalue").value=displaytext;
//}


//combines the STORE with the parsed values
function displayCityResults(crimes,reported,solved,clickCityCount){
    console.log('displayCityResults')
    //console.log(STORE[0]+'-'+values[0]);
    let jsResults='#js-results'+clickCityCount;
    //console.log(jsResults);
    //console.log(offense);
    for(let i=0;i<crimes.length;i++){


    $(jsResults).append(`  

      <ul>${crimes[i]}
      <li>Reported-${reported[i]}</li>
      <li>Solved-${solved[i]}</li>
      </ul>
    `)}
    $(citySearchLoad)
}



let clickCityCount=0;

function checkClicks(clickCityCount){
  if(clickCityCount>2){
    alert('Only two queries should be displayed. Press Reset to make a new search');
  }
}
function citySearchLoad(){
    //console.log(STORE[0]);
    console.log("searchLoad starts"); 
      let city="";
      let year="";
      console.log("hi");
      //checkClicks(clickCityCount);
    
      if(clickCityCount>3){return alert('Only two queries should be displayed. Press Reset to make a new search')}


    $('#js-submit').on('click',function(event){        
        event.preventDefault();
        clickCityCount+=1;
        //console.log("eventStarted");
        //$('#js-search').empty();        
        city=$('#cityOri').val();
        year=$('#year').val();//beginning year
        console.log(city);
        console.log(year);
        
      console.log(clickCityCount);

        //recentSearches(city,year);        
        $('#cityOri').val('');
        $('#year').val('');//beginning year
        //$('#endYear').val('');//end year
        displayOri(cityInfo,city);
        console.log("hi  "+ori);
        console.log(year);
        
        getCityReturn(city,ori,year,clickCityCount);
    })
    

}

    let ori="";
    let region="";
function displayOri(cityInfo,agency){
    console.log("getting ori");
    //console.log(cityInfo[0]);
    console.log(agency);
    //console.log(cityInfo[0].agency_name);

    let city="";

    for(let i=0;i<cityInfo.length;i++){
      if(agency===cityInfo[i].agency_name){ori=cityInfo[i].ori}
    }return (ori);
   
};




//generate a citySearch box for user to input search parameters
function citySearch(){
  console.log("citySearch started");
  $('#js-load').hide();
  $('#mainBox').append(`
  <div class="col">
    <div class="searchBox col">
      <h2>Search Arrest Made</h2>
      
      <form id="searchForm">
          <label>Enter City</label>
          <input id="cityOri"  placeholder="Raleigh Police Department"> </input><br>
          <label>Enter Year</label>
          <input id="year" placeholder="year between 1985-2014"></input><br>

      </form>
      <span><button class="butt" type="submit" id="js-submit">Submit</button></span>
      <input type="reset" id="resetButt" class="butt">
      <button class="butt" id="js-back">Back</button>
    </div>
  </div>

  
  <div id="js-search" class="resultsBox"></div>

  `)
citySearchLoad();

}

function resetCity(){
  $('#resetButt').on('click',function(e){
    event.preventDefault();
    $('#mainBox').empty();
    clickCityCount=0;
    
    citySearch();
    resetCity();
    backUp();
  })

}

function backUp(){
    $('#js-back').on('click',function(e){
      $('#mainBox').empty();
      $('#js-load').show();
    }) 
  }
  


function whichTool(){
  console.log("let's go");
  $("#citySearch").click(event =>{
    citySearch();
    resetCity();
    backUp();
  })
}

function loadSearchTools(){
  whichTool();
}

$(loadSearchTools());