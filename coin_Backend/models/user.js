module.exports = (sequelize,DataTypes) => {
    const User = sequelize.define('user',{
        userid:{
            type:DataTypes.STRING(50),
            allowNull:false,
        },
        userpw:{
            type:DataTypes.STRING(255),
            allowNull:false,
        },
        username:{
            type:DataTypes.STRING(10),
            allowNull:false
        }
    },{
        timestamps:false,
        underscored:false,
        paranoid:false,
        modelName:'user',
        tableName:'user',
        charset:'utf8mb4',
        collate:'utf8mb4_general_ci'
    })
    return User
}