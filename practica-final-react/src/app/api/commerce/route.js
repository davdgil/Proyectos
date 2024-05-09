"use server";
import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

export async function POST(request) {
  const data = await request.json();
  const filePath = resolve('data', 'commerce.txt');
  console.log(data);
  try {
    // Read commerce.txt from disk and concatenate with data from request
    const commerceData = JSON.parse(readFileSync(filePath, 'utf-8'));
    writeFileSync(filePath, JSON.stringify([...commerceData, data]));

    // Return a JSON response with success message
    return NextResponse.json({ message: 'Guardando datos...' });
  } catch (e) {
    // If commerce.txt file does not exist, create it with data from request
    writeFileSync(filePath, JSON.stringify([data]));

    // Return a JSON response with success message
    return NextResponse.json({ message: 'Guardando datos...' });
  }
}

export async function GET() {
  try {
    const commerce = JSON.parse(readFileSync("data/commerce.txt"))
    //console.log(users)
    return NextResponse.json({ commerce })
  } catch (e) {
    return NextResponse.json({ message: "Comercio no existente...", status: 400 })
  }
}

export async function DELETE(request) {
  const data = await request.json()
  
  try {
    const commerce = JSON.parse(readFileSync("data/commerce.txt"))
    //console.log(commerce)
    const commerceFilter = commerce.filter(commerce => commerce.id != data)
    //console.log(commerceFilter)
    writeFileSync("data/commerce.txt", JSON.stringify(commerceFilter))
    return NextResponse.json({ commerceFilter ,message: "Comercio eliminado...", status: 200 })
  } catch (e) {
    console.log(e)
  }

}
