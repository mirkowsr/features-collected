import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

export enum Gender {
  male = 'male',
  female = 'female',
  other = 'other',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ type: 'varchar' })
  firstName!: string

  @Column({ type: 'varchar' })
  lastName!: string

  @Column({ type: 'varchar', unique: true })
  personalId!: string

  @Column({ type: 'integer' })
  age!: number

  @Column({ type: 'enum', enum: Gender })
  gender!: Gender

  @Column({ type: 'varchar' })
  country!: string

  @Column({ type: 'varchar' })
  city!: string

  @Column({ type: 'boolean', default: true })
  isActive!: boolean

  @CreateDateColumn()
  createdAt!: Date
}
