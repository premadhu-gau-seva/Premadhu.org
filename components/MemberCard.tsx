"use client";

import { useState } from "react";
import Image from "next/image";
import { resolveMemberPhoto } from "@/lib/memberPhotos";

interface MemberCardProps {
  name: string;
  designation: string;
  bio?: string | null;
  photoUrl?: string | null;
}

export default function MemberCard({
  name,
  designation,
  bio,
  photoUrl,
}: MemberCardProps) {
  const initialPhoto = resolveMemberPhoto(name, photoUrl);
  const [imgSrc, setImgSrc] = useState(initialPhoto);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      // Fallback to default avatar on error
      const isFemale =
        /poonam|priyanka|sapna|vidyavati|arti|sunita|devi|kumari/i.test(name);
      setImgSrc(isFemale ? "/female.png" : "/male.png");
    }
  };

  return (
    <div className="bg-white p-6 sm:p-7 rounded-2xl border border-gray-100 hover:border-primary/40 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center flex flex-col items-center group">
      {/* Circular Avatar with primary border */}
      <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-primary mb-5 shadow-inner flex-shrink-0 bg-primary/5">
        <Image
          src={imgSrc}
          alt={name}
          fill
          unoptimized={imgSrc.startsWith("data:")}
          sizes="(max-width: 640px) 112px, 128px"
          className="object-cover group-hover:scale-110 transition-transform duration-300"
          onError={handleError}
        />
      </div>

      {/* Member Name */}
      <h3 className="text-xl font-bold text-text-dark mb-1 group-hover:text-primary transition-colors">
        {name}
      </h3>

      {/* Member Designation */}
      <div className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-wider mb-3">
        {designation}
      </div>

      {/* Member Bio */}
      {bio && (
        <p className="text-text-light text-xs sm:text-sm leading-relaxed">
          {bio}
        </p>
      )}
    </div>
  );
}
