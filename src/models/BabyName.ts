import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db';

export class BabyName extends Model {
  declare id: number;
  declare name: string;
  declare sex: string;
}

BabyName.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  sex: { type: DataTypes.STRING, allowNull: false }
}, {
  sequelize,
  tableName: 'baby_names',
  timestamps: false
});
