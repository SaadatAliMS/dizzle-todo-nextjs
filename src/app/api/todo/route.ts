import {QueryResult} from "@vercel/postgres";
import { NextRequest,NextResponse } from "next/server";
import { Todo,NewTodo,db,todoTable}
  from "@/app/lib/drizzle";
  import { sql } from "@vercel/postgres";
// after connecting database this command (vercel env pull .env.development.local) run in terminal which connects project to database.it creats a file .env.development.local
{/* db.connect connects vercel database to this project */}
export async function GET(request:NextRequest){
    
    try{
        await sql`CREATE TABLE IF NOT EXISTS Todos(id serial,Task varchar(255));`
       const res= await db.select().from(todoTable)
      
       
        return NextResponse.json({data:res})

    }
    catch(err){
        
        console.log({message:(err as {message:string}).message});
        
        return NextResponse.json({message:"Something Went Wrong"}); 

    }
    
} 
export async function POST(request:NextRequest){
    
    const req=await request.json()
    try {
        if (req.task) {
            const res=db.insert(todoTable).values({task:req.task}).returning()
            console.log(res)
            return NextResponse.json({message:"Data Added Successfully"})
        } else {
            throw new Error("Task FIeld is Required")
        }
    } catch (error) {
        return NextResponse.json({message:(error as {message:string}).message})
    }
}
