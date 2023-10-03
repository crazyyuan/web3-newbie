import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export default async function GET(req: any, res: any) {
  const { group, id } = req.query;
  try {
    // 读取本地文件
    const filePath = path.join(process.cwd(), `public/metadata/${group}/${id}`);

    // 读取文件内容
    const fileContent = await fs.readFile(filePath);

    // 设置响应头，指定返回的内容类型为图片
    res.setHeader("Content-Type", "application/json");

    // 将图片文件内容返回
    res.status(200).end(fileContent);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while reading the json." });
  }
}
