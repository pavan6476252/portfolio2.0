import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { IBlogResposne, IUpdateBlogDto } from "../../dto/blogs.dto";

export const GET_BLOG_BY_ID = gql`
  query getBlog($id: Int!) {
    getBlog(id: $id) {
      id
      metaTitle
      metaDescription
      metaKeywords
      markdownContent
      slug
      coverImage
      socialImage
      tags {
        id
        name
      }
      likes
      createdAt
      updatedAt
      visible
    }
  }
`;

export const UPDATE_BLOG_POST = gql`
  mutation updateBlog($id: Int!, $input: UpdateBlogPostDTO!) {
    updateBlog(id: $id, updateBlogPostDTO: $input) {
      id
      metaTitle
      metaDescription
      metaKeywords
      markdownContent
      tags {
        name
      }
      visible
    }
  }
`;

const AdminUpdateBlogScreen = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) {
    return <h1>Id not passed</h1>;
  }
  const [formData, setFormData] = useState<IUpdateBlogDto>({
    socialImageFile: undefined,
    coverImageFile: undefined,
    id: undefined,
    coverImage: undefined,
    socialImage: undefined,
    tags: [],
    visible: true,
    metaTitle: "",
    metaDescription: "",
    metaKeywords: [],
    markdownContent: "",
  });

  const { loading, error, data } = useQuery<{ getBlog: IBlogResposne }>(
    GET_BLOG_BY_ID,
    {
      variables: { id: parseInt(id, 10) },
    }
  );

  const [updateBlog] = useMutation<
    { updateBlog: { id: string } },
    { id: number; input: IUpdateBlogDto }
  >(UPDATE_BLOG_POST);

  useEffect(() => {
    if (data) {
      console.log(data);
      setFormData({
        socialImageFile: undefined,
        coverImageFile: undefined,
        id: data.getBlog.id,
        coverImage: data.getBlog.coverImage,
        socialImage: data.getBlog.socialImage,
        tags: data.getBlog.tags?.map((t) => t.name) ?? [],
        visible: data.getBlog.visible ?? true,
        metaTitle: data.getBlog.metaTitle,
        metaDescription: data.getBlog.metaDescription,
        metaKeywords: data.getBlog.metaKeywords,
        markdownContent: data.getBlog.markdownContent ?? "",
      });
    }
  }, [data]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.name === "visible") {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value === "true",
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSaveBlog = async () => {
    try {
      const { id, socialImage, coverImage, ...rest } = formData;
      if (!id) return;
      const { data } = await updateBlog({
        variables: {
          id: Number(id),
          input: { ...rest },
        },
      });
      if (data) {
        console.log("Blog updated with ID:", data.updateBlog.id);
      }
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="bg-gray-800 text-white flex flex-col h-full p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Update Blog</h1>
        <button
          onClick={handleSaveBlog}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500"
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
        <input
          name="visible"
          type="checkbox"
          checked={formData.visible}
          onChange={handleInputChange}
          className="w-full p-2 rounded bg-gray-700 text-white"
        />
      </div>

      <div className="grid grid-cols-2">
        <div>
          <h3>OLD image</h3>
          {formData.coverImage && <img src={formData.coverImage} />}
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
                    coverImageFile: files ? files[0] : undefined,
                  });
                }
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>
        {/* socialImageFile  */}
        <div>
          <h3>OLD image</h3>
          {formData.socialImage && <img src={formData.socialImage} />}
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

export default AdminUpdateBlogScreen;
