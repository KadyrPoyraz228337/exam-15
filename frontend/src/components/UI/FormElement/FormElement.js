import React from 'react';
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        alignItems: "center",
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
    button: {
        width: '100%'
    }
}));

const FormElement = (
    {
        name, variant, required, id, label, autoFocus,
        onChange, type, autoComplete, error, helperText,
        margin, multiline, value, readOnly
    }
) => {
    const classes = useStyles();

    const textFieldError = error && error.data.keyPattern && error.data.keyPattern[name];

    let field = (
        <TextField
            margin={margin}
            error={!!textFieldError}
            helperText={textFieldError && helperText}
            autoComplete={autoComplete}
            name={name}
            value={value}
            variant={variant}
            required={required}
            fullWidth
            id={id}
            label={label}
            multiline={multiline}
            autoFocus={autoFocus}
            onChange={onChange}
            type={type}
        />
    )

    if (type === 'image') {
        field = (
            <div className={classes.root}>
                <input
                    accept="image/*"
                    className={classes.input}
                    name={name}
                    onChange={onChange}
                    id="contained-button-file"
                    multiple
                    type="file"
                />
                <label htmlFor="contained-button-file">
                    <Button variant="contained" color="primary" component="span" className={classes.button}
                            startIcon={label && <PhotoCamera/>}>
                        {label ? label : <PhotoCamera/>}
                    </Button>

                </label>
                <Typography>
                    {value?.name || 'No file chosen'}
                </Typography>
            </div>
        )
    }

    if (type === 'checkbox') {
        field = (
            <label style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer'
            }}>
                <Checkbox
                    checked={value}
                    onChange={onChange}
                    name={name}
                    inputProps={{'aria-label': 'primary checkbox'}}
                />
                <Typography variant='h6'>
                    {label}
                </Typography>
            </label>
        )
    }

    if (type === 'rating') {
        field = (
            <Box component="fieldset" borderColor="transparent">
                {label &&<Typography component="legend">{label}</Typography>}
                <Rating
                    name={name}
                    readOnly={readOnly}
                    value={value}
                    onChange={(event, newValue) => onChange(event, newValue)}
                />
            </Box>
        )
    }

    return field
};

export default FormElement;