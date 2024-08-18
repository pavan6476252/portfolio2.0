// import React, { useRef, useState } from "react";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import rehypeRaw from "rehype-raw";
// import MarkdownEditor from "@uiw/react-markdown-editor";

// const AdminAdminCreateBlogScreen: React.FC = () => {
//   const [markdown, setMarkdown] = useState<string>("");
//   const textareaRef = useRef<HTMLTextAreaElement>(null);
//   const previewRef = useRef<HTMLDivElement>(null);

//   const handleScrollSync = (
//     e: React.UIEvent<HTMLTextAreaElement | HTMLDivElement>
//   ) => {
//     if (!textareaRef.current || !previewRef.current) return;

//     const target = e.target as HTMLTextAreaElement | HTMLDivElement;

//     const textareaScrollTop = textareaRef.current.scrollTop;
//     const previewScrollTop = previewRef.current.scrollTop;
//     const textareaScrollHeight = textareaRef.current.scrollHeight;
//     const previewScrollHeight = previewRef.current.scrollHeight;

//     if (target === textareaRef.current) {
//       const scrollRatio =
//         textareaScrollTop /
//         (textareaScrollHeight - textareaRef.current.clientHeight);
//       previewRef.current.scrollTop =
//         scrollRatio * (previewScrollHeight - previewRef.current.clientHeight);
//     } else if (target === previewRef.current) {
//       const scrollRatio =
//         previewScrollTop /
//         (previewScrollHeight - previewRef.current.clientHeight);
//       textareaRef.current.scrollTop =
//         scrollRatio * (textareaScrollHeight - textareaRef.current.clientHeight);
//     }
//   };

//   const handleMarkdownChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setMarkdown(e.target.value);
//   };

//   const handleSaveBlog = () => {
//     // Implement saving logic here, e.g., sending the markdown content to a server
//     console.log("Blog content:", markdown);
//   };

//   return (
//     <div className="bg-gray-900 text-white flex flex-col h-full p-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold">Create Blog</h1>
//         <button
//           onClick={handleSaveBlog}
//           className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500"
//         >
//           Save Blog
//         </button>
//       </div>
//       <hr className="my-3" />
//       <div className="flex-1 grid overflow-hidden rounded-md bg-fuchsia-100 grid-cols-1 md:grid-cols-2 gap-4">
//         <MarkdownEditor
//           className="bg-gray-900 text-white p-4  w-full h-full"
//           value={""}
//           onChange={(value, viewUpdate) => {}}
//         />
//         <div
//           className="p-4 rounded-lg overflow-y-auto h-full max-h-[80vh]"
//           onScroll={handleScrollSync}
//           ref={previewRef}
//         >
//           <MarkdownEditor.Markdown source={""} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminAdminCreateBlogScreen;

import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { gql } from "@apollo/client";
import { ICreateBlogDto } from "../../dto/blogs.dto";
 
export const CREATE_BLOG_POST = gql`
  mutation CreateBlog($input: CreateBlogPostDTO!) {
    createBlog(createBlogPostDTO: $input) {
      id
    }
  }
`;


const AdminCreateBlogScreen = () => {
  const [formData, setFormData] = useState<ICreateBlogDto>({
    socialImageFile: undefined,
    coverImageFile: null,
    tags: [],
    visible: true,
    metaTitle: "",
    metaDescription: "",
    metaKeywords: [],
    markdownContent: "",
  });

  const [createBlog] = useMutation<
    { createBlog: { id: string } },
    { input: ICreateBlogDto }
  >(CREATE_BLOG_POST);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveBlog = async () => {
    try {
      const { data } = await createBlog({
        variables: {
          input: formData,
        },
      });
      if (data) {
        console.log("Blog created with ID:", data.createBlog.id);
      }
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  return (
    <div className="bg-gray-900 text-white flex flex-col h-full p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Create Blog</h1>
        <button
          onClick={handleSaveBlog}
          className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-blue-500"
        >
          Save Blog
        </button>
      </div>
      <hr className="my-3" />
      <div className="space-y-4">
        <input
          type="text"
          name="metaTitle"
          placeholder="Meta Title"
          value={formData.metaTitle}
          onChange={handleInputChange}
          className="w-full p-2 rounded bg-gray-700 text-white"
        />
        <input
          type="text"
          name="metaKeywords"
          placeholder="Meta Keywords"
          value={formData.metaKeywords.join(",")}
          onChange={(e) => {
            setFormData({
              ...formData,
              metaKeywords: e.target.value.split(","),
            });
          }}
          className="w-full p-2 rounded bg-gray-700 text-white"
        />
        <input
          type="text"
          name="tags"
          placeholder="tags"
          value={formData.tags.join(",")}
          onChange={(e) => {
            setFormData({
              ...formData,
              tags: e.target.value.split(","),
            });
          }}
          className="w-full p-2 rounded bg-gray-700 text-white"
        />
        <textarea
          name="metaDescription"
          placeholder="Meta Description"
          value={formData.metaDescription}
          onChange={handleInputChange}
          className="w-full p-2 rounded bg-gray-700 text-white"
        />
      </div>
      <div className="grid grid-cols-2">
        <div>
          {formData.coverImageFile && (
            <img src={URL.createObjectURL(formData.coverImageFile)} />
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Cover Image
            </label>
            <input
              type="file"
              name="coverImageFile"
              accept="image/png, image/gif, image/jpeg"
              onChange={({ target: { validity, files } }) => {
                if (validity.valid) {
                  setFormData({
                    ...formData,
                    coverImageFile: files ? files[0] : null,
                  });
                }
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>
        {/* socialImageFile  */}
        <div>
          {formData.socialImageFile && (
            <img src={URL.createObjectURL(formData.socialImageFile)} />
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Social Image
            </label>
            <input
              type="file"
              name="socialImageFile"
              accept="image/png, image/gif, image/jpeg"
              onChange={({ target: { validity, files } }) => {
                if (validity.valid) {
                  setFormData({
                    ...formData,
                    socialImageFile: files ? files[0] : undefined,
                  });
                }
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>
      <br />
      <MarkdownEditor
        className="bg-gray-900 text-white p-4 w-full h-full"
        value={formData.markdownContent}
        onChange={(value) =>
          setFormData({ ...formData, markdownContent: value })
        }
      />
    </div>
  );
};

export default AdminCreateBlogScreen;
