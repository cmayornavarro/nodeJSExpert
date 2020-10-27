//no tested
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

// GraphQL Schema
var schema = buildSchema(`
	type Query{
		course(id: Int!): Course
		courses(topic: String): [Course]
	}

	type Course{
		id: Int
		title: String
		author: String
		description: String
		topic: String
		url: String
	}
`);

var coursesData = [
	{
		id: 1,
		title: "Title 1",
		author: "Author 1",
		description: "description 1",
		topic: "topic 1",
		url: "url 1",
	},
	{
		id: 2,
		title: "Title 2",
		author: "Author 2",
		description: "description 2",
		topic: "topic 2",
		url: "url 2",
	},
	{
		id: 3,
		title: "Title 3",
		author: "Author 3",
		description: "description 3",
		topic: "topic 3",
		url: "url 3",
	},
];

var getCourse = function (args) {
	var id = args.id;
	return coursesData.filter((course) => {
		return course.id == id;
	})[0];
};

var getCourses = function (args) {
	if (args.topic) {
		var topic = args.topic;
		return coursesData.filter(course => course.topic === topic) ;
	} else {
		return coursesData;
	}
};

// Root resolver
var root = {
	course: getCourse,
	courses: getCourses,
};

// Create an express server and GraphQL endpoint

var app = express();
// use:
/* This example shows a middleware function mounted on the /graphql path. 
The function is executed for any type of HTTP request on the /graphql path.*/

app.use(
	"/graphql",
	graphqlHTTP({
		schema: schema,
		rootValue: root,
		graphiql: true,
	})
);

const port = 3000;
const server = app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});



/*
QUERY 1
query getSingleCourse($courseID: Int!){
  course(id: $courseID){
    title
    author
    description
    topic
    url
  }
}


{"courseID": 1}
*/