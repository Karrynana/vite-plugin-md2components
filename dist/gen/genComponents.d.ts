import { PathMap } from './genPathMap';
export declare type GenComponentFn = (html: string) => string;
export declare type ComponentTempalte = 'vue' | 'react' | GenComponentFn;
export declare type ComponentFormat = 'vue' | 'jsx' | string;
/**
 * Generate components
 * @param files
 * @param genComponentDir
 */
declare const _default: (pathMap: PathMap, componentTempalte: ComponentTempalte) => Promise<void>;
export default _default;
