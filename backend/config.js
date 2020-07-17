const path = require('path');
const rootPath = __dirname;

const env = process.env.NODE_ENV;

let database = 'mongodb://localhost/exam-15';
let port = 8000;

if (env === 'test') {
    database = 'mongodb://localhost/exam-15-test';
    port = 8010;
}

module.exports = {
    rootPath,
    uploadPath: path.join(rootPath, 'public', 'uploads'),
    database,
    databaseOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    },
    port,
};