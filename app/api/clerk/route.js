import { NextResponse } from "next/server";

export async function POST(){
    return NextResponse.json({ message: "Clerk webhook disabled in local dummy mode" });
}