"use server";
import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';


export async function GET() {
    try{
        const users = JSON.parse(readFileSync("data/users.txt"))
        console.log("Usuarios: ", users)
        return NextResponse.json({users})
    } catch(e){  
        return NextResponse.json({message: "Usuarios no existen...", status: 400})
    }
}

export async function POST(request) {
    const data = await request.json()
    try{
        const users = JSON.parse(readFileSync("data/users.txt"))
        writeFileSync("data/users.txt", JSON.stringify([...users, data]))
    } catch(e){  
        writeFileSync("data/users.txt", JSON.stringify([data]))
    }
    return NextResponse.json({message: "Guardando datos..."})
}

export async function DELETE(request) {
    const data = await request.json()
    
    try {
      const users = JSON.parse(readFileSync("data/users.txt"))
      //console.log(commerce)
      const userFilter = users.filter(user => user.id != data)
      //console.log(commerceFilter)
      writeFileSync("data/users.txt", JSON.stringify(userFilter))
      return NextResponse.json({ userFilter ,message: "Usuario eliminado...", status: 200 })
    } catch (e) {
      console.log(e)
    }
}
