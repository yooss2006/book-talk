import { Book } from "@/model/book";
import Image from "next/image";
import Link from "next/link";

export default function BookLinkItem(props: Book) {
  const { title, isbn, image, author } = props;
  return (
    <Link href={`/book/${isbn}`}>
      <div>
        <Image src={image} width={90} height={140} alt={title} />
        <div>
          <p>{`${title} / ${author}`}</p>
        </div>
      </div>
    </Link>
  );
}
