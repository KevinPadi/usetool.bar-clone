import { AnimatePresence, motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { TextEffect } from "../components/TextEffect";
import { Tilt } from "../components/Tilt";
import { Triangle } from "lucide-react";

const faqs = [
  {
    question:
      "What is Toolbar and how does it help with website collaboration and feedback?",
    answer:
      "Toolbar is an easy-to-use website collaboration tool that allows teams and clients to work together seamlessly by sharing feedback, comments, and bug reports directly on any web page. By collecting everyone’s ideas in one organized space, Toolbar makes communication simple and clear, so your projects move forward faster.",
  },
  {
    question:
      "How do I add Toolbar to my website and invite my team or clients?",
    answer:
      "Getting started with Toolbar is simple! Just add our script to your website. Then, send a secure guest link to your team members or clients. They enter their name, join the project instantly, and can start giving feedback or collaborating without any need to sign up or install anything.",
  },
  {
    question: "How does Toolbar improve team collaboration and bug tracking?",
    answer:
      "Toolbar turns feedback into clear, actionable tasks. Users can leave visual comments, screenshots, and bug reports directly on the website, making discussions specific and easy to follow. All feedback is shared in real time, so your team stays in sync. Integrations with Jira and Slack let you track issues and get updates where your team already works.",
  },
  {
    question: "Can anyone use Toolbar, even if they are not technical?",
    answer:
      "Yes! Toolbar is built for everyone—project managers, developers, designers, and clients. Anyone with the guest link can simply enter their name and start leaving feedback or joining the conversation. There’s no complicated setup, making it easy for any client or team member to participate.",
  },
  {
    question:
      "Does Toolbar integrate with other collaboration tools like Jira or Slack?",
    answer:
      "Yes, Toolbar offers smooth integrations with both Jira and Slack. You can send bug reports and feedback directly to your Jira board or receive notifications in your Slack channels. This keeps your workflow connected and ensures that your whole team stays up to date without extra steps.",
  },
];

const Faqs = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="mt-[100px] max-w-[750px] px-[25px] mx-auto">
      <div ref={ref}>
        <TextEffect
          className="text-4xl font-medium tracking-tighter text-center"
          per="word"
          as="h3"
          preset="slide"
          speedSegment={2}
          trigger={isInView}
        >
          FAQ
        </TextEffect>
      </div>
      <div className="mt-10 flex flex-col gap-3">
        {faqs.map((faq, faqIndex) => (
          <div
            key={faq.question}
            className="bg-neutral-900 rounded-4xl p-6 hover:cursor-pointer"
            onClick={() => setSelectedIndex(faqIndex)}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-medium">{faq.question}</h3>
              <div className="rounded-full bg-neutral-800 p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-plus  flex-shrink-0 transition duration-300 size-4"
                >
                  <line
                    x1="12"
                    y1="5"
                    x2="12"
                    y2="19"
                    className={twMerge(
                      "feather feather-plus  flex-shrink-0 transition duration-300 size-4 origin-center",
                      selectedIndex === faqIndex && "rotate-90"
                    )}
                  ></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </div>
            </div>
            <AnimatePresence>
              {selectedIndex === faqIndex && (
                <motion.div
                  initial={{ height: 0, marginTop: 0 }}
                  animate={{ height: "auto", marginTop: "24px" }}
                  exit={{ height: 0, marginTop: 0 }}
                  className={twMerge("mt-6 overflow-hidden")}
                >
                  <p className="text-white/50">{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      <div className="relative aspect-video w-[260px] h-[54px] mx-auto mt-10 hover:scale-110 transition ease-in-out duration-400 mb-10">
        <Tilt
          rotationFactor={20}
          isRevese
          style={{
            transformOrigin: "center center",
          }}
          springOptions={{
            stiffness: 26.7,
            damping: 4.1,
            mass: 0.2,
          }}
          className="group relative rounded-lg"
        >
          {/* aca va todo */}
          <div className="bg-yellow-400 hover:brightness-105 shadow-lg rounded-xl h-[54px] p-2 flex items-center justify-between text-yellow-950">
            <div className="flex items-center">
              <img
                src="/images/laurel-leaves.svg"
                alt="Laurel leaves"
                className="size-12"
              />
              <div className="flex flex-col -space-y-1">
                <span className="text-[10px] font-bold uppercase">
                  Featured on
                </span>
                <span className="font-bold">Product Hunt</span>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <Triangle className="fill-current size-3" />
              <span className="text-xs font-bold">159</span>
            </div>
          </div>
        </Tilt>
      </div>
    </section>
  );
};

export default Faqs;
