const axios = require('axios')

const {
    GraphQLObjectType, 
    GraphQLInt, 
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
    GraphQLSchema
} = require('graphql')

// Launch Type
const LaunchType = new GraphQLObjectType ({
    name: 'Launch',
    fields: () => ({
        flight_number: { type: GraphQLInt},
        mission_name: { type: GraphQLString},
        launch_year: { type: GraphQLString},
        launch_date_local: { type: GraphQLString},
        launch_success: { type: GraphQLBoolean},
        rocket: {type: RocketType}
    }),
})


//RocketType

const RocketType = new GraphQLObjectType ({
    name: 'RocketType',
    fields: () => ({
        rocket_id: { type: GraphQLString},
        rocket_name: { type: GraphQLString},
        rocket_type: { type: GraphQLString},
    }),
})

//Root Query

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: () => ({
        launches: {
            type: new GraphQLList(LaunchType),
            resolve(parent, args) {
                return axios.get('https://api.spacexdata.com/v3/launches')
                .then(resp => resp.data);
            }
        },
        launch: {
            type: LaunchType,
            args: {
                flight_number: { type: GraphQLInt}
            },
            resolve(parent, args) {
                return axios.get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
                .then(resp => resp.data)
            }
        },
        rockets: {
            type: new GraphQLList(RocketType),
            resolve(parent, args) {
                return axios.get('https://api.spacexdata.com/v3/rockets')
                .then(resp => resp.data);
            }
        },
        rocket: {
            type: RocketType,
            args: {
                id: { type: GraphQLInt}
            },
            resolve(parent, args) {
                return axios.get(`https://api.spacexdata.com/v3/rockets/${args.id}`)
                .then(resp => resp.data)
            }
        }
    })
})

module.exports = new GraphQLSchema({
    query: RootQuery
});