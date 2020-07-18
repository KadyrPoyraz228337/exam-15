import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getPlacesRequest} from "../../store/actions/placesActions";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import PlaceItem from "./PlaceItem/PlaceItem";

const MainPage = () => {

    const dispatch = useDispatch()
    const places = useSelector(state => state.places.places)

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
                                    image={place.image}
                                    title={place.title}
                                    rating={place.rating}
                                    description={place.description}
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