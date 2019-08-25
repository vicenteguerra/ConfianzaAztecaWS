"use strict";

module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define("User", {
        user_id : { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        whatsapp_number: DataTypes.STRING,
        messenger_id: DataTypes.STRING,
        face_recognition_token: DataTypes.TEXT,
        speaker_recognition_token: DataTypes.TEXT,
        ine: DataTypes.TEXT,
        paperless: {type: DataTypes.BOOLEAN, defaultValue: true}
    });

    User.associate = function(models) {
        User.hasMany(models.Authcode,{
            foreignKey: 'user_id'
        });
    };

    return User;
};
