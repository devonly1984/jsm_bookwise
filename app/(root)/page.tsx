import BookList from "@/components/books/BookList";
import BookOverview from "@/components/books/BookOverview";
import { sampleBooks } from "@/constants";
import { db } from "@/drizzle/drizzle";
import { users } from "@/drizzle/schema";

const Home = async() => {
  const result = await db.select().from(users);
  console.log(JSON.stringify(result));
  return (
    <>
      <BookOverview {...sampleBooks[0]} />
      <BookList
        title="Latest Books"
        books={sampleBooks}
        containerClassName="mt-28"
      />
    </>
  );
};
export default Home;
