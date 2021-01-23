import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { IResponse } from 'src/interface/response.interface';
import { CreatePostDto } from './model/createPostDto';
import { modifyPostDto } from './model/modifyPostDto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async createPost(@Body() createPostDto: CreatePostDto): Promise<IResponse> {
    await this.postService.createPost(createPostDto);

    return {
      message: '글 생성 성공.',
    };
  }

  @Get()
  async getAllPosts(): Promise<IResponse> {
    const posts = await this.postService.getAllPosts();
    return {
      message: '글 목록 조회 성공.',
      data: posts,
    };
  }

  @Patch('/:idx')
  async modifyPost(
    @Param('idx') postIdx: number,
    @Body() modifyPostDto: modifyPostDto,
  ): Promise<IResponse> {
    await this.postService.modifyPost(postIdx, modifyPostDto);

    return {
      message: '글 수정 성공.',
    };
  }

  @Delete('/:idx')
  async deletePost(@Param('idx') postIdx: number): Promise<IResponse> {
    await this.postService.deletePost(postIdx);

    return {
      message: '글 삭제 성공.',
    };
  }

  @Delete('/remove/:idx')
  async removePost(@Param('idx') postIdx: number): Promise<IResponse> {
    await this.postService.removePost(postIdx);

    return {
      message: '글 영구 삭제 성공.',
    };
  }
}
