import { UserProfile } from "@/types/auth";

export const AUTH_KEYS = {
  TOKEN: "stockio_token",
  USER: "stockio_user",
} as const;

export function getStoredUser(): UserProfile | null {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const token = localStorage.getItem(AUTH_KEYS.TOKEN);
    const userStr = localStorage.getItem(AUTH_KEYS.USER);
    if (!token || !userStr) {
      return null;
    }
    return JSON.parse(userStr) as UserProfile;
  } catch {
    return null;
  }
}

export function saveSession(token: string, user: UserProfile): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(AUTH_KEYS.TOKEN, token);
    localStorage.setItem(AUTH_KEYS.USER, JSON.stringify(user));
  } catch {
    // noop se localStorage estiver bloqueado
  }
}

export function clearSession(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(AUTH_KEYS.TOKEN);
    localStorage.removeItem(AUTH_KEYS.USER);
  } catch {
    // noop
  }
}
