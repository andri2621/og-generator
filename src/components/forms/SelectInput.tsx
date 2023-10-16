import clsx from "clsx";
import * as React from "react";
import { RegisterOptions, useFormContext } from "react-hook-form";

export type SelectInputProps = {
  label: string;
  id: string;
  placeholder?: string;
  helperText?: string;
  type?: string;
  readOnly?: boolean;
  validation?: RegisterOptions;
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<"select">;

export default function SelectInput({
  label,
  helperText,
  id,
  placeholder,
  readOnly = false,
  children,
  validation,
  className,
  ...rest
}: SelectInputProps) {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  const value = watch(id);

  // Add disabled and selected attribute to option, will be used if readonly
  const readOnlyChildren = React.Children.map<React.ReactNode, React.ReactNode>(
    children,
    (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(
          child as React.ReactElement<SelectInputProps>,
          {
            disabled: child.props.value !== rest?.defaultValue,
            // selected: child.props.value === rest?.defaultValue,
          }
        );
      }
    }
  );

  return (
    <div className={clsx(className)}>
      <label htmlFor={id} className="block text-sm font-normal text-white">
        {label}
      </label>
      <div className="relative mt-1">
        <select
          {...register(id, validation)}
          // defaultValue to value blank, will get overriden by ...rest if needed
          defaultValue=""
          {...rest}
          name={id}
          id={id}
          className={clsx(
            "focus:ring-cyan-500 px-1 focus-visible:outline-cyan-500 border-2 border-slate-400 text-black text-sm focus:border-cyan-500 block w-full rounded-md shadow-sm",
            { "text-gray-500": value === "" }
          )}
          aria-describedby={id}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {readOnly ? readOnlyChildren : children}
        </select>

        {errors[id] && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <div className="text-xl text-red-500">Icon</div>
          </div>
        )}
      </div>
      <div className="mt-1">
        {helperText && <p className="text-xs text-gray-500">{helperText}</p>}
        {/* {errors[id] && (
          <span className='text-sm text-red-500'>{errors[id].message}</span>
        )} */}
      </div>
    </div>
  );
}
