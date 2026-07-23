import { describe, expect, it } from 'vitest';
import {
  checkPublicTaskSupport,
  publicExecutionCapabilities,
} from '../src/publicPolicy.js';

describe('public no-cost policy checks', () => {
  it('declares zero SGH execution credits and no external service call', () => {
    expect(publicExecutionCapabilities.public_query_cost).toEqual({
      sgh_call_credits_consumed: 0,
      sgh_human_credits_consumed: 0,
      external_ai_api_called: false,
      sgh_service_api_called: false,
    });
    expect(publicExecutionCapabilities.repository_entitlement).toMatchObject({
      free_call_credits_included: 0,
      free_human_credits_included: 0,
      free_line_messages_included: 0,
      free_external_ai_api_credits_included: 0,
      grants_line_publish_scope: false,
      grants_liff_or_tenant_access: false,
      grants_execution_consent: false,
    });
  });

  it('routes ordinary reservation support without creating an action', () => {
    const result = checkPublicTaskSupport({
      task_type: 'RESERVATION',
      target_name: 'Test Restaurant',
      target_location: 'Fukuoka',
      goal: 'Check whether a table may be available tomorrow.',
    });
    expect(result).toMatchObject({
      supported: true,
      handling_mode: 'reserve_control_plane',
      checked_without_external_service: true,
      commercial_boundary: {
        free_call_credits_included: 0,
        free_human_credits_included: 0,
      },
    });
  });

  it.each([
    '緊急の症状について診断して',
    'Please diagnose these symptoms from my medical record',
    '急診並查看病歷',
    '응급 증상을 진단해 주세요',
    'Acil belirtilerime teşhis koy',
  ])('fails closed for sensitive or emergency content: %s', (goal) => {
    const result = checkPublicTaskSupport({
      task_type: 'PHONE_INQUIRY',
      target_name: 'Clinic',
      goal,
    });
    expect(result.supported).toBe(false);
    expect(result.handling_mode).toBe('blocked_public_v1');
    expect(result.requires_human).toBe(false);
    expect(result.request_creation_allowed).toBe(false);
    expect(result.execution_eligible).toBe(false);
  });
});
