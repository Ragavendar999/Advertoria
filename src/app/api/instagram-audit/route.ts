import { NextRequest } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const encoder = new TextEncoder()

const parseCount = (raw: string | undefined) => {
  if (!raw) return 0
  const clean = raw.replace(/,/g, '').trim()
  if (/k/i.test(clean)) return Math.round(parseFloat(clean) * 1000)
  if (/m/i.test(clean)) return Math.round(parseFloat(clean) * 1_000_000)
  return parseInt(clean, 10) || 0
}

function getModel() {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) throw new Error('Missing GEMINI_API_KEY')
  const genAI = new GoogleGenerativeAI(apiKey)
  return genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
}

function makeSseEvent(event: string, payload: unknown) {
  return encoder.encode(`event: ${event}\ndata: ${JSON.stringify(payload)}\n\n`)
}

// Strategy 1: Instagram internal API with mobile app headers
async function tryMobileApi(username: string) {
  const endpoints = [
    `https://i.instagram.com/api/v1/users/web_profile_info/?username=${username}`,
    `https://www.instagram.com/api/v1/users/web_profile_info/?username=${username}`,
  ]

  const mobileHeaders = {
    'User-Agent': 'Instagram 269.0.0.18.75 Android (26/8.0.0; 480dpi; 1080x1920; OnePlus; ONEPLUS A3010; OnePlus3T; qcom; en_US; 314665256)',
    'Accept': '*/*',
    'Accept-Language': 'en-US',
    'X-IG-Capabilities': '3brTvx0=',
    'X-IG-Connection-Type': 'WIFI',
    'X-IG-App-ID': '567067343352427',
  }

  for (const endpoint of endpoints) {
    try {
      const res = await fetch(endpoint, { headers: mobileHeaders, cache: 'no-store' })
      if (!res.ok) continue
      const payload = await res.json()
      const user = payload?.data?.user ?? payload?.user
      if (!user) continue

      const followers = user?.edge_followed_by?.count ?? user?.follower_count ?? 0
      const following = user?.edge_follow?.count ?? user?.following_count ?? 0
      const posts = user?.edge_owner_to_timeline_media?.count ?? user?.media_count ?? 0

      if (followers > 0 || posts > 0) {
        return {
          username,
          displayName: user?.full_name || username,
          followers,
          following,
          posts,
          image: user?.profile_pic_url_hd || user?.profile_pic_url || '',
          bio: user?.biography || '',
          dataAvailable: true,
        }
      }
    } catch { /* try next */ }
  }
  return null
}

// Strategy 2: Scrape via allorigins proxy (bypasses Vercel IP blocks)
async function tryProxyScrape(username: string) {
  const targetUrl = encodeURIComponent(`https://www.instagram.com/${username}/`)
  const res = await fetch(`https://api.allorigins.win/get?url=${targetUrl}`, {
    cache: 'no-store',
    signal: AbortSignal.timeout(8000),
  })
  if (!res.ok) return null
  const data = await res.json() as { contents?: string }
  return data.contents || null
}

// Strategy 3: Direct scrape with multiple user-agents
async function tryDirectScrape(username: string): Promise<string | null> {
  const userAgents = [
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    'Googlebot/2.1 (+http://www.google.com/bot.html)',
  ]

  for (const ua of userAgents) {
    try {
      const res = await fetch(`https://www.instagram.com/${username}/`, {
        headers: { 'User-Agent': ua, 'Accept': 'text/html', 'Cache-Control': 'no-cache' },
        cache: 'no-store',
      })
      if (!res.ok) continue
      const html = await res.text()
      if (html.length > 5000) return html
    } catch { /* try next */ }
  }
  return null
}

