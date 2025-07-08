import { join } from "path";
import { PUBLIC_DIR } from "src/config/global.constants";

export const musicFileStaticRoot = '/music';
export const musicFilePath = join(PUBLIC_DIR, musicFileStaticRoot);
