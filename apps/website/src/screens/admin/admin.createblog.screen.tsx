import React, { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const AdminCreateBlogScreen: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleScrollSync = (e: React.UIEvent<HTMLTextAreaElement | HTMLDivElement>) => {
    if (!textareaRef.current || !previewRef.current) return;

    const target = e.target as HTMLTextAreaElement | HTMLDivElement;

    const textareaScrollTop = textareaRef.current.scrollTop;
    const previewScrollTop = previewRef.current.scrollTop;
    const textareaScrollHeight = textareaRef.current.scrollHeight;
    const previewScrollHeight = previewRef.current.scrollHeight;

    if (target === textareaRef.current) {
      const scrollRatio = textareaScrollTop / (textareaScrollHeight - textareaRef.current.clientHeight);
      previewRef.current.scrollTop = scrollRatio * (previewScrollHeight - previewRef.current.clientHeight);
    } else if (target === previewRef.current) {
      const scrollRatio = previewScrollTop / (previewScrollHeight - previewRef.current.clientHeight);
      textareaRef.current.scrollTop = scrollRatio * (textareaScrollHeight - textareaRef.current.clientHeight);
    }
  };


  const handleMarkdownChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(e.target.value);
  };

  const handleSaveBlog = () => {
    // Implement saving logic here, e.g., sending the markdown content to a server
    console.log("Blog content:", markdown);
  };

  return (
    <div className="bg-gray-800 text-white flex flex-col h-full p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Create Blog</h1>
        <button
          onClick={handleSaveBlog}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500"
        >
          Save Blog
        </button>
      </div>
      <hr className="my-3" />
      <div className="flex-1 grid overflow-hidden rounded-md bg-fuchsia-100 grid-cols-1 md:grid-cols-2 gap-4">
        <textarea
          className="bg-gray-900 text-white p-4  w-full h-full"
          placeholder="Write your markdown content here..."
          value={markdown}
          ref={textareaRef}
          onChange={handleMarkdownChange}
          onScroll={handleScrollSync}
          style={{ height: "100%" }}
        />
        <div className="p-4 rounded-lg overflow-y-auto h-full max-h-[80vh]"
           onScroll={handleScrollSync}
           ref={previewRef}
        >
          <ReactMarkdown
            className="markdown-preview prose"
            children={markdown}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminCreateBlogScreen;
