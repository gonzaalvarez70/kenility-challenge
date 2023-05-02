import { Injectable, Logger } from '@nestjs/common';
import { InjectAwsService } from 'nest-aws-sdk';
import { S3 } from 'aws-sdk';
import { PutObjectRequest } from 'aws-sdk/clients/s3';

@Injectable()
export class S3ManagerService {
  constructor(@InjectAwsService(S3) private readonly s3: S3) {}

  async upload(file: Express.Multer.File): Promise<S3.ManagedUpload.SendData> {
    const bucketS3 = 'journal';
    return this.uploadS3(file.buffer, bucketS3, file.originalname);
  }

  async uploadS3(
    file: Buffer,
    bucket: string,
    name: string,
  ): Promise<S3.ManagedUpload.SendData> {
    const params: PutObjectRequest = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
    };
    return new Promise((resolve, reject) => {
      this.s3.upload(params, (err, data) => {
        if (err) {
          Logger.error(err);
          reject(err.message);
        }
        Logger.log(`File Uploaded successfully ${data}`);
        resolve(data);
      });
    });
  }
}
