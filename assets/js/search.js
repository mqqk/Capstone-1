'use strict'
//function to ensure parameters return as a string
function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }

  function getReturn(state,year){
    
    //console.log("getReturn started")
   
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };


      const params={
        "state abbreviation":state,
        "begin year":year,
    };

    const baseUrl='https://api.usa.gov/crime/fbi/sapi/api/arrest/states/offense/'+state+'/all/'+year+'/'+year+'?api_key='

    const queryString=formatQueryParams(params)
    const url=baseUrl+apiKey;
    

   // console.log(url);
    
    fetch(url, requestOptions)
  .then(response => {
    if(response.ok){return response.json();
    }
    throw new Error(response.statusText);
  })
  .then(responseJson => arrayValues(responseJson))
  .catch(error => console.log('error', error));
    
}



//this function now parses the response values to pair with the key
function arrayValues(responseJson){
    console.log('running arrayValues');
    //console.log(responseJson.data[1].key);
    const values=[];
    const keys=[];
    for(let i=0;i<responseJson.data.length;i++){
      keys.push(responseJson.data[i].key);
      values.push(responseJson.data[i].value);
    
    }console.log(keys);
    displayResults(keys,values);
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
function displayResults(keys,values){
    //console.log('running results')
    //console.log(STORE[0]+'-'+values[0]);

    for(let i=0;i<keys.length;i++){
    
    $('#js-search').append(`       
        <li>${keys[i]}-${values[i]}</li>        
    `)}    
}


function searchLoad(){
    //console.log(STORE[0]);
    console.log("searchLoad starts"); 

    $('#js-submit').on('click',function(event){        
        event.preventDefault();
        //console.log("eventStarted");
        $('#js-search').empty();        
        const state=$('#stateAbbrev').val();
        const year=$('#year').val();//beginning year
        //console.log(year)
        $('#js-search').append(`
            <h4>${state} ${year}</h4>            
        `)
        recentSearches(state,year);        
        $('#stateAbbrev').val('');
        $('#year').val('');//beginning year
        //$('#endYear').val('');//end year        
        getReturn(state,year);
    })
    

}

//$(searchLoad());


//generate a stateSearch box for user to input search parameters
function stateSearch(){
  console.log("stateSearch started");
  $('#js-load').hide();
  $('#mainBox').append(`
  <div class="col">
  <div class="searchBox col">
      <h2>Crime Stats</h2>
      <h3>Choose Your State and Year</h3>
      <form id="searchForm">
          <label>Enter State</label>
          <input id="stateAbbrev" placeholder="e.g., NC or CA" required> </input><br>
          <label>Enter Year</label>
          <input id="year" placeholder="year between 1960-2018"></input><br>

      </form>
      <span><button type="submit" id="js-submit">Submit</button></span>
  </div>
  
</div>
<div id="js-search" class="resultsBox">
  
</div>
  `)
searchLoad();

}

function whichTool(){
  console.log("let's go");
  $("#stateSearch").click(event =>{
    //create template function to .append to #mainbox
    stateSearch();

  })
}

function loadSearchTools(){
  whichTool();
}

$(loadSearchTools());