import { NextRequest } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const encoder = new TextEncoder()

const SYSTEM_PROMPT = `You are Advi, Advertoria's AI growth advisor. Advertoria is a Chennai-based AI-powered revenue agency that helps businesses scale through 8 connected services:

1. Performance Marketing - Meta, Google & TikTok campaigns tied to CPL, ROAS, and revenue
2. Creative Engine - 30-60 high-conversion ad creatives/month: Reels, UGC videos, scripts
3. Funnels & Conversion - Landing pages, offer engineering, and CRO
4. AI Automation & CRM - AI WhatsApp bot, auto follow-up, CRM automation
5. Social Media Growth - Organic strategy, 30-90 day content calendar, viral hooks
6. Web Development - Next.js websites, e-commerce stores, SaaS platforms
7. Data & Analytics - KPI dashboards, attribution tracking, AI insights
8. Branding & Strategy - Brand positioning, visual identity, messaging framework

Rules:
- Be conversational, specific, and direct - like a smart growth consultant, not a salesperson
- Keep responses to 2-4 short paragraphs maximum
- Ask smart follow-up questions to understand their situation
- When you have enough context, name the 2-3 most impactful services and explain why
- End recommendations by suggesting they book a free strategy call via the contact section
- Never use bullet points unless listing final recommendations`

function buildPrompt(messages: { role: string; content: string }[]): string {
  const history = messages
    .map((message) => `${message.role === 'user' ? 'Visitor' : 'Advi'}: ${message.content}`)
    .join('\n\n')

  const isFirstMessage = messages.filter((message) => message.role === 'user').length === 1

  if (isFirstMessage) {
    return `${SYSTEM_PROMPT}

The visitor just started a conversation. Warmly greet them and respond to what they said, then ask one smart follow-up question to understand their situation better.

Visitor: ${messages[messages.length - 1]?.content ?? 'Hello'}

Advi:`
  }

  return `${SYSTEM_PROMPT}

Conversation so far:
${history}

Continue as Advi. If you have enough information, give concrete service recommendations. Otherwise ask the next most useful question.

Advi:`
}

function getModel() {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    throw new Error('Missing GEMINI_API_KEY')
  }

  const genAI = new GoogleGenerativeAI(apiKey)
  return genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    generationConfig: { maxOutputTokens: 512, temperature: 0.85 },
  })
}

type ChatMessage = { role: string; content: string }

function analyzeConversation(messages: ChatMessage[]) {
  const userMessages = messages
    .filter((message) => message.role === 'user')
    .map((message) => message.content.trim())
    .filter(Boolean)

  const joined = userMessages.join(' ').toLowerCase()
  const lastUserMessage = userMessages[userMessages.length - 1]?.toLowerCase() ?? ''

  const context = {
    userMessages,
    lastUserMessage,
    joined,
    industry:
      /real estate|property|broker|builder|realtor/.test(joined) ? 'real-estate' :
      /e-commerce|ecommerce|shop|store|d2c/.test(joined) ? 'ecommerce' :
      /coach|consultant|personal brand|creator|speaker/.test(joined) ? 'personal-brand' :
      /agency|service business|services/.test(joined) ? 'services' :
      'general',
    mentionsLeadGoal: /lead|enquir|booked call|calls|appointments/.test(joined),
    mentionsSalesGoal: /sales|revenue|roas|orders|conversion/.test(joined),
    mentionsAutomation: /automation|crm|follow-up|whatsapp|nurture/.test(joined),
    mentionsChannels: /meta|facebook|instagram ads|google ads|seo|referrals|organic/.test(joined),
    shortGreetingOnly: /^(hi|hello|hey|yo|hii)$/.test(lastUserMessage),
    wantsHuman:
      /real people|real person|human|someone from your team|talk to your team|call the company|call me|contact your team|speak to someone/.test(joined),
    asksPricing: /price|pricing|cost|budget|package|retainer/.test(joined),
    asksServices: /what do you do|services|offer|help with|can you do/.test(joined),
  }

  return context
}

