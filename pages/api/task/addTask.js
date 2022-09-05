import { connectToDatabase } from "../../../util/mongodb";
import { ObjectId } from "mongodb";

export default async function addTask(req, res) {
  try {
    const { db } = await connectToDatabase();

    const { boardId, ...taskData } = req.body;

    const task = { ...taskData, _id: ObjectId() };

    const result = await db.collection("public").updateOne(
      { _id: ObjectId(boardId) },
      {
        $push: {
          "columns.$[column].tasks": task,
        },
      },
      {
        arrayFilters: [
          {
            "column.name": task.status,
          },
        ],
      }
    );

    res.status(200);
    res.json({ createBoard: result });
  } catch (e) {
    res.status(500);
    res.json({ error: "Unable to insert board...sorry" });
  }
}
