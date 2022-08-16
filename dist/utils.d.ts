/**
 * @description Get all files in a directory
 * @param rootDir
 * @returns
 */
export declare const getFilePaths: (rootDir: string) => Promise<string[]>;
/**
 * @description Get generated components path from original md file path
 */
export declare const getPath: (file: string) => [string[], string];
/**
 * @description write file to target path
 * @param file
 * @param content
 */
export declare const writeFile: (file: string, content: string) => Promise<void>;
