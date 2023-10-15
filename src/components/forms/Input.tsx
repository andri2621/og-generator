import clsx from "clsx";
import React from "react";

type InputProps = {
  label: string;
  id: string;
  placeholder?: string;
  helperText?: string;
  type?: string;
} & React.ComponentPropsWithoutRef<"input">;

const Input = ({
  label,
  placeholder = "",
  helperText,
  id,
  type = "text",
  readOnly = false,
  className,
  ...rest
}: InputProps) => {
  return (
    <div className={clsx(className)}>
      <label htmlFor={id} className="block text-sm font-normal text-white">
        {label}
      </label>
      <div className="relative mt-1">
        <input
          {...rest}
          type={type}
          name={id}
          id={id}
          readOnly={readOnly}
          className={clsx(
            "focus:ring-cyan-500 px-1 focus-visible:outline-cyan-500 border-2 border-slate-400 text-black text-sm focus:border-cyan-500 block w-full rounded-md shadow-sm"
          )}
          placeholder={placeholder}
          aria-describedby={id}
        />
      </div>
    </div>
  );
};

export default Input;
