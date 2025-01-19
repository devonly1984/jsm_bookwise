import { auth } from "@/auth";
import BookList from "@/components/books/BookList";
import BookOverview from "@/components/books/BookOverview";
import { db } from "@/drizzle/drizzle";
import { books, users } from "@/drizzle/schema";
import { desc } from "drizzle-orm";

const Home = async() => {
  const session = await auth();

  const latestBooks = (await await db
    .select()
    .from(books)
    .limit(10)
    .orderBy(desc(books.createdAt))) as Book[];

  return (
    <>
      <BookOverview {...latestBooks[0]} userId={session?.user?.id as string} />
      <BookList
        title="Latest Books"
        books={latestBooks.slice(1)}
        containerClassName="mt-28"
      />
    </>
  );
};
export default Home;
