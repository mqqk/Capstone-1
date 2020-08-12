'use strict'
//function to ensure parameters return as a string
function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }

  function getReturn(state,year,clickCount){
    
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

   console.log(url);
    
    fetch(url, requestOptions)
      .then(response => {
      if(response.ok){return response.json();
      }
      throw new Error(response.statusText);
      })
      .then(responseJson => arrayValues(responseJson,clickCount))
      .catch(error => console.log('error', error));
      //return alert("incorrect abbreviation")
    
}



//this function now parses the response values to pair with the key
function arrayValues(responseJson,clickCount){
    console.log('running arrayValues');
    console.log(responseJson.data);
    const values=[];
    const keys=[];
    console.log("hi");
    console.log(keys);
    for(let i=0;i<responseJson.data.length;i++){
      keys.push(responseJson.data[i].key);
      values.push(responseJson.data[i].value);
    
    }
    console.log('bye');
    console.log(keys);
    displayResults(keys,values,clickCount);
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
function displayResults(keys,values,clickCount){
    console.log('displayResults')
    //console.log(STORE[0]+'-'+values[0]);
    let jsResults='#js-results'+clickCount;
    console.log(jsResults);
    let i=0;
    for(;i<keys.length;i++){
      //console.log(keys[i],values[i]);
    $(jsResults).append(`  
        
      <li>${keys[i]}-${values[i]}</li> 
    `)}    
    $(searchLoad)
}



let clickCount=0;
function searchLoad(){
    //console.log(STORE[0]);
    console.log("searchLoad starts"); 
      let state="";
      let year="";
      console.log("hi");
    $('#js-submit').on('click',function(event){        
        event.preventDefault();
        clickCount+=1;
        //console.log("eventStarted");
        //$('#js-search').empty();        
         state=$('#stateAbbrev').val();
         year=$('#year').val();//beginning year
        console.log(year)
        
      console.log(clickCount);
        let jsResults='js-results'+clickCount

        
        $('#mainBox').append(`
            <div id="${jsResults}" class="resultsBox">
            <h4>${state} ${year}</h4>            </div>
        `)
        //recentSearches(state,year);        
        $('#stateAbbrev').val('');
        $('#year').val('');//beginning year
        //$('#endYear').val('');//end year        
        getReturn(state,year,clickCount);
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
      <h2>Search Arrest Made</h2>
      
      <form id="searchForm">
          <label>Enter State</label>
          <input id="stateAbbrev" placeholder="e.g., NC or CA"> </input><br>
          <label>Enter Year</label>
          <input id="year" placeholder="year between 1960-2018"></input><br>

      </form>
      <span><button class="butt" type="submit" id="js-submit">Submit</button></span>
      <input type="reset" id="resetButt" class="butt">
    </div>
  </div>

  
  <div id="js-search" class="resultsBox"></div>

  `)
searchLoad();

}

function resetAll(){
  $('#resetButt').on('click',function(e){
    event.preventDefault();
    $('#mainBox').empty();
    stateSearch()
  })

}


function whichTool(){
  console.log("let's go");
  $("#stateSearch").click(event =>{
    //create template function to .append to #mainbox
    stateSearch();
    resetAll();

  })
}

function loadSearchTools(){
  whichTool();
}

$(loadSearchTools());