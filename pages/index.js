import { useState, useRef, useEffect } from 'react'

const C = {
  bg: '#000000', surface: 'rgba(28,28,30,0.95)', surfaceHigh: 'rgba(44,44,46,0.9)',
  border: 'rgba(255,255,255,0.08)', borderBright: 'rgba(255,255,255,0.14)',
  text: '#FFFFFF', textSec: 'rgba(255,255,255,0.55)', textTer: 'rgba(255,255,255,0.28)',
  blue: '#0A84FF', indigo: '#5E5CE6', purple: '#BF5AF2', pink: '#FF375F',
  orange: '#FF9F0A', green: '#30D158', teal: '#40CBE0', yellow: '#FFD60A', red: '#FF453A',
}

function Card({ children, style = {}, onClick }) {
  const [p, setP] = useState(false)
  return (
    <div onClick={onClick} onMouseDown={() => onClick && setP(true)} onMouseUp={() => setP(false)} onMouseLeave={() => setP(false)}
      style={{ background: C.surface, border: '1px solid ' + C.border, borderRadius: 20, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', transform: p ? 'scale(0.97)' : 'scale(1)', transition: 'transform 0.15s cubic-bezier(.34,1.56,.64,1)', cursor: onClick ? 'pointer' : 'default', ...style }}>
      {children}
    </div>
  )
}

function ScoreRing({ score, size = 100, stroke = 9 }) {
  const r = (size - stroke) / 2, circ = 2 * Math.PI * r
  const [a, setA] = useState(0)
  useEffect(() => { const t = setTimeout(() => setA(score), 400); return () => clearTimeout(t) }, [score])
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <defs>
          <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0A84FF" /><stop offset="100%" stopColor="#BF5AF2" />
          </linearGradient>
        </defs>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={stroke} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="url(#g1)" strokeWidth={stroke}
          strokeDasharray={circ} strokeDashoffset={circ - (a/100)*circ} strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1.3s cubic-bezier(.22,.68,0,1.2)' }} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: size > 80 ? 24 : 15, fontWeight: 800, color: C.text, letterSpacing: -0.5 }}>{a}</div>
        <div style={{ fontSize: 9, color: C.textSec, fontWeight: 600, letterSpacing: 0.5 }}>SCORE</div>
      </div>
    </div>
  )
}

function ProgressBar({ value, color, height = 6 }) {
  const [a, setA] = useState(0)
  useEffect(() => { const t = setTimeout(() => setA(value), 300); return () => clearTimeout(t) }, [value])
  return (
    <div style={{ background: 'rgba(255,255,255,0.09)', borderRadius: 99, height, overflow: 'hidden' }}>
      <div style={{ width: a + '%', height: '100%', background: color, borderRadius: 99, transition: 'width 1.1s cubic-bezier(.22,.68,0,1.2)' }} />
    </div>
  )
}

function Pill({ children, color }) {
  return <span style={{ background: color + '22', color, fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 99, border: '1px solid ' + color + '44', letterSpacing: 0.3 }}>{children}</span>
}

// ââ HOME ââ
function HomeScreen({ nav }) {
  const h = new Date().getHours()
  const gr = h < 12 ? 'ØµØ¨Ø§Ø­ Ø§ÙØ®ÙØ±' : h < 17 ? 'ÙØ³Ø§Ø¡ Ø§ÙÙÙØ±' : 'ÙØ³Ø§Ø¡ Ø§ÙØ®ÙØ±'
  const [ready, setReady] = useState(false)
  useEffect(() => { setTimeout(() => setReady(true), 200) }, [])

  return (
    <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 90 }}>
      {/* Glow */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', width: 280, height: 280, borderRadius: '50%', background: C.indigo, filter: 'blur(80px)', opacity: 0.18, top: -80, right: -60, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', width: 200, height: 200, borderRadius: '50%', background: C.purple, filter: 'blur(70px)', opacity: 0.12, top: 40, left: -80, pointerEvents: 'none' }} />

        <div style={{ padding: '22px 20px 8px', position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: 13, color: C.textSec, marginBottom: 2 }}>{new Date().toLocaleDateString('ar', { weekday: 'long', month: 'long', day: 'numeric' })}</div>
          <div style={{ fontSize: 27, fontWeight: 800, color: C.text, letterSpacing: -0.8, lineHeight: 1.2 }}>{gr}Ø ØªØ±ÙÙ ð</div>
          <div style={{ fontSize: 14, color: C.textSec, marginTop: 4 }}>Ø¢ÙÙÙÙÙ ÙØ­ØªØ§Ø¬ Ø§ÙØªØ¨Ø§ÙÙ ÙÙ Ù¤ Ø£Ø´ÙØ§Ø¡</div>
        </div>

        {/* Score Card */}
        <div style={{ margin: '14px 16px', position: 'relative', zIndex: 1 }}>
          <Card onClick={() => nav('health')} style={{ padding: 18, background: 'linear-gradient(135deg,rgba(94,92,230,0.25),rgba(10,132,255,0.18))', border: '1px solid rgba(94,92,230,0.28)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <ScoreRing score={ready ? 74 : 0} size={88} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: C.textSec, fontWeight: 600, marginBottom: 3, letterSpacing: 0.8, textTransform: 'uppercase' }}>AI Health Score</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: C.text, letterSpacing: -0.4, marginBottom: 8 }}>Ø¬ÙØ¯ â ÙÙÙÙ ØªØ­Ø³ÙÙÙ</div>
                <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                  <Pill color={C.red}>Ø§ÙØ®ØµÙØµÙØ© â ï¸</Pill>
                  <Pill color={C.orange}>Ø§ÙØªØ®Ø²ÙÙ</Pill>
                  <Pill color={C.green}>Ø§ÙØ£Ø¯Ø§Ø¡ â</Pill>
                </div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 14 }}>
              {[['ð','Ø§ÙØ¨Ø·Ø§Ø±ÙØ©','78%',C.yellow],['ð¾','Ø§ÙØªØ®Ø²ÙÙ','61%',C.orange],['ð','Ø§ÙØ®ØµÙØµÙØ©','45%',C.red]].map(([icon,label,val,col]) => (
                <div key={label} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: '8px 10px' }}>
                  <div style={{ fontSize: 15, marginBottom: 3 }}>{icon}</div>
                  <div style={{ fontSize: 10, color: C.textSec, marginBottom: 1 }}>{label}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: col }}>{val}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ padding: '4px 16px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div style={{ fontSize: 17, fontWeight: 700, color: C.text, letterSpacing: -0.3 }}>Ø¥Ø¬Ø±Ø§Ø¡Ø§Øª Ø³Ø±ÙØ¹Ø©</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
          {[['ð§¹','ØªÙØ¸ÙÙ',C.blue,'storage'],['ð','Ø§ÙØ¨Ø·Ø§Ø±ÙØ©',C.green,'battery'],['ð','Ø§ÙØ®ØµÙØµÙØ©',C.purple,'privacy'],['ð¸','Ø§ÙØµÙØ±',C.orange,'photos'],['ð','Ø§ÙØªÙÙÙÙ',C.teal,'calendar'],['ð¤','Ø§ÙÙØ³Ø§Ø¹Ø¯',C.indigo,'assistant']].map(([icon,label,col,screen]) => (
            <Card key={label} onClick={() => nav(screen)} style={{ padding: '13px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: col + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{icon}</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: C.text }}>{label}</div>
            </Card>
          ))}
        </div>
      </div>

      {/* Insights */}
      <div style={{ padding: '18px 16px 0' }}>
        <div style={{ fontSize: 17, fontWeight: 700, color: C.text, letterSpacing: -0.3, marginBottom: 10 }}>ØªÙØµÙØ§Øª AI</div>
        {[['ð¸','Ù£Ù¤Ù§ ØµÙØ±Ø© ÙÙØ±Ø±Ø© ØªØ£Ø®Ø° Ù¢.Ù¡ ØºÙØºØ§',C.orange,'photos'],['ð','ØµØ­Ø© Ø§ÙØ¨Ø·Ø§Ø±ÙØ© Ù§Ù¨Ùª â ÙÙÙØµØ­ Ø¨Ø§ÙØ§Ø³ØªØ¨Ø¯Ø§Ù',C.yellow,'battery'],['ð','Ù¥ ØªØ·Ø¨ÙÙØ§Øª ÙÙØ§ ØµÙØ§Ø­ÙØ© Ø§ÙÙÙÙØ¹ Ø¯Ø§Ø¦ÙØ§Ù',C.red,'privacy'],['ð¾','Ù¦.Ù£ ØºÙØºØ§ ÙÙÙÙ ØªØ­Ø±ÙØ±ÙØ§ Ø§ÙØ¢Ù',C.blue,'storage']].map(([icon,text,col,screen],i) => (
          <Card key={i} onClick={() => nav(screen)} style={{ padding: '12px 14px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: col + '1A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, flexShrink: 0 }}>{icon}</div>
            <div style={{ flex: 1, fontSize: 13, color: C.text, lineHeight: 1.4 }}>{text}</div>
            <div style={{ color: C.textTer, fontSize: 16 }}>âº</div>
          </Card>
        ))}
      </div>

      {/* Storage */}
      <div style={{ padding: '18px 16px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div style={{ fontSize: 17, fontWeight: 700, color: C.text }}>Ø§ÙØªØ®Ø²ÙÙ</div>
          <button onClick={() => nav('storage')} style={{ background: 'none', border: 'none', color: C.blue, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>ØªÙØ§ØµÙÙ</button>
        </div>
        <Card style={{ padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <div><div style={{ fontSize: 24, fontWeight: 800, color: C.text, letterSpacing: -0.5 }}>Ù¨Ù£.Ù¢ GB</div><div style={{ fontSize: 11, color: C.textSec }}>ÙØ³ØªØ®Ø¯Ù ÙÙ Ù¢Ù¥Ù¦ GB</div></div>
            <div style={{ textAlign: 'left' }}><div style={{ fontSize: 22, fontWeight: 800, color: C.green }}>Ù¡Ù§Ù¢.Ù¨</div><div style={{ fontSize: 11, color: C.textSec }}>ÙØªØ§Ø­</div></div>
          </div>
          <div style={{ display: 'flex', height: 8, borderRadius: 99, overflow: 'hidden', gap: 2 }}>
            {[[32,C.orange],[18,C.blue],[12,C.purple],[8,C.pink],[30,'rgba(255,255,255,0.07)']].map(([w,c],i) => (
              <div key={i} style={{ width: w+'%', background: c, borderRadius: 99 }} />
            ))}
          </div>
        </Card>
      </div>

      {/* Subs */}
      <div style={{ padding: '18px 16px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div style={{ fontSize: 17, fontWeight: 700, color: C.text }}>Ø§ÙØ§Ø´ØªØ±Ø§ÙØ§Øª</div>
          <button onClick={() => nav('subscriptions')} style={{ background: 'none', border: 'none', color: C.blue, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Ø¥Ø¯Ø§Ø±Ø©</button>
        </div>
        <Card style={{ padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div><div style={{ fontSize: 11, color: C.textSec, marginBottom: 1 }}>Ø¥Ø¬ÙØ§ÙÙ Ø´ÙØ±Ù</div><div style={{ fontSize: 26, fontWeight: 800, color: C.text, letterSpacing: -0.5 }}>Ù¡Ù¤Ù¡ Ø±.Ø³</div></div>
            <div style={{ background: C.red + '22', border: '1px solid ' + C.red + '44', borderRadius: 12, padding: '6px 12px', textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: C.red }}>Ù£</div><div style={{ fontSize: 10, color: C.red }}>ÙÙØ³ÙØ©</div>
            </div>
          </div>
          {[['ð¬','Netflix','Ù¤Ù© Ø±.Ø³',C.red],['âï¸','iCloud+','Ù¡Ù© Ø±.Ø³',C.blue],['ðµ','Spotify','Ù¢Ù© Ø±.Ø³',C.green]].map(([icon,name,price,col]) => (
            <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: col + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15 }}>{icon}</div>
              <div style={{ flex: 1, fontSize: 13, fontWeight: 600, color: C.text }}>{name}</div>
              <div style={{ fontSize: 13, color: C.textSec }}>{price}</div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  )
}

// ââ HEALTH ââ
function HealthScreen() {
  const cats = [
    ['ð¾','Ø§ÙØªØ®Ø²ÙÙ',61,C.orange],['ð','Ø§ÙØ¨Ø·Ø§Ø±ÙØ©',78,C.yellow],['ð','Ø§ÙØ®ØµÙØµÙØ©',45,C.red],
    ['ð¡ï¸','Ø§ÙØ£ÙØ§Ù',88,C.green],['ð¸','Ø§ÙØµÙØ±',55,C.purple],['ð','Ø§ÙÙÙÙØ§Øª',72,C.blue],
    ['ð³','Ø§ÙØ§Ø´ØªØ±Ø§ÙØ§Øª',65,C.pink],['ð±','Ø§ÙØªØ·Ø¨ÙÙØ§Øª',80,C.teal],['ð¥','Ø¬ÙØ§Øª Ø§ÙØ§ØªØµØ§Ù',69,C.indigo],
    ['ð','Ø§ÙØªÙÙÙÙ',91,C.green],['âï¸','Ø§ÙÙØ³Ø® Ø§ÙØ§Ø­ØªÙØ§Ø·Ù',95,C.blue],['â¡','Ø§ÙØ£Ø¯Ø§Ø¡',84,C.yellow],
  ]
  const overall = Math.round(cats.reduce((a,c) => a + c[2], 0) / cats.length)
  const [ready, setReady] = useState(false)
  useEffect(() => { setTimeout(() => setReady(true), 200) }, [])

  return (
    <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 90 }}>
      <div style={{ padding: '20px 16px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: C.indigo, filter: 'blur(90px)', opacity: 0.18, top: -100, left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none' }} />
        <ScoreRing score={ready ? overall : 0} size={140} stroke={12} />
        <div style={{ fontSize: 22, fontWeight: 800, color: C.text, letterSpacing: -0.5 }}>ØµØ­Ø© Ø¢ÙÙÙÙÙ</div>
        <div style={{ fontSize: 13, color: C.textSec }}>Ø¬ÙØ¯ â ÙÙÙÙ ØªØ­Ø³ÙÙÙ Ø¨Ø®Ø·ÙØ§Øª Ø¨Ø³ÙØ·Ø©</div>
        <div style={{ display: 'flex', gap: 8 }}><Pill color={C.red}>Ù£ ÙØ´Ø§ÙÙ Ø­Ø±Ø¬Ø©</Pill><Pill color={C.orange}>Ù¤ ØªØ­Ø³ÙÙØ§Øª</Pill></div>
      </div>
      <div style={{ padding: '0 16px' }}>
        {cats.map(([icon,label,score,col]) => (
          <Card key={label} style={{ padding: '12px 14px', marginBottom: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ fontSize: 20, width: 32 }}>{icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{label}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: col }}>{score}</div>
                </div>
                <ProgressBar value={score} color={col} />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

// ââ ASSISTANT (Real AI) ââ
function AssistantScreen() {
  const [msgs, setMsgs] = useState([
    { role: 'assistant', text: 'ÙØ±Ø­Ø¨Ø§Ù ØªØ±ÙÙ! ð Ø£ÙØ§ iFlow AI.\n\nÙÙÙÙÙÙ ÙØ³Ø§Ø¹Ø¯ØªÙ ÙÙ:\nâ¢ ØªØ­ÙÙÙ Ø£Ø¯Ø§Ø¡ Ø¢ÙÙÙÙÙ\nâ¢ ØªÙÙÙØ± ÙØ³Ø§Ø­Ø© Ø§ÙØªØ®Ø²ÙÙ\nâ¢ ÙØ±Ø§Ø¬Ø¹Ø© Ø§ÙØ®ØµÙØµÙØ©\nâ¢ ØªÙØ¸ÙÙ Ø§ÙØµÙØ± ÙØ§ÙØ§Ø´ØªØ±Ø§ÙØ§Øª\n\nÙÙÙ ÙÙÙÙÙÙ ÙØ³Ø§Ø¹Ø¯ØªÙ Ø§ÙÙÙÙØ' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const endRef = useRef(null)

  const QUICK = ['Ø¢ÙÙÙÙÙ Ø¨Ø·ÙØ¡','Ø£Ø±ÙØ¯ ÙØ³Ø§Ø­Ø© Ø£ÙØ«Ø±','Ø±Ø§Ø¬Ø¹ Ø®ØµÙØµÙØªÙ','ÙØ¸ÙÙ ØµÙØ±Ù','ÙØ§ ÙÙ Health ScoreØ','Ø§Ø´ØªØ±Ø§ÙØ§Øª ÙÙØ³ÙØ©']

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [msgs, loading])

  const send = async (text) => {
    if (!text.trim() || loading) return
    const userMsg = { role: 'user', text }
    const newMsgs = [...msgs, userMsg]
    setMsgs(newMsgs)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMsgs.map(m => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: m.text })),
          systemPrompt: 'Ø£ÙØª iFlow AIØ ÙØ³Ø§Ø¹Ø¯ Ø°ÙÙ ÙØªØ®ØµØµ ÙÙ ÙØ³Ø§Ø¹Ø¯Ø© ÙØ³ØªØ®Ø¯ÙÙ Ø§ÙØ¢ÙÙÙÙ. ÙØ¯ÙÙ ÙØ¹Ø±ÙØ© Ø¹ÙÙÙØ© Ø¨Ù iOS ÙØ¥Ø¯Ø§Ø±Ø© Ø§ÙØªØ®Ø²ÙÙ ÙØ§ÙØ¨Ø·Ø§Ø±ÙØ© ÙØ§ÙØ®ØµÙØµÙØ© ÙØ§ÙØµÙØ± ÙØ§ÙØ§Ø´ØªØ±Ø§ÙØ§Øª. Ø§ÙÙØ³ØªØ®Ø¯Ù Ø§Ø³ÙÙ ØªØ±ÙÙ. Ø£Ø¬Ø¨ Ø¨Ø§ÙØ¹Ø±Ø¨ÙØ© Ø¨Ø´ÙÙ ÙØ¯Ù ÙÙØ®ØªØµØ± ÙØ¹ÙÙÙ ÙØ¹ Ø¥ÙÙÙØ¬Ù ÙÙØ§Ø³Ø¨Ø©.'
        })
      })
      const data = await res.json()
      setMsgs(m => [...m, { role: 'assistant', text: data.text }])
    } catch {
      setMsgs(m => [...m, { role: 'assistant', text: 'â Ø®Ø·Ø£ ÙÙ Ø§ÙØ§ØªØµØ§ÙØ Ø­Ø§ÙÙ ÙØ¬Ø¯Ø¯Ø§Ù.' }])
    }
    setLoading(false)
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 16px 10px' }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-start' : 'flex-end', marginBottom: 10 }}>
            <div style={{ maxWidth: '84%', background: m.role === 'user' ? C.surfaceHigh : 'linear-gradient(135deg,rgba(94,92,230,0.28),rgba(10,132,255,0.18))', border: '1px solid ' + (m.role === 'user' ? C.border : 'rgba(94,92,230,0.3)'), borderRadius: m.role === 'user' ? '18px 4px 18px 18px' : '4px 18px 18px 18px', padding: '11px 14px', fontSize: 14, color: C.text, lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}>
            <div style={{ background: 'linear-gradient(135deg,rgba(94,92,230,0.28),rgba(10,132,255,0.18))', border: '1px solid rgba(94,92,230,0.3)', borderRadius: '4px 18px 18px 18px', padding: '14px 18px', display: 'flex', gap: 5 }}>
              {[0,1,2].map(j => <div key={j} style={{ width: 7, height: 7, borderRadius: '50%', background: C.indigo, animation: 'pulse 1.2s ' + (j*0.2) + 's infinite' }} />)}
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div style={{ padding: '6px 16px 4px', overflowX: 'auto' }}>
        <div style={{ display: 'flex', gap: 7, paddingBottom: 2 }}>
          {QUICK.map((q, i) => (
            <button key={i} onClick={() => send(q)} disabled={loading} style={{ background: C.surfaceHigh, border: '1px solid ' + C.border, color: C.textSec, borderRadius: 99, padding: '6px 12px', fontSize: 12, whiteSpace: 'nowrap', cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0, opacity: loading ? 0.5 : 1 }}>{q}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: '8px 16px 24px', borderTop: '1px solid ' + C.border }}>
        <div style={{ display: 'flex', gap: 8, background: C.surfaceHigh, border: '1px solid ' + C.border, borderRadius: 16, padding: '8px 12px', alignItems: 'center' }}>
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && input.trim()) send(input) }}
            placeholder="Ø§Ø³Ø£Ù iFlow AI..." style={{ flex: 1, background: 'none', border: 'none', outline: 'none', color: C.text, fontSize: 15, fontFamily: 'inherit', direction: 'rtl' }} />
          <button onClick={() => send(input)} disabled={loading || !input.trim()} style={{ width: 36, height: 36, borderRadius: 10, background: (!loading && input.trim()) ? 'linear-gradient(135deg,#0A84FF,#5E5CE6)' : C.surfaceHigh, border: 'none', color: '#fff', fontSize: 17, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s' }}>â</button>
        </div>
      </div>
    </div>
  )
}

// ââ STORAGE ââ
function StorageScreen() {
  const items = [['ð¸','Ø§ÙØµÙØ± ÙØ§ÙÙÙØ¯ÙÙ',32.4,C.orange],['ð±','Ø§ÙØªØ·Ø¨ÙÙØ§Øª',18.1,C.blue],['ðµ','Ø§ÙÙÙØ³ÙÙÙ',9.8,C.purple],['ð¬','Ø§ÙØ±Ø³Ø§Ø¦Ù',7.2,C.teal],['ð','Ø§ÙÙÙÙØ§Øª',6.3,C.yellow],['ð','Ø§ÙÙØ³Ø® Ø§ÙØ§Ø­ØªÙØ§Ø·Ù',5.1,C.green],['âï¸','Ø§ÙÙØ¸Ø§Ù',4.3,C.textTer]]
  return (
    <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 90, padding: '16px 16px 90px' }}>
      <Card style={{ padding: 18, marginBottom: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 12 }}>
          <div><div style={{ fontSize: 11, color: C.textSec, marginBottom: 1 }}>ÙØ³ØªØ®Ø¯Ù</div><div style={{ fontSize: 32, fontWeight: 900, color: C.text, letterSpacing: -1 }}>Ù¨Ù£.Ù¢ GB</div></div>
          <div style={{ textAlign: 'right' }}><div style={{ fontSize: 11, color: C.textSec, marginBottom: 1 }}>ÙÙ Ù¢Ù¥Ù¦ GB</div><div style={{ fontSize: 20, fontWeight: 700, color: C.green }}>Ù¡Ù§Ù¢.Ù¨ ÙØªØ§Ø­</div></div>
        </div>
        <div style={{ display: 'flex', height: 10, borderRadius: 99, overflow: 'hidden', gap: 2 }}>
          {items.map(([,, size, col], i) => <div key={i} style={{ width: ((size/83.2)*100)+'%', background: col, borderRadius: 99, minWidth: 3 }} />)}
        </div>
      </Card>
      {items.map(([icon, label, size, col]) => (
        <Card key={label} style={{ padding: '12px 14px', marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ fontSize: 20, width: 32 }}>{icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{label}</div>
                <div style={{ fontSize: 13, color: col, fontWeight: 700 }}>{size} GB</div>
              </div>
              <ProgressBar value={(size/83.2)*100} color={col} />
            </div>
          </div>
        </Card>
      ))}
      <Card style={{ padding: 16, marginTop: 6, background: 'rgba(10,132,255,0.1)', border: '1px solid rgba(10,132,255,0.22)' }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 5 }}>â¡ ÙÙÙÙ ØªØ­Ø±ÙØ± Ù¦.Ù£ GB Ø§ÙØ¢Ù</div>
        <div style={{ fontSize: 13, color: C.textSec, marginBottom: 12 }}>Ù£Ù¤Ù§ ØµÙØ±Ø© ÙÙØ±Ø±Ø© + Ù¨Ù© ÙÙØ¯ÙÙ ÙØ¯ÙÙ + Ù¢Ù£Ù¤ ÙÙØ·Ø© Ø´Ø§Ø´Ø©</div>
        <button style={{ width: '100%', background: 'linear-gradient(135deg,#0A84FF,#5E5CE6)', border: 'none', borderRadius: 13, color: '#fff', fontSize: 14, fontWeight: 700, padding: '11px 0', cursor: 'pointer' }}>ØªÙØ¸ÙÙ Ø°ÙÙ â¨</button>
      </Card>
    </div>
  )
}

// ââ BATTERY ââ
function BatteryScreen() {
  const [ready, setReady] = useState(false)
  useEffect(() => { setTimeout(() => setReady(true), 200) }, [])
  return (
    <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 90, padding: '16px 16px 90px' }}>
      <Card style={{ padding: 18, background: 'linear-gradient(135deg,rgba(48,209,88,0.12),rgba(64,203,224,0.08))', border: '1px solid rgba(48,209,88,0.18)', marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <ScoreRing score={ready ? 78 : 0} size={88} />
          <div>
            <div style={{ fontSize: 12, color: C.textSec, marginBottom: 3 }}>ØµØ­Ø© Ø§ÙØ¨Ø·Ø§Ø±ÙØ©</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: C.yellow, letterSpacing: -0.5 }}>Ù§Ù¨Ùª</div>
            <div style={{ fontSize: 13, color: C.textSec }}>ÙÙÙØµØ­ Ø¨Ø§ÙØ§Ø³ØªØ¨Ø¯Ø§Ù ÙØ±ÙØ¨Ø§Ù</div>
          </div>
        </div>
      </Card>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
        {[['â¡','Ø§ÙØ´Ø­Ù Ø§ÙØ­Ø§ÙÙ','Ù©Ù¤Ùª',C.green],['ð¡ï¸','Ø§ÙØ­Ø±Ø§Ø±Ø©','Ø¹Ø§Ø¯ÙØ©',C.blue],['ð','Ø¯ÙØ±Ø§Øª Ø§ÙØ´Ø­Ù','Ù¥Ù¦Ù§',C.orange],['â±ï¸','ÙÙØª Ø§ÙØ§Ø³ØªØ®Ø¯Ø§Ù','Ù¦ Ø³Ø§Ø¹Ø§Øª',C.purple]].map(([icon,label,val,col]) => (
          <Card key={label} style={{ padding: 14 }}>
            <div style={{ fontSize: 22, marginBottom: 6 }}>{icon}</div>
            <div style={{ fontSize: 11, color: C.textSec, marginBottom: 2 }}>{label}</div>
            <div style={{ fontSize: 17, fontWeight: 800, color: col }}>{val}</div>
          </Card>
        ))}
      </div>
      {[['ð','ÙØ¹ÙÙ ÙØ¶Ø¹ Ø§ÙØ·Ø§ÙØ© Ø§ÙÙÙØ®ÙØ¶Ø© ÙÙÙØ§Ù','Ø¹Ø§ÙÙ'],['ð¶','Ø£ÙÙÙ ØªØ­Ø¯ÙØ« Ø§ÙØªØ·Ø¨ÙÙØ§Øª ÙÙ Ø§ÙØ®ÙÙÙØ©','ÙØªÙØ³Ø·'],['ð','Ø§Ø®ÙØ¶ Ø§ÙØ³Ø·ÙØ¹ Ø¥ÙÙ Ù§Ù Ùª','ÙØªÙØ³Ø·'],['ð','ÙÙÙÙ ØµÙØ§Ø­ÙØ§Øª Ø§ÙÙÙÙØ¹ Ø§ÙØ¯Ø§Ø¦Ù','Ø¹Ø§ÙÙ']].map(([icon, text, impact], i) => (
        <Card key={i} style={{ padding: '12px 14px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontSize: 20 }}>{icon}</div>
          <div style={{ flex: 1, fontSize: 13, color: C.text }}>{text}</div>
          <Pill color={impact === 'Ø¹Ø§ÙÙ' ? C.green : C.orange}>{impact}</Pill>
        </Card>
      ))}
    </div>
  )
}

// ââ PRIVACY ââ
function PrivacyScreen() {
  const [ready, setReady] = useState(false)
  useEffect(() => { setTimeout(() => setReady(true), 200) }, [])
  return (
    <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 90, padding: '16px 16px 90px' }}>
      <Card style={{ padding: 18, background: 'linear-gradient(135deg,rgba(255,69,58,0.12),rgba(191,90,242,0.08))', border: '1px solid rgba(255,69,58,0.2)', marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <ScoreRing score={ready ? 45 : 0} size={88} />
          <div>
            <div style={{ fontSize: 12, color: C.textSec, marginBottom: 3 }}>Ø¯Ø±Ø¬Ø© Ø§ÙØ®ØµÙØµÙØ©</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: C.red }}>ØªØ­ØªØ§Ø¬ ÙØ±Ø§Ø¬Ø¹Ø©</div>
            <div style={{ fontSize: 13, color: C.textSec }}>Ù¥ ØªØ·Ø¨ÙÙØ§Øª ÙÙØ§ ØµÙØ§Ø­ÙØ§Øª Ø®Ø·Ø±Ø©</div>
          </div>
        </div>
      </Card>
      {[['ð','Ø§ÙÙÙÙØ¹ Ø¯Ø§Ø¦ÙØ§Ù',5,'Ø¹Ø§ÙÙ',C.red],['ðï¸','Ø§ÙÙÙÙØ±ÙÙÙÙ',8,'ÙØªÙØ³Ø·',C.orange],['ð·','Ø§ÙÙØ§ÙÙØ±Ø§',11,'ÙÙØ®ÙØ¶',C.yellow],['ð¸','Ø§ÙØµÙØ± ÙØ§ÙÙØ©',14,'ÙØªÙØ³Ø·',C.orange],['ð¬','Ø§ÙØ¥Ø´Ø¹Ø§Ø±Ø§Øª',32,'ÙÙØ®ÙØ¶',C.blue],['ðµ','Ø§ÙØ¨ÙÙØªÙØ«',6,'ÙØªÙØ³Ø·',C.orange]].map(([icon,label,apps,risk,col],i) => (
        <Card key={i} style={{ padding: '13px 14px', marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ fontSize: 20, width: 32 }}>{icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{label}</div>
                <Pill color={col}>{risk}</Pill>
              </div>
              <div style={{ fontSize: 12, color: C.textSec }}>{apps} ØªØ·Ø¨ÙÙ</div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

// ââ PHOTOS ââ
function PhotosScreen() {
  return (
    <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 90, padding: '16px 16px 90px' }}>
      <Card style={{ padding: 18, background: 'linear-gradient(135deg,rgba(191,90,242,0.18),rgba(255,55,95,0.12))', border: '1px solid rgba(191,90,242,0.22)', marginBottom: 14 }}>
        <div style={{ fontSize: 12, color: C.textSec, marginBottom: 1 }}>ÙÙÙÙ ØªÙÙÙØ±</div>
        <div style={{ fontSize: 36, fontWeight: 900, color: C.text, letterSpacing: -1, marginBottom: 3 }}>Ù¨.Ù¥ GB</div>
        <div style={{ fontSize: 13, color: C.textSec, marginBottom: 14 }}>ÙÙ Ù¡Ù¬Ù¡Ù Ù¤ ØµÙØ± ÙÙÙØ¯ÙÙÙØ§Øª ØºÙØ± Ø¶Ø±ÙØ±ÙØ©</div>
        <button style={{ width: '100%', background: 'linear-gradient(135deg,#BF5AF2,#FF375F)', border: 'none', borderRadius: 13, color: '#fff', fontSize: 15, fontWeight: 700, padding: '12px 0', cursor: 'pointer' }}>ØªÙØ¸ÙÙ Ø°ÙÙ Ø¨Ø§ÙÙ AI â¨</button>
      </Card>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {[['ð¥','ÙÙØ±Ø±Ø©',347,'Ù¢.Ù¡ GB',C.red,true],['ð«ï¸','Ø¶Ø¨Ø§Ø¨ÙØ©',89,'Ù¤Ù¢Ù  MB',C.orange,false],['ð±','ÙÙØ·Ø§Øª Ø´Ø§Ø´Ø©',234,'Ù¡.Ù¢ GB',C.blue,false],['ð¬','ÙÙØ¯ÙÙÙØ§Øª ÙØ¨ÙØ±Ø©',12,'Ù£.Ù¨ GB',C.purple,true],['ð§¾','Ø¥ÙØµØ§ÙØ§Øª',56,'Ù¢Ù¨Ù  MB',C.yellow,false],['ð','ÙÙÙØ²',145,'Ù¦Ù¨Ù  MB',C.pink,false]].map(([icon,label,count,size,col,urgent],i) => (
          <Card key={i} style={{ padding: '13px 12px' }}>
            {urgent && <div style={{ background: C.red, borderRadius: 5, fontSize: 9, fontWeight: 800, color: '#fff', padding: '1px 6px', marginBottom: 5, display: 'inline-block' }}>ÙÙÙ</div>}
            <div style={{ fontSize: 24, marginBottom: 4 }}>{icon}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 2 }}>{label}</div>
            <div style={{ fontSize: 11, color: C.textSec, marginBottom: 8 }}>{count} Â· {size}</div>
            <button style={{ width: '100%', background: col + '22', border: '1px solid ' + col + '44', color: col, fontSize: 11, fontWeight: 700, padding: '5px 0', borderRadius: 8, cursor: 'pointer' }}>ÙØ±Ø§Ø¬Ø¹Ø©</button>
          </Card>
        ))}
      </div>
    </div>
  )
}

// ââ CALENDAR ââ
function CalendarScreen() {
  return (
    <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 90, padding: '16px 16px 90px' }}>
      <Card style={{ padding: 14, background: 'rgba(255,69,58,0.1)', border: '1px solid rgba(255,69,58,0.22)', marginBottom: 14 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: C.red, marginBottom: 4 }}>â ï¸ ØªØ¹Ø§Ø±Ø¶ ÙÙ Ø§ÙÙÙØ§Ø¹ÙØ¯</div>
        <div style={{ fontSize: 13, color: C.textSec, marginBottom: 10 }}>Ø§Ø¬ØªÙØ§Ø¹ Ù¡Ù :Ù£Ù  ÙØ§ÙØ¹Ø±Ø¶ Ù¡Ù¡:Ù Ù  ÙØªØ¯Ø§Ø®ÙØ§Ù</div>
        <button style={{ background: C.red, border: 'none', borderRadius: 10, color: '#fff', fontSize: 13, fontWeight: 700, padding: '8px 16px', cursor: 'pointer' }}>Ø­Ù Ø§ÙØªØ¹Ø§Ø±Ø¶</button>
      </Card>
      {[['Ù©:Ù Ù  Øµ','Ø§Ø¬ØªÙØ§Ø¹ Ø§ÙÙØ±ÙÙ',false,C.blue],['Ù¡Ù :Ù£Ù  Øµ','ÙÙØ§ÙÙØ© ÙØ¹ Ø§ÙØ¹ÙÙÙ',true,C.red],['Ù¡Ù¡:Ù Ù  Øµ','Ø¹Ø±Ø¶ ØªÙØ¯ÙÙÙ',true,C.red],['Ù¢:Ù Ù  Ù','ÙÙØª Ø§ÙØªØ±ÙÙØ²',false,C.green],['Ù¤:Ù£Ù  Ù','ÙØ±Ø§Ø¬Ø¹Ø© Ø§ÙÙØ´Ø±ÙØ¹',false,C.purple]].map(([time,title,conflict,col],i) => (
        <Card key={i} style={{ padding: '13px 14px', marginBottom: 8, borderRight: '3px solid ' + col }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ fontSize: 12, color: col, fontWeight: 700, width: 52, flexShrink: 0 }}>{time}</div>
            <div style={{ flex: 1, fontSize: 14, fontWeight: 600, color: C.text }}>{title}</div>
            {conflict && <Pill color={C.red}>ØªØ¹Ø§Ø±Ø¶</Pill>}
          </div>
        </Card>
      ))}
    </div>
  )
}

// ââ SUBSCRIPTIONS ââ
function SubscriptionsScreen() {
  const subs = [['ð¬','Netflix',49,C.red,false],['âï¸','iCloud+',19,C.blue,false],['ðµ','Spotify',29,C.green,false],['ðº','Apple TV+',25,C.textSec,true],['ð®','Apple Arcade',19,C.purple,true],['ð°','ÙØ¬ÙØ© Ø±ÙÙÙØ©',15,C.yellow,true]]
  const total = subs.reduce((a,s) => a + s[2], 0)
  return (
    <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 90, padding: '16px 16px 90px' }}>
      <Card style={{ padding: 18, background: 'linear-gradient(135deg,rgba(255,55,95,0.12),rgba(255,159,10,0.08))', border: '1px solid rgba(255,55,95,0.18)', marginBottom: 14 }}>
        <div style={{ fontSize: 11, color: C.textSec, marginBottom: 1 }}>Ø¥Ø¬ÙØ§ÙÙ Ø´ÙØ±Ù</div>
        <div style={{ fontSize: 34, fontWeight: 900, color: C.text, letterSpacing: -1, marginBottom: 2 }}>{total} Ø±.Ø³</div>
        <div style={{ fontSize: 13, color: C.textSec, marginBottom: 10 }}>{total * 12} Ø±.Ø³ Ø³ÙÙÙØ§Ù</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Pill color={C.red}>Ù£ ÙÙØ³ÙØ©</Pill>
          <Pill color={C.orange}>ÙÙÙØ± Ù¥Ù© Ø±.Ø³/Ø´ÙØ±</Pill>
        </div>
      </Card>
      <div style={{ fontSize: 13, color: C.red, fontWeight: 700, marginBottom: 8 }}>ð´ ÙÙØ³ÙØ© â ÙÙÙØµØ­ Ø¨Ø§ÙØ¥ÙØºØ§Ø¡</div>
      {subs.filter(s => s[4]).map(([icon,name,price,col],i) => (
        <Card key={i} style={{ padding: '13px 14px', marginBottom: 8, border: '1px solid rgba(255,69,58,0.22)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: col + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17 }}>{icon}</div>
            <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{name}</div><div style={{ fontSize: 12, color: C.textSec }}>{price} Ø±.Ø³/Ø´ÙØ±</div></div>
            <button style={{ background: C.red + '22', border: '1px solid ' + C.red + '44', color: C.red, fontSize: 11, fontWeight: 700, padding: '5px 10px', borderRadius: 8, cursor: 'pointer' }}>Ø¥ÙØºØ§Ø¡</button>
          </div>
        </Card>
      ))}
      <div style={{ fontSize: 13, color: C.textSec, fontWeight: 600, marginTop: 8, marginBottom: 8 }}>Ø§Ø´ØªØ±Ø§ÙØ§ØªÙ Ø§ÙÙØ´Ø·Ø©</div>
      {subs.filter(s => !s[4]).map(([icon,name,price,col],i) => (
        <Card key={i} style={{ padding: '13px 14px', marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: col + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17 }}>{icon}</div>
            <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{name}</div></div>
            <div style={{ fontSize: 14, fontWeight: 700, color: col }}>{price} Ø±.Ø³</div>
          </div>
        </Card>
      ))}
    </div>
  )
}

// ââ NAV ââ
const NAV = [['home','â','Ø§ÙØ±Ø¦ÙØ³ÙØ©'],['health','â¤ï¸','Ø§ÙØµØ­Ø©'],['photos','ð¸','Ø§ÙØµÙØ±'],['storage','ð¾','Ø§ÙØªØ®Ø²ÙÙ'],['assistant','ð¤','AI']]
const TITLES = { home:'iFlow AI', health:'Health Score', photos:'Ø§Ø³ØªÙØ¯ÙÙ Ø§ÙØµÙØ±', storage:'Ø§ÙØªØ®Ø²ÙÙ', battery:'Ø§ÙØ¨Ø·Ø§Ø±ÙØ©', privacy:'Ø§ÙØ®ØµÙØµÙØ©', calendar:'Ø§ÙØªÙÙÙÙ', subscriptions:'Ø§ÙØ§Ø´ØªØ±Ø§ÙØ§Øª', assistant:'iFlow AI' }
const SCREENS = { home:HomeScreen, health:HealthScreen, photos:PhotosScreen, storage:StorageScreen, battery:BatteryScreen, privacy:PrivacyScreen, calendar:CalendarScreen, subscriptions:SubscriptionsScreen, assistant:AssistantScreen }

export default function App() {
  const [screen, setScreen] = useState('home')
  const [prev, setPrev] = useState(null)
  const nav = s => { setPrev(screen); setScreen(s) }
  const back = () => setScreen(prev || 'home')
  const Active = SCREENS[screen] || HomeScreen
  const inNav = NAV.find(n => n[0] === screen)

  return (
    <div style={{ maxWidth: 430, margin: '0 auto', height: '100vh', background: C.bg, display: 'flex', flexDirection: 'column', fontFamily: "-apple-system,'SF Pro Display','Helvetica Neue',sans-serif", direction: 'rtl', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid ' + C.border, padding: '12px 16px 10px', flexShrink: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {!inNav && prev && (
            <button onClick={back} style={{ background: 'none', border: 'none', color: C.blue, fontSize: 15, cursor: 'pointer', padding: 0, fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 2 }}>
              <span style={{ fontSize: 20 }}>â¹</span> Ø±Ø¬ÙØ¹
            </button>
          )}
          <div style={{ flex: 1, textAlign: 'center', fontSize: 17, fontWeight: 700, color: C.text, letterSpacing: -0.3 }}>
            {screen === 'home'
              ? <span style={{ background: 'linear-gradient(135deg,#0A84FF,#BF5AF2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 900, fontSize: 20 }}>iFlow AI</span>
              : TITLES[screen]}
          </div>
          <div style={{ width: 60, display: 'flex', justifyContent: 'flex-end' }}>
            {screen === 'home' && <div style={{ width: 34, height: 34, borderRadius: 10, background: 'linear-gradient(135deg,#0A84FF,#5E5CE6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>â¡</div>}
          </div>
        </div>
      </div>

      {/* Screen */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Active nav={nav} />
      </div>

      {/* Tab Bar */}
      <div style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)', borderTop: '1px solid ' + C.border, padding: '8px 0 20px', flexShrink: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          {NAV.map(([id, icon, label]) => {
            const active = screen === id
            return (
              <button key={id} onClick={() => nav(id)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: '4px 10px', fontFamily: 'inherit' }}>
                <div style={{ fontSize: 22, opacity: active ? 1 : 0.45, transform: active ? 'scale(1.15)' : 'scale(1)', transition: 'all 0.2s cubic-bezier(.34,1.56,.64,1)' }}>{icon}</div>
                <div style={{ fontSize: 10, fontWeight: active ? 700 : 400, color: active ? C.blue : C.textTer, transition: 'color 0.2s' }}>{label}</div>
                {active && <div style={{ width: 4, height: 4, borderRadius: '50%', background: C.blue, marginTop: 1 }} />}
              </button>
            )
          })}
        </div>
      </div>

      <style>{`
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        body { margin: 0; background: #000; }
        ::-webkit-scrollbar { display: none; }
        input::placeholder { color: rgba(255,255,255,0.22); }
        @keyframes pulse { 0%,80%,100%{transform:scale(1);opacity:0.4} 40%{transform:scale(1.4);opacity:1} }
      `}</style>
    </div>
  )
}