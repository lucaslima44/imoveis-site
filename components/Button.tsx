"use client";

import React, { forwardRef } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = {
  primary: "bg-navy-900 text-cream-50 hover:bg-gold-500 focus:ring-gold-500",
  secondary: "bg-white text-navy-900 border border-gray-200 hover:border-gold-300 hover:shadow-sm focus:ring-gold-500",
  outline: "border border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-cream-50 focus:ring-navy-900",
  ghost: "text-navy-600 hover:text-gold-500 hover:bg-gray-50 focus:ring-gold-500",
  danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
};

const buttonSizes = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-sm",
  xl: "px-8 py-4 text-base",
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", fullWidth, loading, leftIcon, rightIcon, asChild, children, disabled, ...props }, ref) => {
    if (asChild) {
      // For asChild, we need to clone the child element
      const child = React.Children.only(children) as React.ReactElement;
      return React.cloneElement(child, {
        className: cn(
          "inline-flex items-center justify-center gap-2 font-body font-medium tracking-wide transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
          buttonVariants[variant],
          buttonSizes[size],
          fullWidth && "w-full",
          className,
          child.props.className
        ),
        disabled: disabled || loading,
        ...props,
      });
    }

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center gap-2 font-body font-medium tracking-wide transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
          buttonVariants[variant],
          buttonSizes[size],
          fullWidth && "w-full",
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 size={16} className="animate-spin" />}
        {!loading && leftIcon}
        {children}
        {!loading && rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };