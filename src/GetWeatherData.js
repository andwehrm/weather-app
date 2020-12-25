import React from "react"
import './weather.css'

function format_hours(hours)
{
    if(hours >= 24)
    {
        hours -= 24;
    }
    if(hours >= 12)
    return hours +":00";
    else
    return "0" + hours + ":00"
}

function get_day_name(day)
{
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    return weekday[day];
}

function get_month_name(month)
{
    var monthy = new Array(12);
    monthy[0] = "January";
    monthy[1] = "February";
    monthy[2] = "March";
    monthy[3] = "April";
    monthy[4] = "May";
    monthy[5] = "June";
    monthy[6] = "July";
    monthy[7] = "August";
    monthy[8] = "September";
    monthy[9] = "October";
    monthy[10] = "November";
    monthy[11] = "December";

    return monthy[month];
}

function format_time(time)
{
    var ftime = time.getHours()+":"+time.getMinutes();
    if(time.getMinutes() <= 9)
    {
        ftime = time.getHours()+":0"+time.getMinutes()
    }
    return ftime;
}

async function get_ip_data()
{
    const ip_url = "https://api.ipify.org/?format=json"
    const ip_response = await fetch(ip_url)
    const ip_data = await ip_response.json()

    return ip_data;
}
async function get_geo_data(ip_data)
{
    const geo_url = "https://ipapi.co/" + ip_data.ip+ "/json/"
    const geo_response = await fetch(geo_url)
    const geo_data = await geo_response.json()

    return geo_data;
}

async function get_weather_forecast(geo_data)
{
    const forecast_url = "https://weatherbit-v1-mashape.p.rapidapi.com/forecast/hourly?lon=" + geo_data.longitude +"&lat=" + geo_data.latitude +"&hours=12"
    const forecast_response = await fetch(forecast_url, {
        "method": "GET",
        "mode" : "cors",
        "headers": {
		"x-rapidapi-key": "6839885300msh729e2d04480dac3p1b1058jsnd11011b98d41",
		"x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com"
        }
    })
    const forecast_data = await forecast_response.json()

    return forecast_data;
}


async function get_current_weather(geo_data)
{
    const weather_url = "https://weatherbit-v1-mashape.p.rapidapi.com/current?lon=" + geo_data.longitude +"&lat=" + geo_data.latitude
    const weather_response = await fetch(weather_url, {
        "method": "GET",
        "mode" : "cors",
        "headers": {
		"x-rapidapi-key": "6839885300msh729e2d04480dac3p1b1058jsnd11011b98d41",
		"x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com"
        }
    })
    const weather_data = await weather_response.json()

    return weather_data;
}

async function get_time_data(ip_data)
{
    const time_url = "http://worldtimeapi.org/api/ip/"  + ip_data.ip + ".json"
    const time_response = await fetch(time_url)
    const time_data = await time_response.json()

    return time_data;
}

function format_date(date)
{
    switch (date)
    {
        case 1:
            return date + "st";
        case 2:
            return date + "nd";
        case 3:
            return date + "rd";
        default:
            return date + "th";
    }

}

function get_weather_icon(id)
{
    switch (id)
    {
        case "t01d": 
        case "t01n":
        case "t02d": 
        case "t02n":
        case "t03d": 
        case "t03n":
        case "t04d": 
        case "t04n":
        case "t05d": 
        case "t05n":
            return "/icons/thunder.png";
        case "d03d":
        case "d02d":
        case "d01d":
        case "r01d":
        case "r02d":
        case "r03d":
        case "r04d":
        case "r05d":
        case "r06d":
        case "f01d":
            return "/icons/cloudy_rain.png";
        case "d01n":
        case "d02n":
        case "d03n":  
        case "r01n":
        case "r02n":
        case "r03n":
        case "r04n":       
        case "r05n":
        case "r06n":
        case "f01n":     
            return "/icons/cloudy_rain_night.png";
        case "s01d":
        case "s01n":
        case "s02d":
        case "s02n":
        case "s03d":
        case "s03n":
        case "s06d":
        case "s06n":
            return "/icons/snow.png";
        case "s04d":
        case "s04n":
            return "/icons/snow_rain.png";
        case "s05d":
        case "s05n":
            return "/icons/windy.png";
        case "a01d":
        case "a01n":
        case "a02d":
        case "a02n":
        case "a03d":
        case "a03n":
        case "a04d":
        case "a04n":
        case "a05d":
        case "a05n":
        case "a06d":
        case "a06n":
            return "/icons/mist.png";
        case "c01d":
            return "/icons/sunny.png";
        case "c01n":
            return "/icons/sunny_night.png";
        case "c02d":
        case "c03d":
        case "c04d":
            return "/icons/cloudy.png";
        case "c02n":
        case "c03n":
        case "c04n":
            return "/icons/cloudy_night.png";
        default:
            return "/icons/cloud.png";
    }
}

