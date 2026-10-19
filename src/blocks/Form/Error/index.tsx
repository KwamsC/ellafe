"use client";

import * as React from "react";
import { useFormContext } from "react-hook-form";

export const Error = ({ name }: { name: string }) => {
  const {
    formState: { errors },
  } = useFormContext();
  return (
    <p className="font-sans text-xs leading-4.5 text-error">
      {(errors[name]?.message as string) || "This field is required"}
    </p>
  );
};
