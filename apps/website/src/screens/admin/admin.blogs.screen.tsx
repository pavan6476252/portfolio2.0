import React, { useEffect, useState } from "react";
import { fetchBlogs } from "../../store/api/admin/adminBlogsApi";
import { Link } from "react-router-dom";

interface Author {
  picture: string;
  email: string;
}

interface Tag {
  name: string;
  id: string;
}

interface BlogPost {
  title: string;
  content: string;
  likes: number;
  commentCount: number;
  author: Author;
  tags: Tag[];
}

const AdminBlogsScreen: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTitle, setSearchTitle] = useState<string>("");
  const [limit, setLimit] = useState<number>(10);
  const [offset, setOffset] = useState<number>(0);

  const fetchData = async () => {
    try {
      const data = await fetchBlogs(limit, offset, { title: searchTitle }); // Adjust the pagination and filter as needed
      setBlogs(data);
    } catch (err) {
      console.log(err);
      setError("Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTitle(e.target.value);
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLimit(parseInt(e.target.value, 10) || 1);
  };

  const handleOffsetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOffset(parseInt(e.target.value, 10) || 0);
  };

  const handleSearchClick = () => {
    fetchData();
  };

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-gray-800 text-white min-h-screen p-6">
      <div className="flex justify-between ">
        <h1 className="text-2xl font-bold mb-6">Blogs</h1>
        <Link to={"/admin/blogs/create"}>Create Blog</Link>
      </div>
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by title"
          value={searchTitle}
          onChange={handleSearchChange}
          className="px-4 py-2 border border-gray-700 rounded-lg bg-gray-900 text-white"
        />
        <input
          type="number"
          value={limit}
          onChange={handleLimitChange}
          className="px-4 py-2 border border-gray-700 rounded-lg bg-gray-900 text-white"
          placeholder="Limit"
        />
        <input
          type="number"
          value={offset}
          onChange={handleOffsetChange}
          className="px-4 py-2 border border-gray-700 rounded-lg bg-gray-900 text-white"
          placeholder="Offset"
        />
        <button
          onClick={handleSearchClick}
          className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-900 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-700">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">
                Title
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">
                Content
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">
                Likes
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">
                Comments
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">
                Author
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">
                Tags
              </th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog, index) => (
              <tr key={index} className="border-b border-gray-700">
                <td className="px-6 py-4">{blog.title}</td>
                <td className="px-6 py-4">{blog.content}</td>
                <td className="px-6 py-4">{blog.likes}</td>
                <td className="px-6 py-4">{blog.commentCount}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <img
                      src={blog.author.picture}
                      alt="Author"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div className="text-sm text-gray-300">
                      {blog.author.email}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {blog.tags.map((tag) => (
                    <div key={tag.id} className="text-sm text-gray-400">
                      {tag.name}
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBlogsScreen;
