import React, {useState} from 'react';
import {AppBar, Typography, InputBase, Toolbar, Box} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { Autocomplete } from '@react-google-maps/api';
import useStyles from './styles'

const Header =  ({setCoordinates}) => {

    const [autoComplete, setautoComplete] = useState(null);

    const onLoad = (autoC) => setautoComplete(autoC)
    const onPlaceChange = () =>{
        const lat = autoComplete.getPlace().geometry.loacation.lat();
        const lng = autoComplete.getPlace().geometry.loacation.lng();
        setCoordinates({lat,lng})
    }
    const classes = useStyles()
    return (
        <AppBar position='static'>
            <Toolbar className={classes.toolbar}>
              <Typography variant="h5" className={classes.title}>
                 Wanderer
              </Typography>
              <Box display="flex">
                <Typography variant="h6" className={classes.title}>
                 Explore New Pages
                </Typography>
                <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChange}>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon/>
                        </div>
                        <InputBase placeholder='Search...' classes={{root:classes.inputRoot, input:classes.inputInput}}/>
                    </div>
                </Autocomplete>
              </Box>
            </Toolbar>

        </AppBar>
    );
};

export default Header