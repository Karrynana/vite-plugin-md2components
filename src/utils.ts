import { promises as fs } from 'fs';

const { readdir, stat, mkdir, writeFile: wf } = fs;

/**
 * @description Get all files in a directory
 * @param rootDir
 * @returns
 */
export const getFilePaths = async (rootDir: string): Promise<string[]> => {
  const files: string[] = [];
  const queue = [rootDir];

  while (queue.length) {
    const currentDir = queue.shift();
    if (!currentDir) continue;
    const dirContents = await readdir(currentDir);
    for (const file of dirContents) {
      const fullPath = `${currentDir}/${file}`;
      const stats = await stat(fullPath);
      if (stats.isDirectory()) {
        queue.push(fullPath);
      } else if (
        stats.isFile() &&
        (file.endsWith('.MD') || file.endsWith('.md'))
      ) {
        files.push(fullPath);
      }
    }
  }

  return files;
};

/**
 * @description Get generated components path from original md file path
 */
export const getPath = (file: string): [string[], string] => {
  const parts = file.split(/\/|\./).slice(1, -1);
  const path = parts.join('/');

  return [parts, path];
};

/**
 * @description write file to target path
 * @param file
 * @param content
 */
export const writeFile = async (file: string, content: string) => {
  const dir = file.split('/').slice(0, -1).join('/');
  await mkdir(dir, { recursive: true });
  await wf(file, content);
};
