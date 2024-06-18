import { twMerge } from "tailwind-merge";

interface Props{
  children: React.ReactNode;
  className: string;
}

const Hero:React.FC<Props> = ({
  children,
  className
}) =>{

  return(
    <div className={twMerge("w-full h-full pt-5 pb-10 lg:py-0 flex flex-col gap-8 lg:flex-row", className)}>
      {children}
    </div>
  );  
}

export default Hero;