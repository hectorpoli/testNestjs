import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Logging, LoggingDocument } from '../../schema/logging.schema';
import { LoggingDto } from '../dto/logging.dto';

@Injectable()
export class LoggingService {
  constructor(
    @InjectModel(Logging.name) private loggingModel: Model<LoggingDocument>,
  ) {}

  async findAll() {
    try {
      return this.loggingModel.find();
    } catch (error) {
      throw new HttpException(
        'Error in find all Logging ' + error,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findCriteria(criteria: FilterQuery<Logging>) {
    try {
      const logging = await this.loggingModel.find(criteria);
      if (!logging) {
        throw new NotFoundException();
      }
      return logging;
    } catch (error) {
      throw new HttpException(
        'Error in find by criteria Logging ' + error,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  create(newData: LoggingDto) {
    try {
      const createdLogging = new this.loggingModel(newData);
      return createdLogging.save();
    } catch (error) {
      throw new HttpException(
        'Error in create Logging ' + error,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
