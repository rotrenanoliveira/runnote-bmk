'use server'

import axios from 'axios'
import { JSDOM } from 'jsdom'

import { fetcher } from '@/utils/fetcher'
import { formatZodError } from '@/utils/functions'
import { type ResponseError, type UrlData, urlDataSchema } from '@/utils/types'

/**
 * Fetches the data from the given URL.
 * Data includes title, favicon, ogImage, description and bookmarkUrl.
 */
export async function getUrlData(url: string): Promise<[UrlData, null] | [null, ResponseError]> {
  const [response, requestError] = await fetcher(
    axios.get(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      },
      responseType: 'text',
      timeout: 1000 * 10, // 30 seconds
      signal: AbortSignal.timeout(1000 * 10),
    }),
  )

  if (requestError) {
    return [null, requestError]
  }

  if (response.status !== 200) {
    return [null, { success: false, message: 'Failed to fetch url.' }]
  }

  if (!response.data) {
    return [null, { success: false, message: 'Failed to fetch data.' }]
  }

  // const [kyResponse, kyRequestError] = await fetcher(ky.get(url).text())

  // if (kyRequestError) {
  //   return [null, kyRequestError]
  // }

  // if (!kyResponse) {
  //   return [null, { success: false, message: 'Failed to fetch url.' }]
  // }

  // const kyData = await ky.get(url).text()

  const websiteData = response.data as string

  const html = websiteData
  const dom = new JSDOM(html)
  const document = dom.window.document

  const favicon = document.querySelector("link[rel~='icon']")?.getAttribute('href') || '/favicon.ico'
  const resolvedFavicon = new URL(favicon, url).toString()

  const urlData = urlDataSchema.safeParse({
    title:
      document.querySelector('title')?.textContent ||
      document.querySelector("meta[property='og:title']")?.getAttribute('content') ||
      'No title',
    favicon: resolvedFavicon,
    ogImage:
      document.querySelector("meta[property='og:image']")?.getAttribute('content') ||
      document.querySelector("meta[property='og:image:url']")?.getAttribute('content'),
    description: document.querySelector("meta[name='description']")?.getAttribute('content'),
    bookmarkUrl: document.querySelector("link[rel='canonical']")?.getAttribute('href') || url,
  })

  if (urlData.success === false) {
    const zodErrors = formatZodError(urlData.error)
    const validationErrors = { error: [`Validation Error at ${zodErrors[0].field} - ${zodErrors[0].message}`] }
    const message = validationErrors.error.join('. ')

    return [null, { success: false, message }]
  }

  return [urlData.data, null]
}
