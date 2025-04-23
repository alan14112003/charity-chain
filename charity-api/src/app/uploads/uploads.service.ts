import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { log } from 'console';

@Injectable()
export class UploadsService {
  async uploadSingle(file: Express.Multer.File) {
    const fileUpload = await cloudinary.uploader.upload(file.path, {
      folder: 'uploads',
    });

    return {
      url: fileUpload.url,
    };
  }
}
