import { common } from './common';
import { logging } from './logging';
import { auth } from './auth';
import { gotenberg } from './gotenberg';

export * from './logging';
export * from './common';
export * from './auth';
export * from './gotenberg';

const modules = [logging, common, auth, gotenberg];

export default modules;
