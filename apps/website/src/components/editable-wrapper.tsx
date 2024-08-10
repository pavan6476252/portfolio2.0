import { ReactNode, useState, useEffect, useRef } from "react";
import { cn } from "../utils/tailwind-merge";

interface EditableWrapperProps {
  children: ReactNode;
  onChange: (newValue: string) => void;
  initialValue: string;
  isEditable: boolean;
  maxRows?:number;
  className: string;
}

const EditableWrapper: React.FC<EditableWrapperProps> = ({
  className,
  children,
  initialValue,
  isEditable,
  maxRows,
  onChange,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value, isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    onChange(value);
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
          onKeyPress={(e) => {
            if (e.key === "Escape") {
              setIsEditing(false);
            }
          }}
          className={cn(
            ` w-full appearance-none resize-none focus:bg-transparent `,
            className
          )}
          autoFocus
        />
      ) : (
        <span onClick={() => setIsEditing(true)} className={className}>
          {children}
        </span>
      )}
    </>
  );
};

export default EditableWrapper;
