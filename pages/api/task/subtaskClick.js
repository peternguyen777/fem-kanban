import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../util/mongodb";

export default async function (req, res) {
  try {
    const { db } = await connectToDatabase();

    const { title, isCompleted, boardId, colId, taskId } = req.body;

    const result = await db.collection("public").updateOne(
      { _id: ObjectId(boardId) },
      {
        $set: {
          "columns.$[column].tasks.$[task].subtasks.$[subtask].isCompleted":
            !isCompleted,
        },
      },
      {
        arrayFilters: [
          {
            "column._id": ObjectId(colId),
          },
          {
            "task._id": ObjectId(taskId),
          },
          {
            "subtask.title": title,
          },
        ],
      }
    );

    res.status(200);
    res.json({ subtaskClick: result });
  } catch (e) {
    res.status(500);
    res.json({ error: "Unable to edit board...sorry" });
  }
}
