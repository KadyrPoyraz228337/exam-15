import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormElement from "../../UI/FormElement/FormElement";
import makeStyles from "@material-ui/core/styles/makeStyles";

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

const PLaceRatingBoard = (
    {rating, qualityOfFood, serviceQuality, interior}
) => {
    const classes = useStyles()

    return (
        <Grid container direction='column'>
            {rating !== undefined && <Grid item xs={3}>
                <div className={classes.ratingBlock}>
                    <Typography variant='h6' className={classes.ratingTitle}>Overall</Typography>
                    <FormElement
                        type='rating'
                        value={rating}
                        name='Overall'
                        readOnly
                    />
                </div>
            </Grid>}
            <Grid item xs={3}>
                <div className={classes.ratingBlock}>
                    <Typography variant='body1' className={classes.ratingTitle}>Quality of food</Typography>
                    <FormElement
                        type='rating'
                        value={qualityOfFood}
                        name='qualityOfFood'
                        readOnly
                    />
                </div>
            </Grid>
            <Grid item xs={3}>
                <div className={classes.ratingBlock}>
                    <Typography variant='body1' className={classes.ratingTitle}>Service quality</Typography>
                    <FormElement
                        type='rating'
                        value={serviceQuality}
                        name='serviceQuality'
                        readOnly
                    />
                </div>
            </Grid>
            <Grid item xs={3}>
                <div className={classes.ratingBlock}>
                    <Typography variant='body1' className={classes.ratingTitle}>Interior</Typography>
                    <FormElement
                        type='rating'
                        value={interior}
                        name='interior'
                        readOnly
                    />
                </div>
            </Grid>
        </Grid>
    );
};

export default PLaceRatingBoard;