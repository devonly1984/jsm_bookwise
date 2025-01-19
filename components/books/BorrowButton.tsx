"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {useToast} from '@/hooks/use-toast'
import { BorrowBook } from "@/lib/actions/borrow.actions";

interface Props {
  userId: string;
  bookId: string;
  canUserBorrow: {
    isEligible: boolean;
    message: string;
  };
}
const BorrowButton = ({ bookId, userId,canUserBorrow: {isEligible,message} }: Props) => {
    const router = useRouter();
    const [borrowing, setBorrowing] = useState(false);
    const { toast } = useToast();
    const handleBorrow = async()=>{
        if (!isEligible) {
            toast({
              title: "Error",
              description: message,
              variant: "destructive",
            });
        }   
        setBorrowing(true) ;
        try {
            const result = await BorrowBook({
                bookId,userId
            })
            if (result.success) {
                toast({
                    title: "Success",
                    description: "Book borrowed Successfully"
                })
                router.push("/my-profile");
            } else {
                toast({
                  title: "Error",
                  description: "Error occurred while attempting to borrow book",
                  variant: "destructive",
                });
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Error occurred while attempting to borrow book",
                variant: 'destructive'
            })
        }finally{
            setBorrowing(false);
        }
    }
  return (
    <Button
      className="book-overview_btn"
      onClick={handleBorrow}
      disabled={borrowing}
    >
      <Image src="/icons/book.svg" alt="book" width={20} height={20} />
      <p className="font-bebas-neue text-xl text-dark-100">
        {borrowing ? "Borrowing..." : "Borrow"}
      </p>
    </Button>
  );
};
export default BorrowButton;
