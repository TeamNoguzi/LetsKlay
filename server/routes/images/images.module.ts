import { Module } from "@nestjs/common";
import { ImagesController } from "./images.controller";
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { v4 as uuidv4 } from "uuid";

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: function (req, file, cb) {
          cb(null, "./uploads");
        },
        filename: function (req, file, cb) {
          const fileId = uuidv4();
          const ext = file.originalname.split(".")[file.originalname.split(".").length - 1];
          cb(null, fileId + "." + ext);
        },
      }),
    }),
  ],
  controllers: [ImagesController],
  providers: [],
})
export class ImagesModule {}
