import { Book } from "@/model/book";
import Image from "next/image";

export default function BookInfo(props: Book) {
  const { title, author, publisher, image, pubdate, isbn, description } = props;

  return (
    <div>
      <Image src={image} width={400} height={400} alt={title} />
      <h2>{title}</h2>
      <dl>
        <dt>저자</dt>
        <dd>{author}</dd>
        <dt>출판사</dt>
        <dd>{publisher}</dd>
        <dt>출판일</dt>
        <dd>{pubdate}</dd>
        <dt>isbn</dt>
        <dd>{isbn}</dd>
      </dl>
      <pre>{description}</pre>
    </div>
  );
}
