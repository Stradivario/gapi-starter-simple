import { GraphQLObjectType, GraphQLString, GraphQLList } from "graphql";
import { Movie } from "./Movie.type";

export let Genre = new GraphQLObjectType( {
    name: 'Genre',
    fields: () => ({
        name: {
            type: GraphQLString
        },
        movies: {
            type: new GraphQLList(Movie)
        },
    })
});
