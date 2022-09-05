import { connectToDatabase } from "../../../util/mongodb";

export default async function getAllBoards(req, res) {
  try {
    const { db } = await connectToDatabase();

    const allBoards = await db
      .collection("public")
      .find({})
      .sort({ name: 1 })
      .project({ _id: 1, name: 1, slug: 1 })
      .toArray();

    res.json({ allBoards });
  } catch (e) {
    res.status(500);
    res.json({ error: "Unable to fetch boards...sorry" });
  }
}
