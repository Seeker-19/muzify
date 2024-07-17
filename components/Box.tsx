import { twMerge } from "tailwind-merge";

interface BoxProps {
  children: React.ReactNode;
  className?: string;
}

const Box: React.FC<BoxProps> = ({ children, className }) => {
  return (
    <div className={twMerge(`bg-[#2D2D2D] rounded-lg h-fit w-full`, className)}>
      {children}
    </div>
  );
};

export default Box;
