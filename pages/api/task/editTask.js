import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../util/mongodb";

export default async function editTask(req, res) {
  try {
    const { db } = await connectToDatabase();

    const { boardId, colId, taskId, ...taskData } = await req.body;

    const result = await db.collection("public").updateOne(
      { _id: ObjectId(boardId) },

      {
        $set: {
          "columns.$[column].tasks.$[task].title": taskData.title,
          "columns.$[column].tasks.$[task].description": taskData.description,
          "columns.$[column].tasks.$[task].status": taskData.status,
          "columns.$[column].tasks.$[task].subtasks": taskData.subtasks,
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
        ],
      }
    );

    res.status(200);
    res.json({ editTask: result });
  } catch (e) {
    res.status(500);
    res.json({ error: "Unable to edit task...sorry" });
  }
}
