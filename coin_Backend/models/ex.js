const Sequelize = require('sequelize')

module.exports = class Ex extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            name:{
                type:Sequelize.STRING(30),
                allowNull:false
            }
        },{
            sequelize,
            timestamps:false,
            underscored:false,
            modelName:'Ex',
            tableName:"ex",
            paranoid:false,
            charset:'utf8',
            collate:'utf8_general_ci'
        })
    }
}