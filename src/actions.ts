import Levels from './levels';

type LogAction = (timestamp: Date, level: Levels, name: string, message: string) => void;

/* Basic console logger */
const printToConsole: LogAction = (timestamp: Date, level: Levels, name: string, message: string) => {
  const color = [
    { label: 'TRACE', fg: 90, bg: 49 },
    { label: 'DEBUG', fg: 36, bg: 49 },
    { label: 'INFO ', fg: 37, bg: 49 },
    { label: 'WARN ', fg: 30, bg: 103, accent: 93 },
    { label: 'ERROR', fg: 30, bg: 101, accent: 91 },
    { label: 'FATAL', fg: 30, bg: 105, accent: 95 }
  ][level];

  const two = (num: number) => `0${num.toString()}`.slice(-2);
  const style = (str: string, ...codes: string[]) => `\x1b[${codes.join(';')}m${str}\x1b[0m`;
  const timeString = `${two(timestamp.getHours())}:${two(timestamp.getMinutes())}:${two(timestamp.getSeconds())}`;

  console.log(''
    + style(`[${timeString}] `, (color.accent ?? 39).toString())
    + style(`${color.label}`, color.fg.toString(), color.bg.toString())
    + style((name ? ` (${name}) ` : ' '), (color.accent ?? 90).toString())
    + style(`${message}`, '39', '49')
  );
}

export default [
  printToConsole
] as LogAction[];

