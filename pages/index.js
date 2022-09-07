import { connectToDatabase } from "../util/mongodb";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home({ boardData }) {
  const router = useRouter();

  useEffect(() => {
    if (boardData === "createBoard") {
      router.push("/public/create");
    } else {
      router.push(`/public/${boardData?._id}`);
    }
  }, [boardData, router]);
}

export async function getServerSideProps(context) {
  const { db } = await connectToDatabase();
  const data = await db
    .collection("public")
    .find({}, { name: 1, _id: 1 })
    .sort({ name: 1 })
    .toArray();

  if (data.length === 0) {
    var boardData = "createBoard";
  } else {
    var boardData = JSON.parse(JSON.stringify(data[0]));
  }

  return {
    props: { boardData },
  };
}
