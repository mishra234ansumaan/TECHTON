import * as React from "react";

export type TextareaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  TextareaProps
>(({ className = "", ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={'w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500 resize-none ${className}'}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";