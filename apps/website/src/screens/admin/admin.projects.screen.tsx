import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
 import ProjectCard from "./components/project-card.component";

const AdminProjectsScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  // const projects = useAppSelector((state) => state.projects.projects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // await dispatch(fetchProjects());
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Projects</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {projects.map((project: Project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={()=>{}}
               
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminProjectsScreen;