function buildFallbackReply(messages: ChatMessage[]) {
  const context = analyzeConversation(messages)

  const recommendations: string[] = []
  let opener = "I have enough context to point you in the right direction."
  let question = 'What is the biggest bottleneck for you right now - lead volume, lead quality, or follow-up after someone enquires?'

  if (context.wantsHuman) {
    return "Absolutely - I can point you to the real team right away. The fastest option is to book a free strategy call through the contact section below, and if you prefer, you can also share your business type and goal here so I can help you reach the right person faster."
  }

  if (context.asksPricing) {
    return "Our pricing usually depends on the growth system you need, because some businesses only need performance marketing while others need funnels, creatives, and automation together. If you tell me your business type and monthly goal, I can point you toward the most likely package range before you book a free strategy call."
  }

  if (context.asksServices) {
    return "Advertoria helps businesses with performance marketing, creative production, funnels and conversion, AI automation and CRM, social media growth, web development, data and analytics, and branding strategy. Tell me what kind of business you run, and I’ll narrow that down to the 2 or 3 services that actually fit you."
  }

  if (context.industry === 'real-estate') {
    opener =
      'For a real estate business, the biggest upside usually comes from better lead quality, faster response time, and a tighter landing-page journey.'
    recommendations.push(
      'Performance Marketing to drive qualified Meta and Google leads in your target micro-markets',
      'Funnels & Conversion to turn traffic into form fills, WhatsApp chats, and site visits',
      'AI Automation & CRM to respond instantly and keep every buyer or investor lead warm'
    )
    question = context.mentionsChannels
      ? 'Out of your current channels, which one is underperforming most right now - Meta ads, Google ads, or organic referrals?'
      : 'Are you currently getting most enquiries from Meta ads, Google ads, or offline referrals?'
  } else if (context.industry === 'ecommerce') {
    opener =
      'For an e-commerce brand, the usual problem is not just traffic - it is the combination of creative fatigue, offer clarity, and weak retargeting.'
    recommendations.push(
      'Performance Marketing to rebuild campaign structure around profitable audiences',
      'Creative Engine to give you stronger hooks, UGC, and testing variations',
      'Data & Analytics to show which products, creatives, and audiences are actually driving profit'
    )
    question = 'What is hurting more right now - low click-through, weak add-to-cart rate, or poor checkout conversion?'
  } else if (context.industry === 'personal-brand') {
    opener =
      'For a coach or personal brand, growth usually comes from authority content, stronger positioning, and a clear path from audience attention to booked calls.'
    recommendations.push(
      'Social Media Growth to build a founder-led content engine',
      'Funnels & Conversion to move viewers into calls, webinars, or lead magnets',
      'Branding & Strategy to sharpen your positioning so the right audience trusts you faster'
    )
    question = 'Are you trying to grow your audience first, or do you already have attention and need more qualified calls from it?'
  } else if (context.mentionsAutomation) {
    opener =
      'If follow-up is your pain point, the fastest leverage usually comes from automation because most businesses lose deals in the first few hours after an enquiry.'
    recommendations.push(
      'AI Automation & CRM to automate first response, qualification, and follow-up',
      'Funnels & Conversion to structure the lead journey properly',
      'Data & Analytics to measure where prospects are dropping off'
    )
    question = 'What are you using today for lead handling - WhatsApp, forms, a CRM, or mostly manual follow-up?'
  } else {
    opener =
      context.mentionsLeadGoal || context.mentionsSalesGoal
        ? 'You are clearly looking for a stronger growth system, not just one isolated service.'
        : 'You likely need a tighter system that connects traffic, conversion, and follow-up.'
    recommendations.push(
      'Performance Marketing to create a predictable lead or sales engine',
      'Funnels & Conversion to improve how visitors become enquiries or customers',
      'AI Automation & CRM to make sure every lead is followed up consistently'
    )
    question = context.shortGreetingOnly && context.userMessages.length > 1
      ? 'From what you shared earlier, what part should we solve first - getting more leads, improving conversion, or automating follow-up?'
      : 'Tell me a little about your business model and where growth is slowing down most right now.'
  }

  if (context.shortGreetingOnly && context.userMessages.length === 1) {
    return "Hi, I'm Advi. Tell me what kind of business you run and what result you want most right now - more leads, more sales, or better follow-up."
  }

  return `${opener}\n\nThe three services I would look at first are:\n- ${recommendations.join('\n- ')}\n\n${question} You can also book a free strategy call via the contact section if you want a tailored plan from our team.`
}

async function streamText(
  controller: ReadableStreamDefaultController<Uint8Array>,
  text: string,
  chunkSize = 18,
  delayMs = 22
) {
  const words = text.split(' ')
  for (let index = 0; index < words.length; index += chunkSize) {
    const chunk = words.slice(index, index + chunkSize).join(' ')
    controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: `${index === 0 ? '' : ' '}${chunk}` })}\n\n`))
    await new Promise((resolve) => setTimeout(resolve, delayMs))
  }
}

function makeStream(text: string) {
  return new Response(
    new ReadableStream({
      async start(controller) {
        await streamText(controller, text)
        controller.enqueue(encoder.encode('data: [DONE]\n\n'))
        controller.close()
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

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    if (!Array.isArray(messages) || messages.length === 0) {
      return makeStream(
        "Hey there! I'm Advi, Advertoria's AI growth advisor. Tell me - what kind of business do you run, and what's the biggest challenge holding your growth back right now?"
      )
    }

    const prompt = buildPrompt(messages)
    let result: Awaited<ReturnType<ReturnType<typeof getModel>['generateContentStream']>> | null = null

    try {
      const model = getModel()
      result = await model.generateContentStream(prompt)
    } catch {
      return makeStream(buildFallbackReply(messages))
    }

    return new Response(
      new ReadableStream({
        async start(controller) {
          try {
            let sentAnything = false

            for await (const chunk of result.stream) {
              const text = chunk.text()
              if (!text) continue
              sentAnything = true
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`))
            }

            if (!sentAnything) {
              await streamText(controller, buildFallbackReply(messages))
            }

            controller.enqueue(encoder.encode('data: [DONE]\n\n'))
            controller.close()
          } catch {
            await streamText(controller, buildFallbackReply(messages))
            controller.enqueue(encoder.encode('data: [DONE]\n\n'))
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
  } catch (err) {
    const message = err instanceof Error ? err.message : ''
    const isQuota = /quota|limit|429/i.test(message)

    return makeStream(
      isQuota
        ? "I've hit my daily limit - I'll be back tomorrow. In the meantime, book a free strategy call and our team will personally build your growth plan."
        : "Sorry, I hit a snag. Please try again in a moment, or book a free strategy call and we'll handle it personally."
    )
  }
}
