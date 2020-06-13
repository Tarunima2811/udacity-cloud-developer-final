import {Table, Column, Model, HasMany, PrimaryKey, CreatedAt, NotNull} from 'sequelize-typescript';
import {Col} from "sequelize/types/lib/utils";
import {DateOnlyDataType} from "sequelize";

@Table
export class FitnessDiary extends Model<FitnessDiary> {
  
  /*@PrimaryKey
  @Column
  public id!: number;*/

  @Column
  public recordDate!: string; // for nullable fields

  @Column
  public height: string;

  @Column
  public weight: string;

  @Column
  public waterIntake: number;

  @Column
  public workout: number;

  @Column
  public steps: number;

  @Column
  public notes: string;

  @Column
  public bmi: string;

  @Column
  @CreatedAt
  public createdAt: Date = new Date();

  @Column
  public email!: string;

  short() {
    return {
      id: this.id,
      email: this.email
    }
  }
}
