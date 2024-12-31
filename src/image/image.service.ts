import { Injectable } from '@nestjs/common';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join, extname } from 'path';

@Injectable()
export class FileUploadService {
  private readonly uploadFolder = './uploads';
  private readonly baseUrl = 'http://localhost:3001/uploads';

  constructor() {
    this.ensureUploadFolderExists();
  }

  private async ensureUploadFolderExists() {
    if (!existsSync(this.uploadFolder)) {
      await mkdir(this.uploadFolder, { recursive: true });
    }
  }

  async saveFile(file: Express.Multer.File): Promise<{ name: string; url: string }> {
    const uniqueId = `${Date.now()}-${Math.floor(Math.random() * 10e64)}`;
    const fileExtension = extname(file.originalname);

    const uniqueFileName = `${uniqueId}${fileExtension}`;
    const filePath = join(this.uploadFolder, uniqueFileName);

    await writeFile(filePath, file.buffer);

    return {
      name: uniqueFileName,
      url: `${this.baseUrl}/${uniqueFileName}`,
    };
  }
}