function set_background_image(forecast_data, dt)
{
    const sunset = new Date('1970-01-01T' + forecast_data.data[0].sunset) ;
    const sunrise = new Date('1970-01-01T' + forecast_data.data[0].sunrise);

    if(dt.getHours() >= sunset.getHours()+1 || (dt.getHours() === sunset.getHours()+1 && dt.getMinutes() >= sunset.getMinutes() ) ||
    (dt.getHours() <= sunrise.getHours()+1  || (dt.getHours === sunrise.getHours()+1 && dt.getMinutes() <= sunrise.getMinutes())))
        document.body.style.backgroundImage = "url('daytime/night.png')";
    else 
        document.body.style.backgroundImage = "url('daytime/day.png')"
}

export default class GetWeatherData extends React.Component{

    state = {
        loading: true,
        weather: null,
        weekday: null,
        forecast: null,
        forecast_times: null,
        month: null,
        time: null,
        date: null,
        background: null,
        current_weather: null
    }
    
   async componentDidMount(){

        const ip_data = await get_ip_data();
        const geo_data = await get_geo_data(ip_data);
        const forecast_data = await get_weather_forecast(geo_data);
        const weather_data = await get_current_weather(geo_data);
        const time_data = await get_time_data(ip_data);

        var dt = new Date( time_data.datetime);

        var forecast_times = [
            format_hours(dt.getHours() + 0),
            format_hours(dt.getHours() + 3),
            format_hours(dt.getHours() + 6),
            format_hours(dt.getHours() + 9)
        ];

        set_background_image(weather_data,dt);

        this.setState({ 
            forecast_times: forecast_times,
            forecast:       forecast_data,
            time:           format_time(dt),
            date:           format_date(dt.getDate()),
            month:          get_month_name(dt.getMonth()),
            weekday:        get_day_name(time_data.day_of_week),
            current_weather:weather_data,
            loading:        false
        });

    }

    
    render(){
        return <div>
        {this.state.loading ? (
          <div class="loading">
              <div class="loader"></div>
              <div class="loading-text"> 
              <h1 >Loading Page... </h1>
              </div> 
            </div>
            ) : (
              
            <div id="weather">
                <p id="date">{this.state.weekday}, {this.state.date} {this.state.month}</p>
                <p id="time">{this.state.time}</p>
                <p id="location">{this.state.current_weather.data[0].city_name}</p>
                <img id="weather-icon"  src={`${process.env.PUBLIC_URL}` + get_weather_icon(this.state.forecast.data[0].weather.icon)}  alt={this.state.forecast.data[0].weather.description}></img>
                <p id="temp">{this.state.forecast.data[0].temp}°C</p>
                <p id="weekday">{this.state.weekday}</p>
                <div id="spacer"></div>
                <div id="history">
                    <div id="hist1">
                        <p class="ftext">{this.state.forecast_times[0]}</p>
                        <img class="ficon" src={`${process.env.PUBLIC_URL}` + get_weather_icon(this.state.forecast.data[0].weather.icon)} alt={this.state.forecast.data[0].weather.description}></img>
                        <p class="ftemp">{this.state.forecast.data[0].temp}°C</p>
                    </div>
                    <div id="hist2">
                        <p class="ftext">{this.state.forecast_times[1]}</p>
                        <img class="ficon" src={`${process.env.PUBLIC_URL}` + get_weather_icon(this.state.forecast.data[3].weather.icon)} alt={this.state.forecast.data[3].weather.description}></img>
                        <p class="ftemp">{this.state.forecast.data[3].temp}°C</p>
                    </div>
                    <div id="hist3">
                        <p class="ftext">{this.state.forecast_times[2]}</p>
                        <img class="ficon" src={`${process.env.PUBLIC_URL}` + get_weather_icon(this.state.forecast.data[6].weather.icon)} alt={this.state.forecast.data[6].weather.description}></img>
                        <p class="ftemp">{this.state.forecast.data[6].temp}°C</p>
                    </div>
                    <div id="hist4">
                        <p class="ftext">{this.state.forecast_times[3]}</p>
                        <img class="ficon" src={`${process.env.PUBLIC_URL}` + get_weather_icon(this.state.forecast.data[9].weather.icon)} alt={this.state.forecast.data[9].weather.description}></img>
                        <p class="ftemp">{this.state.forecast.data[9].temp}°C</p>
                    </div>
                </div>
        </div>
        )}
    </div>
    }
}