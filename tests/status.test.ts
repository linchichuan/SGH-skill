import { describe, expect, it } from 'vitest';
import { makeEnvelope, toPublicStatus } from '../src/status.js';

describe('public status mapping', () => {
  it.each([
    ['READY_FOR_CONFIRMATION', 'AWAITING_CONFIRMATION'],
    ['CALL_QUEUED', 'QUEUED'],
    ['EXECUTING', 'CALLING'],
    ['CALLBACK_EXPECTED', 'CALLBACK_REQUIRED'],
    ['SUCCEEDED', 'COMPLETED'],
    ['CONFIRMED', 'CONFIRMED'],
  ] as const)('maps %s to %s', (internal, expected) => {
    expect(toPublicStatus(internal)).toBe(expected);
  });

  it('does not describe queued work as confirmed', () => {
    const envelope = makeEnvelope({ requestId: 'req_123', internalStatus: 'CALL_QUEUED' });
    expect(envelope.status).toBe('QUEUED');
    expect(envelope.is_final).toBe(false);
    expect(envelope.display_message).toContain('予約完了ではありません');
  });

  it('keeps payment waiting distinct from ordinary confirmation', () => {
    const envelope = makeEnvelope({
      requestId: 'req_payment',
      internalStatus: 'AWAITING_PAYMENT',
    });
    expect(envelope.status).toBe('AWAITING_CONFIRMATION');
    expect(envelope.requires_user_action).toBe(true);
    expect(envelope.display_message).toContain('有料利用資格');
    expect(envelope.next_action?.type).toBe('CONTACT_SALES');
  });

  it('fails unknown internal states into human review', () => {
    expect(toPublicStatus('PROVIDER_NEW_STATE')).toBe('HUMAN_REVIEW');
  });
});
