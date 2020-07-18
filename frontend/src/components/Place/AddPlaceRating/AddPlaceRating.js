import React, {useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormElement from "../../UI/FormElement/FormElement";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";
import {addReviewRequest, getReviewsRequest} from "../../../store/actions/reviewsActions";
import {useParams} from 'react-router-dom'
import Alert from "@material-ui/lab/Alert";
import {getPlaceRequest} from "../../../store/actions/placesActions";

const useStyles = makeStyles({
    ratingBlock: {
        display: "flex",
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    ratingTitle: {
        margin: '0'
    }
})

const AddPlaceRating = () => {
    const classes = useStyles()

    const [review, setReview] = useState({
        text: '',
        qualityOfFood: 0,
        serviceQuality: 0,
        interior: 0
    })

    const error = useSelector(state => state.reviews.error)
    const dispatch = useDispatch()
    const {id} = useParams()

    const inputChangeHandler = e => setReview({...review, [e.target.name]: e.target.value})
    const ratingChangeHandler = (e, value) => setReview({...review, [e.target.name]: value})
    const submitHandler = async e => {
        e.preventDefault()

        await dispatch(addReviewRequest(review, id))
        await dispatch(getReviewsRequest(id))
        await dispatch(getPlaceRequest(id))
    }

    return (
        <form onSubmit={submitHandler}>
            <Grid container direction='column' spacing={2}>
                <Grid item>
                    <Typography variant='h4'>
                        Add review
                    </Typography>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs>
                        <FormElement
                            multiline
                            name='text'
                            onChange={inputChangeHandler}
                            label='Review text'
                            variant='outlined'
                        />
                    </Grid>
                    <Grid container justify='space-between'>
                        <Grid item>
                            <div className={classes.ratingBlock}>
                                <Typography variant='body1' className={classes.ratingTitle}>Quality of food</Typography>
                                <FormElement
                                    type='rating'
                                    name='qualityOfFood'
                                    value={review.qualityOfFood}
                                    onChange={ratingChangeHandler}
                                />
                            </div>
                        </Grid>
                        <Grid item>
                            <div className={classes.ratingBlock}>
                                <Typography variant='body1' className={classes.ratingTitle}>Service quality</Typography>
                                <FormElement
                                    name='serviceQuality'
                                    type='rating'
                                    value={review.serviceQuality}
                                    onChange={ratingChangeHandler}
                                />
                            </div>
                        </Grid>
                        <Grid item>
                            <div className={classes.ratingBlock}>
                                <Typography variant='body1' className={classes.ratingTitle}>Interior</Typography>
                                <FormElement
                                    type='rating'
                                    name='interior'
                                    value={review.interior}
                                    onChange={ratingChangeHandler}
                                />
                            </div>
                        </Grid>
                        <Grid item>
                            <Button variant='contained' color='primary' type='submit'>
                                Submit review
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                {error && <Grid item>
                    <Alert severity='error'>
                        {error.message}
                    </Alert>
                </Grid>}
            </Grid>
        </form>
    );
};

export default AddPlaceRating;