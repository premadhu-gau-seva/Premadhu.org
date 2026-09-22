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

  // 2. Check exact name match in known photos
  const cleanName = (name || "").trim();
  if (KNOWN_MEMBER_PHOTOS[cleanName]) {
    return KNOWN_MEMBER_PHOTOS[cleanName];
  }

  // 3. Check partial / case-insensitive keyword match in known photos
  const lowerName = cleanName.toLowerCase();
  for (const [key, path] of Object.entries(KNOWN_MEMBER_PHOTOS)) {
    const lowerKey = key.toLowerCase();
    if (lowerName.includes(lowerKey) || lowerKey.includes(lowerName)) {
      return path;
    }
  }

  // Common nicknames / partial names
  if (lowerName.includes("ajay")) return "/Ajay Bajwa.jpeg";
  if (lowerName.includes("poonam")) return "/Poonam.jpeg";
  if (lowerName.includes("priyanka")) return "/Priyanka.jpeg";
  if (lowerName.includes("sapna")) return "/Sapna.jpeg";
  if (lowerName.includes("lalit")) return "/Lalit.jpeg";
  if (lowerName.includes("shrivastav")) return "/Amit Shrivastav.jpeg";
  if (lowerName.includes("nigam")) return "/Amit.jpeg";
  if (lowerName.includes("rajesh") || lowerName.includes("rakesh")) return "/Rakesh.jpeg";
  if (lowerName.includes("vidyavati")) return "/Vidyavati.jpeg";
  if (lowerName.includes("atul") || lowerName.includes("pandey")) return "/Atul Pandey ji.jpeg";
  if (lowerName.includes("pushpendra")) return "/Pushpendra.jpeg";
  if (lowerName.includes("arti")) return "/Arti.jpeg";

  // 4. Default avatar based on gender guess
  const isFemale = FEMALE_KEYWORDS.some((kw) => lowerName.includes(kw));
  return isFemale ? "/female.png" : "/male.png";
}
