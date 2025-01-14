import chromium from '@sparticuz/chromium-min'
import { JSDOM } from 'jsdom'
import { type NextRequest, NextResponse } from 'next/server'
import puppeteer, { type Browser } from 'puppeteer'
import puppeteerCore, { type Browser as BrowserCore } from 'puppeteer-core'

export const maxDuration = 60 // This function can run for a maximum of 5 seconds
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url')

  if (!url) {
    return NextResponse.json({ error: 'Missing URL parameter.' }, { status: 400 })
  }

  try {
    // THE CORE LOGIC
    let browser: Browser | BrowserCore
    if (process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === 'production') {
      // Configure the version based on your package.json (for your future usage).
      const executablePath = await chromium.executablePath(
        'https://github.com/Sparticuz/chromium/releases/download/v131.0.1/chromium-v131.0.1-pack.tar',
      )
      browser = await puppeteerCore.launch({
        executablePath,
        // You can pass other configs as required
        args: chromium.args,
        headless: chromium.headless,
        defaultViewport: chromium.defaultViewport,
      })
    } else {
      browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      })
    }

    const page = await browser.newPage()
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 })

    const html = await page.content()

    await browser.close()

    const dom = new JSDOM(html)
    const document = dom.window.document

    const favicon = document.querySelector("link[rel~='icon']")?.getAttribute('href') || '/favicon.ico'
    const resolvedFavicon = new URL(favicon, url).toString()

    const title = document.querySelector('title')?.textContent || 'No title'
    const description = document.querySelector("meta[name='description']")?.getAttribute('content')
    const ogImage = document.querySelector("meta[property='og:image']")?.getAttribute('content')
    const bookmarkUrl = document.querySelector("link[rel='canonical']")?.getAttribute('href') || url

    const metadata = {
      title,
      description,
      favicon: resolvedFavicon,
      ogImage,
      bookmarkUrl,
    }

    return NextResponse.json({ metadata })
  } catch (error) {
    console.error('Failed to fetch metadata:', error)

    return NextResponse.json({ error: 'Failed to fetch metadata.' }, { status: 500 })
  }
}
