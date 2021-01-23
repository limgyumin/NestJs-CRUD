import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './createPostDto';

export class modifyPostDto extends PartialType(CreatePostDto) {}
