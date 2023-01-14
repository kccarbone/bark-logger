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