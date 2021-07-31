'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.createTable('Apps', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            appId: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            redirectUrl: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            secretKey: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            clientId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                onDelete: 'CASCADE',
                references: {
                    model: 'Clients',
                    key: 'id',
                    as: 'clientId',
                },
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.dropTable('Apps');
    },
};
