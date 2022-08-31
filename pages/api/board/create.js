import { connectToDatabase } from "../../../util/mongodb";

export default async function (req, res) {
  try {
    const { db } = await connectToDatabase();

    const {
      createBoard: { columns, name },
    } = req.body;

    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const result = await db
      .collection("public")
      .insertOne({ name, slug, columns });

    res.status(201);
    res.json({ createBoard: result });
  } catch (e) {
    res.status(500);
    res.json({ error: "Unable to insert board...sorry" });
  }
}
