import { MistakeRecord, SkillType } from '../types';

const STORAGE_KEY = 'novaprep_mistake_book_v1';

export function getStoredMistakes(): MistakeRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveMistake(record: Omit<MistakeRecord, 'id' | 'timestamp' | 'status'>): MistakeRecord {
  const existing = getStoredMistakes();
  // Check if same question already exists in mistakes
  const duplicate = existing.find(m => m.question === record.question);
  if (duplicate) {
    return duplicate;
  }

  const newRecord: MistakeRecord = {
    ...record,
    id: 'mistake_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
    timestamp: new Date().toISOString(),
    status: 'active',
  };

  const updated = [newRecord, ...existing];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save mistake', e);
  }
  return newRecord;
}

export function markMistakeMastered(id: string): void {
  const existing = getStoredMistakes();
  const updated = existing.map(m => m.id === id ? { ...m, status: 'mastered' as const } : m);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to update mistake', e);
  }
}

export function removeMistake(id: string): void {
  const existing = getStoredMistakes();
  const updated = existing.filter(m => m.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to delete mistake', e);
  }
}
