import Levels from './levels';
import config from './config';

const loggers: { [name: string]: Logger } = {};

export class Logger {
  readonly _name: string;

  constructor(name = 'main') {
    this._name = name;
  }

  trace = (msg: string) => this.log(msg, Levels.TRACE);
  debug = (msg: string) => this.log(msg, Levels.DEBUG);
  info  = (msg: string) => this.log(msg, Levels.INFO);
  warn  = (msg: string) => this.log(msg, Levels.WARN);
  error = (msg: string) => this.log(msg, Levels.ERROR);
  fatal = (msg: string) => this.log(msg, Levels.FATAL);

  log(message: string, level = Levels.TRACE) {
    const timestamp = new Date();

    if (level >= config.threshold) {
      for (let i = 0; i < config.actions.length; i++) {
        config.actions[i](timestamp, level, this._name, message);
      }
    }
  }
}

export function getLogger(name = 'main') {
  if (!loggers[name]) {
    loggers[name] = new Logger(name);
  }

  return loggers[name];
}

export { default as Levels } from './levels';
export { default as config } from './config';