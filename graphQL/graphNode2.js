//no tested
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

// GraphQL Schema
var schema = buildSchema(`
	type Query{
		course(id: Int!): Course
		courses(topic: String): [Course]
		coursesAuthor(topic: String): [Course]
	}

	type Mutation {
		updateCourseTopic(id: Int!, topic: String!): Course 
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

var updateCourseTopic = function({id,topic}){
	coursesData.map(course => {
		if(course.id === id){
			course.topic = topic;
			return course;
		}
	})
	return coursesData.filter(course => course.id === id)[0]; 

}


var coursesAuthor = function (args) {
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
	updateCourseTopic: updateCourseTopic
	coursesAuthor : coursesAuthor

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





/*QUERY 2
query getCourses($courseTopic: String!){
  courses(topic: $courseTopic){
    title
    author
    description
    topic
    url
  }
}

{"courseTopic": "topic 2"}
*/

/*
Second query for this file
query getCoursesWithFragments($courseID1: Int!, $courseID2: Int!){
  course1: course(id: $courseID1){
    ...courseFields
  }
  course2: course(id: $courseID2){
    ...courseFields
  }
}

fragment courseFields on Course {
  title
  author
  description
  topic
  url
}

{
  "courseID1": 1,
  "courseID2": 2
}
*/


/* mutation query
mutation noMatterNameHere($id: Int!, $topic: String!){
  #updateCourseTopic is declared in root and in ar schema = buildSchema(...)
  updateCourseTopic(id: $id, topic:$topic){
    ...courseFields
  }
}

fragment courseFields on Course {
  title
  author
  description
  topic
  url
}

{
  "id": 1,
  "topic": "my new topic fuck"
}
*/