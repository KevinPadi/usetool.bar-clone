import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const FeatureCard = (props: {
  title: string;
  description: string;
  className?: string;
  children: ReactNode;
}) => {
  const { title, description, className, children } = props;
  return (
    <div
      className={twMerge(
        className,
        "relative flex flex-col items-start justify-end max-w-[700px] w-full md:h-[333px] h-[300px] rounded-[35px] bg-[#191919] px-[25px] py-[20px] overflow-hidden"
      )}
    >
      {children}
      {/* <div className="relative"> */}
      <h4 className="text-[22px] sm:text-[25px] font-medium z-10 tracking-tight">
        {title}
      </h4>
      <p className="text-neutral-400 font-medium text-sm sm:max-w-md z-10 mt-3">
        {description}
      </p>
      {/* </div> */}
    </div>
  );
};

export default FeatureCard;
