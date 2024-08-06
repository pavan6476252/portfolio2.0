import React from "react";
import CardLayout from "../../components/card-layout";

function BlogSection() {
  const blogs = [
    {
      title: "The 2024 State of the Website",
      description:
        "Discover key challenges today’s marketing teams are facing, as well as opportunities for businesses in 2024.",
      link: "#",
      linkText: "Read report",
      image:
        "https://cdn.prod.website-files.com/6515a6d5f30daec433d0abe2/6543dd59d1175a1639d298cb_ebook_2024StateOfTheWebsite_Blog_2400x1260-p-500.webp",
    },
    {
      title: "Webflow 101",
      description:
        "Learn the fundamentals of web design and development through this comprehensive course.",
      link: "#",
      linkText: "Learn more",
      image:
        "https://cdn.prod.website-files.com/6515a6d5f30daec433d0abe2/6543dd59d1175a1639d298cb_ebook_2024StateOfTheWebsite_Blog_2400x1260-p-500.webp",
    },
    {
      title: "Marketplace",
      description:
        "From templates to Experts, discover everything you need to create an amazing site with Webflow.",
      link: "#",
      linkText: "Browse",
      image:
        "https://cdn.prod.website-files.com/6515a6d5f30daec433d0abe2/6543dd59d1175a1639d298cb_ebook_2024StateOfTheWebsite_Blog_2400x1260-p-500.webp",
    },
    {
      title: "Webflow University",
      description:
        "Search from our library of lessons covering everything from layout and typography to interactions and 3D transforms.",
      link: "#",
      linkText: "Visit Webflow University",
      image:
        "https://cdn.prod.website-files.com/6515a6d5f30daec433d0abe2/6543dd59d1175a1639d298cb_ebook_2024StateOfTheWebsite_Blog_2400x1260-p-500.webp",
    },
    {
      title: "Webflow University",
      description:
        "Search from our library of lessons covering everything from layout and typography to interactions and 3D transforms.",
      link: "#",
      linkText: "Visit Webflow University",
      image:
        "https://cdn.prod.website-files.com/6515a6d5f30daec433d0abe2/6543dd59d1175a1639d298cb_ebook_2024StateOfTheWebsite_Blog_2400x1260-p-500.webp",
    },
    {
      title: "Webflow University",
      description:
        "Search from our library of lessons covering everything from layout and typography to interactions and 3D transforms.",
      link: "#",
      linkText: "Visit Webflow University",
      image:
        "https://cdn.prod.website-files.com/6515a6d5f30daec433d0abe2/6543dd59d1175a1639d298cb_ebook_2024StateOfTheWebsite_Blog_2400x1260-p-500.webp",
    },
  ];

  return (
    <section className="">
      <div className="container mx-auto">
        <h2 className="text-6xl text-white text-left font-bold mb-4 leading-tight">
          Explore some blogs
        </h2>
        <p className="text-xl mb-12 text-left text-white">
          Browse the Marketplace, educational videos, and customer stories.
        </p>
      </div>
      <div className="flex pl-14 gap-8 overflow-x-scroll no-scrollbar  ">
        {blogs.map((blog, idx) => (
          <CardLayout className="min-w-[400px] text-white w-[400px] aspect-[8/9]  border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6 flex flex-col items-start">
              <h3 className="text-2xl font-semibold mb-2 text-left">
                {blog.title}
              </h3>
              <p className="text-gray-700 text-left  mb-4">
                {blog.description}
              </p>
              <a
                href={blog.link}
                className="text-blue-600  hover:underline flex items-center"
              >
                {blog.linkText} <span className="ml-2">&rarr;</span>
              </a>
            </div>
          </CardLayout>
        ))}
      </div>
    </section>
  );
}

export default BlogSection;
