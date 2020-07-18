import React, {useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import FormElement from "../UI/FormElement/FormElement";
import Button from "@material-ui/core/Button";
import {addPlaceRequest, placeInit} from "../../store/actions/placesActions";
import {useDispatch, useSelector} from "react-redux";
import Alert from "@material-ui/lab/Alert";

const AddPlace = () => {

    const [place, setPlace] = useState({
        title: '',
        description: '',
        image: null,
        licenseAgreement: false
    })

    const error = useSelector(state => state.places.error)
    const dispatch = useDispatch()

    const inputChangeHandler = e => setPlace({...place, [e.target.name]: e.target.value})
    const fileChangeHandler = e => setPlace({...place, [e.target.name]: e.target.files[0]});
    const checkboxChangeHandler = () => setPlace({...place, licenseAgreement: !place.licenseAgreement})
    const submitHandler = e => {
        e.preventDefault()

        const data = new FormData

        Object.keys(place).forEach(placeItem => {
            data.append(placeItem, place[placeItem])
        })

        dispatch(addPlaceRequest(data))
    }

    useEffect(() => {
        dispatch(placeInit())
    }, [dispatch])

    return (
        <Container>
            <Grid container direction='column' spacing={2}>
                <Grid item>
                    <Typography variant='h3'>
                        Add new place
                    </Typography>
                </Grid>
                <Grid item xs>
                    <form onSubmit={submitHandler}>
                        <Grid container direction='column' spacing={2}>
                            <Grid item xs>
                                <FormElement
                                    type='text'
                                    autoFocus
                                    variant='outlined'
                                    label='Title'
                                    value={place.title}
                                    name='title'
                                    onChange={inputChangeHandler}
                                />
                            </Grid>
                            <Grid item xs>
                                <FormElement
                                    type='text'
                                    variant='outlined'
                                    value={place.description}
                                    label='Description'
                                    name='description'
                                    multiline
                                    onChange={inputChangeHandler}
                                />
                            </Grid>
                            <Grid item>
                                <FormElement
                                    type='image'
                                    label='Main photo'
                                    name='image'
                                    value={place.image}
                                    onChange={fileChangeHandler}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <FormElement
                                    type='checkbox'
                                    label='I understand'
                                    name='licenseAgreement'
                                    onChange={checkboxChangeHandler}
                                />
                            </Grid>
                            {error && <Grid item xs>
                                <Alert severity="error">
                                    {error.message}
                                </Alert>
                            </Grid>}
                            <Grid item xs={3}>
                                <Button variant='contained' type='submit' color='primary' disabled={!place.licenseAgreement}>
                                    Submit new place
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AddPlace;