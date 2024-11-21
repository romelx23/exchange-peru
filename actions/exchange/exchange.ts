"use server";
import axios from "axios";
import * as cheerio from "cheerio";
// import { load } from "cheerio";
import puppeteer from "puppeteer";

export async function getKambistaRates() {
  const url = "https://kambista.com/";

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const compra = parseFloat($("#valcompra").text());
    const venta = parseFloat($("#valventa").text());

    return { compra, venta };
  } catch (error) {
    console.error("Error al obtener datos de Kambista:", error);
    return { compra: null, venta: null };
  }
}

export async function getDollarHouseRates() {
  const url = "https://dollarhouse.pe";
  const iframeUrl = "https://app.dollarhouse.pe/calculadorav2";

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(iframeUrl, { waitUntil: "networkidle2" });

    // Esperar a que los valores se carguen en el iframe
    const compra = await page.$eval("#purchaseprice", (el) =>
      el.getAttribute("value")
    );
    const venta = await page.$eval("#op_saleprice", (el) =>
      el.getAttribute("value")
    );

    // console.log({ compra, venta });

    await browser.close();
    return {
      compra: parseFloat(compra || "0"),
      venta: parseFloat(venta || "0"),
    };
  } catch (error) {
    console.error("Error al obtener datos de Dollar House:", error);
    return { compra: null, venta: null };
  }
}

export async function getRextieRates() {
  const url = "https://www.rextie.com/";

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    // Ir a la página y esperar hasta que se complete la carga inicial
    await page.goto(url, { waitUntil: "networkidle2" });

    // Esperar explícitamente a que el componente fx-rates esté visible
    await page.waitForSelector("fx-rates", { timeout: 60000 });

    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.60 Safari/537.36"
    );
    await page.setExtraHTTPHeaders({
      "Accept-Language": "en-US,en;q=0.9",
    });

    // Extraer valores de compra y venta
    const rates = await page.evaluate(() => {
      // Intentamos encontrar elementos de compra y venta dentro del componente
      const compraElement = document.querySelector(
        "div.bg-[var(--sixth-blue)] span.font-bold:nth-child(1)"
      );
      const ventaElement = document.querySelector(
        "div.bg-[var(--sixth-blue)] span.font-bold:nth-child(2)"
      );

      // Verificar si los elementos existen y extraer el texto
      const compraText = compraElement?.textContent?.trim();
      const ventaText = ventaElement?.textContent?.trim();

      // Convertir a número flotante
      const compra = compraText ? parseFloat(compraText) : null;
      const venta = ventaText ? parseFloat(ventaText) : null;

      return { compra, venta };
    });

    await browser.close();
    console.log("Tasa de cambio de Rextie:", rates);
    return rates;
  } catch (error) {
    console.error("Error al extraer datos de Rextie:", error);
    return { compra: null, venta: null };
  }
}

export async function getInstakash() {
  const url = "https://instakash.net/";

  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Navegar a la URL
    await page.goto(url, { waitUntil: "networkidle2" });

    // Esperar que se cargue el contenedor del tipo de cambio
    await page.waitForSelector(
      ".flex.items-center.justify-center.text-primary.gap-10.py-1",
      {
        timeout: 30000,
      }
    );

    // Extraer valores de compra y venta
    const rates = await page.evaluate(() => {
      const compraElement = document.querySelectorAll(
        ".flex.items-center.justify-center.text-primary.gap-10.py-1 div p.font-semibold"
      )[0];
      const ventaElement = document.querySelectorAll(
        ".flex.items-center.justify-center.text-primary.gap-10.py-1 div p.font-semibold"
      )[1];

      // Obtener los textos de compra y venta
      const compraText = compraElement?.textContent?.replace("S/", "").trim();
      const ventaText = ventaElement?.textContent?.replace("S/", "").trim();

      return {
        compra: compraText ? parseFloat(compraText) : null,
        venta: ventaText ? parseFloat(ventaText) : null,
      };
    });

    // console.log("Tasa de cambio de Instakash:", rates);
    await browser.close();

    return rates;
  } catch (error) {
    console.error("Error al extraer datos de Instakash:", error);
    return { compra: null, venta: null };
  }
}