function extractStatsFromHtml(html: string) {
  const getMeta = (prop: string) => {
    const m =
      html.match(new RegExp(`<meta[^>]+property="${prop}"[^>]+content="([^"]*)"`, 'i')) ??
      html.match(new RegExp(`<meta[^>]+content="([^"]*)"[^>]+property="${prop}"`, 'i'))
    return m ? m[1] : ''
  }

  const ogDesc = getMeta('og:description')
  const title = getMeta('og:title')
  const image = getMeta('og:image')

  // Extract counts from og:description (e.g. "1,234 Followers, 567 Following, 89 Posts")
  const followers = parseCount(ogDesc.match(/([\d,.]+[KMkm]?)\s*Followers?/i)?.[1]) ||
    parseCount(html.match(/"follower_count"\s*:\s*(\d+)/)?.[1]) ||
    parseCount(html.match(/"edge_followed_by"[^}]*"count"\s*:\s*(\d+)/)?.[1])

  const following = parseCount(ogDesc.match(/([\d,.]+[KMkm]?)\s*Following/i)?.[1]) ||
    parseCount(html.match(/"following_count"\s*:\s*(\d+)/)?.[1]) ||
    parseCount(html.match(/"edge_follow"[^}]*"count"\s*:\s*(\d+)/)?.[1])

  const posts = parseCount(ogDesc.match(/([\d,.]+[KMkm]?)\s*Posts?/i)?.[1]) ||
    parseCount(html.match(/"media_count"\s*:\s*(\d+)/)?.[1]) ||
    parseCount(html.match(/"edge_owner_to_timeline_media"[^}]*"count"\s*:\s*(\d+)/)?.[1])

  const nameMatch = title.match(/^([^(@]+)/)
  const displayName = nameMatch ? nameMatch[1].trim() : ''

  const bio = ogDesc
    .replace(/\d[\d,]*\s*(Followers?|Following|Posts?)[,\s]*/gi, '')
    .replace(/^-\s*See.*$/, '')
    .trim()

  return { displayName, followers, following, posts, image, bio }
}

async function getInstagramProfile(username: string) {
  // Try mobile API first (most accurate)
  const apiResult = await tryMobileApi(username)
  if (apiResult) return { ...apiResult, limitedData: false }

  // Try proxy scrape (bypasses datacenter IP blocks)
  try {
    const proxyHtml = await tryProxyScrape(username)
    if (proxyHtml && proxyHtml.length > 5000) {
      const stats = extractStatsFromHtml(proxyHtml)
      if (stats.followers > 0 || stats.posts > 0) {
        return {
          username,
          displayName: stats.displayName || username,
          followers: stats.followers,
          following: stats.following,
          posts: stats.posts,
          image: stats.image,
          bio: stats.bio,
          dataAvailable: true,
          limitedData: false,
        }
      }
    }
  } catch { /* try direct */ }

  // Try direct scrape
  const directHtml = await tryDirectScrape(username)
  if (directHtml) {
    const stats = extractStatsFromHtml(directHtml)
    if (stats.followers > 0 || stats.posts > 0) {
      return {
        username,
        displayName: stats.displayName || username,
        followers: stats.followers,
        following: stats.following,
        posts: stats.posts,
        image: stats.image,
        bio: stats.bio,
        dataAvailable: true,
        limitedData: false,
      }
    }
    // Got the page but no stats — Instagram is blocking stats from this IP
    return {
      username,
      displayName: stats.displayName || username,
      followers: 0,
      following: 0,
      posts: 0,
      image: stats.image,
      bio: stats.bio,
      dataAvailable: false,
      limitedData: true,
    }
  }

  throw new Error('Could not reach Instagram')
}

function buildEstimatedProfile(username: string, displayName = '', image = '') {
  return {
    username,
    displayName: displayName || username,
    followers: 1200,
    following: 450,
    posts: 36,
    image,
    bio: '',
    dataAvailable: false,
    limitedData: true,
  }
}

function estimateMetrics(followers: number, posts: number) {
  let engagementRate: number
  if (followers < 1000) engagementRate = 8.0
  else if (followers < 10_000) engagementRate = 5.6
  else if (followers < 50_000) engagementRate = 3.2
  else if (followers < 100_000) engagementRate = 2.4
  else if (followers < 500_000) engagementRate = 1.9
  else engagementRate = 1.2

  const avgLikes = Math.round(followers * (engagementRate / 100) * 0.85)
  const avgComments = Math.round(followers * (engagementRate / 100) * 0.15)
  const estimatedReach = Math.round(followers * 0.28)
  const storyCompletion = followers < 10_000 ? 72 : followers < 100_000 ? 58 : 44
  const followerGrowthRate = posts > 50 ? 3.2 : posts > 20 ? 1.8 : 0.9

  return { engagementRate, avgLikes, avgComments, estimatedReach, storyCompletion, followerGrowthRate }
}

