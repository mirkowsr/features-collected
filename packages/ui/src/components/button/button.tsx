import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../utils";

export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "whitespace-nowrap rounded-md text-sm font-medium",
    "border border-transparent",
    "transition-colors duration-[var(--transition-fast)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-4",
  ],
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border-primary hover:bg-primary/90",
        secondary:
          "bg-secondary text-secondary-foreground border-border hover:bg-accent hover:text-accent-foreground",
        outline:
          "bg-transparent text-foreground border-border-strong hover:bg-accent hover:text-accent-foreground",
        ghost:
          "bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground",
        destructive:
          "bg-destructive text-destructive-foreground border-destructive hover:bg-destructive/90",
        link: "border-0 text-foreground underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 px-3 text-xs rounded-sm",
        default: "h-9 px-4 py-2",
        lg: "h-10 px-6 text-base rounded-lg",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
    compoundVariants: [
      {
        variant: "link",
        className: "h-auto px-0 py-0",
      },
    ],
  },
);

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

type ButtonProps = React.ComponentPropsWithRef<"button"> &
  ButtonVariantProps & {
    asChild?: boolean;
  };

function Button({
  className,
  variant,
  size,
  asChild = false,
  ref,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
}

export { Button, type ButtonProps };
