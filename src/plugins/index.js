import { httpPlugin } from './http';
import { burryPlugin } from './burry';
import { configPlugin } from './config';
import { filtersPlugin } from './filters';
import { busPlugin } from './bus';
import { tabPlugin } from './tab';
import { storagePlugin } from './storage';

const plugins = [
	configPlugin,
	burryPlugin,
	httpPlugin,
	filtersPlugin,
	busPlugin,
	tabPlugin,
  storagePlugin,
];

export { plugins }
