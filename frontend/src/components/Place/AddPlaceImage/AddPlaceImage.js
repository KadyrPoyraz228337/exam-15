import React, {useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import FormElement from "../../UI/FormElement/FormElement";
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";
import {addImageRequest, getImagesRequest} from "../../../store/actions/imagesActions";
import {useParams} from 'react-router-dom'
import Alert from "@material-ui/lab/Alert";

const AddPlaceImage = (
    {currentId}
) => {

    const [image, setImage] = useState({
        image: null
    })

    const error = useSelector(state => state.images.error)
    const dispatch = useDispatch()
    const {id} = useParams()

    const fileChangeHandler = e => setImage({...image, image: e.target.files[0]});
    const submitHandler = async e => {
        e.preventDefault()

        const data = new FormData
        data.append('image', image.image)
        await dispatch(addImageRequest(data, id))
        await dispatch(getImagesRequest(currentId))
    }

    return (
        <Box mt={3} mb={4}>
            <Grid container direction='column' spacing={2}>
                <Grid item>
                    <Typography variant='h4'>
                        Upload new photo
                    </Typography>
                </Grid>
                <Grid item>
                    <FormElement
                        type='image'
                        label='Choose file'
                        onChange={fileChangeHandler}
                        value={image.image}
                    />
                </Grid>
                {error && <Grid item>
                    <Alert severity='error'>
                        {error.message}
                    </Alert>
                </Grid>}
                <Grid item>
                    <Button variant='contained' color='primary' onClick={submitHandler}>
                        Upload
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AddPlaceImage;