import { getBooks } from "@/api/get-books";
import BookInfo from "@/components/book-info";

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ isbn: string }>;
}) {
  const { isbn } = await params;
  const response = await getBooks(isbn);

  return (
    <div>
      <BookInfo {...response.items[0]} />
    </div>
  );
}
