import { jest, describe, expect, test } from '@jest/globals';

// Import library
import { getLogger, Levels, config } from '../src/index';

// Create logger
const logger = getLogger();

// Configure mocks
const mockAction = jest.fn().mockName('mockAction');
config.actions.push(mockAction);

// Helper functions
function expectLogWithParams(level: Levels, message: string) {
  const lastCall = mockAction.mock.calls[mockAction.mock.calls.length - 1];

  expect(lastCall[1]).toBe(level);
  expect(lastCall[3]).toBe(message);
}

function validateLog(threshold: Levels, level: Levels, message: string, callCount: number) {
  if (level >= threshold) {
    expect(mockAction.mock.calls.length).toBe(callCount + 1);
    expectLogWithParams(level, message);
  }
  else {
    expect(mockAction.mock.calls.length).toBe(callCount);
  }
}

// Get testing!
describe('Base tests', () => {
  test('Basic log', () => {
    logger.info('Basic log');
    expectLogWithParams(Levels.INFO, 'Basic log');
    expect(mockAction.mock.calls[mockAction.mock.calls.length - 1][2]).toBe('main');
  });

  test('Named logger', () => {
    const nlog = getLogger('named')
    nlog.info('Named logger');
    expectLogWithParams(Levels.INFO, 'Named logger');
    expect(mockAction.mock.calls[mockAction.mock.calls.length - 1][2]).toBe('named');
  });
});

describe('Test thresholds', () => {
  function testThreshold(threshold: Levels) {
    test(`Threshold ${Levels[threshold]}: Testing trace message`, () => {
      const callCount = mockAction.mock.calls.length;
      config.threshold = threshold;
      logger.trace('this is a trace message');
      validateLog(threshold, Levels.TRACE, 'this is a trace message', callCount);
    });
  
    test(`Threshold ${Levels[threshold]}: Testing debug message`, () => {
      const callCount = mockAction.mock.calls.length;
      config.threshold = threshold;
      logger.debug('this is a debug message');
      validateLog(threshold, Levels.DEBUG, 'this is a debug message', callCount);
    });
  
    test(`Threshold ${Levels[threshold]}: Testing info message`, () => {
      const callCount = mockAction.mock.calls.length;
      config.threshold = threshold;
      logger.info('this is an info message');
      validateLog(threshold, Levels.INFO, 'this is an info message', callCount);
    });
  
    test(`Threshold ${Levels[threshold]}: Testing warning message`, () => {
      const callCount = mockAction.mock.calls.length;
      config.threshold = threshold;
      logger.warn('this is a warning message');
      validateLog(threshold, Levels.WARN, 'this is a warning message', callCount);
    });
  
    test(`Threshold ${Levels[threshold]}: Testing error message`, () => {
      const callCount = mockAction.mock.calls.length;
      config.threshold = threshold;
      logger.error('this is an error message');
      validateLog(threshold, Levels.ERROR, 'this is an error message', callCount);
    });
  
    test(`Threshold ${Levels[threshold]}: Testing fatal message`, () => {
      const callCount = mockAction.mock.calls.length;
      config.threshold = threshold;
      logger.fatal('this is a fatal message');
      validateLog(threshold, Levels.FATAL, 'this is a fatal message', callCount);
    });
  }

  for (let level = Levels.TRACE; level <= Levels.FATAL; level++) {
    testThreshold(level);
  }
});
