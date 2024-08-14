// import { twMerge } from "tailwind-merge";
// import React from "react"

// interface Props{
//     select: {
//         key:string;
//         value:string;
//     }[]
//     className?:string;
//     defaultText:string;
//     id:string;
//     name: string;
//     isMultiple?:boolean;
//     // value?:string;
//     handleInputChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
// }

// const Select:React.FC<Props> = ({select, className, isMultiple, id, name, defaultText, handleInputChange}) => {

//   return (
//     <select 
//       name={name} 
//       id={id} 
//       multiple = {isMultiple}
//       // value={value}
//       className={twMerge("py-2 px-4 rounded-md text-size-400 font-normal font-roboto text-text-black capitalize cursor-pointer", className)}
//       onChange={handleInputChange}
//     >
//       <option disabled selected hidden value="">
//         {defaultText}
//       </option>
//        {
//             select.map(select => (
//                 <option key = {select.key} value={select.key}>
//                     {select.value}
//                 </option>
//             ))
//        }
//     </select>
//   )
// }

// export default Select

import { twMerge } from "tailwind-merge";
import React from "react";

interface SelectOption {
  key: string;
  value: string;
}

interface Props {
  select: SelectOption[];
  className?: string;
  defaultText: string;
  id: string;
  name: string;
  isMultiple?: boolean;
  value?: string | string[]; // For controlled component
  handleInputChange?: (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => void;
}

const Select: React.FC<Props> = ({
  select,
  className,
  isMultiple = false,
  id,
  name,
  defaultText,
  value,
  handleInputChange,
}) => {
  return (
    <select
      name={name}
      id={id}
      multiple={isMultiple}
      value={value}
      defaultValue="default"
      className={twMerge(
        "py-2 px-4 rounded-md text-size-400 font-normal font-roboto text-text-black capitalize cursor-pointer",
        className
      )}
      onChange={handleInputChange}
    >
      {!isMultiple && (
        <option disabled hidden value="default">
          {defaultText}
        </option>
      )}
      {select.map((option) => (
        <option key={option.key} value={option.key}>
          {option.value}
        </option>
      ))}
    </select>
  );
};

export default Select;
