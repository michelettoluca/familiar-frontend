import classNames from "classnames";

const Input = ({ className, ...props }) => {
   const inputClass = classNames(
      "min-w-0 py-2 px-3 bg-white border border-gray-300 rounded-sm placeholder:text-gray-400",
      className
   );

   return <textarea className={inputClass} {...props} />;
};

export default Input;
