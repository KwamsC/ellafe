import React from "react";

import type { BenefitsStripBlock as BenefitsStripBlockProps } from "@/payload-types";

const icons = {
  diamond: "/benefits-strip/diamond.svg",
  gift: "/benefits-strip/gift.svg",
  handbag: "/benefits-strip/handbag.svg",
  shield: "/benefits-strip/shield-check.svg",
} as const;

const columnClass = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
} as const;

export const BenefitsStripBlock: React.FC<BenefitsStripBlockProps> = ({
  benefits,
}) => {
  const items =
    benefits?.filter((benefit) => benefit.heading && benefit.description) ?? [];

  if (!items.length) return null;

  const columns =
    columnClass[Math.min(items.length, 4) as keyof typeof columnClass];

  return (
    <section className="bg-paper" data-theme="light">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-[13px] px-6 py-5 md:px-12">
        <ul className={`grid grid-cols-1 gap-6 ${columns}`}>
          {items.map((benefit) => (
            <li
              className="flex flex-col items-center gap-2.5 text-center"
              key={benefit.id ?? benefit.heading}
            >
              <img alt="" height={32} src={icons[benefit.icon]} width={32} />
              <div className="flex flex-col gap-1.5">
                <p className="font-sans text-xs font-medium leading-[18px] tracking-[1.2px] text-espresso uppercase">
                  {benefit.heading}
                </p>
                <p className="whitespace-pre-line font-sans text-sm leading-[22px] text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
        {/* <div aria-hidden className="h-px w-full bg-subtle" /> */}
      </div>
    </section>
  );
};
