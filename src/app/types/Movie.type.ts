import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } from "graphql";
import { Genre } from "./Genre.type";

export let Movie = new GraphQLObjectType( {
    name: 'Movie',
    fields: () => ({
        movieId: {
            type: GraphQLInt
        },
        title: {
            type: GraphQLString
        },
        genres: {
            type: new GraphQLList(Genre)
        },
        year: {
            type: GraphQLString
        },
        imdbRating: {
            type: GraphQLString
        },
        plot: {
            type: GraphQLString
        },
        similar: {
            cyper: `
            @cypher(
                statement: """MATCH (this)<-[:RATED]-(:User)-[:RATED]->(s:Movie) 
                              WITH s, COUNT(*) AS score 
                              RETURN s ORDER BY score DESC LIMIT {first}""")
            `,
            args: {
                first: {
                    type: GraphQLInt
                },
                offset: {
                    type: GraphQLInt
                }
            },
            type: new GraphQLList(Movie)
        }
    })
});
