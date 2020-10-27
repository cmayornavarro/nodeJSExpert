//no tested
const express = require('express')
const {graphqlHTTP}  = require('express-graphql')
const {buildSchema} = require('graphql')

// GraphQL Schema
var schema = buildSchema(`
	type Query{
		message: String
	}
`);

// Root resolver
var root = {
	message: () => 'Hello World!'
}

// Create an express server and GraphQL endpoint

var app = express();
// use:
/* This example shows a middleware function mounted on the /graphql path. 
The function is executed for any type of HTTP request on the /graphql path.*/


app.use('/graphql', graphqlHTTP ({
	schema: schema,
	rootValue: root,
	graphiql: true
}));


const port = 3000
const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

/*
query in graphiql:

{
	message
}
*/