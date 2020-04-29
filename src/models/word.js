import Sequelize from 'sequelize';
const Op = Sequelize.Op;

module.exports = function(sequelize, DataTypes) {
  const Word = sequelize.define(
    'Word',
    {
      wordId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      word: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      definition: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      videoUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      }
    },
    {
      tableName: 'words',
      freezeTableNames: true,
      underscored: true
    }
  )
  Word.compareBeforeSaving = async function (processed) {
    let result = {
      conflicts: {},
      ready: {}
    };
    
    let query = {
      where: {
        word: {
          [Op.in]: processed.map(p => p.word)
        }
      }
    }
    
    let foundConflicts = await Word.findAll(query)

    processed.forEach(pWord => {
      let word = pWord.word;

      let conflicts = foundConflicts
        .filter(c => c.word === word)
        .map(c => c.dataValues);
      
      if(conflicts.length > 0) {
        result.conflicts[word] = [...conflicts, pWord];
      } else {
        result.ready[word] = [pWord];
      }
    });

    return result;
  }
  
  return Word; 
}
