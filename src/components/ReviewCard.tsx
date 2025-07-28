interface ReviewCardProps {
  avatar: string;
  alt: string;
  name: string;
  role: string;
  children: React.ReactNode;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  avatar,
  alt,
  name,
  role,
  children,
}) => (
  <div className="bg-neutral-900 hover:bg-neutral-800/50 transition duration-300 px-[24px] w-full sm:w-[345px] h-fit py-[24px] rounded-4xl font-medium group">
    <div className="flex gap-3">
      <img
        src={avatar}
        alt={alt}
        className="size-[42px] rounded-xl group-hover:scale-[1.7] group-hover:-rotate-6 origin-bottom-right transition ease"
      />
      <div className="flex flex-col">
        <span className="text-white text-base">{name}</span>
        <span className="text-white/60 text-sm">{role}</span>
      </div>
    </div>
    <p className="text-white/60 text-sm mt-3">{children}</p>
  </div>
);

export default ReviewCard;
