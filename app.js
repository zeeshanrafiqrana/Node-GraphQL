const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql").graphqlHTTP;

const mongoose = require("mongoose")
const app = express()
const Event = require("./models/event");
const User=require('./models/user')
const bcrypt=require('bcryptjs')
const graphQLScehma=require('./graphql/schema/index');
const graphQLResolvers=require('./graphql/resolvers/index');

app.use(bodyParser.json());



//will not return null and multiple null objects
app.use(
  "/graphql",
  graphqlHttp({
    schema: graphQLScehma,
    rootValue:graphQLResolvers, 
    graphiql: true,
  })
);
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.kz0gafj.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
  )
  .then(() => app.listen(3000, () => console.log(`Listening on port 3000`)))
  .catch((err) => console.log(err));
