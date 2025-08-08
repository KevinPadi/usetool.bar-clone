import * as React from "react";
import {
  motion,
  useMotionValue,
  AnimatePresence,
  type HTMLMotionProps,
  type SpringOptions,
} from "motion/react";
import { cn } from "@/lib/utils";
import { ChevronUp } from "lucide-react";
import { useBearStore } from "@/hooks/global-state";
import { getDeviceInfo } from "@/lib/device";

type CursorContextType = {
  cursorPos: { x: number; y: number };
  isActive: boolean;
  isLocked: boolean; // Estado para indicar si el cursor está bloqueado
  lockedPos: { x: number; y: number }; // Posición cuando el cursor está bloqueado
  toggleLock: () => void; // Función para alternar el bloqueo
  resetLock: () => void; // Nueva función para resetear el bloqueo
  containerRef: React.RefObject<HTMLDivElement | null>;
};

const CursorContext = React.createContext<CursorContextType | undefined>(
  undefined
);

const useCursor = (): CursorContextType => {
  const context = React.useContext(CursorContext);
  if (!context) {
    throw new Error("useCursor must be used within a CursorProvider");
  }
  return context;
};

type CursorProviderProps = React.ComponentProps<"div"> & {
  children: React.ReactNode;
};

function CursorProvider({ ref, children, ...props }: CursorProviderProps) {
  const [cursorPos, setCursorPos] = React.useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = React.useState(false);
  const [isLocked, setIsLocked] = React.useState(false);
  const switchIsLocked = useBearStore((s) => s.setCursorLock);
  const [lockedPos, setLockedPos] = React.useState({ x: 0, y: 0 });

  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

  // Función para resetear el estado de bloqueo
  const resetLock = React.useCallback(() => {
    setIsLocked(false);
    switchIsLocked(false);
    setLockedPos({ x: 0, y: 0 });
    // No es necesario resetear isActive aquí, los listeners de mouse se encargarán
  }, [switchIsLocked]);

  React.useEffect(() => {
    if (!containerRef.current) return;
    const parent = containerRef.current.parentElement;
    if (!parent) return;

    if (getComputedStyle(parent).position === "static") {
      parent.style.position = "relative";
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isLocked) {
        const rect = parent.getBoundingClientRect();
        setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        setIsActive(true);
      }
    };

    const handleMouseLeave = () => {
      if (!isLocked) {
        setIsActive(false);
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (!isLocked) {
        const rect = parent.getBoundingClientRect();
        setLockedPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        setIsLocked(true);
        switchIsLocked(true);
        setIsActive(true); // Asegura que el cursor se mantenga visible al bloquear
      } else {
        resetLock(); // Llama a resetLock para desbloquear
      }
    };

    parent.addEventListener("mousemove", handleMouseMove);
    parent.addEventListener("mouseleave", handleMouseLeave);
    parent.addEventListener("click", handleClick);

    return () => {
      parent.removeEventListener("mousemove", handleMouseMove);
      parent.removeEventListener("mouseleave", handleMouseLeave);
      parent.removeEventListener("click", handleClick);
    };
  }, [isLocked, resetLock, switchIsLocked]); // Añadir resetLock a las dependencias

  const toggleLock = React.useCallback(() => {
    setIsLocked((prev) => !prev);
    switchIsLocked();

    if (!isLocked) {
      setLockedPos(cursorPos);
      setIsActive(true);
    } else {
      resetLock(); // Llama a resetLock al desbloquear con toggleLock
    }
  }, [isLocked, cursorPos, resetLock, switchIsLocked]);

  return (
    <CursorContext.Provider
      value={{
        cursorPos,
        isActive,
        isLocked,
        lockedPos,
        toggleLock,
        resetLock, // Exportar la nueva función
        containerRef,
      }}
    >
      <div ref={containerRef} data-slot="cursor-provider" {...props}>
        {children}
      </div>
    </CursorContext.Provider>
  );
}

type Align =
  | "top"
  | "top-left"
  | "top-right"
  | "bottom"
  | "bottom-left"
  | "bottom-right"
  | "left"
  | "right"
  | "center";

type CursorFollowProps = HTMLMotionProps<"div"> & {
  sideOffset?: number;
  align?: Align;
  transition?: SpringOptions;
  children: React.ReactNode;
  cursorWidth?: number;
  cursorHeight?: number;
};

