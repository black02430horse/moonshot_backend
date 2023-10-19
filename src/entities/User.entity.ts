import { Column, Entity } from 'typeorm';

import { CoreEntity } from './Core.entity';

@Entity({
  name: 'users',
})

export class UserEntity extends CoreEntity {
  @Column({ name: 'user_name' })
  userName: string;

  @Column({ name: 'user_email' })
  userEmail: string;

  @Column({ name: 'user_password' })
  userPassword: string;
}
