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
app.use('/graphql', graphqlHTTP ({
	schema: schema,
	rootValue: root,
	graphiql: true
}));


const port = 3000
const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

