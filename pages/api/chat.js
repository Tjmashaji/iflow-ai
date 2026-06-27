export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { messages, systemPrompt } = req.body
  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1024,
        system: systemPrompt || 'أنت iFlow AI، مساعد ذكي لمستخدمي الآيفون. أجب بالعربية.',
        messages,
      }),
    })
    const data = await r.json()
    res.status(200).json({ text: data.content?.map(b => b.text||'').join('') || 'خطأ.' })
  } catch {
    res.status(500).json({ text: 'خطأ في الاتصال.' })
  }
}
