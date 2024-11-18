// utils/stringUtils.ts
export function createSlug(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-') // Ganti karakter non-alphanumeric dengan dash
      .replace(/^-+|-+$/g, '')     // Hapus dash di awal dan akhir
      .trim();
  }