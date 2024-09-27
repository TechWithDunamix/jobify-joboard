'use strict';
const {DataTypes} = require("sequelize")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   queryInterface.createTable("Company_Profile",{
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        
    },
    description:{
        type:DataTypes.TEXT,
        allowNull:false,
        
    },
    website:{
        type:DataTypes.TEXT
    },


})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
