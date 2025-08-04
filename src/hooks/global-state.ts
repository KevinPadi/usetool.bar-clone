import { create } from "zustand";

export type IndividualReply = {
  id: string; // Unique ID for each reply
  text: string;
  author: string;
  createdAt: string;
};

export type Comment = {
  _id: string;
  text: string;
  deviceInfo: {
    userAgent: string;
    os: string;
    browser: string;
    browserVersion: string;
    deviceType: string;
    screenWidth: number;
    screenHeight: number;
    language: string;
    hardwareConcurrency: number;
  };
  x: number;
  y: number;
  relativeX: number;
  relativeY: number;
  screenWidth: number;
  screenHeight: number;
  author: string; // Author of the main comment
  resolved: boolean;
  replies: IndividualReply[]; // Changed to an array of IndividualReply objects
  createdAt: string; // Creation date of the main comment
};

const defaultData = {
  comments: [
    {
      text: "could be better",
      deviceInfo: {
        userAgent:
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
        os: "MacOS",
        browser: "Chrome",
        browserVersion: "135.0.0.0",
        deviceType: "desktop",
        language: "en",
        screenWidth: 1710,
        screenHeight: 887,
        hardwareConcurrency: 8,
      },
      nodeId: "html",
      x: 1344,
      y: 197,
      relativeX: 0.7859649122807018,
      relativeY: 0,
      screenWidth: 1710,
      screenHeight: 887,
      website: "",
      author: "Alice Smith", // Populated author
      navigationToken: "",
      images: [],
      page: "/",
      position: "right",
      _id: "883aa770-8ed2-4d23-92f4-65ec82190318",
      resolved: false,
      replies: [
        // Now an array of IndividualReply
        {
          id: "reply-1-abc",
          author: "Bob Johnson",
          createdAt: "2025-04-30T12:27:00.000Z",
          text: "Change this",
        },
        {
          id: "reply-2-def",
          author: "Charlie Brown",
          createdAt: "2025-04-30T12:27:10.000Z",
          text: "🚀🚀",
        },
      ],
      createdAt: "2025-04-30T12:26:59.605Z",
    },
    {
      text: "this needs to be fixed",
      deviceInfo: {
        userAgent:
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
        os: "MacOS",
        browser: "Chrome",
        browserVersion: "135.0.0.0",
        deviceType: "desktop",
        language: "en",
        screenWidth: 1710,
        screenHeight: 887,
        hardwareConcurrency: 8,
      },
      nodeId: "html",
      x: 824,
      y: 562,
      relativeX: 0.4818713450292398,
      relativeY: 0,
      screenWidth: 1710,
      screenHeight: 887,
      website: "",
      author: "David Lee", // Populated author
      navigationToken: "",
      images: [],
      page: "/",
      todos: [],
      position: "right",
      _id: "58565492-d4d2-4130-a110-8802b111a53a",
      resolved: false,
      replies: [], // Empty array for no replies
      createdAt: "2025-04-30T12:26:46.273Z",
    },
    {
      text: "Change this here",
      deviceInfo: {
        userAgent:
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
        os: "MacOS",
        browser: "Chrome",
        browserVersion: "135.0.0.0",
        deviceType: "desktop",
        language: "en",
        screenWidth: 1710,
        screenHeight: 887,
        hardwareConcurrency: 8,
      },
      nodeId: "html",
      x: 326,
      y: 262,
      relativeX: 0.19064327485380117,
      relativeY: 0,
      screenWidth: 1710,
      screenHeight: 887,
      website: "",
      author: "Eve Green", // Populated author
      navigationToken: "",
      images: [],
      page: "/",
      todos: [],
      position: "right",
      _id: "f97a6b37-eb3e-419a-973b-c4eaed544db8",
      resolved: false,
      replies: [], // Empty array for no replies
      createdAt: "2025-04-30T12:26:35.617Z",
    },
  ],
};

interface BearState {
  isCursorActive: boolean;
  isCursorLock: boolean;
  comments: Comment[];
  setCursorActive: () => void;
  setCursorLock: (value?: boolean) => void;
  addNewComment: (comment: Comment) => void;
  updateComment: (id: string, updated: Partial<Comment>) => void;
  deleteComment: (id: string) => void;
  addReply: (
    id: string,
    message: string,
    author: string,
    createdAt: string
  ) => void;
}

export const useBearStore = create<BearState>()((set) => ({
  isCursorActive: false,
  isCursorLock: false,
  comments: defaultData.comments,
  setCursorActive: () =>
    set((state) => ({ isCursorActive: !state.isCursorActive })),
  setCursorLock: (value?: boolean) =>
    set((state) => ({ isCursorLock: value ? value : !state.isCursorLock })),
  addNewComment: (comment: Comment) =>
    set((state) => ({ comments: [...state.comments, comment] })),
  updateComment: (id: string, updated: Partial<Comment>) =>
    set((state) => ({
      comments: state.comments.map((c) =>
        c._id === id ? { ...c, ...updated } : c
      ),
    })),
  deleteComment: (id) =>
    set((state) => ({
      comments: state.comments.filter((comment) => comment._id !== id),
    })),
  addReply: (id, message: string, author: string, createdAt: string) =>
    set((state) => ({
      comments: state.comments.map((comment) => {
        if (comment._id !== id) return comment;

        const newReply: IndividualReply = {
          id: crypto.randomUUID(),
          text: message,
          author,
          createdAt,
        };

        return {
          ...comment,
          replies: [...comment.replies, newReply],
        };
      }),
    })),
}));