function ruleBasedInsights(followers: number, posts: number, engagementRate: number) {
  const opportunities: string[] = []
  const warnings: string[] = []

  if (posts < 20) opportunities.push('Publish consistently — accounts with 3–5 posts per week grow faster')
  else opportunities.push('Increase posting frequency to 5 times per week to accelerate reach')
  opportunities.push('Add a strong CTA in every caption to drive link-in-bio traffic')
  opportunities.push('Use Reels as your primary format — they outperform static posts for reach')
  if (followers > 5000) opportunities.push('Launch a lead magnet tied to your niche to capture high-intent followers')

  if (engagementRate < 2) warnings.push('Engagement rate is below the 2% benchmark — content relevance needs work')
  if (followers < 1000) warnings.push('Low follower count limits social proof — organic growth should be the priority')
  warnings.push('Without a funnel behind your bio link, followers are not converting into leads')

  const overallScore = Math.min(
    Math.round(
      (engagementRate / 8) * 35 +
        (Math.min(posts, 100) / 100) * 25 +
        (Math.min(followers, 100000) / 100000) * 40
    ),
    95
  )

  const tier = followers < 5000 ? 'micro' : followers < 50000 ? 'mid' : 'macro'
  const services =
    tier === 'micro'
      ? [
          { service: 'Social Media Growth', reason: 'Build a consistent content engine to grow your audience faster', priority: 'high' },
          { service: 'Creative Engine', reason: 'Stronger Reels and hooks will accelerate follower growth', priority: 'high' },
          { service: 'Branding & Strategy', reason: 'Clear positioning makes every post perform better', priority: 'medium' },
        ]
      : tier === 'mid'
        ? [
            { service: 'Performance Marketing', reason: 'Your audience size is ready for paid amplification', priority: 'high' },
            { service: 'Funnels & Conversion', reason: 'Turn Instagram traffic into actual leads and revenue', priority: 'high' },
            { service: 'AI Automation & CRM', reason: 'Automate lead nurturing from DMs and bio-link clicks', priority: 'medium' },
          ]
        : [
            { service: 'Performance Marketing', reason: 'Scale your audience into a revenue engine with paid media', priority: 'high' },
            { service: 'Data & Analytics', reason: 'At your scale, attribution and LTV tracking are essential', priority: 'high' },
            { service: 'Funnels & Conversion', reason: 'Optimize your funnel to convert the traffic you already have', priority: 'medium' },
          ]

  const summary =
    followers < 1000
      ? 'This account is in its early growth phase with encouraging engagement signals. The priority is a consistent content system and clearer brand positioning.'
      : followers < 10000
        ? 'This account has an engaged community and room to scale. A stronger content system plus a conversion funnel can turn followers into paying customers.'
        : 'This profile already has meaningful reach and authority. The next growth lever is connecting that audience to a higher-converting funnel and paid amplification.'

  return {
    overallScore,
    profileStrength: Math.max(overallScore - 8, 20),
    contentScore: Math.max(overallScore - 5, 20),
    growthScore: Math.max(overallScore - 12, 20),
    monetisationScore: Math.max(overallScore - 18, 15),
    opportunities: opportunities.slice(0, 4),
    warnings: warnings.slice(0, 3),
    topRecommendedServices: services,
    summary,
  }
}

