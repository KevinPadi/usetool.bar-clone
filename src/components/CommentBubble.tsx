"use client";

import {
  useBearStore,
  type Comment,
  type IndividualReply,
} from "@/hooks/global-state";
import { cn } from "@/lib/utils";
import {
  ChevronUp,
  Copy,
  Monitor,
  MoreHorizontal,
  Pencil,
  Plus,
  Trash,
} from "lucide-react";
import { AnimatePresence, motion, type HTMLMotionProps } from "motion/react";
import { useState, useRef, useEffect, type RefObject } from "react";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import dayjs from "dayjs";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";

type CommentBubbleProps = HTMLMotionProps<"div"> & {
  comment: Comment;
  constrainsRef: RefObject<null>;
};

const CommentBubble = ({
  comment,
  constrainsRef,
  className,
  style,
}: CommentBubbleProps) => {
  const [showInfo, setShowInfo] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(comment.text);
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");

  const updateComment = useBearStore((s) => s.updateComment);
  const deleteComment = useBearStore((s) => s.deleteComment);
  const addReply = useBearStore((s) => s.addReply);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const {
    _id,
    x,
    y,
    text,
    author,
    createdAt,
    deviceInfo,
    resolved,
    screenHeight,
    screenWidth,
    replies, // This is now an array of IndividualReply
  } = comment;

  const relativeCreatedTime = (dateStr: string) => {
    const now = dayjs();
    const date = dayjs(dateStr);
    const diff = now.diff(date, "day");
    if (diff === 0) return "just now";
    return `${diff}d`;
  };

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isEditing]);

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
    setEditedText(text);
    setIsDropdownOpen(false);
  };

  const handleCancelEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(false);
    setEditedText(text);
  };

  const handleSubmitEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateComment(_id, { text: editedText });
    setIsEditing(false);
  };

  const handleSubmitReply = () => {
    const replyAuthor = "User";
    const date = new Date().toISOString();
    addReply(_id, replyText, replyAuthor, date);
    setIsReplying(false);
    setReplyText("");
  };

  const handleDeleteComment = (_id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteComment(_id);
    setIsDropdownOpen(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        onHoverStart={() => setShowInfo(true)}
        onHoverEnd={() => setShowInfo(false)}
        drag
        dragConstraints={constrainsRef}
        dragMomentum={false}
        className={cn(
          "hidden lg:flex absolute hover:cursor-pointer",
          className
        )}
        onClick={() => setIsReplying(!isReplying)}
        style={{ top: y, left: x, ...style }}
      >
        <div className="size-[34px] bg-[#1d1d1dcc] backdrop-blur-[10px] p-px rounded-tl-[5px] rounded-[18.6px] relative pointer-events-">
          <div className="size-full border-[0.5px] border-[#ffffff59] rounded-tl-[4.4px] rounded-[18px] flex items-center justify-center">
            <Plus />
          </div>
        </div>
        <div className="-ml-[18px] size-[34px] flex items-center justify-center p-px rounded-full">
          <img
            src="/src/assets/images/user_profile_image.webp"
            alt="User profile image"
            className="border-[0.5px] border-[#ffffff59] size-full rounded-full pointer-events-none"
          />
        </div>
        <AnimatePresence>
          {(showInfo || isReplying || isDropdownOpen || isEditing) && (
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="flex flex-col gap-2 absolute left-full ml-2 pointer-events-auto z-50"
            >
              <TooltipProvider>
                <div className="w-[316px] h-auto border-[0.5px] border-[#ffffff59] bg-[#1d1d1dcc] rounded-[20px] backdrop-blur-[30px] p-[9px] flex flex-col justify-between">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-1 font-normal">
                      <img
                        src="/src/assets/images/user_profile_image.webp"
                        alt="User profile"
                        className="size-6 rounded-full p-px bg-[#ffffff26]"
                      />
                      <p className="text-[13px] text-white leading-4">
                        {author ? author : "Unknown User"}{" "}
                        {/* Default to "Unknown User" */}
                      </p>
                      <Tooltip>
                        <TooltipTrigger>
                          <Monitor className="stroke-[#ffffff59] size-[15px]" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="w-full flex text-sm p-[9px]">
                            <div className="flex flex-col items-start justify-between text-[#ffffff80] flex-1 font-normal">
                              <p>Window size</p>
                              <p>Browser</p>
                              <p>Operating System</p>
                            </div>
                            <div className="flex flex-col items-end justify-between text-white flex-1 font-normal">
                              <p>
                                {screenWidth}x{screenHeight}
                              </p>
                              <p>
                                {deviceInfo.browser} {deviceInfo.browserVersion}
                              </p>
                              <p>{deviceInfo.os}</p>
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                      <p className="text-[13px] text-[#ffffff59]">
                        {relativeCreatedTime(createdAt)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={resolved}
                        onCheckedChange={(checked) =>
                          updateComment(comment._id, { resolved: !!checked })
                        }
                        onClick={(e) => e.stopPropagation()} // <-- Añadido aquí
                      />
                      <DropdownMenu onOpenChange={setIsDropdownOpen}>
                        <DropdownMenuTrigger asChild>
                          <button
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center justify-center"
                          >
                            <MoreHorizontal className="text-[#ffffff59] size-5" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={(e) => handleEditClick(e)}>
                            <Pencil className="mr-2 h-4 w-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="mr-2 h-4 w-4" /> Copy link
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={(e) => handleDeleteComment(_id, e)}
                          >
                            <Trash className="mr-2 h-4 w-4" /> remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  {isEditing ? (
                    <motion.div className="flex flex-col gap-2">
                      <Textarea
                        autoFocus
                        ref={textareaRef}
                        value={editedText}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => setEditedText(e.target.value)}
                        className="text-sm border-none text-white rounded-md p-0 resize-none focus:outline-none focus:ring-none min-h-0"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={handleCancelEdit}
                          className="text-white/35 text-sm"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSubmitEdit}
                          className="bg-white text-black size-5 hover:bg-gray-200 rounded-md flex items-center justify-center"
                        >
                          <ChevronUp className="size-3" strokeWidth={4} />
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <p className="text-sm text-white">{text}</p>
                  )}
                  {replies.length > 0 && (
                    <div className="text-[13px] border-t mt-3 pt-4">
                      {replies.map((reply: IndividualReply) => (
                        <div key={reply.id} className="mb-2 last:mb-0">
                          <div className="flex gap-1 items-center">
                            <img
                              src="/src/assets/images/user_profile_image.webp"
                              alt="User profile image"
                              className="size-[22px] rounded-full border-0.5 border-white/55"
                            />
                            <p className="text-white">{reply.author}</p>
                            <p className="text-[#ffffff59]">
                              {relativeCreatedTime(reply.createdAt)}
                            </p>
                          </div>
                          <p className="text-sm mt-1 px-3">{reply.text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </TooltipProvider>
              {isReplying && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="w-full border-[0.5px] border-[#ffffff59] bg-[#1d1d1dcc] rounded-[16px] backdrop-blur-[30px] h-10 relative"
                >
                  <form className="py-1.5 flex size-full items-center justify-center">
                    <Textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      autoFocus
                      className="text-sm text-white rounded-md resize-none focus:outline-none focus:ring-none min-h-0 h-5 p-0 pl-2 my-auto border-none"
                    />
                  </form>
                  <button
                    onClick={handleSubmitReply}
                    disabled={replyText === "" ? true : false}
                    className="bg-white text-black size-5 hover:bg-gray-200 rounded-md flex items-center justify-center absolute right-2 top-1/2 -translate-y-1/2 disabled:opacity-20 disabled:pointer-events-none"
                  >
                    <ChevronUp className="size-3" strokeWidth={4} />
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

export default CommentBubble;
