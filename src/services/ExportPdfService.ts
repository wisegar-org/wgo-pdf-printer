import puppeteer, { LaunchOptions, PDFOptions } from 'puppeteer';
import { ReadStream } from 'fs-extra';
import { Readable } from 'stream';

export type ConfigLaunch = LaunchOptions &
  any & {
    product?: any;
    extraPrefsFirefox?: Record<string, unknown>;
  };

/**
 * @description Generates a pdf buffer from an HTML content
 * @param content HTML content
 * @param config PDFOptions
 * @param configLaunch  PDF Engine startup settings
 * @returns PDF File Buffer
 */
export async function exportHTMLToPdfBuffer(
  content: string,
  config: PDFOptions,
  configLaunch: ConfigLaunch = { ignoreDefaultArgs: ['--disable-extensions'] }
): Promise<any> {
  //create browser
  const browser = await puppeteer.launch(configLaunch);
  //set page content
  const page = await browser.newPage();
  await page.setContent(content);
  //generate pdf, return Buffer
  const pdfBuffer = await page.pdf(config);
  await browser.close();
  return pdfBuffer;
}

/**
 * @param content
 * @param config
 * @param configLaunch
 * @returns
 */
export async function exportHTMLToPdfReadStream(
  content: string,
  config: PDFOptions,
  configLaunch: ConfigLaunch = { ignoreDefaultArgs: ['--disable-extensions'] }
): Promise<ReadStream> {
  const pdfBuffer = await exportHTMLToPdfBuffer(content, config, configLaunch);
  const readable = new Readable();
  readable._read = () => {};
  readable.push(pdfBuffer);
  readable.push(null);
  return readable as ReadStream;
}

export async function exportUrlToPdfBuffer(
  url: string,
  config: PDFOptions,
  configLaunch: ConfigLaunch = { ignoreDefaultArgs: ['--disable-extensions'] }
) {
  //create browser
  const browser = await puppeteer.launch(configLaunch);
  const page = await browser.newPage();
  //go to page
  await page.goto(url);
  //generate pdf, return Buffer
  const pdfBuffer = await page.pdf(config);
  await browser.close();
  return pdfBuffer;
}

export async function exportUrlToPdfReadStream(
  url: string,
  config: PDFOptions,
  configLaunch: ConfigLaunch = { ignoreDefaultArgs: ['--disable-extensions'] }
): Promise<ReadStream> {
  const pdfBuffer = await exportUrlToPdfBuffer(url, config, configLaunch);
  const readable = new Readable();
  readable._read = () => {};
  readable.push(pdfBuffer);
  readable.push(null);
  return readable as ReadStream;
}
