import { DataTypes, QueryInterface } from "sequelize"
module.exports = {
  async up (queryInterface: QueryInterface ) {
   await queryInterface.addColumn('hotels', 'deleted_at', {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null
     // This will allow us to implement soft deletes by setting the deleted_at field instead of actually deleting the record from the database.
     // When a hotel is "deleted", we will set the deleted_at field to the current date and time. When fetching hotels, we can filter out those that have a non-null deleted_at field.
      // This way, we can keep the data in the database for historical purposes or for potential recovery, while still treating it as deleted in our application logic.
     
   });
  },

  async down (queryInterface: QueryInterface ) {
    await queryInterface.removeColumn('hotels', 'deleted_at');
  }
};
