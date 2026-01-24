import ImageKit from "imagekit";

import { config } from "@/lib/config";

if (!config.imagekit.publicKey || !config.imagekit.privateKey || !config.imagekit.urlEndpoint) {
  throw new Error("Missing ImageKit environment variables");
}

export const imagekit = new ImageKit({
  publicKey: config.imagekit.publicKey,
  privateKey: config.imagekit.privateKey,
  urlEndpoint: config.imagekit.urlEndpoint,
});
