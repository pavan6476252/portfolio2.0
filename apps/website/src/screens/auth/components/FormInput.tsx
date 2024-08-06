import React from "react";
interface Props {
  label: string;
  type: React.HTMLInputTypeAttribute;
  name: string;
  value?: string;
  placeholder: string;

  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
function FormInput({ label, type, name, value, placeholder, onChange }: Props) {
  return (
    <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
      <div className="flex justify-between">
        <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
          {label}
        </label>
      </div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:font-medium placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground"
      />
    </div>
  );
}

export default FormInput;
