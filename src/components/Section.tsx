import { ReactNode } from "react";
import { ArrowRightCircleIcon } from "lucide-react";
import { Link } from "react-router-dom";

type SectionProps = {
  title: string;
  link: string;
  children: ReactNode;
};

const Section: React.FC<SectionProps> = ({ title, children, link }) => {
  return (
    <>
      <div className="w-full flex justify-between items-center">
        <h3 className="text-5xl text-black font-bold capitalize">
          {title}
        </h3>
        <Link to = {link}>
          <div className = "w-fit h-fit relative flex gap-1 items-center">
            <p className="text-size-500 font-medium text-black capitalize">View all</p>
            <ArrowRightCircleIcon size = {24}/>
          </div>
          </Link>
        </div>
      <div>{children}</div>
    </>
  );
};

export default Section;
