import { auth } from "@/auth";
import BookOverview from "@/components/books/BookOverview";
import BookVideo from "@/components/books/BookVideo";
import { db } from "@/drizzle/drizzle";
import { books } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";


const BookDetails = async({ params }: { params: Promise<{ id: 
  string }> }) => {
    const id = (await params).id;

    const [bookDetails] = await db
      .select()
      .from(books)
      .where(eq(books.id, id))
      .limit(1);
const session = await auth();
if (!bookDetails) redirect("/404");

  return (
    <>
      <BookOverview {...bookDetails} userId={session?.user?.id as string} />
      <div className="book-details">
        <div className="flex-[1.5]">
          <section className="flex flex-col gap-7">
            <h3>Video</h3>
            <BookVideo videoUrl={bookDetails.videoUrl} />
          </section>
          <section className="mt-10 flex flex-col gap-7">
            <h3>Summary</h3>
            <div className="space-y-5 text-xl text-light-100">
              {bookDetails.summary.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </section>
        </div>
        {/**Similar Books */}
      </div>
    </>
  );
};
export default BookDetails;
