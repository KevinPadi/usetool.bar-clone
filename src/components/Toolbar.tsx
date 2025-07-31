import { CommandIcon } from "lucide-react";
import CommandButton from "./CommandButton";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { motion, type LegacyAnimationControls } from "motion/react";

type toolbarPropsType = {
  ref: React.RefObject<HTMLDivElement | null>;
  onDrag: () => void;
  onDragEnd: () => void;
  animate: LegacyAnimationControls;
  position: boolean;
};

const Toolbar = ({
  ref,
  onDrag,
  onDragEnd,
  animate,
  position,
}: toolbarPropsType) => {
  return (
    <motion.div
      ref={ref}
      drag
      onDrag={onDrag}
      onDragEnd={onDragEnd}
      animate={animate}
      className={`${
        position ? "flex-col" : "flex-row"
      } w-[160px] h-11 flex gap-1 items-center absolute justify-center hover:cursor-grab active:cursor-grabbing z-50 pointer-events-auto`}
    >
      <div
        className={`${
          position ? "flex-col" : "flex-row"
        } flex items-center justify-center w-fit gap-px border-[0.5px] border-white/30 p-0.5 rounded-[18px] bg-[#1d1d1dcc] backdrop-blur-[5px]`}
      >
        <Tooltip>
          <TooltipTrigger>
            <button className="fill-neutral-100 flex items-center justify-center w-[47px] h-[37px] hover:bg-neutral-600/20 transition duration-300 rounded-[15px] hover:cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="20"
                viewBox="0 0 22 20"
                fill="none"
              >
                <path
                  d="M4.43838 19.2799C5.49507 19.2799 8.12799 18.1264 9.62497 17.0521C9.77468 16.9464 9.89796 16.9024 10.0212 16.9024C10.1357 16.9112 10.2502 16.92 10.3647 16.92C16.7136 16.92 20.9227 13.3096 20.9227 8.92436C20.9227 4.49506 16.4847 0.919922 10.937 0.919922C5.3894 0.919922 0.951294 4.49506 0.951294 8.92436C0.951294 11.7423 2.68603 14.2166 5.51268 15.7312C5.64477 15.8017 5.6888 15.9338 5.61835 16.0659C5.12523 16.876 4.24465 17.8446 3.91003 18.2849C3.56661 18.7252 3.76033 19.2799 4.43838 19.2799Z"
                  fill="white"
                />
              </svg>
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="flex gap-1 items-center justify-center">
              Comment
              <CommandButton content="C" />
            </p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="fill-neutral-100 flex items-center justify-center w-[47px] h-[37px] hover:bg-neutral-600/20 rounded-[15px] transition duration-300 hover:cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="17"
                viewBox="0 0 24 17"
                fill="none"
              >
                <path
                  d="M3.82852 16.0999H20.025C21.9911 16.0999 22.9648 15.1262 22.9648 13.1976V8.02969C22.9648 7.1871 22.8337 6.79388 22.4312 6.25088L19.2012 1.87874C18.1807 0.483777 17.619 0.118652 15.9525 0.118652H7.90106C6.23459 0.118652 5.68223 0.483777 4.66175 1.87874L1.42244 6.25088C1.02923 6.79388 0.888794 7.1871 0.888794 8.02969V13.1976C0.888794 15.1356 1.87182 16.0999 3.82852 16.0999ZM11.9268 10.6792C10.5224 10.6792 9.6237 9.4621 9.6237 8.31055V8.28247C9.6237 7.86117 9.37093 7.46796 8.84664 7.46796H2.88294C2.57398 7.46796 2.50845 7.20582 2.65824 6.99985L6.12224 2.24387C6.55291 1.64469 7.10528 1.42936 7.78872 1.42936H16.0649C16.7483 1.42936 17.3006 1.64469 17.7314 2.24387L21.1953 6.99985C21.3358 7.20582 21.2796 7.46796 20.9707 7.46796H15.007C14.4827 7.46796 14.2393 7.86117 14.2393 8.28247V8.31055C14.2393 9.4621 13.3405 10.6792 11.9268 10.6792Z"
                  fill="white"
                />
              </svg>
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="flex gap-1 items-center justify-center">
              Inbox
              <CommandButton content="I" />
            </p>
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="flex items-center justify-center w-fit gap-px border-[0.5px] border-white/30 p-0.5 rounded-[18px] bg-[#1d1d1dcc] backdrop-blur-[5px]">
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="fill-neutral-100 flex items-center justify-center w-[47px] h-[37px] hover:bg-neutral-600/0 transition duration-300 rounded-[15px] hover:cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="24"
                viewBox="0 0 23 24"
                fill="none"
              >
                <path
                  d="M3.37109 11.9004H19.837M3.37109 6.15039H19.837M3.37109 17.6504H19.837"
                  stroke="white"
                  strokeWidth="2.09091"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="flex gap-1 items-center justify-center">
              Menu
              <CommandButton content={<CommandIcon size={12} />} />
              <CommandButton content="K" />
            </p>
          </TooltipContent>
        </Tooltip>
      </div>
    </motion.div>
  );
};

export default Toolbar;
