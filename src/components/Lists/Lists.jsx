import React , {useState, useEffect, createRef} from 'react';
import { CircularProgress,Select, Grid,Typography, InputLabel, FormControl, MenuItem } from '@material-ui/core';
import useStyles from './styles';
import PlaceDetails from '../PlaceDetails/PlaceDetails';
const List=  ({places, childClicked, isLoading, type,setType,rating, setRating}) => {
    const classes = useStyles();
    
    const [elRef, setElRef] = useState([]);
    
    useEffect(() => {
        const ref = Array(places?.length).fill().map((_,i) => elRef[i] || createRef())
        setElRef(ref)
    }, [places])
    return (
        <div className={classes.container}>
            <Typography variant="h5">Restaurants, Hotels and Attractions</Typography>
            {isLoading ? (
                <div className={classes.loading}>
                    <CircularProgress size="5rem"/>
                </div>
            ) : (
                <>
            <FormControl className={classes.formControl}>
                <InputLabel>Type</InputLabel>
                <Select  value={type} onChange={(e) => setType(e.target.value)}>
                    <MenuItem value="restaurants">Restaurants</MenuItem>
                    <MenuItem value="hotels">Hotels</MenuItem>
                    <MenuItem value="attractions">Attractions</MenuItem>
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel>Rating</InputLabel>
                <Select  value={rating} onChange={(e) => setRating(e.target.value)}>
                    <MenuItem value={0}>All</MenuItem>
                    <MenuItem value={3}>3 and Above </MenuItem>
                    <MenuItem value={4}>4 and Above</MenuItem>
                    <MenuItem value={5}>5 Rating</MenuItem>
                </Select>
            </FormControl>
            <Grid conatiner spacing={3} className={classes.list}>
                {places?.map((place,i) => (
                    <Grid ref={elRef[i]} item key={i} xs={12}>
                        <PlaceDetails 
                            place={place}
                            selected= {childClicked === i}
                            refProp={elRef[i]}
                        />
                    </Grid>
                ))}
            </Grid>
            </>
            )}
        </div>
    );
};

export default List