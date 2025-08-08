import { useBearStore, type Comment } from "@/hooks/global-state";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import {
  ChevronLeft,
  ChevronUp,
  Copy,
  CornerUpLeft,
  Monitor,
  MoreHorizontal,
  Pencil,
  Trash,
  XIcon,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  type LegacyAnimationControls,
  type PanInfo,
} from "motion/react";
import { useState, useMemo, useCallback } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "./textarea";

type InboxProps = {
  draggableRef: React.Ref<HTMLDivElement>;
  handleDrag: (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => void;
  handleDragEnd: (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => void;
  controls: LegacyAnimationControls;
};

const tabs = ["All", "Active", "Done"];

// Utilidad para fecha relativa
const relativeCreatedTime = (dateStr: string) => {
  const now = dayjs();
  const date = dayjs(dateStr);
  const diff = now.diff(date, "day");
  return diff === 0 ? "just now" : `${diff}d`;
};

// Componente de un comentario en la lista
const CommentItem = ({
  comment,
  onSelect,
  onEdit,
  onDelete,
  onToggleResolved,
}: {
  comment: Comment;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: (e: React.MouseEvent) => void;
  onToggleResolved: (checked: boolean) => void;
}) => (
  <motion.li
    onClick={onSelect}
    layout
    key={comment._id}
    exit={{ opacity: 0 }}
    className="w-full h-fit border-[0.5px] border-white/35 text-white bg-[#ffffff0d] hover:border-white/60 p-2 rounded-[20px] hover:cursor-pointer space-y-2"
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1.5 text-[13px]">
        <img
          className="size-[22px] rounded-full border-[0.5px] border-white/15"
          src="/images/user_profile_image.webp"
          alt="User profile"
        />
        <span>{comment.author || "User"}</span>
        <Monitor size={15} className="stroke-white/30" />
        <span className="text-white/30">
          {relativeCreatedTime(comment.createdAt)}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox
          onClick={(e) => e.stopPropagation()}
          checked={comment.resolved}
          onCheckedChange={(checked) => onToggleResolved(!!checked)}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button onClick={(e) => e.stopPropagation()}>
              <MoreHorizontal className="text-[#ffffff59] size-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent onClick={(e) => e.stopPropagation()} align="end">
            <DropdownMenuItem onClick={onEdit}>
              <Pencil className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Copy className="mr-2 h-4 w-4" /> Copy link
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDelete}>
              <Trash className="mr-2 h-4 w-4" /> remove
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
    <p className="text-sm text-white">{comment.text}</p>
    <button className="flex gap-1 items-center text-[13px] text-white/35 hover:text-white/50">
      <CornerUpLeft size={14} />
      <span>Reply</span>
    </button>
  </motion.li>
);

// Formulario para responder
const ReplyForm = ({
  value,
  onChange,
  onSubmit,
}: {
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
}) => (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      onSubmit();
    }}
    className="absolute bottom-9 w-full h-9 bg-neutral-600 border-[0.5px] border-white/35 rounded-[15px]"
  >
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      type="text"
      className="size-full focus:outline-0 pl-2"
    />
    <button
      type="submit"
      disabled={!value}
      className="bg-white text-black size-5 hover:bg-gray-200 rounded-md flex items-center justify-center absolute right-2 top-1/2 -translate-y-1/2 disabled:opacity-20"
    >
      <ChevronUp className="size-3" strokeWidth={4} />
    </button>
  </form>
);

