import { z } from 'zod';

export const publicStatuses = [
  'DRAFT',
  'NEEDS_USER_INFO',
  'AWAITING_CONFIRMATION',
  'QUEUED',
  'CALLING',
  'WAITING_FOR_BUSINESS',
  'CONFIRMED',
  'COMPLETED',
  'NO_ANSWER',
  'BUSY',
  'CALLBACK_REQUIRED',
  'REJECTED',
  'HUMAN_REVIEW',
  'FAILED',
  'CANCELLED',
] as const;

export const PublicStatusSchema = z.enum(publicStatuses);
export type PublicStatus = z.infer<typeof PublicStatusSchema>;

export const NextActionSchema = z
  .object({
    type: z.enum([
      'PROVIDE_INFORMATION',
      'CONFIRM_REQUEST',
      'WAIT',
      'VIEW_RESULT',
      'CONTACT_SUPPORT',
      'NONE',
    ]),
    description: z.string(),
  })
  .nullable();

export const AssistanceEnvelopeSchema = z.object({
  request_id: z.string().min(1),
  status: PublicStatusSchema,
  is_final: z.boolean(),
  requires_user_action: z.boolean(),
  display_message: z.string().min(1),
  next_action: NextActionSchema,
  updated_at: z.string().datetime({ offset: true }),
});

export type AssistanceEnvelope = z.infer<typeof AssistanceEnvelopeSchema>;

export type AuthContext = {
  subject: string;
  issuer: string;
  scopes: Set<string>;
  token?: string;
};

export type GatewayResponse = AssistanceEnvelope & Record<string, unknown>;

export type AssistanceDraftInput = {
  task_type: 'PHONE_INQUIRY' | 'RESERVATION' | 'RESCHEDULE' | 'CANCELLATION';
  target: {
    name: string;
    phone: string;
    location?: string;
    url?: string;
  };
  goal: string;
  preferred_timing?: string;
  deadline?: string;
  result_language: 'ja' | 'zh-TW' | 'en';
  approved_personal_data: Record<string, string>;
  constraints?: string[];
};

export function isFinalStatus(status: PublicStatus): boolean {
  return [
    'CONFIRMED',
    'COMPLETED',
    'NO_ANSWER',
    'BUSY',
    'REJECTED',
    'FAILED',
    'CANCELLED',
  ].includes(status);
}
