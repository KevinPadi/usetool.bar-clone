import { CursorFollow } from "@/components/animate-ui/components/cursor";
import { useBearStore } from "@/hooks/global-state";
import { Plus } from "lucide-react";

export const CursorFollowOnlyDemo = () => {
  const isActive = useBearStore((state) => state.isCursorActive);

  return (
    <>
      {isActive && (
        <CursorFollow align="center" className="flex">
          <div className="size-[34px] bg-[#1d1d1dcc] backdrop-blur-[10px] p-px rounded-tl-[5px] rounded-[18.6px] relative z-50">
            <div className="size-full border-[0.5px] border-[#ffffff59] rounded-tl-[4.4px] rounded-[18px] flex items-center justify-center">
              <Plus />
            </div>
          </div>
        </CursorFollow>
      )}
    </>
  );
};