// https://securex.pe/
export async function getSecurexRates() {
  try {
    // Realizar una solicitud GET a la página de Securex
    const { data } = await axios.get("https://securex.pe/");

    // Cargar el HTML con Cheerio
    const $ = cheerio.load(data);

    // Extraer los valores de compra y venta
    const compra = $("#item_compra span[style*='font-weight: 600']")
      .text()
      .trim();
    const venta = $("#item_venta span[style*='font-weight: 600']")
      .text()
      .trim();

    // Verificar si los valores de compra o venta están vacíos
    if (!compra || !venta) {
      console.log("No se encontraron los valores de compra o venta.");
      return { compra: null, venta: null };
    }

    // Convertir los valores a números
    const compraValue = parseFloat(compra);
    const ventaValue = parseFloat(venta);

    // Validar si los valores convertidos son números
    if (isNaN(compraValue) || isNaN(ventaValue)) {
      console.log("Los valores obtenidos no son números válidos.");
      return { compra: null, venta: null };
    }

    return { compra: compraValue, venta: ventaValue };
  } catch (error) {
    console.error("Error al obtener el tipo de cambio:", error);
    // Retornar siempre un objeto con el tipo esperado
    return { compra: null, venta: null };
  }
}

// https://tkambio.com/

export async function getTkambioRates() {
  try {
    // // Iniciar Puppeteer
    // const browser = await puppeteer.launch({ headless: true });
    // const page = await browser.newPage();

    // // Navegar a la página
    // const url = "https://tkambio.com/";
    // await page.goto(url, { waitUntil: "networkidle2" });

    // // Esperar a que los elementos estén presentes en la página
    // await page.waitForSelector(".purcharse-content .price", { timeout: 30000 });
    // await page.waitForSelector(".sale-content .price", { timeout: 30000 });

    // // Extraer los valores de compra y venta
    // const compra = await page.$eval(".purcharse-content .price", (el) =>
    //   el.textContent?.trim()
    // );
    // const venta = await page.$eval(".sale-content .price", (el) =>
    //   el.textContent?.trim()
    // );

    // if (!compra || !venta) {
    //   console.log("No se encontraron los valores de compra o venta.");
    //   await browser.close();
    //   return { compra: null, venta: null };
    // }

    // // Convertir los valores a números
    // const compraValue = parseFloat(compra.replace(",", "."));
    // const ventaValue = parseFloat(venta.replace(",", "."));

    // // Validar si los valores convertidos son números
    // if (isNaN(compraValue) || isNaN(ventaValue)) {
    //   console.log("Los valores obtenidos no son números válidos.");
    //   await browser.close();
    //   return { compra: null, venta: null };
    // }

    // console.log(`Tipo de Cambio:`);
    // console.log(`Compra: ${compra}`);
    // console.log(`Venta: ${venta}`);

    // // Cerrar el navegador
    // await browser.close();

    // // Retornar los valores obtenidos
    // return { compra: compraValue, venta: ventaValue };

    const { data: html } = await axios.get("https://tkambio.com");

    // Cargar el HTML en Cheerio
    const $ = cheerio.load(html);

    console.log("TKAMBIO", { html });

    // Extraer el tipo de cambio de compra y venta
    const purchaseRate = $(".purcharse-content .regular-amount .price")
      .first()
      .text()
      .trim();
    const saleRate = $(".sale-content .regular-amount .price")
      .first()
      .text()
      .trim();
    console.log({ purchaseRate, saleRate });

    // Convertir los valores a números
    const purchase = parseFloat(purchaseRate.replace(",", "."));
    const sale = parseFloat(saleRate.replace(",", "."));

    // Verificar si los valores son válidos
    const exchangeRates = {
      compra: isNaN(purchase) ? 0 : purchase,
      venta: isNaN(sale) ? 0 : sale,
    };

    console.log("TKAMBIO", { exchangeRates });

    return exchangeRates;
  } catch (error) {
    console.error("Error al obtener el tipo de cambio:", error);
    return { compra: 0, venta: 0 };
  }
}

// https://cambiaygana.com.pe/

export async function getCambiaYGanaRates() {
  try {
    const url = "https://cambiaygana.com.pe/";

    // Obtener HTML de la página
    const { data } = await axios.get(url);

    // Cargar HTML con Cheerio
    const $ = cheerio.load(data);

    // Extraer tipo de cambio de compra y venta
    const compra = $("#datadolar .col-sm-5").first().find("span").text().trim();
    const venta = $("#datadolar .col-sm-5").last().find("span").text().trim();

    if (!compra || !venta) {
      console.log("No se encontraron los valores de compra o venta.");
      return { compra: null, venta: null };
    }

    // Convertir los valores a números
    const compraValue = parseFloat(compra.replace(",", "."));
    const ventaValue = parseFloat(venta.replace(",", "."));

    // Validar si los valores convertidos son números
    if (isNaN(compraValue) || isNaN(ventaValue)) {
      console.log("Los valores obtenidos no son números válidos.");
      return { compra: null, venta: null };
    }

    console.log(`Tipo de Cambio:`);
    console.log(`Compra: ${compra}`);
    console.log(`Venta: ${venta}`);

    // Retornar valores obtenidos
    return { compra: compraValue, venta: ventaValue };
  } catch (error) {
    console.error("Error al obtener el tipo de cambio:", error);
    return { compra: null, venta: null };
  }
}
