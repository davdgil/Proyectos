import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

export async function PUT(request, id) {
    const data = await request.json();
    console.log(data, "data");

    const idValue = id.params.likes;
    console.log(idValue);

    try {
        let webPage = JSON.parse(readFileSync("data/webPage.txt"));
        const updatedWebPage = webPage.map((page) => {
            if (page.id === idValue) {
                page.likes = page.likes + 1;
            }
            return page;
        });

        writeFileSync("data/webPage.txt", JSON.stringify(updatedWebPage));
        return NextResponse.json({ updatedWebPage, message: "Likes actualizados...", status: 200 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ message: "Error al actualizar valores...", status: 500 });
    }
}