import Image from "next/image";
import BookCover from "./BookCover";
import BorrowButton from "./BorrowButton";
import { users } from "@/drizzle/schema";
import { db } from "@/drizzle/drizzle";
import { eq } from "drizzle-orm";

interface Props extends Book {
  userId:string;
}
const BookOverview = async ({
  title,
  author,
  genre,
  rating,
  totalCopies,
  availableCopies,
  description,
  coverColor,
  coverUrl,
  id,
  userId,
}: Props) => {
  const [user] = await db.select().from(users).where(eq(users.id,userId)).limit(1)
  if (!user) {
    return null;
  }
  const canUserBorrow = {
    isEligible: availableCopies > 0 && user.status === "APPROVED",
    message:
      availableCopies <= 0
        ? "Book is not available"
        : "You are not yet approved to borrow books",
  };

  return (
    <section className="book-overview">
      <div className="flex flex-1 flex-col gap-5">
        <h1>{title}</h1>
        <div className="book-info">
          <p className="">
            By <span className="font-semibold text-light-200">{author}</span>
          </p>
          <p className="">
            Genre: <span className="font-semibold text-light-200">{genre}</span>
          </p>
          <div className="flex flex-row gap-1">
            <Image src="/icons/star.svg" alt="rating" width={22} height={22} />
            <p>{rating}</p>
          </div>
        </div>
        <div className="book-copies">
          <p>
            Total Books: <span>{totalCopies}</span>
          </p>
          <p>
            Avtaible Books: <span>{availableCopies}</span>
          </p>
        </div>
        <p className="book-description">{description}</p>
        <BorrowButton
          canUserBorrow={canUserBorrow}
          bookId={id}
          userId={userId}
        />
      </div>
      <div className="relative flex flex-1 justify-center">
        <div className="relative">
          <BookCover
            variant="wide"
            className="z-10"
            coverColor={coverColor}
            coverImage={coverUrl}
          />
          <div className="absolute left-16 top-10 rotate-12 opacity-40 max-sm:hidden">
            <BookCover
              variant="wide"
              coverColor={coverColor}
              coverImage={coverUrl}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default BookOverview;
