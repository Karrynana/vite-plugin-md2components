import { PathMap } from './genPathMap';
import { getPath, writeFile } from '../utils';

export interface MDRoute {
  path: string;
  component: () => void;
  mdPath: string;
  componentPath: string;
}

/**
 * Generate the routes file
 * @param files
 * @param targetFile
 */
export default async (pathMap: PathMap, routesFilePath: string) => {
  const routes: string[] = Object.keys(pathMap).map((mdPath) => {
    const componentPath = pathMap[mdPath];
    const [parts, path] = getPath(mdPath);
    return `{ path: '/${path}', component: () => import('/${componentPath}'), mdPath: '${mdPath}', componentPath: '${componentPath}'}`;
  });

  const routesFileString = `export default [${routes.join(',')}];`;
  await writeFile(routesFilePath, routesFileString);
};
