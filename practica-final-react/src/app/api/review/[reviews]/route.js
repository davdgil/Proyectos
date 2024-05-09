import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';

export async function PUT(request, id) {
    const data = await request.json();
    console.log(data, "data");

    const idValue = id.params.reviews;
    console.log(idValue);

    try {
        let webPage = JSON.parse(readFileSync("data/webPage.txt"));
        const updatedWebPage = webPage.map((page) => {
            if (page.id === idValue) {
                page.reviews.push(data.reviews);
            }
            return page;
        });

        writeFileSync("data/webPage.txt", JSON.stringify(updatedWebPage));
        return NextResponse.json({ updatedWebPage, message: "Dislikes actualizados...", status: 200 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ message: "Error al actualizar valores...", status: 500 });
    }
}