export const PUBLIC_EXECUTION_POLICY_VERSION = 'sgh-mcp-public-policy-2026-07-22.v1';

export const publicExecutionCapabilities = Object.freeze({
  policy_version: PUBLIC_EXECUTION_POLICY_VERSION,
  last_verified_at: '2026-07-22',
  scope: 'phase_1_paid_phone_and_ordinary_reservation_execution',
  full_sgh_service_catalog: false,
  tasks: ['PHONE_INQUIRY', 'RESERVATION', 'RESCHEDULE', 'CANCELLATION'],
  languages: ['ja', 'zh-TW', 'en'],
  service_area: 'Japan',
  execution: {
    RESERVATION: 'reserve_control_plane',
    PHONE_INQUIRY: 'human_review_phase_1',
    RESCHEDULE: 'human_review_phase_1',
    CANCELLATION: 'human_review_phase_1',
  },
  fee_policy: {
    currency: 'JPY',
    amount: null,
    requires_request_bound_quote: true,
  },
  public_query_cost: {
    sgh_call_credits_consumed: 0,
    sgh_human_credits_consumed: 0,
    external_ai_api_called: false,
    sgh_service_api_called: false,
  },
  repository_entitlement: {
    free_call_credits_included: 0,
    free_human_credits_included: 0,
    free_line_messages_included: 0,
    free_external_ai_api_credits_included: 0,
    grants_line_publish_scope: false,
    grants_liff_or_tenant_access: false,
    grants_execution_consent: false,
  },
  exclusions: [
    'emergency response',
    'medical diagnosis or treatment advice',
    'legal representation',
    'payment card or authentication secret collection',
    'impersonation, harassment, fraud, or guaranteed outcomes',
  ],
});

export type PublicSupportCheckInput = {
  task_type: 'PHONE_INQUIRY' | 'RESERVATION' | 'RESCHEDULE' | 'CANCELLATION';
  target_name: string;
  target_location?: string;
  goal: string;
};

const sensitiveOrEmergencyPattern =
  /緊急|救急|診断|症状|病歴|emergency|urgent|diagnos|symptom|medical record|急診|緊急|診斷|症狀|病歷|응급|긴급|진단|증상|병력|acil|teşhis|tanı|belirti|tıbbi kayıt/i;

export function checkPublicTaskSupport(input: PublicSupportCheckInput) {
  const sensitive = sensitiveOrEmergencyPattern.test(input.goal);
  return {
    policy_version: PUBLIC_EXECUTION_POLICY_VERSION,
    checked_without_external_service: true,
    supported: !sensitive,
    handling_mode:
      sensitive
        ? 'blocked_public_v1'
        : input.task_type === 'RESERVATION'
        ? 'reserve_control_plane'
        : 'human_review_phase_1',
    missing_fields: [],
    requires_human: !sensitive && input.task_type !== 'RESERVATION',
    request_creation_allowed: !sensitive,
    execution_eligible: false,
    reason: sensitive
      ? 'Public Japan Call v1 does not accept emergency or sensitive medical content.'
      : 'The task may be prepared for SGH review. This check does not create a request, quote, call, booking, or human task.',
    commercial_boundary: {
      execution_requires_request_bound_quote: true,
      free_call_credits_included: 0,
      free_human_credits_included: 0,
    },
  };
}
