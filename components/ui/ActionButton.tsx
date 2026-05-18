import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { designTokens } from "../../lib/design/tokens";

type ActionButtonVariant = "primary" | "secondary" | "ghost";
type ActionButtonSize = "sm" | "md" | "lg";

type ActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ActionButtonVariant;
  size?: ActionButtonSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

const buttonVariants: Record<ActionButtonVariant, string> = {
  primary: `${designTokens.surface.inverse.className} ${designTokens.text.inverse.className} ${designTokens.border.transparent.className} ${designTokens.surface.hoverInverse.className}`,
  secondary: `${designTokens.surface.overlay.className} ${designTokens.text.primary.className} ${designTokens.border.subtle.className} ${designTokens.surface.hoverMedium.className}`,
  ghost: `${designTokens.text.secondary.className} ${designTokens.border.transparent.className} ${designTokens.surface.hoverSoft.className} ${designTokens.text.hoverPrimary.className}`,
};

const buttonSizes: Record<ActionButtonSize, string> = {
  sm: "h-9 px-3 text-xs",
  md: "h-11 px-4 text-sm",
  lg: "h-12 px-5 text-sm",
};

export const ActionButton = forwardRef<HTMLButtonElement, ActionButtonProps>(
  function ActionButton(
    {
      children,
      className = "",
      variant = "secondary",
      size = "md",
      leftIcon,
      rightIcon,
      type = "button",
      ...props
    },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type={type}
        className={`inline-flex items-center justify-center gap-2 border ${designTokens.radius.full.className} font-semibold ${designTokens.motion.interactive} ${designTokens.focus.visible} disabled:pointer-events-none disabled:opacity-45 ${buttonVariants[variant]} ${buttonSizes[size]} ${className}`}
        {...props}
      >
        {leftIcon}
        {children}
        {rightIcon}
      </button>
    );
  },
);
