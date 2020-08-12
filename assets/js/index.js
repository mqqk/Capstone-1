'use strict'
//i want append key terms/tools/recent searches
//create a listener for clicks there that will append to "loadOut"
//possibly create listener for the click on the link for those above












function keyTerms(){
    //console.log(HI);
    $('#loadOut').append(`
    <div class="appendedBox">
    <ul> Key Terms List
        <li>NIBRS - National Incident-Based Reporting System - captures detail on each single crime incident—as well as on separate offenses within the same incident—including information on victims, known offenders, relationships between victims and offenders, arrestees, and property involved in crimes. </li>
        <li>ORI - Originating Reporting Agency Identifier - Every agency that reports to the UCR is assigned a unique ORI. </li>
        <li>UCR - Uniform Crime Reporting - program file containing 18,725 records, one for each law enforcement agency in the Nation that had ever reported to the UCR as of 1996. </li>
        <li>NCIC - National Crime Information Center -Established in 1967, NCIC is a nationwide computerized system that provides law enforcement with ready data about wanted persons,  stolen property, and other information.
    </ul>
    </div>
    `)
}

function tools(){
    //console.log('tools running');
    

    //anytime a search is made, this function hears it...


    $('#loadOut').append(`
    <div class="appendedBox">
    <ul> Search Tools
        <li>Currently, the app only allows the user to select a State and Year to view the reported crimes to the FBI from that state.</li>
        <li>The plan is to expand the search criterion and add another search query to compare states.</li>
    </ul>
    </div>
    `)
}


//going to need a function that pulls from the an appended point probably on the other JS (search.js), max of 10?
function recentSearches(state,year){
    console.log('recentSearches is running');

    $('#loadOut').append(`
    <div class="appendedBox">
        <li>State Searched:${state} Year Searched:${year}</li>
    </div>
    `)
}







function loadUp(){
    //console.log("let's go");
    
    $('#keyTerms').click(event =>{
        $('#loadOut').empty();
        keyTerms();
    })
    $('#tools').click(event =>{
        $('#loadOut').empty();
        tools();
    })
    $('#recentSearches').click(event =>{
        $('#loadOut').empty();
        recentSearches();
    })
}

$(loadUp())