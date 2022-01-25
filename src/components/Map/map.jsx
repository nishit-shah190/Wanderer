import React from 'react';
import GoogleMapReact from 'google-map-react';
import {Paper, Typography, useMediaQuery} from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';
import useStyles from './styles'

const Maps =  ({setCoordinates, setBounds,coordinates,places, setChildClicked, weatherData}) => {
    const classes = useStyles();
    const isDesktop  = useMediaQuery('(min-width:600px)');
    
    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{key:process.env.GOOGLE_MAPS_API_KEY}}
                defaultCenter={coordinates}
                defaultZoom={14}
                center={coordinates}
                margin={[50,50,50,50]}
                option={{disableDefaultUI:true, zoomControl:true}}
                onChange={(e) => {
                    console.log(e)
                    setCoordinates({lat:e.center.lat, lng:e.center.lng})
                    setBounds({ne:e.marginBounds.ne, sw:e.marginBounds.sw})
                }}
                onChildClick={(child) => setChildClicked(child) }
            >
                {places?.map((place,i) => (
                    <div
                        key={i}
                        lat={Number(place.latitude)}
                        lng={Number(place.longitude)}
                        className={classes.markerContainer}
                    >
                        {
                            !isDesktop ? (
                                <LocationOnOutlinedIcon color='primary' fontSize='large'/>
                            ): (
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography className={classes.Typography} variant='subtitle2' gutterBottom>
                                        {place.name}
                                    </Typography>
                                    <img
                                        className={classes.pointer}
                                        src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                                        alt={place.name}
                                    />
                                    <Rating size="small" vlaue={Number(place.rating)} readOnly/>
                                </Paper>
                            )
                        }
                    </div>

                ))}
            </GoogleMapReact>
            {weatherData?.list?.map((data , i) => {
                <div key={i} lat={data.coords.lat} lng={data.coords.lon}>
                    <img height={100} src={`https://openweathermap/img/w/${data.weather[0].icon.png}`}/>
                </div>
            })}
        </div>

    );
};

export default Maps