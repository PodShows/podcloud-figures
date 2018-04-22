const { GraphQLServer } = require('graphql-yoga')
const graphql = require('./graphql')

console.log(graphql);

const server = new GraphQLServer({
  ...graphql,
  context: req => ({
    ...req,
    db: null
  }),
})

server.start({ port: 5000 }, () => console.log('Server is running on http://localhost:4000'))
