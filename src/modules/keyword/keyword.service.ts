import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { KeywordDto } from './dto';
import { KeywordEntity } from './entity';
import { UserEntity } from '../user/entity';
import { ErrorMessageEnum } from '../../core/enum';
import { ResponseMessage } from '../../core/common/interface';
import { throwHttpException } from '../../core/utils';

@Injectable()
export class KeywordService {
  constructor(
    @InjectRepository(KeywordEntity)
    private keywordRepository: Repository<KeywordEntity>,
  ) {}
  public async addKeyword(
    addKeywordDto: KeywordDto,
    user: UserEntity,
  ): Promise<ResponseMessage> {
    try {
      const existingKeyword = await this.keywordRepository.findOneBy({
        keyword: addKeywordDto.keyword,
      });

      if (existingKeyword) {
        throwHttpException(
          ErrorMessageEnum.KEYWORD_ALREADY_EXISTS,
          HttpStatus.CONFLICT,
        );
      }

      const keyword = await this.keywordRepository.save({
        keyword: addKeywordDto.keyword,
        userId: user.id,
      });

      return {
        message: `Keyword "${keyword.keyword}" successfully created.`,
        status: HttpStatus.CREATED,
      };
    } catch (e) {
      throwHttpException(
        e.message ? e.message : ErrorMessageEnum.ADD_KEYWORD_FAILED,
        e.status ? e.status : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async deleteKeyword(
    id: number,
    user: UserEntity,
  ): Promise<ResponseMessage> {
    try {
      const keyword = await this.keywordRepository.findOneBy({
        id: id,
        userId: user.id,
      });

      if (!keyword) {
        throwHttpException(
          ErrorMessageEnum.KEYWORD_NOT_FOUND,
          HttpStatus.BAD_REQUEST,
        );
      }

      await this.keywordRepository.delete({
        id: id,
        userId: user.id,
      });

      return {
        message: `Keyword with id (${id}) successfully deleted.`,
        status: HttpStatus.ACCEPTED,
      };
    } catch (e) {
      throwHttpException(
        e.message ? e.message : ErrorMessageEnum.DELETE_KEYWORD_FAILED,
        e.status ? e.status : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async updateKeyword(
    id: number,
    updateKeywordDto: KeywordDto,
    user: UserEntity,
  ): Promise<ResponseMessage> {
    try {
      const keyword = await this.keywordRepository.findOneBy({
        id: id,
        userId: user.id,
      });

      if (!keyword) {
        throwHttpException(
          ErrorMessageEnum.KEYWORD_NOT_FOUND,
          HttpStatus.BAD_REQUEST,
        );
      }

      await this.keywordRepository.save({
        ...keyword,
        keyword: updateKeywordDto.keyword,
      });

      return {
        message: `Keyword with id (${id}) successfully updated.`,
        status: HttpStatus.OK,
      };
    } catch (e) {
      throwHttpException(
        ErrorMessageEnum.UPDATE_KEYWORD_FAILED,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
