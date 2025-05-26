import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPasswordToUser1748253661333 implements MigrationInterface {
  name = 'AddPasswordToUser1748253661333';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD COLUMN "password" character varying(20) NULL`,
    );
    await queryRunner.query(
      `UPDATE users SET password=username where password IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE users ALTER COLUMN password SET NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
  }
}
