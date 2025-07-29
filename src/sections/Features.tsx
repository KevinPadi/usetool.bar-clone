import { useRef } from "react";
import { TextEffect } from "../components/TextEffect";
import { useInView } from "motion/react";
import FeatureCard from "../components/FeatureCard";

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="flex flex-col px-6 items-center mt-[100px]">
      <div ref={ref}>
        <TextEffect
          className="text-4xl font-medium tracking-tighter text-center"
          per="word"
          as="h3"
          preset="slide"
          speedSegment={2}
          trigger={isInView}
        >
          Get 5x more done, faster.
        </TextEffect>
      </div>
      <div className="flex flex-col items-center gap-4 w-full mt-6">
        <FeatureCard
          title="Instant issue reporting"
          description="Capture bugs with one click, including device details, and user context-saving 3x the time compared to traditional methods."
        >
          <img
            src="/src/assets/images/instant-issue-reporter.webp"
            alt="Instant issue reporting"
            className="size-full absolute  object-cover object-center"
          />
        </FeatureCard>
        <FeatureCard
          title="Collaborate without barriers"
          description="Bring developers, clients, and stakeholders together to comment, suggest changes, and track updates-all in one place."
        >
          <img
            src="/src/assets/images/collaborate-without-barriers.webp"
            alt="Collaborate without barriers"
            className="size-full object-cover absolute -left-1/2 translate-x-1/3 top-14 sm:left-auto sm:translate-x-0 sm:right-0"
          />
        </FeatureCard>
        <FeatureCard
          title="Effortless task management"
          description="Create pre-filled tasks, cutting 70% of manual work - integration with Jira, Slack & more."
        >
          <img
            src="/src/assets/images/effortless-task-management.webp"
            alt="Effortless task management"
            className="absolute top-0 right-0 object-cover"
          />
        </FeatureCard>
        <FeatureCard
          title="Resolve tasks with AI"
          description="Our AI can now solve tasks for you. It has full context, sees the page, and can offer you solutions."
        >
          <img
            src="/src/assets/images/resolve-tasks-with-ai.svg"
            alt="Resolve tasks with AI"
            className="size-[186px] absolute left-1/2 -translate-x-1/2 top-14 sm:left-auto sm:right-36 sm:translate-x-0 mx-auto"
          />
        </FeatureCard>
        <FeatureCard
          title="Integrations"
          description="Connect Toolbar with Zapier, Make.com, Linear, Jira, and more to keep your workflows smooth."
        >
          <img
            src="/src/assets/images/integrations.svg"
            alt="Integrations"
            className="absolute top-0 right-0"
          />
        </FeatureCard>
        <FeatureCard
          title="Browser extension"
          description="Capture and report issues even faster with our upcoming browser extension."
        >
          <img
            src="/src/assets/images/browser-extension.webp"
            alt="Browser extension"
            className="absolute top-0 right-0"
          />
        </FeatureCard>
      </div>
    </section>
  );
};

export default Features;
