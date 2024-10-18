'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('comments', 'authorId', {
      type: Sequelize.UUID,
      references: {
        model: {
          tableName: 'users',
        },
        key: 'id',
      },
      allowNull: false,
      onDelete: 'CASCADE',
    });
    await queryInterface.changeColumn('comments', 'articleId', {
      type: Sequelize.UUID,
      references: {
        model: {
          tableName: 'articles',
        },
        key: 'id',
      },
      allowNull: false,
      onDelete: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('comments', 'authorId', {
      type: Sequelize.UUID,
      references: {
        model: {
          tableName: 'users',
        },
        key: 'id',
      },
      allowNull: false,
    });
    await queryInterface.changeColumn('comments', 'articleId', {
      type: Sequelize.UUID,
      references: {
        model: {
          tableName: 'articles',
        },
        key: 'id',
      },
      allowNull: false,
    });
  },
};
