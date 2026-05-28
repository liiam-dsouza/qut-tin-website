// src/pages/SocialCard.tsx
import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Download, RefreshCw, Upload } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { fadeUpContainer, fadeUpItem } from "@/lib/animations"
import { event } from "@/data/event"

const CARD_WIDTH  = 1080
const CARD_HEIGHT = 1080

type CardStyle = "attending" | "speaking" | "industry"

const cardStyles: { id: CardStyle; label: string; subtitle: string }[] = [
  { id: "attending", label: "I'm Attending",       subtitle: "For students coming to the event" },
  { id: "speaking",  label: "I'm Speaking",        subtitle: "For confirmed speakers" },
  { id: "industry",  label: "I'm an Industry Rep", subtitle: "For industry attendees" },
]

function drawCard(
  canvas: HTMLCanvasElement,
  name: string,
  role: string,
  org: string,
  style: CardStyle,
  photo: HTMLImageElement | null
) {
  const ctx = canvas.getContext("2d")
  if (!ctx) return

  canvas.width  = CARD_WIDTH
  canvas.height = CARD_HEIGHT

  // Rounded clip path
  ctx.beginPath()
  const r = 0
  ctx.moveTo(r, 0)
  ctx.lineTo(CARD_WIDTH - r, 0)
  ctx.quadraticCurveTo(CARD_WIDTH, 0, CARD_WIDTH, r)
  ctx.lineTo(CARD_WIDTH, CARD_HEIGHT - r)
  ctx.quadraticCurveTo(CARD_WIDTH, CARD_HEIGHT, CARD_WIDTH - r, CARD_HEIGHT)
  ctx.lineTo(r, CARD_HEIGHT)
  ctx.quadraticCurveTo(0, CARD_HEIGHT, 0, CARD_HEIGHT - r)
  ctx.lineTo(0, r)
  ctx.quadraticCurveTo(0, 0, r, 0)
  ctx.closePath()
  ctx.fillStyle = "#0D0F1A"
  ctx.fill()
  ctx.clip()

  // Background glows
  const glow1 = ctx.createRadialGradient(200, 200, 0, 200, 200, 600)
  glow1.addColorStop(0, "rgba(124, 58, 237, 0.25)")
  glow1.addColorStop(1, "rgba(124, 58, 237, 0)")
  ctx.fillStyle = glow1
  ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT)

  const glow2 = ctx.createRadialGradient(900, 900, 0, 900, 900, 600)
  glow2.addColorStop(0, "rgba(233, 30, 140, 0.2)")
  glow2.addColorStop(1, "rgba(233, 30, 140, 0)")
  ctx.fillStyle = glow2
  ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT)

  // Photo — circular, top right
  if (photo) {
    const photoSize   = 280
    const photoX      = CARD_WIDTH - photoSize - 80
    const photoY      = 80
    const photoRadius = photoSize / 2
    const photoCX     = photoX + photoRadius
    const photoCY     = photoY + photoRadius

    // Gradient ring
    const ringGradient = ctx.createLinearGradient(photoX, photoY, photoX + photoSize, photoY + photoSize)
    ringGradient.addColorStop(0, "#E91E8C")
    ringGradient.addColorStop(0.5, "#7C3AED")
    ringGradient.addColorStop(1, "#F97316")

    ctx.beginPath()
    ctx.arc(photoCX, photoCY, photoRadius + 6, 0, Math.PI * 2)
    ctx.strokeStyle = ringGradient
    ctx.lineWidth = 6
    ctx.stroke()

    // Clip photo to circle
    ctx.save()
    ctx.beginPath()
    ctx.arc(photoCX, photoCY, photoRadius, 0, Math.PI * 2)
    ctx.clip()

    // Cover fit
    const aspect = photo.width / photo.height
    let sx = 0, sy = 0, sw = photo.width, sh = photo.height
    if (aspect > 1) {
      sw = photo.height
      sx = (photo.width - sw) / 2
    } else {
      sh = photo.width
      sy = (photo.height - sh) / 2
    }
    ctx.drawImage(photo, sx, sy, sw, sh, photoX, photoY, photoSize, photoSize)
    ctx.restore()
  }

  // Gradient border
  const borderGradient = ctx.createLinearGradient(0, 0, CARD_WIDTH, CARD_HEIGHT)
  borderGradient.addColorStop(0, "#E91E8C")
  borderGradient.addColorStop(0.5, "#7C3AED")
  borderGradient.addColorStop(1, "#F97316")
  ctx.strokeStyle = borderGradient
  ctx.lineWidth = 8
  ctx.strokeRect(4, 4, CARD_WIDTH - 8, CARD_HEIGHT - 8)

  // Badge pill
  const badgeGradient = ctx.createLinearGradient(80, 0, 380, 0)
  badgeGradient.addColorStop(0, "#E91E8C")
  badgeGradient.addColorStop(0.5, "#7C3AED")
  badgeGradient.addColorStop(1, "#F97316")

  const badgeText = style === "attending"
    ? "I'M ATTENDING"
    : style === "speaking"
    ? "I'M SPEAKING"
    : "INDUSTRY REP"

  const badgeX = 80
  const badgeY = 80
  const badgeW = 340
  const badgeH = 70
  const badgeR = 24

  ctx.fillStyle = badgeGradient
  ctx.beginPath()
  ctx.moveTo(badgeX + badgeR, badgeY)
  ctx.lineTo(badgeX + badgeW - badgeR, badgeY)
  ctx.quadraticCurveTo(badgeX + badgeW, badgeY, badgeX + badgeW, badgeY + badgeR)
  ctx.lineTo(badgeX + badgeW, badgeY + badgeH - badgeR)
  ctx.quadraticCurveTo(badgeX + badgeW, badgeY + badgeH, badgeX + badgeW - badgeR, badgeY + badgeH)
  ctx.lineTo(badgeX + badgeR, badgeY + badgeH)
  ctx.quadraticCurveTo(badgeX, badgeY + badgeH, badgeX, badgeY + badgeH - badgeR)
  ctx.lineTo(badgeX, badgeY + badgeR)
  ctx.quadraticCurveTo(badgeX, badgeY, badgeX + badgeR, badgeY)
  ctx.closePath()
  ctx.fill()

  ctx.fillStyle = "#ffffff"
  ctx.font = "bold 35px 'Nunito', sans-serif"
  ctx.textAlign = "center"
  ctx.fillText(badgeText, badgeX + badgeW / 2, badgeY + badgeH / 2 + 12)

  // Name
  ctx.textAlign = "left"
  ctx.fillStyle = "#ffffff"
  const nameFontSize = name.length > 20 ? 72 : name.length > 15 ? 84 : 96
  ctx.font = `800 ${nameFontSize}px 'Nunito', sans-serif`
  ctx.fillText(name || "Your Name", 80, 480)

  // Role
  const hasRole = role.trim().length > 0
  const hasOrg  = org.trim().length > 0

  if (hasRole) {
    ctx.fillStyle = "rgba(255,255,255,0.6)"
    ctx.font = "400 34px 'Open Sans', sans-serif"
    ctx.fillText(role, 80, 548)
  }

  if (hasOrg) {
    ctx.fillStyle = "rgba(255,255,255,0.4)"
    ctx.font = "400 30px 'Open Sans', sans-serif"
    ctx.fillText(org, 80, hasRole ? 594 : 548)
  }

  // Divider
  const dividerGradient = ctx.createLinearGradient(80, 0, 600, 0)
  dividerGradient.addColorStop(0, "#E91E8C")
  dividerGradient.addColorStop(0.5, "#7C3AED")
  dividerGradient.addColorStop(1, "rgba(249,115,22,0)")
  ctx.strokeStyle = dividerGradient
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(80, 650)
  ctx.lineTo(600, 650)
  ctx.stroke()

  // Event name
  ctx.fillStyle = "#ffffff"
  ctx.font = "800 52px 'Nunito', sans-serif"
  ctx.fillText("Tech Industry Night", 80, 750)

  const yearGradient = ctx.createLinearGradient(80, 0, 400, 0)
  yearGradient.addColorStop(0, "#E91E8C")
  yearGradient.addColorStop(0.5, "#7C3AED")
  yearGradient.addColorStop(1, "#F97316")
  ctx.fillStyle = yearGradient
  ctx.font = "800 52px 'Nunito', sans-serif"
  ctx.fillText(`${event.year}`, 80, 812)

  ctx.fillStyle = "rgba(255,255,255,0.5)"
  ctx.font = "400 28px 'Open Sans', sans-serif"
  ctx.fillText("Friday 14 August 2026  ·  Gardens Theatre, QUT", 80, 890)

  ctx.fillStyle = "rgba(255,255,255,0.3)"
  ctx.font = "400 24px 'Open Sans', sans-serif"
  ctx.fillText("techindustrynight.com", 80, 1000)
}

