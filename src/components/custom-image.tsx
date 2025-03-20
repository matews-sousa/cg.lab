import { TImage } from "@/types/Scene2DConfig";
import { Image, Transform } from "mafs";
import React from "react";

export default function CustomImage({ image }: { image: TImage }) {
  return (
    <Transform scale={image.scale}>
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image
        href={image.src}
        width={image.width}
        height={image.height}
        x={image.position[0]}
        y={image.position[1]}
        anchor="cc"
      />
    </Transform>
  );
}
