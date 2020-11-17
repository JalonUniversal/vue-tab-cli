import { httpPlugin } from './http';
import { burryPlugin } from './burry';
import { configPlugin } from './config';
import { filtersPlugin } from './filters';
import { busPlugin } from './bus';
import { tabPlugin } from './tab';
import { printPlugin } from './print';
import { dictPlugin } from './dict';

const plugins = [
	configPlugin,
	burryPlugin,
	httpPlugin,
	filtersPlugin,
	busPlugin,
	tabPlugin,
	printPlugin,
	dictPlugin,
];

export { plugins }
