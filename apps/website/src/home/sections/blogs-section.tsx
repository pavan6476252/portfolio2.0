import React from "react";
import { useQuery, gql } from "@apollo/client";
import CardLayout from "../../components/card-layout";
import { IBlogResposne } from "../../dto/blogs.dto";
import { useAppSelector } from "../../store/store";
import { Link } from "react-router-dom";
import SpeadedRadialGradient from "../../components/animation/spreaded-radial-gradient";
import { FaGithub } from "react-icons/fa";

function BlogSection() {
  const blogs = useAppSelector((s) => s.home.blogs);
  if (!blogs || blogs.length<=0) {
    return null;
  }
  return (
    <section>
       <br />
      <br />
      <div className="container mx-auto">
         
        <h2 className="text-6xl text-white text-left font-bold mb-4 leading-tight">
          Explore some blogs
        </h2>
        <p className="text-xl mb-12 text-left text-white">
          Browse the Marketplace, educational videos, and customer stories.
        </p>
      </div>
      <div className="flex gap-8 overflow-x-scroll no-scrollbar">
        {blogs.map((blog,idx) => (
         <CardLayout
         key={blog.id}
         className={`${idx === 0 && "ml-20"} ${
           idx === blogs.length - 1 && "mr-20"
         } relative min-w-[400px] text-white w-[400px] aspect-[7/9] transition duration-300 my-auto flex flex-col`}
        
       >
         <Link to={`/blogs/${blog.id}`}>
           <SpeadedRadialGradient className="" />
           <div className="flex flex-col justify-between h-full">
             <img
               src={blog?.socialImage || ""}
               alt=""
               className="w-full h-auto aspect-video "
             />
             <div className="flex-1 p-4">
               <div className="flex flex-col items-start">
                 <h4 className="text-lg text-left font-bold mb-2">
                   {blog.metaTitle}
                 </h4>
                 <p className="text-left">{blog.metaDescription}</p>
               </div>

               <div className="flex flex-wrap mt-4">
                 {blog.metaKeywords?.map((tech, i) => (
                   <span
                     key={i}
                     className="bg-gray-800 text-white px-2 py-1 rounded mr-2 mb-2"
                   >
                     {tech}
                   </span>
                 ))}
               </div>
               <Link
                 to={`/blogs/${blog.id}`}
                 className="group absolute bottom-5 right-5 flex items-center gap-2 text-blue-500"
               >
                 View Project <FaGithub />
               </Link>
             </div>
           </div>
         </Link>
       </CardLayout>
        ))}
      </div>
      <br />
    </section>
  );
}

export default BlogSection;
