"use server"

import { db } from "@/drizzle/drizzle";
import { books } from "@/drizzle/schema";

export const createBook = async(params:BookParams)=>{
    try {
        const newBook = await db
          .insert(books)
          .values({ ...params, availableCopies: params.totalCopies })
          .returning();
          return {
            success: true,
            data: JSON.parse(JSON.stringify(newBook[0])),
          };
    } catch (error:any) {
        console.log(error);
        return {
          success: false,
          error: error,
        };
    }
}