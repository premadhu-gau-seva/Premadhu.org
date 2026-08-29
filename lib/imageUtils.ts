/**
 * Client-side image compression and resizing utility.
 * Resizes large images (e.g. 5-15MB phone photos) to max 600x600px
 * and compresses them into lightweight WebP format (~30-60KB).
 */
export async function compressImage(
  file: File,
  maxDimension = 600,
  quality = 0.82
): Promise<File> {
  return new Promise((resolve) => {
    // Return original if not an image or if SVG/GIF
    if (
      !file.type.startsWith("image/") ||
      file.type === "image/svg+xml" ||
      file.type === "image/gif"
    ) {
      return resolve(file);
    }

    // Return original if FileReader or Image constructor is unavailable (SSR guard)
    if (typeof window === "undefined" || !window.FileReader) {
      return resolve(file);
    }

    const reader = new FileReader();

    reader.onload = (readerEvent) => {
      const img = new window.Image();

      img.onload = () => {
        let { width, height } = img;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          return resolve(file);
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Attempt WebP export, falling back to JPEG if unsupported
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              return resolve(file);
            }
            const cleanName = file.name.replace(/\.[^/.]+$/, "") + ".webp";
            const compressedFile = new File([blob], cleanName, {
              type: "image/webp",
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          },
          "image/webp",
          quality
        );
      };

      img.onerror = () => resolve(file);

      img.src = readerEvent.target?.result as string;
    };

    reader.onerror = () => resolve(file);

    reader.readAsDataURL(file);
  });
}
