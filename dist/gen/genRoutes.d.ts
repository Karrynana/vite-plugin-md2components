import { PathMap } from './genPathMap';
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
declare const _default: (pathMap: PathMap, routesFilePath: string) => Promise<void>;
export default _default;
