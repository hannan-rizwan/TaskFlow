const setupSocket = (io) => {
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);
    socket.on("join-project", (projectId) => socket.join(`project:${projectId}`));
    socket.on("leave-project", (projectId) => socket.leave(`project:${projectId}`));
    socket.on("task-created", (data) => socket.to(`project:${data.projectId}`).emit("task-created", data.task));
    socket.on("task-updated", (data) => socket.to(`project:${data.projectId}`).emit("task-updated", data.task));
    socket.on("task-moved", (data) => socket.to(`project:${data.projectId}`).emit("task-moved", data));
    socket.on("task-deleted", (data) => socket.to(`project:${data.projectId}`).emit("task-deleted", data.taskId));
    socket.on("disconnect", () => console.log(`User disconnected: ${socket.id}`));
  });
};
module.exports = { setupSocket };
