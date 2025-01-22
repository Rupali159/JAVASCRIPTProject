const searchform = document.querySelector("form");
const moviecontainer = document.querySelector(".movie-container");
const inputBox = document.querySelector(".inputBox");
// const moviedetails = document.querySelector(".movie-details");

//function to fetch movie details using OMDB API
// async - run automatic 
/*
async:

Used to define a function that returns a Promise.
Even if you don’t explicitly return a Promise, JavaScript wraps the function’s return value in a Promise.
await:

Can only be used inside an async function.
It pauses the execution of the async function until the Promise is resolved or rejected.
The result of the awaited Promise is assigned to a variable.

*/

const getMovieInfo =  async (movie) => {
    try{
        const myAPI = "d5d20b9d";
        const url = `https://www.omdbapi.com/?apikey=${myAPI}&t=${movie}`;

        
        // respose is promise its give the promises
        const rosponse = await fetch(url);
        
        if(!rosponse.ok){
            throw new Error("Unable to fetch movie data");
        }

        const data = await rosponse.json();
        console.log(data);
        showMovieData(data);
    }
    catch(error){
        showErrorMessage("No movie Found");
    }
}


//function to show movie data on screen

const showMovieData = (data) =>{

    moviecontainer.innerHTML = "";

    moviecontainer.classList.remove('noBackground');

    //Use Destructuring assignment to extract properties from data object

    const {Title,imdbRating,Genre,Released,Runtime,Actors,Plot,Poster} = data;
    
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-info');

    movieElement.innerHTML = `  <h2>${Title}</h2>
                                <p><strong>Rating: &#11088;</strong>${imdbRating}</p>`;

    // loop is use for the multple word present in this genre
    const movieGenreElement = document.createElement('div');
    movieGenreElement.classList.add('movie-genre');
    
    Genre.split(",").forEach(element =>{
        const p = document.createElement('p');
        p.innerHTML = element;

        movieGenreElement.appendChild(p);
    });

    movieElement.appendChild(movieGenreElement);

    movieElement.innerHTML += 
            `<p><strong>Released Date:</strong>${Released}</p>
            <p><strong>Duration:</strong>${Runtime}</p>
            <p><strong>Cast:</strong>${Actors}</p>
            <p><strong>Plot:</strong>${Plot}</p>`;
                         

    // creating a div for movie poster

    const moviePosterElement = document.createElement('div');
    // classList is use for the its access in css for the style
    moviePosterElement.classList.add('movie-poster');
    moviePosterElement.innerHTML = `<img src="${Poster}"/>`;

    moviecontainer.appendChild(moviePosterElement);
    moviecontainer.appendChild(movieElement);         

}

//Function to display error massage

const showErrorMessage = (message) =>{
    moviecontainer.innerHTML=`<h2>${message}</h2>`
    moviecontainer.classList.add('noBackground');
}

// Function to handle form submission

const handleFormSubmission = (e) =>{
    // auto submit hone se rokega 
    e.preventDefault();
    console.log(inputBox.value);
  
    const moviename = inputBox.value.trim();
  
    if(moviename !== ''){
        showErrorMessage("Fetching Movie Information...");
        getMovieInfo(moviename);
    }
    else{
        showErrorMessage("Enter movie name to get movie Information");
    }
}

// Adding event listener to search form
searchform.addEventListener('submit',handleFormSubmission);
