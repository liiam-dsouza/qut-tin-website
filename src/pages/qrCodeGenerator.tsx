// src/pages/QRGenerator.tsx
import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { QRCodeCanvas } from "qrcode.react"
import { Download } from "lucide-react"
import { IconBrandLinkedin } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { fadeUpContainer, fadeUpItem } from "@/lib/animations"
import { event } from "@/data/event"

const LINKEDIN_REGEX = /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9\-_%]+\/?$/

function QRGenerator() {
  const [url, setUrl] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const canvasRef = useRef<HTMLDivElement>(null)

  const isValid = LINKEDIN_REGEX.test(url.trim())
  const showQR = submitted && isValid

  const handleGenerate = () => {
    if (isValid) setSubmitted(true)
  }

  const handleDownload = () => {
    const canvas = canvasRef.current?.querySelector("canvas")
    if (!canvas) return

    // Create a new canvas with branding padding
    const padding = 40
    const branded = document.createElement("canvas")
    branded.width = canvas.width + padding * 2
    branded.height = canvas.height + padding * 2 + 60 // extra for branding strip
    const ctx = branded.getContext("2d")
    if (!ctx) return

    // Background
    ctx.fillStyle = "#0D0F1A"
    ctx.fillRect(0, 0, branded.width, branded.height)

    // Gradient border
    const gradient = ctx.createLinearGradient(0, 0, branded.width, branded.height)
    gradient.addColorStop(0, "#E91E8C")
    gradient.addColorStop(0.5, "#7C3AED")
    gradient.addColorStop(1, "#F97316")
    ctx.strokeStyle = gradient
    ctx.lineWidth = 4
    ctx.strokeRect(2, 2, branded.width - 4, branded.height - 4)

    // QR code
    ctx.drawImage(canvas, padding, padding)

    // Branding text
    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 16px Nunito, sans-serif"
    ctx.textAlign = "center"
    ctx.fillText(
      `Tech Industry Night ${event.year}`,
      branded.width / 2,
      canvas.height + padding + 28
    )

    ctx.fillStyle = "#9ca3af"
    ctx.font = "12px Open Sans, sans-serif"
    ctx.fillText(
      "techindustrynight.com",
      branded.width / 2,
      canvas.height + padding + 48
    )

    // Download
    const link = document.createElement("a")
    link.download = "tin-2026-linkedin-qr.png"
    link.href = branded.toDataURL("image/png")
    link.click()
  }

  return (
    <div className="min-h-screen bg-background">
      <motion.div
        variants={fadeUpContainer}
        initial="hidden"
        animate="show"
        className="max-w-xl mx-auto px-6 py-24 flex flex-col gap-12"
      >
        {/* Header */}
        <motion.div variants={fadeUpItem} className="text-center flex flex-col gap-3">
          <p className="text-sm uppercase tracking-widest text-muted-foreground">
            Networking Tool
          </p>
          <h1 className="font-heading font-extrabold text-4xl md:text-5xl">
            Your <span className="text-brand-gradient">LinkedIn</span> QR Code
          </h1>
          <p className="text-muted-foreground max-w-sm mx-auto">
            Generate a branded QR code for your LinkedIn profile. Screenshot it
            and share it on the night.
          </p>
        </motion.div>

        {/* Input */}
        <motion.div variants={fadeUpItem} className="flex flex-col gap-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <IconBrandLinkedin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                type="url"
                placeholder="https://linkedin.com/in/your-profile"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value)
                  setSubmitted(false)
                }}
                onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                className="pl-9"
              />
            </div>
            <Button
              onClick={handleGenerate}
              disabled={!isValid}
              className="bg-brand-gradient text-white border-0 hover:opacity-90 transition-opacity shrink-0"
            >
              Generate
            </Button>
          </div>
          {url && !isValid && (
            <p className="text-xs text-destructive">
              Please enter a valid LinkedIn profile URL — e.g. https://linkedin.com/in/your-name
            </p>
          )}
        </motion.div>

        {/* QR Code */}
        {showQR && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex flex-col items-center gap-6"
          >
            {/* Branded QR preview */}
            <div className="p-6 rounded-2xl bg-[#0D0F1A] flex flex-col items-center gap-4 w-full" style={{
              boxShadow: "0 0 0 3px transparent",
              background: "linear-gradient(#0D0F1A, #0D0F1A) padding-box, linear-gradient(135deg, #E91E8C, #7C3AED, #F97316) border-box",
              border: "3px solid transparent",
            }}>
              <div ref={canvasRef} className="rounded-xl overflow-hidden bg-white p-3">
                <QRCodeCanvas
                  value={url.trim()}
                  size={220}
                  bgColor="#ffffff"
                  fgColor="#0D0F1A"
                  level="H"
                  imageSettings={{
                    src: "/logo-dark.svg",
                    height: 40,
                    width: 40,
                    excavate: true,
                  }}
                />
              </div>
              <div className="flex flex-col items-center gap-1">
                <p className="font-heading font-bold text-white text-sm">
                  Tech Industry Night {event.year}
                </p>
                <p className="text-xs text-gray-400">techindustrynight.com</p>
              </div>
            </div>

            <Button
              onClick={handleDownload}
              variant="outline"
              className="w-full"
            >
              <Download className="size-4 mr-2" /> Download QR Code
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              Screenshot or download this QR code to share your LinkedIn profile on the night.
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default QRGenerator
