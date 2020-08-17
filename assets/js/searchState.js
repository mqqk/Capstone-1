'use strict'
//function to ensure parameters return as a string
function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }

function getStateReturn(state, year, clickStateCount){
    
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

   //console.log(url);
    
    fetch(url, requestOptions)
      .then(response => {
        //console.log(response) 
      if(response.status===200){return response.json();
      }
      else
      alert('Invalid State or Year')
      //throw new Error(response.statusText);
      })
      .then(responseJson => stateValues(state,year,responseJson,clickStateCount))
      //.catch(error => alert('error', error));
      //return alert("incorrect abbreviation")
    
}



//this function now parses the response values to pair with the key
function stateValues(state,year,responseJson,clickStateCount){
    //console.log('running stateValues');
    //console.log(responseJson.data);
    //let jsResults='js-results'+clickStateCount

        

    const values=[];
    const keys=[];
    //console.log("hi");
    //console.log(keys);
    for(let i=0;i<responseJson.data.length;i++){
      keys.push(responseJson.data[i].key);
      values.push(responseJson.data[i].value);
    
    }

    let jsResults='js-results'+clickStateCount

        
    $('#mainBox').append(`
        <div id="${jsResults}" class="resultsBox">
        <h4>${state} ${year}</h4>            </div>
    `)





    //console.log('bye');
    //console.log(keys);
    displayStateResults(keys,values,clickStateCount);
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
function displayStateResults(keys,values,clickStateCount){
  //console.log('displayStateResults')
  console.log(clickStateCount);
  let jsResults='#js-results'+clickStateCount;
  //console.log(jsResults);
  let i=0;
  for(;i<keys.length;i++){
    //console.log(keys[i],values[i]);
  $(jsResults).append(`  
      
    <li>${keys[i]}-${values[i]}</li> 
  `)}    
  $(loadSearch)
}









let clickStateCount=0;
function stateSearchLoad(){
      //console.log("searchLoad starts"); 
      let state="";
      let year="";
      
    $('#js-submit').on('click',function(event){        
        event.preventDefault();
        clickStateCount+=1;
        console.log(clickStateCount);
      if(clickStateCount>2){return alert('reset your query before performing another submission')}
        //console.log("eventStarted");
        //$('#js-search').empty();        
         state=$('#stateAbbrev').val();
         year=$('#year').val();//beginning year
        //console.log(year)


        
      //console.log(clickStateCount);
        
        //recentSearches(state,year);        
        $('#stateAbbrev').val('');
        $('#year').val('');//beginning year
        //$('#endYear').val('');//end year        
        getStateReturn(state,year,clickStateCount);
    })
    

}

//$(searchLoad());


//generate a stateSearch box for user to input search parameters
function stateSearch(){
  //console.log("stateSearch started");
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

function backUp(){
  $('#js-back').on('click',function(e){
    $('#mainBox').empty();
    $('#js-load').show();
  })
}


function loadSearch(){
  //console.log("let's go");
  $("#stateSearch").click(event =>{
    stateSearch();
    resetState();
    backUp();
  })
}



$(loadSearch());