export default async function GET(
  request: Request,
  { params }: { params: { slug: string } },
) {
  const slug = params.slug; // 'a', 'b', or 'c'
  console.log("slog:", slug);
}