const Inbox: React.FC<InboxProps> = ({
  draggableRef,
  handleDrag,
  handleDragEnd,
  controls,
}) => {
  const comments = useBearStore((s) => s.comments);
  const updateComment = useBearStore((s) => s.updateComment);
  const deleteComment = useBearStore((s) => s.deleteComment);
  const openInbox = useBearStore((s) => s.setIsInboxOpen);
  const addReply = useBearStore((s) => s.addReply);

  const [activeTab, setActiveTab] = useState("All");
  const [activeCommentId, setActiveCommentId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState("");

  const activeComment = useMemo(
    () => comments.find((c) => c._id === activeCommentId) || null,
    [activeCommentId, comments]
  );

  const filteredComments = useMemo(() => {
    if (activeTab === "Active") return comments.filter((c) => !c.resolved);
    if (activeTab === "Done") return comments.filter((c) => c.resolved);
    return comments;
  }, [comments, activeTab]);

  const handleDeleteComment = useCallback(
    (id: string, e: React.MouseEvent) => {
      e.stopPropagation();
      deleteComment(id);
    },
    [deleteComment]
  );

  const handleSubmitReply = useCallback(() => {
    if (!activeComment) return;
    const replyAuthor = "User";
    const date = new Date().toISOString();
    addReply(activeComment._id, replyText, replyAuthor, date);
    setReplyText("");
  }, [activeComment, replyText, addReply]);

  const handleSubmitEdit = useCallback(() => {
    if (!activeComment) return;
    updateComment(activeComment._id, { text: editedText });
    setIsEditing(false);
  }, [activeComment, editedText, updateComment]);

  return (
    <motion.div
      ref={draggableRef}
      drag="x"
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      animate={controls}
      className="absolute top-0 left-0 h-[90%] w-[368px] bg-[#1d1d1d] rounded-[34px] border-[0.5px] border-white/35 p-4 overflow-y-auto"
      style={{ scrollbarWidth: "none" }}
    >
      <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-[#ffffff1a] rounded-full h-1 w-16"></div>
      <div className="flex items-center justify-between sticky top-0">
        {activeComment ? (
          <button
            className="bg-white/5 text-white rounded-full py-1.5 px-3.5 flex gap-1 items-center text-sm"
            onClick={() => {
              setActiveCommentId(null);
              setEditedText("");
            }}
          >
            <ChevronLeft size={14} />
            Back
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-xl text-white">Inbox</span>
          </div>
        )}
        <button
          onClick={() => openInbox(false)}
          className="size-8 bg-[#ffffff0d] rounded-full flex items-center justify-center"
        >
          <XIcon size={20} className="stroke-neutral-500" strokeWidth={2.5} />
        </button>
      </div>

      <AnimatePresence mode="popLayout">
        {!activeComment ? (
          <motion.div key="list" className="relative">
            <div className="flex w-full h-9 rounded-2xl bg-[#ffffff0d] mt-3 sticky top-14">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className="flex-1 relative"
                  onClick={() => setActiveTab(tab)}
                >
                  <span
                    className={cn(
                      "relative z-10 text-sm",
                      activeTab === tab ? "text-black" : "text-white"
                    )}
                  >
                    {tab}
                  </span>
                  {tab === activeTab && (
                    <motion.div
                      layoutId="underline"
                      className="absolute inset-0 rounded-2xl bg-neutral-100 z-0"
                    />
                  )}
                </button>
              ))}
            </div>
            <motion.ul className="mt-7 flex flex-col gap-2">
              <AnimatePresence mode="popLayout">
                {filteredComments.map((comment) => (
                  <CommentItem
                    key={comment._id}
                    comment={comment}
                    onSelect={() => setActiveCommentId(comment._id)}
                    onEdit={() => {
                      setActiveCommentId(comment._id);
                      setIsEditing(true);
                      setEditedText(comment.text);
                    }}
                    onDelete={(e) => handleDeleteComment(comment._id, e)}
                    onToggleResolved={(checked) =>
                      updateComment(comment._id, { resolved: checked })
                    }
                  />
                ))}
              </AnimatePresence>
            </motion.ul>
          </motion.div>
        ) : (
          <motion.div key="detail" className="relative h-full">
            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center gap-1.5 text-[13px]">
                <img
                  className="size-[22px] rounded-full border-[0.5px] border-white/15"
                  src="/images/user_profile_image.webp"
                  alt="User profile"
                />
                <span>{activeComment.author || "User"}</span>
                <Monitor size={15} className="stroke-white/30" />
                <span className="text-white/30">
                  {relativeCreatedTime(activeComment.createdAt)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={activeComment.resolved}
                  onCheckedChange={(checked) =>
                    updateComment(activeComment._id, { resolved: !!checked })
                  }
                />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button>
                      <MoreHorizontal className="text-[#ffffff59] size-5" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setIsEditing(true)}>
                      <Pencil className="mr-2 h-4 w-4" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="mr-2 h-4 w-4" /> Copy link
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={(e) => handleDeleteComment(activeComment._id, e)}
                    >
                      <Trash className="mr-2 h-4 w-4" /> remove
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {isEditing ? (
              <motion.div className="flex flex-col gap-2 my-2">
                <Textarea
                  autoFocus
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  className="text-sm border-none text-white rounded-md p-0 resize-none"
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="text-white/35 text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitEdit}
                    className="bg-white text-black size-5 rounded-md flex items-center justify-center"
                  >
                    <ChevronUp className="size-3" strokeWidth={4} />
                  </button>
                </div>
              </motion.div>
            ) : (
              <p className="text-sm text-white mt-2 mb-2">
                {activeComment.text}
              </p>
            )}

            {activeComment.replies.length > 0 && (
              <div className="size-full relative border-t pt-4 border-white/35">
                {activeComment.replies.map((reply) => (
                  <p key={reply.id} className="text-sm my-3">
                    {reply.text}
                  </p>
                ))}
              </div>
            )}

            <ReplyForm
              value={replyText}
              onChange={setReplyText}
              onSubmit={handleSubmitReply}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Inbox;
