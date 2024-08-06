import { v2 as Cloudinary } from "cloudinary";

export const CloudinaryProvider = {
  provide: "CLOUDINARY",
  useFactory: () => {
    return Cloudinary.config({
      cloud_name: "edufeed",
      api_key: "976338652162996",
      api_secret: "pkSVKAFctmYkaLsCeZqRxia3hZo",
    });
  },
};
