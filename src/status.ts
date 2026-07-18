import type { AssistanceEnvelope, PublicStatus } from './contracts.js';
import { isFinalStatus } from './contracts.js';

const INTERNAL_STATUS_MAP: Record<string, PublicStatus> = {
  DRAFT: 'DRAFT',
  MISSING_INFO: 'NEEDS_USER_INFO',
  INTAKE_INCOMPLETE: 'NEEDS_USER_INFO',
  READY_FOR_CONFIRMATION: 'AWAITING_CONFIRMATION',
  AWAITING_USER_CONFIRMATION: 'AWAITING_CONFIRMATION',
  AWAITING_PAYMENT: 'AWAITING_CONFIRMATION',
  READY_TO_EXECUTE: 'QUEUED',
  READY_TO_CALL: 'QUEUED',
  SCHEDULED: 'QUEUED',
  CALL_QUEUED: 'QUEUED',
  EXECUTING: 'CALLING',
  CALLING: 'CALLING',
  WAITING_EXTERNAL: 'WAITING_FOR_BUSINESS',
  CALLBACK_EXPECTED: 'CALLBACK_REQUIRED',
  WAITING_USER: 'NEEDS_USER_INFO',
  RETRY_SCHEDULED: 'WAITING_FOR_BUSINESS',
  HUMAN_REVIEW: 'HUMAN_REVIEW',
  NEEDS_OPERATOR: 'HUMAN_REVIEW',
  SUCCEEDED: 'COMPLETED',
  CONFIRMED: 'CONFIRMED',
  PARTIALLY_SUCCEEDED: 'COMPLETED',
  NO_ANSWER: 'NO_ANSWER',
  BUSY: 'BUSY',
  REJECTED: 'REJECTED',
  FAILED: 'FAILED',
  CANCELLED: 'CANCELLED',
};

export function toPublicStatus(internalStatus: string): PublicStatus {
  return INTERNAL_STATUS_MAP[internalStatus] ?? 'HUMAN_REVIEW';
}

export function makeEnvelope(input: {
  requestId: string;
  internalStatus: string;
  message?: string;
  updatedAt?: string;
  requiresUserAction?: boolean;
}): AssistanceEnvelope {
  const status = toPublicStatus(input.internalStatus);
  const requiresUserAction =
    input.requiresUserAction ??
    ['NEEDS_USER_INFO', 'AWAITING_CONFIRMATION'].includes(status);

  return {
    request_id: input.requestId,
    status,
    is_final: isFinalStatus(status),
    requires_user_action: requiresUserAction,
    display_message: input.message || defaultMessage(status),
    next_action: nextAction(status, requiresUserAction),
    updated_at: input.updatedAt || new Date().toISOString(),
  };
}

function defaultMessage(status: PublicStatus): string {
  const messages: Record<PublicStatus, string> = {
    DRAFT: '依頼の下書きを作成しました。電話はまだ実行されていません。',
    NEEDS_USER_INFO: '実行前に追加情報が必要です。',
    AWAITING_CONFIRMATION: '内容と費用を確認してください。電話はまだ実行されていません。',
    QUEUED: '確認済みの依頼を実行待ちとして登録しました。予約完了ではありません。',
    CALLING: 'SGHが対象事業者へ連絡しています。',
    WAITING_FOR_BUSINESS: '対象事業者からの回答または再連絡を待っています。',
    CONFIRMED: '対象事業者から確認済みの結果を受け取りました。',
    COMPLETED: '依頼が完了しました。結果を確認してください。',
    NO_ANSWER: '対象事業者が電話に出ませんでした。',
    BUSY: '対象事業者の電話が話し中でした。',
    CALLBACK_REQUIRED: '対象事業者からの折り返しまたは再確認が必要です。',
    REJECTED: '対象事業者が依頼を受け付けませんでした。',
    HUMAN_REVIEW: 'SGHスタッフによる確認が必要です。',
    FAILED: '依頼を完了できませんでした。',
    CANCELLED: '実行前の依頼をキャンセルしました。',
  };
  return messages[status];
}

function nextAction(status: PublicStatus, userAction: boolean): AssistanceEnvelope['next_action'] {
  if (status === 'NEEDS_USER_INFO') {
    return { type: 'PROVIDE_INFORMATION', description: '不足している情報を入力してください。' };
  }
  if (status === 'AWAITING_CONFIRMATION') {
    return { type: 'CONFIRM_REQUEST', description: '対象、目的、共有情報、費用を確認してください。' };
  }
  if (['CONFIRMED', 'COMPLETED'].includes(status)) {
    return { type: 'VIEW_RESULT', description: '確認済みの結果と次の手順を確認してください。' };
  }
  if (['FAILED', 'HUMAN_REVIEW'].includes(status)) {
    return { type: 'CONTACT_SUPPORT', description: 'SGHスタッフの確認を待つか、サポートへ連絡してください。' };
  }
  if (!isFinalStatus(status)) {
    return { type: 'WAIT', description: 'しばらくしてから進捗を再確認してください。' };
  }
  return userAction ? { type: 'CONTACT_SUPPORT', description: 'SGHへ連絡してください。' } : null;
}