export default function SocialCard() {
  const [name, setName]   = useState("")
  const [role, setRole]   = useState("")
  const [org, setOrg]     = useState("")
  const [style, setStyle] = useState<CardStyle>("attending")
  const [photo, setPhoto] = useState<HTMLImageElement | null>(null)
  const [photoUrl, setPhotoUrl] = useState<string | null>(null)
  const canvasRef         = useRef<HTMLCanvasElement>(null)
  const fileInputRef      = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      drawCard(canvasRef.current, name, role, org, style, photo)
    }
  }, [name, role, org, style, photo])

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const url = URL.createObjectURL(file)
    setPhotoUrl(url)

    const reader = new FileReader()
    reader.onload = (ev) => {
      const img = new Image()
      img.onload = () => setPhoto(img)
      img.src = ev.target?.result as string
    }
    reader.readAsDataURL(file)
  }

  const handleRemovePhoto = () => {
    setPhoto(null)
    setPhotoUrl(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const handleDownload = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const link = document.createElement("a")
    link.download = `tin-${event.year}-${style}.png`
    link.href = canvas.toDataURL("image/png")
    link.click()
  }

  const handleReset = () => {
    setName("")
    setRole("")
    setOrg("")
    setPhoto(null)
    setPhotoUrl(null)
    setStyle("attending")
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  return (
    <div className="min-h-screen bg-background">
      <motion.div
        variants={fadeUpContainer}
        initial="hidden"
        animate="show"
        className="max-w-5xl mx-auto px-6 py-24 flex flex-col gap-12"
      >
        {/* Header */}
        <motion.div variants={fadeUpItem} className="text-center flex flex-col gap-3">
          <p className="text-sm uppercase tracking-widest text-muted-foreground">
            Share the Night
          </p>
          <h1 className="font-heading font-extrabold text-4xl md:text-5xl">
            Your <span className="text-brand-gradient">TIN Card</span>
          </h1>
          <p className="text-muted-foreground max-w-sm mx-auto">
            Generate a personalised card to share on LinkedIn or Instagram and
            let your network know you'll be at TIN {event.year}.
          </p>
        </motion.div>

        {/* Main layout */}
        <motion.div
          variants={fadeUpItem}
          className="flex flex-col lg:flex-row gap-8 items-start"
        >
          {/* Controls */}
          <div className="flex flex-col gap-6 w-full lg:w-80 shrink-0">
            {/* Style selector */}
            <div className="flex flex-col gap-2">
              <p className="font-heading font-semibold text-sm">Card Type</p>
              <div className="flex flex-col gap-2">
                {cardStyles.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setStyle(s.id)}
                    className={`flex flex-col gap-0.5 p-3 rounded-xl border text-left transition-all duration-200 ${
                      style === s.id
                        ? "border-primary/40 bg-primary/5"
                        : "border-border bg-card hover:border-primary/20 hover:bg-muted/30"
                    }`}
                  >
                    <span className={`font-heading font-semibold text-sm ${
                      style === s.id ? "text-primary" : "text-foreground"
                    }`}>
                      {s.label}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {s.subtitle}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Photo upload */}
            <div className="flex flex-col gap-2">
              <label className="font-heading font-semibold text-sm">
                Your Photo{" "}
                <span className="text-muted-foreground font-normal">(optional)</span>
              </label>
              {photo && photoUrl ? (
                <div className="flex items-center gap-3 p-3 rounded-xl border border-border bg-muted/20">
                  <div className="h-12 w-12 rounded-full overflow-hidden shrink-0">
                    <img
                      src={photoUrl}
                      alt="Your photo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                    <span className="text-sm font-heading font-semibold">
                      Photo uploaded
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Appears top right on the card
                    </span>
                  </div>
                  <button
                    onClick={handleRemovePhoto}
                    className="text-xs text-muted-foreground hover:text-destructive transition-colors shrink-0"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center justify-center gap-2 p-6 rounded-xl border border-dashed border-border bg-muted/20 hover:border-primary/40 hover:bg-muted/30 transition-all text-muted-foreground"
                >
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                    <Upload className="size-4" />
                  </div>
                  <span className="text-sm">Click to upload a photo</span>
                  <span className="text-xs">JPG, PNG — square crop works best</span>
                </button>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </div>

            {/* Name */}
            <div className="flex flex-col gap-2">
              <label className="font-heading font-semibold text-sm">
                Your Name
              </label>
              <Input
                placeholder="Jane Smith"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={30}
              />
            </div>

            {/* Role */}
            <div className="flex flex-col gap-2">
              <label className="font-heading font-semibold text-sm">
                Role / Degree{" "}
                <span className="text-muted-foreground font-normal">(optional)</span>
              </label>
              <Input
                placeholder="Computer Science Student"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                maxLength={40}
              />
            </div>

            {/* Organisation */}
            <div className="flex flex-col gap-2">
              <label className="font-heading font-semibold text-sm">
                Organisation / University{" "}
                <span className="text-muted-foreground font-normal">(optional)</span>
              </label>
              <Input
                placeholder="Queensland University of Technology"
                value={org}
                onChange={(e) => setOrg(e.target.value)}
                maxLength={50}
              />
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2">
              <Button
                onClick={handleDownload}
                className="bg-brand-gradient text-white border-0 hover:opacity-90 transition-opacity w-full"
              >
                <Download className="size-4 mr-2" /> Download Card
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                className="w-full"
              >
                <RefreshCw className="size-4 mr-2" /> Reset
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">
              Download and share to LinkedIn, Instagram, or anywhere you'd like
              to spread the word about TIN {event.year}.
            </p>
          </div>

          {/* Canvas preview */}
          <div className="flex-1 w-full">
            <div className="relative w-full aspect-square border border-border shadow-xl shadow-black/20">
              <canvas
                ref={canvasRef}
                className="w-full h-full"
                style={{ imageRendering: "smooth" }}
              />
            </div>
            <p className="text-xs text-muted-foreground text-center mt-3">
              Image preview: download for full 1080×1080px resolution
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
