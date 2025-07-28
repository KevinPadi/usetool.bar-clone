import { useRef } from "react";
import { TextEffect } from "../components/TextEffect";
import { useInView } from "motion/react";
import ReviewCard from "../components/ReviewCard";

const reviews = [
  {
    avatar: "/src/assets/images/denis-bradu.jpg",
    alt: "Denis Bradu avatar",
    name: "Denis Bradu",
    role: "Founded Fintaxy",
    text: `When developing a complex finance product, constant changes and
modifications are inevitable. This tool has doubled our speed in
integrating changes and incorporating client feedback, as well as
improving internal collaboration within our team.`,
  },
  {
    avatar: "/src/assets/images/bogdan.avif",
    alt: "Bogdan avatar",
    name: "Bogdan",
    role: "CEO at Decebal",
    text: `Toolbar is a huge shortcut between the client and our web
application.`,
  },
  {
    avatar: "/src/assets/images/dorian-lesnic.jpg",
    alt: "Dorian Lesnic avatar",
    name: "Dorian Lesnic",
    role: "CEO at CardNeto",
    text: `I love how easy it is to leave comments directly on the website!
Instead of sending screenshots or Google Docs, I can mark
everything visually. It saves so much time and makes collaboration
easy.`,
  },
];

const Reviews = () => {
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
          See what other founders say.
        </TextEffect>
      </div>

      <div className="flex flex-col sm:flex-row gap-2.5 flex-nowrap w-full mt-10">
        <ReviewCard {...reviews[0]}>{reviews[0].text}</ReviewCard>
        <div className="flex flex-col gap-2.5">
          <ReviewCard {...reviews[1]}>{reviews[1].text}</ReviewCard>
          <ReviewCard {...reviews[2]}>{reviews[2].text}</ReviewCard>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
