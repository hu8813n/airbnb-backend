// src/graphql/resolvers.ts

import Hotel from "../db/models/hotel";

export const resolvers = {

  Query: {
    // Called when client asks: query { hotels { id name } }
    hotels: async () => {
      return await Hotel.findAll();
    },

    // Called when client asks: query { hotel(id: "1") { name location } }
    hotel: async (_: any, args: { id: string }) => {
      return await Hotel.findByPk(args.id);
    },
  },

  Mutation: {
    // Called when client sends: mutation { createHotel(input: {...}) { id name } }
    createHotel: async (_: any, args: { input: { name: string; address: string; location: string , rating: number , ratingCount: number } }) => {
      return await Hotel.create(args.input);
    },
  },

};