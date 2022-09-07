import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../util/mongodb";

export default async function dndBoard(req, res) {
  try {
    const { db } = await connectToDatabase();

    const {
      dndBoard: { columns, _id },
    } = req.body;

    for (let i = 0; i < columns.length; i++) {
      for (let j = 0; j < columns[i].tasks.length; j++) {
        columns[i].tasks[j]._id = ObjectId(columns[i].tasks[j]._id);
      }
      columns[i]._id = ObjectId(columns[i]._id);
    }

    const result = await db.collection("public").updateOne(
      { _id: ObjectId(_id) },
      {
        $set: {
          columns: columns,
        },
      }
    );

    res.status(200);
    res.json({ dndBoard: result });
  } catch (e) {
    res.status(500);
    res.json({ error: "Unable to dnd board...sorry" });
  }
}
