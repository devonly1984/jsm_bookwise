import { signOut } from "@/auth";
import BookList from "@/components/books/BookList";
import { Button } from "@/components/ui/button"


const MyProfile = () => {
  return (
    <>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
        className="mb-10"
      >
        <Button>Logout</Button>
      </form>
      <BookList title="Borrowed Books" books={sampleBooks} />
    </>
  );
}
export default MyProfile