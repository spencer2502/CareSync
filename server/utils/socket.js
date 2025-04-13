import { io } from "./server.js";
import AccessControl from "./models/accessControlModel.js";
import mongoose from "mongoose";

const connectedDoctors = new Map();
const connectedUsers = new Map();

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("register", ({ id, role }) => {
    if (role === "Doctor") connectedDoctors.set(id, socket.id);
    else if (role === "User") connectedUsers.set(id, socket.id);
  });

  // Doctor sends request to access records
  socket.on("request_access", async ({ doctorId, patientUniqueId }) => {
    const user = await mongoose
      .model("User")
      .findOne({ patientId: patientUniqueId });
    if (user) {
      const userSocketId = connectedUsers.get(user._id.toString());
      if (userSocketId) {
        io.to(userSocketId).emit("access_request", {
          doctorId,
          patientId: user._id,
        });
      }
    }
  });

  // Patient approves or declines
  socket.on("respond_access", async ({ doctorId, patientId, approved }) => {
    const doctor = await mongoose.model("Doctor").findOne({ doctorId });

    if (approved && doctor) {
      const expiresAt = new Date(Date.now() + 30 * 60 * 1000); // 30 min
      await AccessControl.create({
        doctor: doctor._id,
        patient: patientId,
        expiresAt,
      });
    }

    const doctorSocketId = connectedDoctors.get(doctorId);
    if (doctorSocketId) {
      io.to(doctorSocketId).emit("access_result", {
        approved,
        expiresAt: approved ? Date.now() + 30 * 60 * 1000 : null,
      });
    }
  });

  socket.on("disconnect", () => {
    for (const [id, sock] of connectedDoctors.entries()) {
      if (sock === socket.id) connectedDoctors.delete(id);
    }
    for (const [id, sock] of connectedUsers.entries()) {
      if (sock === socket.id) connectedUsers.delete(id);
    }
  });
});
