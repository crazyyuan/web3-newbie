import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs/promises"; // 使用 Node.js 的 fs 模块来读取文件
import path from "path";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    // 读取本地图片文件的路径
    const filePath = path.join(process.cwd(), "public/metadata/map.jpg");

    // 读取图片文件内容
    const fileContent = await fs.readFile(filePath);

    // 设置响应头，指定返回的内容类型为图片
    res.setHeader("Content-Type", "application/json");

    // 将图片文件内容返回
    res.status(200).end(fileContent);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while reading the image." });
  }
}
