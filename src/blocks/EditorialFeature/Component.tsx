import React from "react";

import type { EditorialFeatureBlock as EditorialFeatureBlockProps } from "@/payload-types";

import { CMSLink } from "@/components/Link";
import { Media } from "@/components/Media";
import { cn } from "@/utilities/ui";

export const EditorialFeatureBlock: React.FC<EditorialFeatureBlockProps> = ({
  body,
  enableLink,
  eyebrow,
  heading,
  imagePosition,
  link,
  media,
}) => {
  const imageOnLeft = imagePosition === "left";

  return (
    <section
      className="mx-auto w-full max-w-7xl bg-white px-6 lg:px-0"
      data-theme="light"
    >
      <div className="grid lg:min-h-147 lg:grid-cols-2">
        <div
          className={cn(
            "flex flex-col items-start justify-center gap-6 py-10 lg:p-10",
            imageOnLeft ? "order-1 lg:order-2" : "order-1",
          )}
        >
          {eyebrow ? (
            <p className="font-sans text-xs font-medium leading-4.5 tracking-[1.2px] text-muted-foreground uppercase">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="w-full font-display text-[32px] leading-10 text-ink lg:text-[48px] lg:leading-14">
            {heading}
          </h2>
          {body ? (
            <p className="w-full font-sans text-base leading-6.5 text-muted-foreground">
              {body}
            </p>
          ) : null}
          {enableLink && link?.label ? (
            <CMSLink {...link} appearance="outline" className="self-start" />
          ) : null}
        </div>
        <div
          className={cn(
            "relative aspect-424/588 w-full lg:aspect-auto lg:h-full lg:min-h-147",
            imageOnLeft ? "order-2 lg:order-1" : "order-2",
          )}
        >
          {media ? (
            <Media
              fill
              imgClassName="object-cover"
              pictureClassName="absolute inset-0"
              resource={media}
              size="(max-width: 1024px) 100vw, 640px"
            />
          ) : null}
        </div>
      </div>
    </section>
  );
};
