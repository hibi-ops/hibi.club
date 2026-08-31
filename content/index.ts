import { en } from './en';
import { zh } from './zh';
import type { Dict } from './types';
import type { Lang } from './site';

export const dict: Record<Lang, Dict> = { en, zh };
export function getDict(lang: Lang): Dict { return dict[lang] ?? en; }
export * from './site';
export type { Dict } from './types';
