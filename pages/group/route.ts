export const runtime = "edge"; // 'nodejs' is the default
import { type NextRequest } from "next/server";

export default async function GET(request: Request) {
  // const res = await fetch("https://data.mongodb-api.com/...", {
  //   headers: {
  //     "Content-Type": "application/json",
  //     "API-Key": process.env.DATA_API_KEY,
  //   },
  // });
  // const data = await res.json();

  return Response.json({
    description: "",
    image:
      "ipfs://bafybeiee2izhnbou763wmwyptsdyrjitsytatflfn3brxzqvksfrepsdcu/1.png",
    name: "Day 1",
    attributes: [{ trait_type: "Number", value: "1" }],
  });
}