export async function POST(req: NextRequest) {
  return new Response(
    new ReadableStream({
      async start(controller) {
        const send = (event: string, payload: unknown) => controller.enqueue(makeSseEvent(event, payload))

        try {
          send('status', { message: 'Validating username...' })

          const { username } = await req.json()
          if (!username || typeof username !== 'string') {
            send('error', { error: 'Username required' })
            controller.close()
            return
          }

          const clean = username.replace(/^@/, '').trim()
          if (!/^[a-zA-Z0-9._]{1,30}$/.test(clean)) {
            send('error', { error: 'Invalid Instagram username' })
            controller.close()
            return
          }

          send('status', { message: 'Fetching live Instagram profile data...' })

          let profile: Awaited<ReturnType<typeof getInstagramProfile>> | ReturnType<typeof buildEstimatedProfile>

          try {
            profile = await getInstagramProfile(clean)
            // If scraping returned the page but blocked stats, use estimated fallback
            // but keep whatever display name / image we got
            if (!profile.dataAvailable) {
              profile = buildEstimatedProfile(clean, profile.displayName, profile.image)
            }
          } catch {
            profile = buildEstimatedProfile(clean)
          }

          send('status', { message: 'Benchmarking engagement signals...' })
          const metrics = estimateMetrics(profile.followers, profile.posts)

          send('status', { message: 'Generating Advertoria recommendations...' })

          let aiData: Record<string, unknown>
          const isLimited = profile.limitedData

          try {
            const model = getModel()
            const prompt = `You are a social media growth strategist at Advertoria, an AI-powered marketing agency. Analyze this Instagram profile and return ONLY a valid JSON object (no markdown, no code blocks, raw JSON only) with this exact structure:

{"overallScore":<0-100>,"profileStrength":<0-100>,"contentScore":<0-100>,"growthScore":<0-100>,"monetisationScore":<0-100>,"opportunities":["<opportunity 1>","<opportunity 2>","<opportunity 3>","<opportunity 4>"],"warnings":["<warning 1>","<warning 2>","<warning 3>"],"topRecommendedServices":[{"service":"<name>","reason":"<why>","priority":"high"},{"service":"<name>","reason":"<why>","priority":"high"},{"service":"<name>","reason":"<why>","priority":"medium"}],"summary":"<2 sentence verdict>"}

Services available: Performance Marketing, Creative Engine, Social Media Growth, AI Automation & CRM, Funnels & Conversion, Branding & Strategy, Data & Analytics, Web Development.
${isLimited ? 'Important: live Instagram metrics could not be retrieved due to platform restrictions, so treat the numbers as directional estimates and note this in the summary.' : 'Use the live profile data below.'}

Profile:
Username: @${profile.username}
Display Name: ${profile.displayName}
Followers: ${profile.followers.toLocaleString()}
Following: ${profile.following.toLocaleString()}
Posts: ${profile.posts.toLocaleString()}
Bio: ${profile.bio}
Estimated Engagement Rate: ${metrics.engagementRate}%
Avg Likes/Post: ${metrics.avgLikes.toLocaleString()}
Monthly Reach: ${metrics.estimatedReach.toLocaleString()}
Story Completion: ${metrics.storyCompletion}%
Monthly Growth Rate: ${metrics.followerGrowthRate}%`

            const result = await model.generateContent(prompt)
            const raw = result.response.text().trim().replace(/^```json\s*/, '').replace(/\s*```$/, '')
            aiData = JSON.parse(raw)
          } catch {
            aiData = ruleBasedInsights(profile.followers, profile.posts, metrics.engagementRate)
          }

          send('status', { message: 'Audit complete.' })
          send('result', {
            profile: {
              username: profile.username,
              displayName: profile.displayName,
              followers: profile.followers,
              following: profile.following,
              posts: profile.posts,
              image: profile.image,
              limitedData: isLimited,
            },
            metrics,
            ai: aiData,
            analyzedAt: new Date().toISOString(),
          })
          controller.close()
        } catch (err) {
          const message = err instanceof Error ? err.message : 'Unknown error'
          send('error', {
            error: message.includes('fetch') || message.includes('HTTP')
              ? 'Could not reach Instagram right now. Please try again in a moment.'
              : message,
          })
          controller.close()
        }
      },
    }),
    {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        Connection: 'keep-alive',
      },
    }
  )
}
