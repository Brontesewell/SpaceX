const express = require('express');
const grapHhqlTTP = require('express-graphql');
const schema = require('./schema')

const app = express();

app.use(
    '/graphql', 
    grapHhqlTTP({
        schema,
        graphiql: true
    })
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
