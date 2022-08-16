import { Plugin } from 'vite';
import { ComponentTempalte, ComponentFormat } from './gen/genComponents';
export { MDRoute } from './gen/genRoutes';
export interface Options {
    mdDir: string;
    isGenRoutes: boolean;
    isGenComponents: boolean;
    genDir: string;
    routesFileName: string;
    componentTempalte: ComponentTempalte;
    componentFormat: ComponentFormat;
}
export declare const defaultOptions: Options;
declare const _default: (options?: Partial<Options>) => Plugin;
export default _default;
