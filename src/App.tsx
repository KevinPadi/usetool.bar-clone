import { useEffect, useRef } from "react";
import { CursorProvider } from "./components/animate-ui/components/cursor";
import { CursorFollowOnlyDemo } from "./components/drag-follower";
import DragContainer from "./components/DragContainer";
import { useBearStore } from "./hooks/global-state";

import Faqs from "./sections/Faqs";
import Features from "./sections/Features";
import Footer from "./sections/Footer";
import Hero from "./sections/Hero";
import Navbar from "./sections/Navbar";
import Reviews from "./sections/Reviews";
import CommentBubble from "./components/CommentBubble";
import InboxContainer from "./components/InboxContainer";

function App() {
  const comments = useBearStore((state) => state.comments);
  const isCursorLocked = useBearStore((s) => s.isCursorLock);
  const switchCursor = useBearStore((state) => state.setCursorActive);
  const isInboxOpen = useBearStore((s) => s.isInboxOpen);
  const constrainsRef = useRef(null);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }
      if (window.innerWidth < 1024) return;
      if (isCursorLocked) return;
      if (e.key === "c") {
        e.preventDefault();
        switchCursor();
      }
    };
    console.log(isCursorLocked);
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [switchCursor]);

  return (
    <CursorProvider>
      {isInboxOpen && <InboxContainer />}
      <div ref={constrainsRef} className="relative ">
        <Navbar />
        <Hero />
        <Features />
        <Reviews />
        <Faqs />
        <Footer />
        <DragContainer />
        <CursorFollowOnlyDemo />
        {comments &&
          comments.map((comment, index) => (
            <CommentBubble
              key={index}
              constrainsRef={constrainsRef}
              comment={comment}
            />
          ))}
      </div>
    </CursorProvider>
  );
}

export default App;
