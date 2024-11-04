export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ isbn: string }>;
}) {
  const { isbn } = await params;
  return <div>{isbn} 책 상세 페이지</div>;
}
