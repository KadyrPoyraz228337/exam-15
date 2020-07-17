const env = process.env.REACT_APP_ENV;

let url = 'http://localhost:8000'

if (env === 'test') {
    url = "http://localhost:8010";
}

export const apiURL = {
    url
}

export const toastConfig = {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
}