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
          [Op.in]: processed
        }
      }
    }
    
    let foundConflicts = await Word.findAll(query)

    processed.forEach(word => {

      let conflicts = foundConflicts
        .filter(c => c.word === word)
        .map(c => c.dataValues);
      
      if(conflicts.length > 0) {
        result.conflicts[word] = [...conflicts];
      } else {
        result.ready[word] = [];
      }
    });

    return result;
  }

  Word.saveChoosen = async function(choosen) {
    let selected = Object
                          .entries(choosen)
                          // [ ["word", [{},{}]], ...]
                          .map(c => c[1] 
                          // [{}, {}]
                            .find(w => w.selected)
                          );
    return await Promise.all(
      selected.map(
        sel => Word.findOrCreate({
          where: {
            wordId: sel.wordId || null
          },
          defaults: {...sel}
        })
    ));
  }
  
  return Word; 
}
