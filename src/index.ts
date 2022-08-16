import { Plugin } from 'vite';
import { getFilePaths } from './utils';
import genPathMap from './gen/genPathMap';
import genRoutes from './gen/genRoutes';
import genComponents, {
  ComponentTempalte,
  ComponentFormat,
} from './gen/genComponents';

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

export const defaultOptions: Options = {
  mdDir: 'docs',
  isGenRoutes: true,
  isGenComponents: true,
  genDir: 'src/docs',
  routesFileName: 'routes.ts',
  componentTempalte: 'vue',
  componentFormat: 'vue',
};

const run = async ({
  mdDir,
  isGenRoutes,
  isGenComponents,
  genDir,
  routesFileName,
  componentTempalte,
  componentFormat,
}: Options) => {
  const mdFilePaths = await getFilePaths(mdDir);
  const pathMap = genPathMap(mdFilePaths, genDir, componentFormat);

  const tasks = [];
  isGenRoutes && tasks.push(genRoutes(pathMap, `${genDir}/${routesFileName}`));
  isGenComponents && tasks.push(genComponents(pathMap, componentTempalte));
  await Promise.all(tasks);
};

export default (options: Partial<Options> = {}): Plugin => {
  const PLUGIN_NAME = 'vite-plugin-md2web';

  const _option = { ...defaultOptions, ...options };
  const { mdDir, genDir } = _option;

  if (mdDir === genDir) {
    throw new Error(`[${PLUGIN_NAME}]: mdDir and genDir must be different.`);
  }

  const pwd = process.cwd();

  return {
    name: PLUGIN_NAME,
    buildStart: async () => {
      await run(_option);
    },
    handleHotUpdate: async (ctx) => {
      if (ctx.file.includes(`${pwd}/${mdDir}`)) {
        await run(_option);
      }
    },
  };
};
