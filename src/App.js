import React from "react";

import "./App.css";

import "weather-icons/css/weather-icons.css";

import"bootstrap/dist/css/bootstrap.min.css";

import Form from "./app_component/form.component";





import Weather from'./app_component/weather.component';

 const API_key="84e6a902feda1ebc91e3bd6b045a4b4c";

 class App extends React.Component{
constructor(){
super();
 this.state = {
   city:undefined,
   country:undefined,
   icon : undefined,
   main : undefined,
   celsius : undefined,
   temp_max : undefined,
   temp_min: undefined,
   description: undefined,
   error : false
 };


 
 this.weatherIcon={
  Thunderstorm:"wi-thunderstorm",
  Drizzle:"wi-sleet",
  Rain: "wi-storm-showers",
  Snow: "wi-snow",
  Clear: "wi-day-sunny",
  Clouds:"wi-day-fog",
  Atmosphere:"wi-fog"

 };

 
}

calCelsius(temp){
let cell = Math.floor(temp-273.15);
return cell;
}

get_WeatherIcon(icons,obj){

  let rangeId = obj.weather[0].id;

  console.log(rangeId);

  switch(true){

  case rangeId >=200 && rangeId <=232:
  this.setState({icon:this.weatherIcon.Thunderstorm});
  break;

  case rangeId >=300 && rangeId <=321:
  this.setState({icon:this.weatherIcon.Drizzle});
  break;

  case rangeId >=500 && rangeId <=531:
  this.setState({icon:this.weatherIcon.Rain});
  break;

  case rangeId >=600 && rangeId <= 622:
  this.setState({icon:this.weatherIcon.Snow});
  break;

  case rangeId >=701 && rangeId <=781:
  this.setState({icon:this.weatherIcon.Atmosphere});
  
  break;

  case rangeId >=801 && rangeId <=804:
  this.setState({icon:this.weatherIcon.Clouds});
  break;

  case rangeId ===800:
  this.setState({icon:this.weatherIcon.Clear});
  break;
  
  default:
    this.setState({icon:this.weatherIcon.Clear});
  }
}

 getWeather = async(e) => {

  e.preventDefault();

  const city = e.target.elements.city.value;
  const country = e.target.elements.country.value;


  if(city && country){
    const api_call= await 
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`);

  const response =await api_call.json();

console.log(response);

this.setState({

  city :`${response.name},${response.sys.country}`,
  celsius : response.main.temp,
  celsius: this.calCelsius(response.main.temp),
  temp_max:this.calCelsius(response.main.temp_max),
  temp_min: this.calCelsius(response.main.temp_min),
  description:response.weather[0].description
  

});

this.get_WeatherIcon(this.weatherIcon,response,Weather[0]);
  } else {

    this.setState({error:true});
  }

 };


  render(){

    return(
<div className="App">
  <Form loadweather={this.getWeather}error={this.state.error}/>
  <Weather 
  city={this.state.city}
  country={this.state.country}
  temp_celsius={this.state.celsius}
  temp_max={this.state.temp_max}
  temp_min={this.state.temp_min}
  description={this.state.description}
  weatherIcon={this.state.icon}
  />
  </div>
  

    );
  }

 }

export default App;
