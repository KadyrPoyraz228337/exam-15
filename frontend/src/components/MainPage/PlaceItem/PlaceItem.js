import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {apiURL} from "../../../config";
import checkRole from "../../../checkRole";
import FormElement from "../../UI/FormElement/FormElement";
import {NavLink} from "react-router-dom";
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import Box from "@material-ui/core/Box";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
    photo: {
        display: 'flex',
        alignItems: 'center'
    }
});

const PlaceItem = (
    {title, image, rating, reviews, photos, deletePlace, id, index}
) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea component={NavLink} to={'/places/'+id} id={title+index}>
                <CardMedia
                    className={classes.media}
                    image={apiURL.url + '/uploads/' + image}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {title}
                    </Typography>
                    <FormElement
                        type='rating'
                        readOnly
                        value={rating}
                    />
                    <Typography gutterBottom variant="h5" component="h4">
                        ({rating}, {reviews})
                    </Typography>
                    <div className={classes.photo}>
                        <PhotoCameraIcon/>
                        <Box ml={1}>
                            <Typography gutterBottom variant="h5" component="h4" style={{margin: '0'}}>
                                {photos} photos
                            </Typography>
                        </Box>
                    </div>
                </CardContent>
            </CardActionArea>
            {checkRole('admin') && (
                <CardActions>
                    <Button size="small" color="secondary" variant='contained' onClick={() => deletePlace(id)}>
                        delete
                    </Button>
                </CardActions>
            )}
        </Card>
    );
}

export default PlaceItem
