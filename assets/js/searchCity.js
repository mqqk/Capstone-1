'use strict'
//function to ensure parameters return as a string
//function is unused in this iteration of the application b/c the parameters inputed are strings at this time
function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }
  //fetch the city info to pull ORI, the fetch for the stats requires ORI, but user won't necessarily know the ORI
  //create a function that changes the parameter City name to the ORI so that the statistic collection will return appropriately

    

  //take the city, ori, year, and clickCount
  //use the city,ori, and year to build the URL for the fetch
  function getCityReturn(city,ori,year,clickCityCount){
   
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };


    const params={
        "ori":ori,
        "begin year":year,
    };
  
    const baseUrl='https://api.usa.gov/crime/fbi/sapi/api/summarized/agencies/'+ori+'/offenses/'+year+'/'+year+'?api_key='

    const url=baseUrl+apiKey;   

      fetch(url, requestOptions)
        .then(response => {
          if(response.status===200){return response.json();
          }else
          alert("Invalid Department Name or Year:Important - Press RESET to Continue")
          })
          //run cityValues with the carried over values of city,ori,year, and clickCount to assist in HTML building
        .then(responseJson => cityValues(city,ori,year,responseJson,clickCityCount))
      
    
}



//this function now parses the response values to pair with the key
function cityValues(city,ori,year,responseJson,clickCityCount){

    let results=responseJson.results;
    let keys=[];
    let crimes=[];
    let reported=[];
    let solved=[];

    //create the html to append the data
    //the clickCityCount is used here to ensure separate <div>'s are created for each query
    let jsResults='js-results'+clickCityCount

        
    $('#mainBox').append(`
        <div id="${jsResults}" class="resultsBox">
        <h4>${city} ${year}</h4>            </div>
    `)

    for(let i=0;i<results.length;i++){
        crimes.push(results[i].offense);
        reported.push(results[i].actual);
        solved.push(results[i].cleared);
        

    }

    //run the next function with the parsed keys and values
    displayCityResults(crimes,reported,solved,clickCityCount);
}



//for loop to assign the correctly iterated values to their appropriate place in the HTML
function displayCityResults(crimes,reported,solved,clickCityCount){

    let jsResults='#js-results'+clickCityCount;

    for(let i=0;i<crimes.length;i++){


    $(jsResults).append(`  

      <ul>${crimes[i]}
      <li>Reported-${reported[i]}</li>
      <li>Solved-${solved[i]}</li>
      </ul>
    `)}
    
}



let clickCityCount=0;
//clickCityCount will keep track of the submission button so that the user is restricted to two queries and also create the appropriate html each time

function citySearchLoad(){
     
      let city="";
      let year="";
     
      $('#js-submit').on('click',function(event){        
        event.preventDefault();

        clickCityCount+=1;
        //create a stop if the clickCount is above 2
        if(clickCityCount>2){return alert('Only two queries should be displayed. Press Reset to make a new search')}
     
        city=$('#cityOri').val();
        year=$('#year').val();//beginning year
      
         
        $('#cityOri').val('');
        $('#year').val('');//beginning year
        
        let ori=""
        //need ori variable for FBI API to find the data request
        ori= displayOri(ori,cityInfo,city);
        
        getCityReturn(city,ori,year,clickCityCount);
    })
    

}

    
//this function takes the user input for the department and locates the corresponding ORI stored in  cityInfo.js which was pulled and stored remotely from the FBI API
function displayOri(ori,cityInfo,agency){
    
    let region="";
    let city="";

    for(let i=0;i<cityInfo.length;i++){
      if(agency===cityInfo[i].agency_name){ori=cityInfo[i].ori}
      }
    
    return (ori);
   
};




//generate a citySearch box for user to input search parameters
function citySearch(){
  
  
  $('#js-load').hide();
  $('#mainBox').append(`
  <div class="col">
    <div class="searchBox col">
      <h2>Search Arrest Made</h2>
      
      <form id="searchForm">
          <label id="labelSpace">Enter City</label>
          <input id="cityOri"  placeholder="Raleigh Police Department"> </input><br>
          <label id="labelSpace">Enter Year</label>
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

//reset function that clears the HTML and clickCount
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

//allows the user to return to the prior screen
function backUp(){
    $('#js-back').on('click',function(e){
      $('#mainBox').empty();
      $('#js-load').show();
    }) 
  }
  

//ready function
function loadCitySearch(){
 
  
  $("#citySearch").click(event =>{
    citySearch();
    resetCity();
    backUp();
  })
}


$(loadCitySearch());