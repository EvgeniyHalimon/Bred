'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('reactions', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      sourceType: {
        type: Sequelize.ENUM('ARTICLE', 'COMMENT'),
        allowNull: false,
      },
      articleId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'articles',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL', // или другой подходящий параметр
      },
      commentId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'comments',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL', // или другой подходящий параметр
      },
      reactionType: {
        type: Sequelize.ENUM('LIKE', 'DISLIKE'),
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('reactions');
  },
};
