/* its my Public API :- e222f49a8d0d89f18c3b0455316bf3bb
   its my privte API :- b4102992a01e0306fd8cb03d8b92d1c602b7dc5b
   its my MD5 Hash   :- 4f88f730162f84331052a057d3973a70
    Get Id from HTML File,
    Search query with HTTP Request,
    then parse it */

document.getElementById("search-form").addEventListener('keyup', function () {
    var url = getUrl();
    var xhrRequest = new XMLHttpRequest();
    xhrRequest.open('get', url, true);
    xhrRequest.send();
    xhrRequest.onload = function () {
        var data = JSON.parse(xhrRequest.responseText);
        display(data);
    }
});


// Get the URL from  API
function getUrl() {

    //  I'll get value from Id's.
    var searchQuery = document.getElementById('search-string').value;

    // Print the Search Query in to Console.
    console.log(searchQuery);

    //  Set the main heading for user to know what he/she searched for.
    document.getElementById('querySection').innerHTML = 'You have searched for : ' + searchQuery;


    //  If search query matches the results then it will execute next function/command.
    if (!searchQuery) {
        console.log('Name cannot be empty!');
        return "https://gateway.marvel.com/v1/public/comics?ts=1&apikey=e222f49a8d0d89f18c3b0455316bf3bb&hash=4f88f730162f84331052a057d3973a70"
    } else {
        return `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${searchQuery}&apikey=e222f49a8d0d89f18c3b0455316bf3bb&hash=4f88f730162f84331052a057d3973a70&ts=1`
    }
}

//  Get Canvas 
let canvas = document.getElementById('canvas');
// Get Search String
let searchHero = document.getElementById('search-string').value;


// This Function will display the Data on the Screen
function display(data) {
    var superHeroList = document.getElementById('superhero-list');
    superHeroList.innerHTML = "";
    var results = data.data.results;
    //  Printing the results that are get from searched Query
    console.log(results);
    if (!results) {
        //  if Search character matches the results then only it will forward to next step
        document.getElementById('search-character').value = "";
        window.alert("No super hero found!");
    } else {
        //  Else the process it going on
        // Creating a For Loop because there will be n number of results for same query
        for (let result of results) {
            var templateCanvas = canvas.content.cloneNode(true);
            //  Get all the elemets from id and then changes its Inner HTMl
            templateCanvas.getElementById("img-cont").innerHTML = `<img src=${result.thumbnail.path}/portrait_xlarge.jpg alt="marvel-img" />`
            templateCanvas.getElementById("name").innerHTML = '<b>Name: </b> ' + result.name;
            templateCanvas.getElementById("id").innerHTML = '<b>Hero ID: </b> ' + result.id;
            templateCanvas.getElementById("comic").innerHTML = '<b>Comic Available: </b>' + result.comics.available;
            templateCanvas.getElementById("series").innerHTML = '<b>Series Available: </b>' + result.series.available;
            templateCanvas.getElementById("stories").innerHTML = '<b>Stories Available: </b>' + result.stories.available;
            //  Set Event listenet for Learn  more button 
            templateCanvas.getElementById('learn-more').addEventListener('click', function () {
                localStorage.setItem('id', result.id);
                window.location.assign('./about.html');
            });
            //  Set Event listenet for Fav  more button 
            templateCanvas.getElementById('fav').addEventListener('click', function () {
                var index = localStorage.length;
                var data = JSON.stringify(result);
                localStorage.setItem(result.id, data);
            });
            superHeroList.appendChild(templateCanvas);
        }
    }
};