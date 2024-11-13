"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/app/_lib/utils";
import { useState } from "react";

interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  valueInMoney: number;
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, valueInMoney, ...props }, ref) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative w-full">
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(
          "relative h-4 w-full overflow-hidden rounded-full bg-white bg-opacity-[3%]",
          className,
        )}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className="h-full w-full flex-1 bg-muted-foreground transition-all"
          style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
      </ProgressPrimitive.Root>
      {showTooltip && valueInMoney !== undefined && (
        <div
          className="absolute left-1/2 -translate-x-1/2 -translate-y-full transform rounded bg-black px-2 py-1 text-xs text-white"
          style={{ bottom: "100%", marginBottom: "2px" }}
        >
          R${valueInMoney}
        </div>
      )}
    </div>
  );
});
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
