import { cva } from "class-variance-authority";
import { type ButtonHTMLAttributes } from "react";

const classes = cva(
  "rounded-[15px] py-1.5 px-4 font-medium hover:cursor-pointer transition duration-300",
  {
    variants: {
      variant: {
        primary: "bg-white text-neutral-950 text-sm",
        secondary:
          "bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.07)]",
        ghost: "bg-transparent text-white hover:bg-[rgba(255,255,255,0.07)]",
      },
    },
  }
);

const Button = (
  props: {
    variant: "primary" | "secondary" | "ghost";
  } & ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const { variant, className, ...otherProps } = props;
  return (
    <button
      className={classes({
        variant,
        className,
      })}
      {...otherProps}
    />
  );
};

export default Button;
