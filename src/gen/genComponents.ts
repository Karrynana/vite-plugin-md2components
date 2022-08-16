import { promises as fs } from 'fs';
import mdit from 'markdown-it';
import { PathMap } from './genPathMap';
import { writeFile } from '../utils';

export type GenComponentFn = (html: string) => string;
export type ComponentTempalte = 'vue' | 'react' | GenComponentFn;
export type ComponentFormat = 'vue' | 'jsx' | string;

const { readFile } = fs;

const CLASS_NAME = 'markdown-body';

const getGenFn = (genComponent: ComponentTempalte): GenComponentFn => {
  if (genComponent === 'vue') {
    return (html: string): string =>
      `<template>\n<div class="${CLASS_NAME}">\n${html}</div>\n</template>`;
  }
  if (genComponent === 'react') {
    return (html: string): string =>
      `export default () => (<div className="${CLASS_NAME}">\n${html}</div>)`;
  }
  return genComponent;
};

/**
 * Generate components
 * @param files
 * @param genComponentDir
 */
export default async (
  pathMap: PathMap,
  componentTempalte: ComponentTempalte
) => {
  const tasks: Promise<void>[] = [];

  Object.keys(pathMap).forEach((mdPath) => {
    tasks.push(
      (async () => {
        const componentPath = pathMap[mdPath];

        const mdString = await readFile(mdPath, 'utf8');
        const htmlString = mdit().render(mdString);

        const genFn = getGenFn(componentTempalte);
        const componentString = genFn(htmlString);

        await writeFile(componentPath, componentString);
      })()
    );
  });

  await Promise.all(tasks);
};
