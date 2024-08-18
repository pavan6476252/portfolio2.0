import React, { ReactNode, useState, useEffect, useRef } from "react";
import { cn } from "../utils/tailwind-merge";

interface EditableWrapperProps {
  onChange: (newValue: string) => void;
  initialValue: string;
  isEditable: boolean;
  maxRows?: number;
  className: string;
  placeholder?: string;
}

const EditableWrapper: React.FC<EditableWrapperProps> = ({
  className,
  initialValue,
  isEditable,
  maxRows, 
  onChange,
  placeholder = "Click to edit...", // default placeholder text
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue || ""); // Handle empty or undefined initial values
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value, isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    if (value.trim() === "") {
      // If value is empty, reset it to initialValue or placeholder
      setValue(initialValue || "");
    }
    onChange(value);
  };

  const handleClick = () => {
    if (isEditable) {
      setIsEditing(true);
    }
  };

  return (
    <>
      {isEditing && isEditable ? (
        <textarea
          rows={maxRows}
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setIsEditing(false);
            }
          }}
          className={cn(
            "w-full appearance-none resize-none focus:bg-transparent",
            className
          )}
          autoFocus
        />
      ) : (
        <span onClick={handleClick} className={className}>
          {value.trim() !== "" ? value : (
             placeholder.split("\\n").map((line, index) => (
              <span key={index}>
                {line}
                {index !== placeholder.split("\\n").length - 1 && <br />}
              </span>
            ))
          )}
        </span>
      )}
    </>
  );
};

export default EditableWrapper;
