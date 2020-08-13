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
        <li>There are two search options. The first is an arrest total by each state in a given year for particular crimes. You can query a second city which will populate another column for comparison. </li>
        <li>The second tool will provide a summary of crimes reported by each jurisdiction and whether these crimes were cleared.</li>
        <li> There are more search tools planned.</li>
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