function CursorFollow({
  ref,
  sideOffset = 15,
  align = "bottom-right",
  children,
  className,
  style,
  cursorWidth = 20,
  cursorHeight = 20,
  ...props
}: CursorFollowProps) {
  const { cursorPos, isActive, isLocked, lockedPos, resetLock } = useCursor();
  const cursorFollowRef = React.useRef<HTMLDivElement>(null);
  React.useImperativeHandle(
    ref,
    () => cursorFollowRef.current as HTMLDivElement
  );

  const [inputValue, setInputValue] = React.useState("");
  const addNewComment = useBearStore((state) => state.addNewComment);
  const setCursorActive = useBearStore((state) => state.setCursorActive);
  const setCursorLock = useBearStore((state) => state.setCursorLock);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const calculateOffset = React.useCallback(() => {
    const rect = cursorFollowRef.current?.getBoundingClientRect();
    const width = rect?.width ?? 0;
    const height = rect?.height ?? 0;
    let newOffset;
    switch (align) {
      case "center":
        newOffset = { x: width / 3, y: height / 3 };
        break;
      case "top":
        newOffset = { x: width / 2, y: height + sideOffset };
        break;
      case "top-left":
        newOffset = { x: width + sideOffset, y: height + sideOffset };
        break;
      case "top-right":
        newOffset = { x: -sideOffset, y: height + sideOffset };
        break;
      case "bottom":
        newOffset = { x: width / 2, y: -sideOffset };
        break;
      case "bottom-left":
        newOffset = { x: width + sideOffset, y: -sideOffset };
        break;
      case "bottom-right":
        newOffset = { x: -sideOffset, y: -sideOffset };
        break;
      case "left":
        newOffset = { x: width + sideOffset, y: height / 2 };
        break;
      case "right":
        newOffset = { x: -sideOffset, y: height / 2 };
        break;
      default:
        newOffset = { x: 0, y: 0 };
    }
    return newOffset;
  }, [align, sideOffset]);

  React.useEffect(() => {
    const offset = calculateOffset();

    const currentX = isLocked ? lockedPos.x : cursorPos.x;
    const currentY = isLocked ? lockedPos.y : cursorPos.y;

    x.set(currentX - offset.x + cursorWidth / 2);
    y.set(currentY - offset.y + cursorHeight / 2);
  }, [
    calculateOffset,
    cursorPos,
    isLocked,
    lockedPos,
    cursorWidth,
    cursorHeight,
    x,
    y,
  ]);

  const handleCreateComment = (e: React.FormEvent) => {
    e.preventDefault();
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const relativeX = lockedPos.x / screenWidth;
    const relativeY = lockedPos.y / screenHeight;

    const deviceInfo = getDeviceInfo();
    const randomId = crypto.randomUUID();
    addNewComment({
      _id: randomId,
      deviceInfo,
      text: inputValue,
      x: lockedPos.x,
      y: lockedPos.y,
      relativeX,
      relativeY,
      screenHeight,
      screenWidth,
      author: "User",
      resolved: false,
      replies: [],
      createdAt: new Date().toISOString(),
    });
    setCursorActive();
    setCursorLock();
  };

  // Efecto para resetear el bloqueo cuando el componente se desmonte
  React.useEffect(() => {
    return () => {
      resetLock(); // Llama a resetLock en la limpieza del efecto (cuando el componente se desmonta)
    };
  }, [resetLock]); // Dependencia en resetLock para asegurar que la función sea estable

  return (
    <AnimatePresence>
      {(isActive || isLocked) && (
        <motion.div
          ref={cursorFollowRef}
          data-slot="cursor-follow"
          className={cn(
            "transform-[translate(-50%,-50%)] z-[9998] absolute",
            className
          )}
          style={{ top: y, left: x, ...style }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          {...props}
        >
          {children}
          <AnimatePresence>
            {isLocked && (
              <motion.div
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -10, opacity: 0 }}
                data-slot="locked-form"
                className="flex gap-2 absolute left-full -ml-[18px]"
              >
                <div className="size-[34px] flex items-center justify-center p-px rounded-full">
                  <img
                    src="/images/user_profile_image.webp"
                    alt="User profile image"
                    className="border-[0.5px] border-[#ffffff59] size-full rounded-full"
                  />
                </div>
                <div className="w-[273px] h-[37px] border-[0.5px] border-[#ffffff59] bg-[#1d1d1dcc] rounded-[15px]">
                  <form onSubmit={handleCreateComment} className="size-full">
                    <input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="size-full focus:outline-0 pl-4 text-sm"
                      autoFocus
                      type="text"
                    />
                    <button
                      disabled={inputValue === ""}
                      className="absolute right-1.5 top-1/2 -translate-y-1/2 size-6 bg-white rounded-lg text-black flex items-center justify-center disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-10"
                    >
                      <ChevronUp className="size-4" strokeWidth={2} />
                    </button>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export {
  CursorProvider,
  CursorFollow,
  type CursorContextType,
  type CursorProviderProps,
  type CursorFollowProps,
};
