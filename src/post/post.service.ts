import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from './model/createPostDto';
import { modifyPostDto } from './model/modifyPostDto';
import { Post } from './post.entity';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: PostRepository,
  ) {}

  async createPost(createPostDto: CreatePostDto): Promise<void> {
    const post = this.postRepository.create(createPostDto);

    post.title = createPostDto.title;
    post.description = createPostDto.description;
    post.content = createPostDto.content;

    await this.postRepository.save(post);
  }

  async getPost(idx: number): Promise<Post> {
    const post = await this.postRepository.findByPostIdxByIsDeleted(idx, false);

    if (!post) {
      throw new HttpException(
        {
          message: '존재하지 않는 글',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return post;
  }

  async getAllPosts(): Promise<Post[]> {
    const posts = await this.postRepository.findByIsDeletedOrderByCreatedAtDesc(
      false,
    );
    return posts;
  }

  async modifyPost(idx: number, modifyPostDto: modifyPostDto): Promise<void> {
    const post = await this.postRepository.findByPostIdxByIsDeleted(idx, false);

    if (!post) {
      throw new HttpException(
        {
          message: '존재하지 않는 글',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    post.title = modifyPostDto.title;
    post.description = modifyPostDto.description;
    post.content = modifyPostDto.content;

    post.updated_at = new Date();

    await this.postRepository.save(post);
  }

  async deletePost(idx: number): Promise<void> {
    const post = await this.postRepository.findByPostIdxByIsDeleted(idx, false);

    if (!post) {
      throw new HttpException(
        {
          message: '존재하지 않는 글',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    post.is_deleted = true;

    await this.postRepository.save(post);
  }

  async removePost(idx: number): Promise<void> {
    const post = await this.postRepository.findByPostIdx(idx);

    if (!post) {
      throw new HttpException(
        {
          message: '존재하지 않는 글',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    await this.postRepository.remove(post);
  }
}
