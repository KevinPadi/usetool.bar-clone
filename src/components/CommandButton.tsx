import { type ReactNode } from "react";

const CommandButton = ({ content }: { content: ReactNode }) => {
  return (
    <span className="bg-neutral-800 size-4 flex items-center justify-center text-[10px] font-bold text-neutral-400 rounded-sm">
      {content}
    </span>
  );
};

export default CommandButton;
