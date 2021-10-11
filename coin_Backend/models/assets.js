const { Asset } = require(".")

module.exports = (sequelize,DataTypes) => {
    const Assets = sequelize.define('Assets',{
        pk:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        input:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        output:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        regdate:{
            type:DataTypes.DATE,
            allowNull:false,
            comment:'거래날짜'
        }
    },{
        timestamps:false, 
        underscored:false,
        paranoid:false,
        modelName:'assets',
        tableName:'assets',
        charset:'utf8mb4',
        collate:'utf8mb4_general_ci'
    })
    Assets.associate = (models) => {
        Assets.belongsTo(models.User,{
            onDelete:'cascade'
        })
    }
    return Assets
}
    
    
 
