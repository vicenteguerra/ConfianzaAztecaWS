"use strict";
var uniqid = require('uniqid');

module.exports = function(sequelize, DataTypes) {
    const Authcode = sequelize.define("Authcode", {
        authcode_id : { type: DataTypes.STRING, primaryKey: true},
        user_id: DataTypes.INTEGER,
        auth_type: DataTypes.INTEGER,
        result_date: DataTypes.DATE,
        auth: DataTypes.BOOLEAN
    });

    Authcode.beforeCreate(function (authcode) {
        authcode.dataValues.client_id = uniqid('trust-');
    });

    Authcode.associate = function(models) {
        Authcode.belongsTo(models.User, {
            foreignKey: 'user_id'
        });
    };

    return Authcode;
};
