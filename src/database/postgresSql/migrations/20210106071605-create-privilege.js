'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Privileges', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            userId: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            appId: {
                type: Sequelize.STRING,
                allowNull: false,
                onDelete: 'CASCADE',
                references: {
                    model: 'Apps',
                    key: 'appId',
                    as: 'appId',
                },
            },
            viewProfile: {
                type: Sequelize.BOOLEAN,
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
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Privileges');
    },
};
