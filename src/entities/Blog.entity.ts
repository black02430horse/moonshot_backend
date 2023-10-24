import { Column, Entity } from 'typeorm';

import { CoreEntity } from './Core.entity';
import { BlogButtonType } from 'types';

@Entity({
  name: 'blogs',
})

export class BlogEntity extends CoreEntity {
  @Column({ name: 'image' })
  img: string;

  @Column({ name: 'creator' })
  creator: string;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'content' })
  content: string;

  @Column({ name: 'buttons' })
  buttons: string;
}
