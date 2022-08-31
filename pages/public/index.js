import { connectToDatabase } from "../../util/mongodb";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home({ boardData }) {
  const router = useRouter();
  useEffect(() => {
    router.push(`/public/${boardData?.slug}`);
  }, [boardData]);
}

export async function getServerSideProps(context) {
  const { db } = await connectToDatabase();

  const data = await db.collection("public").findOne({});

  const boardData = JSON.parse(JSON.stringify(data));

  return {
    props: { boardData },
  };
}
