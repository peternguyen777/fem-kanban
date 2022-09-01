import { connectToDatabase } from "../../../util/mongodb";

export default async function (req, res) {
  try {
    const { db } = await connectToDatabase();

    const slug = await req.query.currentBoard;

    const currentBoard = await db.collection("public").findOne({ slug });
    res.status(200);
    res.json({ currentBoard });
  } catch (e) {
    res.status(500);
    res.json({ error: "Unable to fetch current board...sorry" });
  }
}