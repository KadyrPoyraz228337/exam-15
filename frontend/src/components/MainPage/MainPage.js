import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deletePlaceRequest, getPlacesRequest} from "../../store/actions/placesActions";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import PlaceItem from "./PlaceItem/PlaceItem";

const MainPage = () => {

    const dispatch = useDispatch()
    const places = useSelector(state => state.places.places)

    const deletePlace = id => {
        dispatch(deletePlaceRequest(id))
        dispatch(getPlacesRequest())
    }

    useEffect(() => {
        dispatch(getPlacesRequest())
    }, [dispatch])

    return places && (
        <Container>
            <Grid container direction='column' spacing={2}>
                <Grid item>
                    <Typography variant='h3'>
                        All places
                    </Typography>
                </Grid>
                <Grid container spacing={1}>
                    {places.map(place => {
                        return (
                            <Grid item xs={3}>
                                <PlaceItem
                                    key={place._id}
                                    id={place._id}
                                    deletePlace={deletePlace}
                                    image={place.image}
                                    title={place.title}
                                    rating={place.rating}
                                />
                            </Grid>
                        )
                    })}
                </Grid>
            </Grid>
        </Container>
    );
};

export default MainPage;