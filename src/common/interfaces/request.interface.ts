import { FastifyRequest } from 'fastify';
import { MultipartFile } from 'fastify-multipart';

export interface Request extends FastifyRequest {
  file(): Promise<MultipartFile>;
}
