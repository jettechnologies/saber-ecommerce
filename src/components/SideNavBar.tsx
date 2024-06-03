import { twMerge } from "tailwind-merge";

interface Props{
  className?: string;
  children: React.ReactNode;
}

const SideNavBar:React.FC<Props> = ({
  children,
  className
}) => {
  return (
    <div className={twMerge("w-full h-full py-8 px-4", className)}>
      <div className="flex flex-col">
        {children}
      </div>
    </div>
  )
}

export default SideNavBar