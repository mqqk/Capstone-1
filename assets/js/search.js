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
        "begging year":year,
    };

    const baseUrl='https://api.usa.gov/crime/fbi/sapi/api/data/arrest/states/offense/'+state+'/all/'+year+'/'+year+'?api_key='

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



//create a function which takes the STORE and VALUE, .appends each iteration 
//create a function that adds finalStore to HTML
function arrayValues(responseJson){
    //console.log('running arrayValues');
    //console.log(responseJson.results);
    //need to change from array to object before parsing the values
    const objArray={...responseJson.results};       
    const values=Object.values(objArray[0]);
    values.length=47;
    //console.log(values.length);
    //console.log(STORE[0]);

    //for loop that names each value to variable name that can be placed into store
    displayResults(STORE,values)

}




function displayResults(STORE,values){
    //console.log('running results')
    //console.log(STORE[0]+'-'+values[0]);

    for(let i=0;i<STORE.length;i++){
    
    $('#js-search').append(`       
        <li>${STORE[i]}-${values[i]}</li>        
    `)
}
    
}
 

// dropbox function




//





function searchLoad(){

    

    //console.log(STORE[0]);
    $('span').on('click',function(event){        
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

$(searchLoad());