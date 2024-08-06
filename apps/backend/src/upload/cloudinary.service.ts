import { Injectable, Inject } from "@nestjs/common";
import { v2, UploadApiErrorResponse, UploadApiResponse } from "cloudinary";
import { Readable } from "stream";
import { v4 as uuidv4 } from "uuid";

function generateUniqueFilename(
  filename: string
): { fileName: string; fileNameWithExtension: string } {
  const extension = filename.split(".").pop();
  const uniqueId = uuidv4();
  return {
    fileName: `${filename.split(".")[0]}_${uniqueId}`,
    fileNameWithExtension: `${filename.split(".")[0]}_${uniqueId}.${extension}`,
  };
}

@Injectable()
export class CloudinaryService {
  constructor(@Inject("CLOUDINARY") private cloudinary) {}

  async uploadImage(
    file: Express.Multer.File,
    folder?: string
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    const uniqueFulename = generateUniqueFilename(file.filename);

    return new Promise((resolve, reject) => {
      v2.uploader
        .upload_stream(
          {
            folder: folder ? `events/${folder}` : "events",
            public_id: uniqueFulename.fileName,
            filename_override: uniqueFulename.fileNameWithExtension,
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        )
        .end(file.buffer);
    });
  }

  async uploadStream(
    createReadStream: () => Readable,
    filename: string,
    folder: String
  ): Promise<UploadApiResponse> {
    console.log("File Name", filename);
    const uniqueFulename = generateUniqueFilename(filename);
    return new Promise((resolve, reject) => {
      const stream = v2.uploader.upload_stream(
        {
          folder: folder ? `events/${folder}` : "events",
          public_id: uniqueFulename.fileName,
          filename_override: uniqueFulename.fileNameWithExtension,
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      createReadStream().pipe(stream);
    });
  }

  async deleteFile(fileUrl: string) {
    const parts = fileUrl.split("/");
    const public_id_with_extension = parts[parts.length - 1];

    const public_id = public_id_with_extension.split(".")[0];

    const path = parts.slice(-3, -1).join("/");
    const full_public_id = `${path}/${public_id}`;

    console.log("full_public_idf", full_public_id);

    return new Promise((resolve, reject) => {
      v2.uploader.destroy(full_public_id, {}, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  }
}
