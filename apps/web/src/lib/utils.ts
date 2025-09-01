import { getStorageItem, StorageKeys } from '@/src/lib/storage';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDexNo(n: number) {
  return `#${String(n).padStart(3, '0')}`;
}

export function useUser() {
  const raw = getStorageItem(StorageKeys.User);
  return raw ? JSON.parse(raw) : null;
}
