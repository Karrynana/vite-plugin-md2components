import { getPath } from '../utils';

export type PathMap = Record<string, string>;

export default (
  mdFilePaths: string[],
  genDir: string,
  componentFormat: string
): PathMap => {
  const pathMap = new Map();

  for (const mdFilePath of mdFilePaths) {
    const [parts, path] = getPath(mdFilePath);
    const componentFilePath = `${genDir}/${path}/index.${componentFormat}`;
    pathMap.set(mdFilePath, componentFilePath);
  }

  return Object.fromEntries(pathMap);
};
