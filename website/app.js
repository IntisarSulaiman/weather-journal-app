/* Global Variables */
// Personal API Key for OpenWeatherMap API
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "206d5d8cb153df838e192cad7667930b&units=imperial";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1 )+ "." + d.getDate() + "." + d.getFullYear(); // 08.01.2023

// Event listener to add function to existing HTML DOM element

document.getElementById("generate").addEventListener("click", performAction);
const zipCodeTextBox = document.getElementById("zip");
const userFeellingTextBox = document.getElementById("feelings");

function performAction(e) {
  let zipCode = zipCodeTextBox.value;
  getWeather(zipCode, apiKey).then(function (data) {
    postData("http://localhost:8000/addData", {
      temperature: data.main.temp,
      date: newDate,
      userResponse: userFeellingTextBox.value,
    }).then(retrieveData());
  });
}

/* Function to GET Web API Data*/
const getWeather = async (zipCode, apiKey) => {
  const fullUrl = `${baseURL}${zipCode}&appid=${apiKey}`;

  const res = await fetch(fullUrl);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};
/* Function to POST data */
const postData = async (url, data) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const newDate = await res.json();
    console.log(newDate);
    return newDate;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};
/* Function to GET Project Data */
const retrieveData = async () =>{
    const request = await fetch('http://localhost:8000/all');
    try {
    // Transform into JSON
    const allData = await request.json()
    console.log(allData)
    // Write updated data to DOM elements
    document.getElementById('temp').innerHTML = Math.round(allData.temperature)+ ' degrees';
    document.getElementById('content').innerHTML = allData.userResponse;
    document.getElementById('date').innerHTML =allData.date;
    }
    catch(error) {
      console.log( error);
      // appropriately handle the error
    }
   }