'use strict'
//i want append key terms/tools/recent searches
//create a listener for clicks there that will append to "loadOut"
//possibly create listener for the click on the link for those above


//function to provide key terms to DOM 
function keyTerms(){
    $('#loadOut').append(`
    
    <div id="keylist"><h2> Key Terms List</h2>
        <a class="contactFont" id="js-nibrs" href="#">NIBRS</a><br>  
        <a class="contactFont" id="js-ucr" href="#">UCR</a><br>
         <a class="contactFont" id="js-ori" href="#">ORI</a><br>
         <a class="contactFont" id="js-ncic" href="#">NCIC</a><br>
         <button type='submit' id='backMain'>Back</button>
    </div>
    <div id="definition"></div>
    
    `)
    $('#backMain').on('click',function(e){
        event.preventDefault();
        $('#loadOut').empty();
        $('#nav').show();})

    $('#js-nibrs').on('click',function(e){
        event.preventDefault();
        $('#keylist').hide();
        $('#definition').append(`<p>
        NIBRS</p> <p>-National Incident-Based Reporting System</p><p> -captures detail on each single crime incident—as well as on separate offenses within the same incident</p><p>-This includs information on victims, known offenders, relationships between victims and offenders, arrestees, and property involved in crimes.</p>
        <button type='submit' id='backButt'>Back</button>`)
        $('#backButt').on('click',function(e){
            $('#definition').empty();
            $('#keylist').show();
        })

    })

    $('#js-ori').on('click',function(e){
        event.preventDefault();
        $('#keylist').hide();
        $('#definition').append(`<p>
        ORI</p><br><p> - Originating Reporting Agency Identifier</p><br><p> - Every agency that reports to the UCR is assigned a unique ORI.</p>
        <button type='submit' id='backButt'>Back</button>`)
        $('#backButt').on('click',function(e){
            $('#definition').empty();
            $('#keylist').show();
        })

    })

    $('#js-ucr').on('click',function(e){
        event.preventDefault();
        $('#keylist').hide();
        $('#definition').append(`<p>
        UCR</p><br><p> - Uniform Crime Reporting</p><br><p> - program file containing 18,725 records, one for each law enforcement agency in the Nation that had ever reported to the UCR as of 1996.</p>
        <button type='submit' id='backButt'>Back</button>`)
        $('#backButt').on('click',function(e){
            $('#definition').empty();
            $('#keylist').show();
        })

    })

    $('#js-ncic').on('click',function(e){
        event.preventDefault();
        $('#keylist').hide();
        $('#definition').append(`<p>
        NCIC</p><br><p> - National Crime Information Center</p><br><p> -Established in 1967, NCIC is a nationwide computerized system that provides law enforcement with ready data about wanted persons,  stolen property, and other information.</p>
        <button type='submit' id='backButt'>Back</button>`)
        $('#backButt').on('click',function(e){
            $('#definition').empty();
            $('#keylist').show();
        })

    })
}

//populate the html for the tools available
function tools(){
    $('#loadOut').append(`
    <div>
        <h2>Search Tools</h2>
        <p>-There are two search options. The first is an arrest total by each state in a given year for particular crimes. You can query a second state and year which will populate another column for comparison. </p>
        <p>-The second tool provides a summary of crimes reported by each jurisdiction and whether these crimes were cleared. You may query a second jurisdiction and year, however, keep in mind that the data is not sorted and the FBI reports the data as it is provided from the jurisdiction. The report patterns are not consistent.</p>
        <p> -There are more search tools planned.</p>
        <button type='submit' id='backMain'>Back</button>

    </div>
    `)
    $('#backMain').on('click',function(e){
        event.preventDefault();
        $('#loadOut').empty();
        $('#nav').show();})
}


//unused function but a reminder that a "Recent Searches" area of the index might be useful for users
function recentSearches(state,year){
    console.log('recentSearches is running');

    $('#loadOut').append(`
    <div class="appendedBox">
        <li>State Searched:${state} Year Searched:${year}</li>
    </div>
    `)
}

function hideForTools(){
    $('#tools').click(event=>{
        event.preventDefault();
        $('#loadOut').empty();
        $('#nav').hide();
        tools();
    })
}

//hides and clears for keyTerms to run
function hideForKeyTerms(){
    $('#keyTerms').click(event =>{
        event.preventDefault();
        console.log('running hide nav');
        $('#loadOut').empty();
        $('#nav').hide();
        keyTerms();
    })

}

function loadUp(){
    hideForKeyTerms();
    hideForTools(); 
    
    $('#recentSearches').click(event =>{
        $('#loadOut').empty();
        recentSearches();
    })
}

$(loadUp());