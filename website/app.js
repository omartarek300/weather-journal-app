/* Global Variables */
// Api url
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apikey = '&APPID=f036e9275c0f247aafafd934b0f775d9&units=metric';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 + '.' + d.getDate() + '.' + d.getFullYear();

//create an eventlistener for the element with id generate
document.getElementById('generate').addEventListener('click', action);

// define the event function
function action() {
  // getting the data from user
  const zip = document.getElementById('zip').value;
  const content = document.getElementById('feelings').value;
  // chain promises
  getData(baseURL, zip, apikey)
    .then(function(data){
      postData('/add', {date: newDate, temp: data.main.temp, content:content})
    }).then(function(newData){
      updateUI()
    })
}

//create a get request function to get Api data
const getData = async (baseURL, zip, apiKey) => {
  const request = await fetch(baseURL + zip + apiKey);
  try {
    const data = await request.json();
    return data;
  } catch (e) {
    console.log('error', e);

  }
};

// create a post request function to post the Api data
const postData = async (url = '', data = {})=>{
  const request  = await fetch(url, {
    method : 'POST',
    credentials : 'same-origin',
    headers : {
      'Content-Type' : 'application/json',
    } ,
    body: JSON.stringify(data)
  })

  try {
    const data = await request.json();
    return data;

  } catch (e) {
    console.log('error', e);
  }

};

// a function to updata UI values
const updateUI = async () => {
  const request = await fetch('/all');
  try{
    const allData = await request.json();
    document.getElementById('date').innerHTML = "Date: " + allData.date;
    document.getElementById('temp').innerHTML = "Tempreture: " + allData.temp +'°';
    document.getElementById('content').innerHTML ="Feelings: " + allData.content;

  }catch(error){
    console.log("error", error);
  }
}
