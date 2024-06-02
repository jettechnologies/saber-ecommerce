import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

interface Props{
  children: React.ReactNode;
  size?: "small" | "medium" | "large";
  type?: "black" | "white";
  btnLink: string;
  className?: string;
}

const Button:React.FC<Props> = ({children, type = "black", size = "medium", className, btnLink = "/" }) => {


  const sizeClassNames = {
      small: "px-4 py-2",
      medium: "px-6 py-3",
      large: "px-10 py-4",
  };

  const typeClassNames = {
    black: "bg-[#141718] text-white",
    white: "bg-white text-[#141718] border border-black",
  }

return (
  <Link to = {btnLink}>
    <button className={twMerge("rounded-md font-semibold font-roboto", sizeClassNames[size], typeClassNames[type], className)}>
      {children}
    </button>
  </Link>
)
}


export default Button;
