import React , {useState, useEffect} from "react";
import {CssBaseline, Grid} from '@material-ui/core'
import Header from "./components/Header/Header";
import List from "./components/Lists/Lists";
import Maps from "./components/Map/map";
import PlaceDetails from "./components/PlaceDetails/PlaceDetails";
import { getPlacesData, getWeatherData } from "./api";

const App = () => {

  const [places, setPlaces] = useState([]);
  const [FilteredPlaces, setFilteredPlaces] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds,setBounds] = useState({});
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState('restaurants') 
  const [rating, setRating] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) =>{
      setCoordinates({lat:latitude, lng:longitude})
    })
  },[]);

  useEffect(() => {
    const FilteredPlaces = places.filter((place) => place.rating > rating);
    setFilteredPlaces(FilteredPlaces);
  },[rating]);

  useEffect(() =>{
    if(bounds.sw && bounds.ne){
    console.log(coordinates, bounds);
    setIsLoading(true)
    getWeatherData(coordinates.lat , coordinates.lng)
      .then((data) => setWeatherData(data))
    getPlacesData(type, bounds.sw,bounds.ne)
      .then((data) =>{
        console.log(data);
        setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
        setFilteredPlaces([]);
        setIsLoading(false)
      } )
    }
  }, [type,bounds]);
    return (
        <>
            <CssBaseline/>
            <Header setCoordinates={setCoordinates}/>
            <Grid container spacing ={3} style={{width:'100%'}}>
              <Grid item xs={12} md={4}>
                <List 
                places={FilteredPlaces.length ? FilteredPlaces :places}
                childClicked={childClicked}
                isLoading={isLoading}
                type={type}
                setType={setType}
                rating={rating}
                setRating={setRating}
                />
              </Grid>
              <Grid item xs={12} md={8}>
                <Maps
                  setCoordinates = {setCoordinates}
                  setBounds = {setBounds}
                  coordinates={coordinates}
                  places={FilteredPlaces.length ? FilteredPlaces :places}
                  setChildClicked = {setChildClicked}
                  weatherData={weatherData}
                />
              </Grid>

            </Grid>
        </>
    )
};

export default App