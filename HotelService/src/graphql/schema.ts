export const typeDefs = `#graphql

  type Hotel {
    id: ID!
    name: String!
    address: String!
    location: String!
    rating: Float
    ratingCount: Int
    createdAt: String!
    updatedAt: String!
  }

  input CreateHotelInput {
    name: String!
    address: String!
    location: String!
    rating: Float
    ratingCount: Int
  }

  type Query {
    hotels: [Hotel!]!
    hotel(id: ID!): Hotel
  }

  type Mutation {
    createHotel(input: CreateHotelInput!): Hotel!
  }
`;