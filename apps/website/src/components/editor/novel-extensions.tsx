import {
    TiptapImage,
    TiptapLink,
    UpdatedImage,
    TaskList,
    TaskItem,
    HorizontalRule,
    StarterKit,
    Placeholder,
  } from "novel/dist/extensions";
import { cn } from "../../utils/tailwind-merge";
   
  // TODO I am using cn here to get tailwind autocomplete working, idk if someone else can write a regex to just capture the class key in objects
  
  // You can overwrite the placeholder with your own configuration
  const placeholder = Placeholder;
  const tiptapLink = TiptapLink.configure({
    HTMLAttributes: {
      class: cn(
        "text-muted-foreground underline underline-offset-[3px] hover:text-primary transition-colors cursor-pointer",
      ),
    },
  });
  
  const taskList = TaskList.configure({
    HTMLAttributes: {
      class: cn("not-prose pl-2"),
    },
  });
  const taskItem = TaskItem.configure({
    HTMLAttributes: {
      class: cn("flex items-start my-4"),
    },
    nested: true,
  });
  
  const horizontalRule = HorizontalRule.configure({
    HTMLAttributes: {
      class: cn("mt-4 mb-6 border-t border-muted-foreground"),
    },
  });
  
  const starterKit = StarterKit.configure({
    bulletList: {
      HTMLAttributes: {
        class: cn("list-disc list-outside leading-3 -mt-2"),
      },
    },
    orderedList: {
      HTMLAttributes: {
        class: cn("list-decimal list-outside leading-3 -mt-2"),
      },
    },
    listItem: {
      HTMLAttributes: {
        class: cn("leading-normal -mb-2"),
      },
    },
    blockquote: {
      HTMLAttributes: {
        class: cn("border-l-4 border-primary"),
      },
    },
    codeBlock: {
      HTMLAttributes: {
        class: cn("rounded-sm bg-muted border p-5 font-mono font-medium"),
      },
    },
    code: {
      HTMLAttributes: {
        class: cn("rounded-md bg-muted  px-1.5 py-1 font-mono font-medium"),
        spellcheck: "false",
      },
    },
    horizontalRule: false,
    dropcursor: {
      color: "#DBEAFE",
      width: 4,
    },
    gapcursor: false,
  });
  
  export const defaultExtensions = [
    starterKit,
    placeholder,
    TiptapLink,
    TiptapImage,
    // updatedImage,
    taskList,
    taskItem,
    horizontalRule,
  ];
  