import puppeteer from "puppeteer";
import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();

app.use(cors());

const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    executablePath: process.env.CHROME_BIN || null,
    defaultViewport: null,
    headless: true,
});

const opt = { printBackground: true, format: "A4" };

const pdf = async () => {

    const page = await browser.newPage();
    const content = "<h1>Daniel</h1>";
    page.emulateMediaType("screen");
    await page.setContent(content);
    return await page.pdf(opt);

}

app.get('/', async function (req, res) {

    const buf = await pdf();
    fs.writeFileSync("_.pdf", buf);
    res.contentType("application/pdf");
    res.send(fs.readFileSync("_.pdf"));

});

app.listen(80, () => console.log("Server is running..."));