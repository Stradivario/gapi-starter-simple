// tslint:disable
// graphql typescript definitions


  export interface IGraphQLResponseRoot {
    data?: IQuery | IMutation;
    errors?: Array<IGraphQLResponseError>;
  }

  export interface IGraphQLResponseError {
    message: string;            // Required for all errors
    locations?: Array<IGraphQLResponseErrorLocation>;
    [propName: string]: any;    // 7.2.2 says 'GraphQL servers may provide additional entries to error'
  }

  export interface IGraphQLResponseErrorLocation {
    line: number;
    column: number;
  }

  /**
    description: Query type for all get requests which will not change persistent data
  */
  export interface IQuery {
    __typename?: "Query";
    Movie: Array<IMovie> | null;
    Genre: Array<IGenre> | null;
}

export   
  type IMovieOrderingEnum = 'movieId_asc' | 'movieId_desc' | 'title_asc' | 'title_desc' | 'year_asc' | 'year_desc' | 'imdbRating_asc' | 'imdbRating_desc' | 'plot_asc' | 'plot_desc' | '_id_asc' | '_id_desc';

  
  export interface IMovie {
    __typename?: "Movie";
    movieId: number | null;
    title: string | null;
    genres: Array<IGenre> | null;
    year: string | null;
    imdbRating: string | null;
    plot: string | null;
    similar: Array<IMovie> | null;
    _id: string | null;
}

  
  export interface IGenre {
    __typename?: "Genre";
    name: string | null;
    movies: Array<IMovie> | null;
    _id: string | null;
}

export   
  type IGenreOrderingEnum = 'name_asc' | 'name_desc' | '_id_asc' | '_id_desc';

  
  export interface IMutation {
    __typename?: "Mutation";
    CreateGenre: IGenre | null;
    DeleteGenre: IGenre | null;
    AddGenreMovies: IAddGenreMoviesPayload | null;
    RemoveGenreMovies: IRemoveGenreMoviesPayload | null;
    CreateMovie: IMovie | null;
    UpdateMovie: IMovie | null;
    DeleteMovie: IMovie | null;
}

  
  export interface IMovieInput {
    movieId: number;
}

  
  export interface IGenreInput {
    name: string;
}

  
  export interface IAddGenreMoviesPayload {
    __typename?: "_AddGenreMoviesPayload";
    from: IMovie | null;
    to: IGenre | null;
}

  
  export interface IRemoveGenreMoviesPayload {
    __typename?: "_RemoveGenreMoviesPayload";
    from: IMovie | null;
    to: IGenre | null;
}

  
  export interface INeo4jTime {
    __typename?: "_Neo4jTime";
    hour: number | null;
    minute: number | null;
    second: number | null;
    millisecond: number | null;
    microsecond: number | null;
    nanosecond: number | null;
    timezone: string | null;
    formatted: string | null;
}

  
  export interface INeo4jTimeInput {
    hour?: number | null;
    minute?: number | null;
    second?: number | null;
    nanosecond?: number | null;
    millisecond?: number | null;
    microsecond?: number | null;
    timezone?: string | null;
    formatted?: string | null;
}

  
  export interface INeo4jDate {
    __typename?: "_Neo4jDate";
    year: number | null;
    month: number | null;
    day: number | null;
    formatted: string | null;
}

  
  export interface INeo4jDateInput {
    year?: number | null;
    month?: number | null;
    day?: number | null;
    formatted?: string | null;
}

  
  export interface INeo4jDateTime {
    __typename?: "_Neo4jDateTime";
    year: number | null;
    month: number | null;
    day: number | null;
    hour: number | null;
    minute: number | null;
    second: number | null;
    millisecond: number | null;
    microsecond: number | null;
    nanosecond: number | null;
    timezone: string | null;
    formatted: string | null;
}

  
  export interface INeo4jDateTimeInput {
    year?: number | null;
    month?: number | null;
    day?: number | null;
    hour?: number | null;
    minute?: number | null;
    second?: number | null;
    millisecond?: number | null;
    microsecond?: number | null;
    nanosecond?: number | null;
    timezone?: string | null;
    formatted?: string | null;
}

  
  export interface INeo4jLocalTime {
    __typename?: "_Neo4jLocalTime";
    hour: number | null;
    minute: number | null;
    second: number | null;
    millisecond: number | null;
    microsecond: number | null;
    nanosecond: number | null;
    formatted: string | null;
}

  
  export interface INeo4jLocalTimeInput {
    hour?: number | null;
    minute?: number | null;
    second?: number | null;
    millisecond?: number | null;
    microsecond?: number | null;
    nanosecond?: number | null;
    formatted?: string | null;
}

  
  export interface INeo4jLocalDateTime {
    __typename?: "_Neo4jLocalDateTime";
    year: number | null;
    month: number | null;
    day: number | null;
    hour: number | null;
    minute: number | null;
    second: number | null;
    millisecond: number | null;
    microsecond: number | null;
    nanosecond: number | null;
    formatted: string | null;
}

  
  export interface INeo4jLocalDateTimeInput {
    year?: number | null;
    month?: number | null;
    day?: number | null;
    hour?: number | null;
    minute?: number | null;
    second?: number | null;
    millisecond?: number | null;
    microsecond?: number | null;
    nanosecond?: number | null;
    formatted?: string | null;
}

export   
  type IRelationDirectionsEnum = 'IN' | 'OUT';


// tslint:enable
