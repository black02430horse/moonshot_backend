import { Request } from 'express';

import { BlogEntity, UserEntity } from 'entities';

export interface AuthRequest<Param, ResBody, ReqBody, ReqQuery>
  extends Request<Param, ResBody, ReqBody, ReqQuery> {
  user?: UserEntity;
}

export interface BlogRequest<Param, ResBody, ReqBody, ReqQuery>
  extends Request<Param, ResBody, ReqBody, ReqQuery> {
  // blog?: BlogEntity;
}
