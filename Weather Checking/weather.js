// Run Function When Button Is Clicked
window.onload = () => {
    document.getElementsByClassName('body-button')[0].addEventListener("click", checkTemp);
};

// Variables ------
const apiKey = ''; // api key for authentication
const url = "https://api.openweathermap.org/data/2.5/weather"; // website URL
let weatherDataArray = []; // Stores The Weather Report


// Main Function: Connects all functions together ---
function checkTemp() {

    // Make Sure That Tempelate is default for showing
    resetAll();

    // Get The User Typed City Name
    let data = document.getElementsByClassName('body-input')[0].value;
    
    // Check If Error message is not poped up
    if (document.getElementById('error') != null){
        
        // If Error message is present remove from it
        let error = document.getElementById('error');
        document.getElementsByClassName('result')[0].removeChild(error);
    };
    
    // If City Name is given and it is not null
    if (data != ''){
        
        // Remove the typed value from input bar
        document.getElementsByClassName('body-input')[0].value = '';
        // Show the Temperature Displaying Template
        document.getElementsByClassName('card')[0].classList.remove('visually-hidden');
        
        // Fetch the data for the city
        apiDataFetch(data);
        // It give 1 second to api to fetch data and then run following
        setTimeout(() => {
            // Data
            let [cityRecived, tempRecived, minTempRecived, maxTempRecived, statusRecived] = weatherDataArray;

            // Converting Data(list) to objecet
            let displayAttributes = {
                city: cityRecived,
                status: statusRecived, 
                temp: tempRecived, 
                minTemp: minTempRecived, 
                maxTemp: maxTempRecived
            };

            // Showing the data to the user
            displayTemp(displayAttributes);
        }, 1000);   
    }else{
        
        // If User Give Empty value than show error message
        // Creating error message element
        let error = document.createElement('h1');
        error.classList = ["display-4 text-danger text-center error"];
        error.innerText = "Please Enter A City Name First";
        error.id = "error";

        // appending the error element to result area
        document.getElementsByClassName('result')[0].append(error);
    };
}


// Getting Temperature and other data for the city
function apiDataFetch(city) {

    let full_Url = `${url}?q=${city}&appid=${apiKey}&units=imperials`;
    
    // Fetch the data from API
    let apiResponse = fetch(full_Url);
    data = apiResponse.then((response) => {
        return response.json();
    }).then((resData) => {
        
        // If Everyting Ok Then store data recieved to an Array(It will be displayed)
        weatherDataArray.push(resData.name);
        weatherDataArray.push(resData.main.temp);
        weatherDataArray.push(resData.main.temp_min);
        weatherDataArray.push(resData.main.temp_max);
        weatherDataArray.push(resData.weather[0].main);
        
        
    }).catch(() => {

        // If Something Went Wrong Then Store This data to Array(It will be displayed)
        weatherDataArray = []; // make sure the array is empty(from response)
        weatherDataArray.push("City: Not Found")
        weatherDataArray.push("---")
        weatherDataArray.push("---")
        weatherDataArray.push("---")
        weatherDataArray.push("---")
        
    })
};


// Displays The data related to city to the user
function displayTemp(attributes) {

    // Changes the innerHTML of the "result" div childrens
    document.getElementById('city').innerHTML = attributes.city;
    document.getElementById('status').innerHTML = attributes.status;
    document.getElementById('temp').innerHTML = `Temp: ${attributes.temp}°`;
    document.getElementById('min-temp').innerHTML = `Min-Temp: ${attributes.minTemp}°`;
    document.getElementById('max-temp').innerHTML = `Max-Temp: ${attributes.maxTemp}°`;

};

// Make Sures that the display data tempelate is default and empty
// So that data can easily be changed
function resetAll() {

    // Makes Tempelate Hidden
    document.getElementsByClassName('card')[0].classList.add('visually-hidden');
    
    // Changes the innerHTML of the "result" div childrens to default
    document.getElementById('city').innerHTML = '----';
    document.getElementById('status').innerHTML = '----';
    document.getElementById('temp').innerHTML = `Temp: ---°`;
    document.getElementById('min-temp').innerHTML = `Min-Temp: ---°`;
    document.getElementById('max-temp').innerHTML = `Max-Temp: ---°`;
    
    // Removes data from the array(which will store data to display)
    weatherDataArray = []
};



