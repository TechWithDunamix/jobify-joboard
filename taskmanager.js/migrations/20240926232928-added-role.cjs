'use strict';


const {DataTypes} = require("sequelize")
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.createTable("Users",{"id":{
      "type":DataTypes.UUID,
      "defaultValue":DataTypes.UUIDV4,
      "primaryKey":true
  },
  "email":{
      "type":DataTypes.STRING,
      "allowNull":false,
      "unique":true
  },
  "firstname":{
      "type":DataTypes.STRING,
      "allowNull":false
  },
  "lastname":{
      "type":DataTypes.STRING,
      "allowNull":false
  },
  "created_at":{
      "type":DataTypes.DATE,
      "defaultValue":DataTypes.NOW
  },
  "country":{
      "allowNull":false,
      "type":DataTypes.STRING
  },
  "role":{
      type:DataTypes.STRING,
      defaultValue:"job_seeker"
  }
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
