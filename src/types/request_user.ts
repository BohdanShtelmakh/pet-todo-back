import { Request as ExpressRequest } from 'express';
import { User } from 'src/user/entities/user.entity';

export type Request = ExpressRequest & { user: User | undefined };
