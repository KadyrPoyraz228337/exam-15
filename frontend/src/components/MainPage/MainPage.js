import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deletePlaceRequest, getPlacesRequest} from "../../store/actions/placesActions";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import PlaceItem from "./PlaceItem/PlaceItem";
import {getAllReviewsRequest} from "../../store/actions/reviewsActions";
import {getAllImagesRequest} from "../../store/actions/imagesActions";

const MainPage = () => {

    const dispatch = useDispatch()
    const places = useSelector(state => state.places.places)
    const reviews = useSelector(state => state.reviews.allReviews)
    const images = useSelector(state => state.images.allImages)

    const deletePlace = async id => {
        await dispatch(deletePlaceRequest(id))
        await dispatch(getPlacesRequest())
        await dispatch(getAllReviewsRequest())
    }

    useEffect(() => {
        dispatch(getPlacesRequest())
        dispatch(getAllReviewsRequest())
        dispatch(getAllImagesRequest())
    }, [dispatch])

    return places && reviews && images && (
        <Container>
            <Grid container direction='column' spacing={2}>
                <Grid item>
                    <Typography variant='h3'>
                        All places
                    </Typography>
                </Grid>
                <Grid container spacing={1}>
                    {places.map((place, index) => {
                        return (
                            <Grid item xs={3} key={place._id}>
                                <PlaceItem
                                    id={place._id}
                                    index={index}
                                    deletePlace={deletePlace}
                                    image={place.image}
                                    title={place.title}
                                    rating={place.rating}
                                    reviews={reviews.filter(review => review.place.toString() === place._id.toString()).length}
                                    photos={images.filter(image => image.place.toString() === place._id.toString()).length}
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