import { QueryInterface } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(`
      CREATE TABLE IF NOT EXISTS room_categories (
      id INT AUTO_INCREMENT PRIMARY KEY,
      room_type ENUM('SINGLE', 'DOUBLE', 'FAMILY', 'DELUXE', 'SUITE') NOT NULL,
      price INT NOT NULL,
      hotel_id INT,
      room_count INT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      deleted_at TIMESTAMP DEFAULT NULL)`);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(`
      DROP TABLE IF EXISTS room_categories;
      `);
  },
};


/**
 * 
 * 
 * QuerytInterface.createTable('room_categories', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      room_type: {
        type: DataTypes.ENUM('SINGLE', 'DOUBLE', 'FAMILY', 'DELUXE', 'SUITE'),
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      hotel_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'hotels',
          key: 'id',
        },
      },
      room_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      deleted_at: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
    }); 
 */