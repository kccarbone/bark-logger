import Levels from './levels';
import actions from './actions';

const globalKey = 'BARK_LOGGER_CONFIG';
const env = process?.env ?? {};

class Config {
  threshold = env.LOGLEVEL ?? Levels.INFO;
  actions = [...actions];
}

// Create a singleton instance of config object so that 
// settings can be shared (and controlled) across all 
// instances, even between different modules
if (typeof (global as any)[globalKey] === 'undefined') {
  (global as any)[globalKey] = new Config();
}

export default (global as any)[globalKey] as Config;