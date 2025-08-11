import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function Image({
  src,
  alt,
  className,
  ...props
}: React.ComponentProps<"img">) {
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "https://placehold.co/600";
  };

  return (
    <img
      ref={imageRef}
      src={src}
      alt={alt}
      className={cn(
        "w-full h-full object-cover transition-all duration-700",
        isImageLoaded ? "blur-none" : "blur-md",
        className
      )}
      onError={handleImageError}
      onLoad={() => {
        setIsImageLoaded(true);
      }}
      loading="lazy"
      {...props}
    />
  );
}

Image.displayName = "Image";
