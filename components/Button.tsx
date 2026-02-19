import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline" | "destructive";
  leftIcon?: ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
};

export default function Button({
  className,
  variant = "primary",
  leftIcon,
  type = "button",
  children,
  ...props
}: Props) {
  const variants = {
    primary:
      "bg-linear-to-r from-indigo-600 to-pink-600 text-white hover:bg-linear-to-r hover:from-indigo-700 hover:to-pink-700 cursor-pointer",
    secondary: "bg-neutral-100 hover:bg-neutral-200",
    destructive: "bg-rose-500 hover:bg-rose-600",
  };

  if (variant === "outline") {
    return (
      <div className="inline-block p-[1.5px] rounded-lg bg-linear-to-r from-indigo-600 to-pink-600 shadow-sm">
        <button
          className={cn(
            "relative rounded-lg px-4 py-2 bg-white text-sm font-medium flex items-center gap-2 justify-center cursor-pointer",
            "hover:bg-gray-50 transition",
            className,
          )}
          type={type}
          {...props}
        >
          {leftIcon}
          {children}
        </button>
      </div>
    );
  }

  return (
    <button
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition justify-center",
        variants[variant],
        className,
      )}
      type={type}
      {...props}
    >
      {leftIcon}
      {children}
    </button>
  );
}
