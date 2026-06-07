import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../store/taskSlice";

export default function ProjectBoard() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { items: tasks } = useSelector(state => state.tasks);

  useEffect(() => { dispatch(fetchTasks(id)); }, [dispatch, id]);

  const columns = ["todo", "in-progress", "review", "done"];
  const titles = { todo: "To Do", "in-progress": "In Progress", review: "In Review", done: "Done" };

  return (
    <div className="p-6">
      <div className="flex gap-6 overflow-x-auto pb-4">
        {columns.map(col => (
          <div key={col} className="bg-gray-100 rounded-xl p-4 min-w-[300px] flex-shrink-0">
            <h2 className="font-bold text-lg mb-4">{titles[col]}</h2>
            <div className="space-y-3">
              {tasks.filter(t => t.column === col).map(task => (
                <div key={task._id} className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md">
                  <h3 className="font-medium">{task.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{task.description}</p>
                  <span className="text-xs mt-2 inline-block px-2 py-1 rounded-full bg-blue-100 text-blue-700">{task.priority}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
