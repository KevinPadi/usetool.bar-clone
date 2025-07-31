import {
  EyeOff,
  InboxIcon,
  MessageCircle,
  MessageCircleOff,
  MonitorOff,
} from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";

export function MenuDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        className="bg-transparent border-2 border-white/30 rounded-3xl"
      >
        <div className="p-2">
          <CommandInput placeholder="Search..." />
        </div>
        <CommandList>
          <CommandEmpty>No results</CommandEmpty>
          <CommandGroup>
            <CommandItem>
              <MessageCircle />
              <span>Comment</span>
              <CommandShortcut>C</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <InboxIcon />
              <span>Show Inbox</span>
              <CommandShortcut>I</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <EyeOff />
              <span>Hide All UI</span>
              <CommandShortcut>⌘ + .</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <MessageCircleOff />
              <span>Hide Comments</span>
              <CommandShortcut>⌘ + /</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <MonitorOff />
              <span>Disable for one session</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
