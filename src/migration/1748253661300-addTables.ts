import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTables1748253661300 implements MigrationInterface {
  name = 'AddTables1748253661300';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" (
        id SERIAL PRIMARY KEY,
        username varchar(50) NOT NULL
      );
      `,
    );
    await queryRunner.query(
      `CREATE TABLE "todos" (
        id SERIAL PRIMARY KEY,
        userId INTEGER,
        description varchar(100),
        completed boolean,
        FOREIGN KEY (userId) REFERENCES users(id)
      );
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
  }
}
