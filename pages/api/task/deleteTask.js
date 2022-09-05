import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../util/mongodb";

export default async function deleteTask(req, res) {
  try {
    const { db } = await connectToDatabase();

    const { boardId, colId, taskId } = await JSON.parse(req.body);

    const result = await db.collection("public").updateOne(
      { _id: ObjectId(boardId) },
      {
        $pull: { "columns.$[].tasks": { _id: ObjectId(taskId) } },
      }
    );

    res.status(200);
    res.json({ taskDelete: result });
  } catch (e) {
    res.status(500);
    res.json({ error: "Unable to delete task...sorry" });
  }
}
