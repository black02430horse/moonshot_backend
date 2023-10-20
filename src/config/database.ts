import 'dotenv/config';
import {
  BlogEntity,
  // EmailCertificateEntity,
  // AccountEntity,
  // KYCInfoEntity,
  // VerifyEmailEntity,
  // VerificationEntity,
  // InteractionEntity,
  UserEntity
} from 'entities';
import { DataSourceOptions } from 'typeorm';

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;

export const dbOptions: DataSourceOptions = {
  type: 'mysql',
  host: DB_HOST,
  port: parseInt(DB_PORT ?? '3306'),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  logging: false,
  synchronize: false,
  entities: [
    UserEntity,
    BlogEntity
    // KYCInfoEntity,
    // VerifyEmailEntity,
    // EmailCertificateEntity,
    // AccountEntity,
        // VerificationEntity,
    // InteractionEntity,
  ],
  extra: {
    connectionLimit: 10,
  },
};
