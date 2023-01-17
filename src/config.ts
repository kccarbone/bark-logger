import Levels from './levels';
import actions from './actions';

const globalContext = globalThis as any;
const globalKey = 'BARK_LOGGER_CONFIG';
const env = (typeof process === 'object') ? process.env ?? {} : {};

class Config {
  threshold = env.LOGLEVEL ?? Levels.INFO;
  actions = [...actions];
}

// Create a singleton instance of config object so that 
// settings can be shared (and controlled) across all 
// instances, even between different modules
if (typeof globalContext[globalKey] === 'undefined') {
  Object.defineProperty(globalContext, globalKey, {
    value: new Config(),
    enumerable: false,
    configurable: false,
    writable: false
  });
}

export default globalContext[globalKey] as Config;