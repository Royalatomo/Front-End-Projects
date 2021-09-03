// Movies Name List ----
let movie = [
    {
        id: 4,
        name: "Fight Club",
        rank: 10,
    },

    {
        id: 2,
        name: "The Shawshank Redemption",
        rank: 1,
    },

    {
        id: 7,
        name: "The Lord of the Rings: The Return of the King",
        rank: 9,
    },

    {
        id: 1,
        name: "The Godfather",
        rank: 2,
    },

    {
        id: 10,
        name: "The Good, the Bad and the Ugly",
        rank: 5,
    },

    {
        id: 5,
        name: "The Godfather: Part II",
        rank: 3,
    },

    {
        id: 3,
        name: "The Dark Knight",
        rank: 6,
    },

    {
        id: 9,
        name: "Pulp Fiction",
        rank: 4,
    },

    {
        id: 6,
        name: "Schindler's List",
        rank: 8,
    },

    {
        id: 8,
        name: "12 Angry Men",
        rank: 7,
    },
];


// Starts Function when website loads --
var select = document.getElementById("select-sorting");
select.onchange = function() {
    mainSorting();
}

window.onload = function() {
    // movie = sortById(movie);
    displayMovie(movie);
}



// Main Sorting Function (Core Function) ---------
function mainSorting(){
    let sort_Type = document.getElementById('select-sorting').value;
    if (sort_Type == "id"){
        movie = sortById(movie);
        displayMovie(movie);
    } else if(sort_Type == "title"){
        movie = sortByTitle(movie);
        displayMovie(movie);
    } else if(sort_Type == "rank"){
        movie = sortByRank(movie);
        displayMovie(movie);
    }
}




// Create Table --
function showMovies(_movie) {

    // Table Header + Body (Starting)
    let table = "<table><thead><tr><th>ID</th><th>Name</th><th>Rank</th></tr></thead><tbody>";

    // Stores all movie objects in (tr and td)
    let tableBody = "";

    // Getting all "Movie Objects" which are in the list --
    for (let i = 0; i < _movie.length; i++) {
        
        let movieArray = _movie[i];
        
        // Storing Movie Id in table
        let tableId = "<tr><td>" + movieArray.id + "</td><td>";
        // Storing Movie Name in table
        let tableName = tableId + movieArray.name + "</td><td>";
        // Storing Movie Rank in table
        let tableRank = tableName + movieArray.rank + "</td></tr>";
        tableBody += tableRank;
    }

    // Closing Table and table body
    let completeTable = table + tableBody + "</tbody></table>";
    return completeTable;
}


// Display Movie List ---
function displayMovie(_movie) {
    document.getElementById("movie-sort").innerHTML = showMovies(_movie);
}


// sort: Function helper
function sortHelper(_movie, checkFor){
    
    let attribute = {}; // Stores highest Id Movie
    let attributeIndex = 0; // Stores highest Id Movie's Index

    // Checking If First object is not null
    if (_movie[0] != "") {
        attribute = _movie[0];
        attributeIndex = 0
    } else {

        // If It does, then check all and get that which is not null
        for (let i = 0; i < _movie.length; i++) {
            if (_movie[i] != "") {
                attribute = _movie[i];
                attributeIndex = i;
                
                // If Found which is not null then exit
                break;
            }
        }
    }

    // Check All One by one
    for(let i=0; i<_movie.length; i++){
        
        if(checkFor == "id"){
            
            // If current movie is not null and id is greater than the stored one than interchange
            if ((_movie[i] != "") && (_movie[i].id < attribute.id)){
                attribute = _movie[i];
                attributeIndex = i;
            }

        }else if(checkFor == "title"){
            if (_movie[i] != "" && _movie[i].name > attribute.name) {
                attribute = _movie[i];
                attributeIndex = i;
            }

        }else if(checkFor == "rank"){
            if (_movie[i] != "" && _movie[i].rank > attribute.rank) {
                attribute = _movie[i];
                attributeIndex = i;
            }

        }
    }

    // Return Movie and movie index
    return [attributeIndex, attribute];

}



// Rank
// Arrange List Of Movies Rank wise
function sortByRank(movie) {
    let movieLength = movie.length;
    let i = 0; // constant (only for compairing)
    let sortedList = []; // Store's the arranged movie list

    // Checking All Movie Item one by one
    while (i < movieLength) {

        // Getting the highest Rank movie's object and index
        let rankIndex = sortHelper(movie, "rank");
        // Storing the highest Rank Movie's object
        sortedList.push(rankIndex[1]);
        // Making this movie's object place null (to get the next highest)
        movie[rankIndex[0]] = "";
        i++;
    }

    return sortedList;
}


// Title
// Arrange List Of Movies Title wise
function sortByTitle(_movie) {
    let movieLength = _movie.length;
    let i = 0; // constant (only for compairing)
    let sortedList = []; // Store's the arranged movie list

    // Checking All Movie Item one by one
    while (i < movieLength) {

        // Getting the highest Title movie's object and index
        let titleIndex = sortHelper(_movie, "title");
        // Storing the highest Title Movie's object
        sortedList.push(titleIndex[1]);
        // Making this movie's object place null (to get the next highest)
        _movie[titleIndex[0]] = "";
        i++;
    }
    return sortedList;
}

// Id
// Arrange List Of Movies Id wise
function sortById(_movie){
    let sortedList = []; // Store's the arranged movie list
    let movieLength = _movie.length;
    let i = 0; // constant (only for compairing)

    // Checking All Movie Item one by one
    while (i < movieLength) {

        // Getting the Lowest Id movie's object and index
        let idIndex = sortHelper(_movie, "id");
        // Storing the lowest Id Movie's object
        sortedList.push(idIndex[1]);
        // Making this movie's object place null (to get the next Lowest)
        _movie[idIndex[0]] = "";
        i++;
    }
    
    return sortedList;

}
