import { twMerge } from "tailwind-merge";

interface Props{
    select: {
        key:string;
        value:string;
    }[]
    className?:string
}

const Select:React.FC<Props> = ({select, className}) => {
  return (
    <select name="sort" id="sort" className={twMerge("p-3 text-size-500 font-medium font-roboto text-text-black capitalize cursor-pointer", className)}>
       {
            select.map(select => (
                <option key = {select.key} value={select.key}>
                    {select.value}
                </option>
            ))
       }
    </select>
  )
}

export default Select