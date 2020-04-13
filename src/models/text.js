import { connection } from './index';
//import { DataTypes, Model } from 'sequelize';

//class Text extends Model {}

export default function(sequelize, DataTypes) {
  return sequelize.define(
    'Text',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      tableName: 'texts',
      freezeTableNames: true
    }
  )
}

/*Text.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  connection,
  modelName: 'texts'
})*/


