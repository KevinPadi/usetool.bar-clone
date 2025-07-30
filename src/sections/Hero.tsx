import { Star } from "lucide-react";
import Button from "../components/Button";
import { motion } from "motion/react";
import window from "../assets/window.svg";
import messages from "../assets/messages.svg";
import link from "../assets/link.svg";

const Hero = () => {
  const Features = [
    {
      icon: window,
      text: "Leave comments directly on your website—no emails, no confusion, just instant collaboration.",
    },
    {
      icon: messages,
      text: "Track bugs with precision—get all details like viewport, device, and browser info.",
    },
    {
      icon: link,
      text: "Generate shareable links to guide your team or clients straight to the exact issue on the page.",
    },
  ];

  const boxesVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1 },
    },
  };

  const lineTextVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <section className="mt-40 px-6">
      <div className="text-center flex flex-col items-center gap-6">
        <div className="border border-white/15 relative">
          {/* Corner squares */}
          <motion.div
            variants={boxesVariants}
            initial="hidden"
            animate="visible"
            className="size-1.5 border border-white/10 bg-neutral-900 absolute top-0 left-0 -translate-x-[95%] -translate-y-[105%]"
          />
          <motion.div
            variants={boxesVariants}
            initial="hidden"
            animate="visible"
            className="size-1.5 border border-white/10 bg-neutral-900 absolute top-0 right-0 translate-x-[105%] -translate-y-[105%]"
          />
          <motion.div
            variants={boxesVariants}
            initial="hidden"
            animate="visible"
            className="size-1.5 border border-white/10 bg-neutral-900 absolute bottom-0 left-0 -translate-x-[95%] translate-y-[105%]"
          />
          <motion.div
            variants={boxesVariants}
            initial="hidden"
            animate="visible"
            className="size-1.5 border border-white/10 bg-neutral-900 absolute bottom-0 right-0 translate-x-[105%] translate-y-[105%]"
          />

          <motion.div
            initial={{ opacity: 0, y: "-50%" }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.3, delay: 0.4 },
            }}
            className="w-px h-screen border border-dashed border-white/10 absolute top-0 left-1/2 -translate-y-full -translate-x-1/2 "
          />
          <motion.span
            variants={lineTextVariants}
            initial="hidden"
            animate="visible"
            className="block text-white/60 absolute -top-1/2 -translate-y-full left-1/2 text-[10px] pl-2"
          >
            275px
          </motion.span>

          <motion.div
            initial={{ opacity: 0, x: "-50%" }}
            animate={{
              opacity: 1,
              x: 0,
              transition: { duration: 0.3, delay: 0.4 },
            }}
            className="hidden md:block w-screen hh-px border border-dashed border-white/10 absolute top-1/2 left-0 -translate-y-1/2 -translate-x-full "
          />
          <motion.span
            variants={lineTextVariants}
            initial="hidden"
            animate="visible"
            className="hidden md:block text-white/60 absolute -left-1/2 -translate-y-full top-1/2 text-[10px] pb-2"
          >
            675px
          </motion.span>

          <h1 className="text-white text-4xl md:text-[55px] font-medium sm:w-[500px] tracking-tighter leading-tight px-5 md:p-0 sm:text-balance ">
            Stop Printscreening Your Product Bugs
          </h1>
        </div>
        <p className="text-white/65 text-sm w-full max-w-[300px]">
          Track issues, directly on your website with help of a simple toolbar
        </p>
        <Button className="block sm:hidden" variant="primary">
          Try for free
        </Button>

        <form className="hidden sm:block max-w-[400px] w-full mx-auto">
          <div className="relative">
            <span className="absolute inset-y-0 start-0 flex items-center ps-5 pointer-events-none text-white text-sm font-medium">
              https://
            </span>
            <input
              type="search"
              className="block w-full p-4 ps-17 text-sm bg-neutral-900 placeholder:text-white/35 rounded-[21px] focus:outline-0 font-medium"
              placeholder="yourwebsite.com"
              required
            />
            <Button
              variant="primary"
              className="absolute end-1.5 bottom-1.5 h-10"
            >
              Start collaborating
            </Button>
          </div>
        </form>

        <a
          href="#reviews"
          className="flex items-center justify-center gap-2 text-white text-sm font-medium"
        >
          <Star className="fill-white size-5" />
          <span>4.9 stars based on 29 agencies</span>
        </a>

        <div className="overflow-x-auto self-stretch pt-24">
          <div className="flex w-max gap-8 pl-[max((100%-728px)/2,1rem)]">
            {Features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-3 text-white/65 text-sm mb-4 w-60 shrink-0 snap-start max-w-[230px]"
              >
                <span className="text-neutral-500">{feature.icon}</span>
                <p className="font-medium text-sm">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
