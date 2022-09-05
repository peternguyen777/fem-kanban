import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../util/mongodb";

export default async function getCurrentBoard(req, res) {
  try {
    const { db } = await connectToDatabase();

    const id = req.query.currentBoard;

    const result = await db.collection("public").findOne({ _id: ObjectId(id) });

    res.status(200);
    res.json({ currentBoard: result });
  } catch (e) {
    res.status(500);
    res.json({ error: "Unable to fetch current board...sorry" });
  }
}
