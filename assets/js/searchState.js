'use strict'
//function to ensure parameters return as a string
//function is unused in this iteration of the application b/c the parameters inputed are strings at this time
function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }

//take the state, year, and clickCount
//use the state and year to build the URL for the fetch
function getStateReturn(state, year, clickStateCount){   
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

    fetch(url, requestOptions)
      .then(response => {       
        if(response.status===200){return response.json();
        }
        else
        {alert('Invalid State or Year:Important - Press RESET to Continue')}{clickStateCount--}
      })
      //run stateValues with the carried over values of state,year, and clickCount to assist in HTML building
      .then(responseJson => stateValues(state,year,responseJson,clickStateCount))
    
}



//this function now parses the response values to pair with the key
function stateValues(state,year,responseJson,clickStateCount){

    const values=[];//parsed values from the response
    const keys=[];//parsed key from the response
  
    for(let i=0;i<responseJson.data.length;i++){
      keys.push(responseJson.data[i].key);
      values.push(responseJson.data[i].value);
    }

    //create the html to append the data
    //the clickStateCount is used here to ensure separate <div>'s are created for each query
    let jsResults='js-results'+clickStateCount;
        
    $('#mainBox').append(`
        <div id="${jsResults}" class="resultsBox">
        <h4>${state} ${year}</h4>            </div>
    `)

    //run the next function with the parsed keys and values
    displayStateResults(keys,values,clickStateCount);
}

//aggregate the results into column for under the created HTML from above
function displayStateResults(keys,values,clickStateCount){
  
  let jsResults='#js-results'+clickStateCount;
  
  let i=0;
  for(;i<keys.length;i++){
  
    $(jsResults).append(`  
      
      <li>${keys[i]}-${values[i]}</li> 
    `)}    
 
}

//clickStateCount will keep track of the submission button so that the user is restricted to two queries and also create the appropriate html each time
var clickStateCount=0;

//listens for click and takes the input 
function stateSearchLoad(){
      let state="";
      let year="";
      
    $('#js-submit').on('click',function(event){        
        event.preventDefault();
        console.log(clickStateCount);
        clickStateCount+=1;
        
        //create a stop if the clickCount is above 2
      if(clickStateCount>2){return alert('reset your query before performing another submission')}
        
         state=$('#stateAbbrev').val();
         year=$('#year').val();//beginning and ending year
      
        $('#stateAbbrev').val('');
        $('#year').val('');//beginning year

        getStateReturn(state,year,clickStateCount);
    })
    

}


//generate a stateSearch box for user to input search parameters
function stateSearch(){

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
      <button class="butt" type="submit" id="js-submit">Submit</button>
      <input type="reset" id="resetButt" class="butt">
      <button class="butt" id="js-back">Back</button>
    </div>
  </div>

  
  <div id="js-search" class="resultsBox"></div>

  `)
stateSearchLoad();

}

//reset function that clears the HTML and clickCount
function resetState(){
  $('#resetButt').on('click',function(e){
    event.preventDefault();
    $('#mainBox').empty();
    clickStateCount=0;
    stateSearch();
    resetState();
    backUp();
  })

}

//allows the user to return to the prior screen
function backUp(){
  $('#js-back').on('click',function(e){
    $('#mainBox').empty();
    $('#js-load').show();
  })
}

//ready function
function loadStateSearch(){
  
  
  $("#stateSearch").click(event =>{
    stateSearch();
    resetState();
    backUp();
  })
}



$(loadStateSearch());