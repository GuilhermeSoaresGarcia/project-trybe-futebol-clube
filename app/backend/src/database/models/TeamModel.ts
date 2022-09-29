import { DataTypes, Model } from 'sequelize';
import db from '.';
import Match from './MatchModel';
// import OtherModel from './OtherModel';

export default class Team extends Model {
  public id: number;
  public teamName: string;
}

Team.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  // modelName: 'users',
  tableName: 'teams',
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

Match.belongsTo(Team, { foreignKey: 'homeTeam', as: 'mandante' });
Match.belongsTo(Team, { foreignKey: 'awayTeam', as: 'visitante' });

// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });
