/**
 * Utility to resolve member photo URLs.
 * Handles database photo_url (Blob/remote/local), matches with known public photos,
 * and falls back to gender-appropriate or default avatars.
 */

export const KNOWN_MEMBER_PHOTOS: Record<string, string> = {
  "शिव साधक अतुल पांडेय जी महाराज": "/Atul Pandey ji.jpeg",
  "Priyanka Tiwari": "/Priyanka.jpeg",
  "Sapna Nigam": "/Sapna.jpeg",
  "Lalit Tiwari": "/Lalit.jpeg",
  "Amit Kumar Shrivastav": "/Amit Shrivastav.jpeg",
  "Dr Amit Nigam": "/Amit.jpeg",
  "Ajay Bajwa": "/Ajay Bajwa.jpeg",
  "Poonam S": "/Poonam.jpeg",
  "Rajesh Tiwari": "/Rakesh.jpeg",
  "Vidyavati Tiwari": "/Vidyavati.jpeg",
  "Pushpendra": "/Pushpendra.jpeg",
  "Arti": "/Arti.jpeg",
};

const FEMALE_KEYWORDS = [
  "poonam",
  "priyanka",
  "sapna",
  "vidyavati",
  "arti",
  "sunita",
  "mrs",
  "shrimati",
  "devi",
  "kumari",
];

export function resolveMemberPhoto(
  name: string,
  photoUrl?: string | null
): string {
  // 1. If photoUrl is explicitly provided and non-empty
  if (photoUrl && photoUrl.trim().length > 0) {
    const trimmed = photoUrl.trim();
    if (
      trimmed.startsWith("http://") ||
      trimmed.startsWith("https://") ||
      trimmed.startsWith("/") ||
      trimmed.startsWith("data:")
    ) {
      return trimmed;
    }
    return `/${trimmed}`;
  }

  const cleanName = (name || "").trim();
  const lowerName = cleanName.toLowerCase();

  // 2. Check exact or case-insensitive match in known photos
  for (const [key, path] of Object.entries(KNOWN_MEMBER_PHOTOS)) {
    if (cleanName === key || lowerName === key.toLowerCase()) {
      return path;
    }
  }

  // 3. Strict full-name / specific alias matching (word boundary only)
  if (/\bajay\s+bajwa\b/i.test(cleanName)) return "/Ajay Bajwa.jpeg";
  if (/\bpoonam(\s+s)?\b/i.test(cleanName)) return "/Poonam.jpeg";
  if (/\bpriyanka\s+tiwari\b/i.test(cleanName)) return "/Priyanka.jpeg";
  if (/\bsapna\s+nigam\b/i.test(cleanName)) return "/Sapna.jpeg";
  if (/\blalit\s+tiwari\b/i.test(cleanName)) return "/Lalit.jpeg";
  if (/\bamit(\s+kumar)?\s+shrivastav\b/i.test(cleanName)) return "/Amit Shrivastav.jpeg";
  if (/\b(dr\s+)?amit\s+nigam\b/i.test(cleanName)) return "/Amit.jpeg";
  if (/\b(rajesh|rakesh)\s+tiwari\b/i.test(cleanName)) return "/Rakesh.jpeg";
  if (/\bvidyavati\s+tiwari\b/i.test(cleanName)) return "/Vidyavati.jpeg";
  if (/\batul\s+pandey\b/i.test(cleanName)) return "/Atul Pandey ji.jpeg";
  if (/^pushpendra(\s+tiwari)?$/i.test(cleanName)) return "/Pushpendra.jpeg";
  if (/^(arti|aarti)(\s+tiwari)?$/i.test(cleanName)) return "/Arti.jpeg";

  // 4. Default avatar based on gender guess (using word boundaries)
  const isFemale = FEMALE_KEYWORDS.some((kw) =>
    new RegExp(`\\b${kw}\\b`, "i").test(cleanName)
  );
  return isFemale ? "/female.png" : "/male.png";
}
