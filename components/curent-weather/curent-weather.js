
import "./curent-weather.css"
import { Button } from "@/components/ui/button"
import { createClient } from 'pexels';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
//

//
function kelvinToCelsius(tempKelvin) {
    //Kelvin to Celcius
    const tempCelsius = Math.round(tempKelvin - 273.15);
    return tempCelsius;
}
function m_sInk_h(value) {
    return Math.round(value * 3.6);
}
function backgroundCol(value) {
    let topC = 'B5AFA6'
    let buttomC = '36343F';
    if (value == '01d') {
        topC = "#539BEA";
        buttomC = "#C3DDF3";
    }
    if (value == '01n') {
        topC = "#0A364D";
        buttomC = "#092651";
    }
    if (value == '02d' || value == '03d') {
        topC = "#087BB8";
        buttomC = "#9BBCD6";
    }
    if (value == '02n' || value == '03n') {
        topC = "#0A364D";
        buttomC = "#0B0C63";
    }
    if (value == '04d') {
        topC = "#555F78";
        buttomC = "#6488A4";
    }
    if (value == '04n') {
        topC = "#30425F";
        buttomC = "#0B0C63";
    }
    if (value == '09d' || value == '10d') {
        topC = "#72757C";
        buttomC = "#81A2B2";
    }
    if (value == '09n' || value == '10n') {
        topC = "#859397";
        buttomC = "#2B385C";
    }
    if (value == '11n') {
        topC = "#453654";
        buttomC = "#070E2B";
    }
    if (value == '11d') {
        topC = "#453654";
        buttomC = "#557F9F";
    }
    if (value == '13d') {
        topC = "#C2D3E1";
        buttomC = "#84A6F7";
    }
    if (value == '13n') {
        topC = "#78ADC2";
        buttomC = "#132D3F";
    }
    return `${topC}, ${buttomC}`
}
const client = createClient('fqX5fFonMfHWYQos6zCdlEqBHxMgvlPqXFZlm1xhiX3JAEsIKO0UQJsh');
function showBackground(props) {
    let query = props.data1;
    if ("Rain".includes(props.data2) || "Snow".includes(props.data2)) {
        query = `${query} ${props.data2}`
    }
    console.log(query)
    client.photos.search({ query, per_page: 1 }).then(photos => {
        if (photos && photos.photos && photos.photos.length > 0) {
            const photoUrl = photos.photos[0].src.original;

            document.body.style.backgroundImage = `url(${photoUrl})`;
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundPosition = 'center';
            

        } else {
            console.warn('No photos found.');
        }
    });
}
const CurentWeather = (props) => {
    //      
    let { city, weather, main, wind } = props.data1;
    let fore = props.data2;
    let formattedCity = city.substring(6);
    let [Ncity, Ncountry] = formattedCity.split(",");
    showBackground({ data1: Ncity, data2: weather[0].main });
    let back = backgroundCol(weather[0].icon)
    const dateObject = new Date();
    const dayOfWeekNumber = dateObject.getDay();
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeekString = daysOfWeek[dayOfWeekNumber];
    console.log(props.data3)
    //
    function dayofWeekFuture(index, day) {
        if (index == 1)
            return "Tomorrow"
        return daysOfWeek[index + day]
    }
    

    return (
        <div>

            <div className="weather" style={{ background: `linear-gradient(to bottom, ${back})` }}>
                <div className="top">
                    <div>
                        <p className="city">
                            {Ncity}
                            <span className="country">{Ncountry}</span>
                        </p>
                        <p className="weather-discription">{weather[0].description}</p>
                    </div>

                    <img alt="weather" className="weather-icon" src={`icons/${weather[0].icon}.png`} ></img>

                </div>
                <div id="day1">
                    <p>{dayOfWeekString}</p>
                </div>
                <div className="buttom">
                    <p className="temperature">{kelvinToCelsius(main.temp)}°C</p>
                    <div className="details">
                        <div className="perameter-row">
                            <span className="parameter-label">Details</span>
                        </div>
                        <div className="perameter-row">
                        <span className="perameter-label">Max. tempreture</span>
                        <span className="perameter-value">{kelvinToCelsius(fore.list[0].main.temp_max)}°C</span>
                        </div>
                        <div className="perameter-row">
                        <span className="perameter-label">Min. tempreture</span>
                        <span className="perameter-value">{kelvinToCelsius(fore.list[0].main.temp_min)}°C</span>
                        </div>
                        <div className="perameter-row">
                            <span className="perameter-label">Feels like</span>
                            <span className="perameter-value">{kelvinToCelsius(main.feels_like)}°C</span>
                        </div>

                        <div className="perameter-row">
                            <span className="perameter-label">Wind</span>
                            <span className="perameter-value">{m_sInk_h(wind.speed)} km/h</span>
                        </div>
                        <div className="perameter-row">
                            <span className="perameter-label">Humidity</span>
                            <span className="perameter-value">{main.humidity} %</span>
                        </div>
                        <div className="perameter-row">
                            <span className="perameter-label">Pressure</span>
                            <span className="perameter-value">{main.pressure} mb</span>

                        </div>
                    </div>
                </div>
                <div className="exterior">
                    <Drawer>
                        <DrawerTrigger asChild>
                            <Button className="center-button" variant="ghost">Future Data</Button>
                        </DrawerTrigger>
                        <DrawerContent style={{ backgroundColor: '#ffffff6f' }}>
                            <Carousel id="carus" className="w-full max-w-xl">
                                <CarouselContent>
                                    {Array.from({ length: 6 }).map((_, i) => (

                                        <CarouselItem key={i}>
                                            <div className="p-1">
                                                <div className="weather" style={{ background: `linear-gradient(to bottom, ${backgroundCol(fore.list[i + 1].weather[0].icon)})` }}>
                                                    <div className="top">
                                                        <div>
                                                            <p className="city">
                                                                {Ncity}
                                                                <span className="country">{Ncountry}</span>
                                                            </p>
                                                            <p className="weather-discription">{fore.list[i + 1].weather[0].description}</p>
                                                        </div>

                                                        <img alt="weather" className="weather-icon" src={`icons/${fore.list[i + 1].weather[0].icon}.png`}></img>
                                                    </div>
                                                    <div id="day2">
                                                        <p>{dayofWeekFuture(i + 1, dayOfWeekNumber)}</p>
                                                    </div>
                                                    <div className="buttom">
                                                        <div className="tempreture">
                                                            <span className="temperature2">Min / Max</span>
                                                            <br></br>
                                                            <span className="temperature1">{kelvinToCelsius(fore.list[i + 1].main.temp_min)}°C</span>
                                                            <br></br>
                                                            <span className="temperature1">{kelvinToCelsius(fore.list[i + 1].main.temp_max)}°C</span>
                                                        </div>
                                                        <div className="details">
                                                            <div className="perameter-row">
                                                                <span className="parameter-label">Details</span>
                                                            </div>
                                                            <div className="perameter-row">
                                                                <span className="perameter-label">Feels like</span>
                                                                <span className="perameter-value">{kelvinToCelsius(fore.list[i + 1].main.feels_like)}°C</span>
                                                            </div>
                                                            <div className="perameter-row">
                                                                <span className="perameter-label">Wind</span>
                                                                <span className="perameter-value">{m_sInk_h(fore.list[i + 1].wind.speed)} km/h</span>
                                                            </div>
                                                            <div className="perameter-row">
                                                                <span className="perameter-label">Humidity</span>
                                                                <span className="perameter-value">{fore.list[i + 1].main.humidity} %</span>
                                                            </div>
                                                            <div className="perameter-row">
                                                                <span className="perameter-label">Pressure</span>
                                                                <span className="perameter-value">{fore.list[i + 1].main.pressure} mb</span>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                        </DrawerContent>
                    </Drawer>
                    <div>

                    </div>
                </div>
            </div>
            
        </div>
        
    )
    
}
export default CurentWeather;