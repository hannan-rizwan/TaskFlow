import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProjects } from "../store/projectSlice";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { items: projects } = useSelector(state => state.projects);

  useEffect(() => { dispatch(fetchProjects()); }, [dispatch]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Projects</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">+ New Project</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
          <Link key={project._id} to={`/project/${project._id}`} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4" style={{ borderTopColor: project.color || "#3B82F6" }}>
            <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
            <p className="text-gray-600">{project.description}</p>
            <p className="text-sm text-gray-400 mt-4">{project.members?.length || 0} members</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
