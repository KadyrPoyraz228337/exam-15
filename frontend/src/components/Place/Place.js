import React, {useEffect} from 'react';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {useDispatch, useSelector} from "react-redux";
import {getPlaceRequest} from "../../store/actions/placesActions";
import {useParams} from 'react-router-dom'
import {apiURL} from "../../config";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import {deleteImageRequest, getImagesRequest} from "../../store/actions/imagesActions";
import {deleteReviewRequest, getReviewsRequest} from "../../store/actions/reviewsActions";
import PLaceRatingBoard from "./PLaceRatingBoard/PLaceRatingBoard";
import Button from "@material-ui/core/Button";
import checkRole from "../../checkRole";
import AddPlaceRating from "./AddPlaceRating/AddPlaceRating";
import AddPlaceImage from "./AddPlaceImage/AddPlaceImage";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles({
    image: {
        width: '100%',
    },
    imageItem: {
        display: "flex",
        flexDirection: "column"
    }
})

const Place = () => {
    const classes = useStyles()

    const place = useSelector(state => state.places.place);
    const images = useSelector(state => state.images.images);
    const reviews = useSelector(state => state.reviews.reviews);
    const user = useSelector(state => state.users.user);
    const dispatch = useDispatch()
    const {id} = useParams()

    const deleteReview = async () => {
        await dispatch(deleteReviewRequest(id))
        await dispatch(getReviewsRequest(id))
        await dispatch(getPlaceRequest(id))
    }
    const deleteImage = async imageId => {
        await dispatch(deleteImageRequest(imageId))
        await dispatch(getImagesRequest(id))
    }

    useEffect(() => {
        dispatch(getReviewsRequest(id))
        dispatch(getImagesRequest(id))
        dispatch(getPlaceRequest(id))
    }, [dispatch, id])

    return place && images && reviews && (
        <Container>
            <Grid container>
                <Grid container>
                    <Grid item xs>
                        <Grid container direction='column'>
                            <Grid item>
                                <Typography variant='h3'>
                                    {place.title}
                                </Typography>
                            </Grid>
                            <Grid item xs>
                                <Typography variant='subtitle1'>
                                    {place.description}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs>
                        <img src={apiURL.url + '/uploads/' + place.image} alt="" className={classes.image}/>
                    </Grid>
                </Grid>
                <Grid container direction='column' spacing={2}>
                    <Grid item>
                        <Typography variant='h4'>
                            Ratings
                        </Typography>
                    </Grid>
                    <Grid item>
                        <PLaceRatingBoard
                            rating={place.rating}
                            qualityOfFood={place.qualityOfFood}
                            serviceQuality={place.serviceQuality}
                            interior={place.interior}
                        />
                    </Grid>
                </Grid>
                {reviews.length > 0 && <Grid container direction='column' spacing={2}>
                    <Grid item>
                        <Typography variant='h4'>
                            Reviews
                        </Typography>
                    </Grid>
                    <Grid item>
                        {reviews.map(review => {
                            return (
                                <Paper>
                                    <Box p={3}>
                                        <Grid container direction='column' key={review._id}>
                                            <Grid container justify='space-between' spacing={1}>
                                                <Grid item justify='space-between'>
                                                    <Grid container>
                                                        <Grid item>
                                                            <Typography variant='h6'>
                                                                {review.user.name}
                                                            </Typography>
                                                        </Grid>
                                                        {(checkRole('admin') || review.user._id === user._id) && <Grid item>
                                                            <Box ml={2}>
                                                                <Button variant='contained' color='secondary' onClick={deleteReview}>
                                                                    Delete
                                                                </Button>
                                                            </Box>
                                                        </Grid>}
                                                    </Grid>
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="body2" color="textSecondary" component="p">
                                                        {review.date}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant='subtitle1'>
                                                    {review.text}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <PLaceRatingBoard
                                                    qualityOfFood={review.qualityOfFood}
                                                    serviceQuality={review.serviceQuality}
                                                    interior={review.interior}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Paper>
                            )
                        })}
                    </Grid>
                </Grid>}
                {!reviews.some(element => element.user._id.toString() === user._id.toString()) && (
                    <AddPlaceRating/>
                )}
                <AddPlaceImage currentId={id}/>
                {images.length > 0 && <Grid container direction='column'>
                    <Grid item>
                        <Typography variant='h4'>
                            Gallery
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Paper>
                            <Box p={3}>
                                <Grid container>
                                    {images.map(image => {
                                        return (
                                            <Grid item key={image._id} xs={3}>
                                                <div className={classes.imageItem}>
                                                    <img src={apiURL.url + '/uploads/' + image.image} alt=""
                                                         style={{width: '100%'}}/>
                                                    {checkRole('admin') && (
                                                        <Button color='secondary' variant='contained'
                                                                onClick={() => deleteImage(image._id)}>
                                                            Delete
                                                        </Button>
                                                    )}
                                                </div>
                                            </Grid>
                                        )
                                    })}
                                </Grid>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>}
            </Grid>
        </Container>
    );
};

export default Place;