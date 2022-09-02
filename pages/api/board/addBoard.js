import { connectToDatabase } from "../../../util/mongodb";
import { randomColor } from "randomcolor";
import { ObjectId } from "mongodb";

export default async function (req, res) {
  try {
    const { db } = await connectToDatabase();

    const {
      createBoard: { columns, name },
    } = req.body;

    const cols = columns.map((col) => ({
      ...col,
      color: randomColor(),
      _id: ObjectId(),
    }));

    const result = await db
      .collection("public")
      .insertOne({ name, columns: cols });

    res.status(200);
    res.json({ createBoard: result });
  } catch (e) {
    res.status(500);
    res.json({ error: "Unable to insert board...sorry" });
  }
}
