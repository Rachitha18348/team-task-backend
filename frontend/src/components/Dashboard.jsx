import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // GET TASKS
  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tasks");
      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // CREATE TASK
  const handleCreateTask = async () => {

    try {

      const user = JSON.parse(localStorage.getItem("user"));

      await axios.post("http://localhost:5000/api/tasks/create", {
        title,
        description,
        status: "Pending",
        createdBy: user._id,
        assignedTo: user._id
      });

      alert("Task Created Successfully");

      setTitle("");
      setDescription("");

      fetchTasks();

    } catch (error) {
      console.log(error);
      alert("Error creating task");
    }

  };

  // ✅ UPDATE TASK
  const updateTask = async (id, status) => {

    try {

      await axios.put(
        `http://localhost:5000/api/tasks/update/${id}`,
        { status }
      );

      fetchTasks();

    } catch (error) {
      console.log(error);
    }

  };

  // 🗑️ DELETE TASK
  const deleteTask = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/api/tasks/delete/${id}`
      );

      fetchTasks();

    } catch (error) {
      console.log(error);
    }

  };

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Tasks</h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      {/* CREATE TASK FORM */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">

        <h2 className="text-xl font-semibold mb-4">
          Create New Task
        </h2>

        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border rounded mb-3"
        />

        <input
          type="text"
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border rounded mb-3"
        />

        <button
          onClick={handleCreateTask}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Task
        </button>

      </div>

      {/* TASK LIST */}
      <div className="grid gap-4">

        {tasks.map((task) => (
          <div key={task._id} className="p-4 bg-white shadow rounded-lg">

            <h2 className="text-xl font-semibold">
              {task.title}
            </h2>

            <p className="text-gray-600">
              {task.description}
            </p>

            <p className="text-sm mt-2">
              Status: <b>{task.status}</b>
            </p>

            {/* UPDATE BUTTONS */}
            <div className="flex gap-2 mt-3">

              <button
                onClick={() => updateTask(task._id, "Pending")}
                className="bg-gray-500 text-white px-3 py-1 rounded"
              >
                Pending
              </button>

              <button
                onClick={() => updateTask(task._id, "In Progress")}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                In Progress
              </button>

              <button
                onClick={() => updateTask(task._id, "Completed")}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Completed
              </button>

              {/* DELETE BUTTON */}
              <button
                onClick={() => deleteTask(task._id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Dashboard;