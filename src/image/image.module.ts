import { Module } from '@nestjs/common';
import { FileUploadService } from './image.service';
import { FileUploadController } from './image.controller';

@Module({
  controllers: [FileUploadController],
  providers: [FileUploadService],
})
export class ImageModule { }
