import { applyDecorators, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiConsumes, ApiBody } from "@nestjs/swagger";
import path from "path";

export function ApiFile(fieldName: string) {
  return applyDecorators(
    UseInterceptors(
      FileInterceptor(fieldName, {
        fileFilter: function (req, file, callback) {
          var ext = path.extname(file.originalname);
          if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
            return callback(new Error("Only images are allowed"), false);
          }
          callback(null, true);
        },
        limits: {
          fileSize: 1024 * 1024,
        },
      })
    ),
    ApiConsumes("multipart/form-data"),
    ApiBody({
      schema: {
        type: "object",
        properties: {
          [fieldName]: {
            type: "string",
            format: "binary",
          },
        },
      },
    })
  );
}
