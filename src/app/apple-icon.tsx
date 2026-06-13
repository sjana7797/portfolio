import { ImageResponse } from "next/og"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 40,
          background: "linear-gradient(135deg, #4f46e5 0%, #6366f1 60%, #818cf8 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "monospace",
          fontSize: 72,
          fontWeight: 700,
          color: "white",
          letterSpacing: "-2px",
        }}
      >
        SJ
      </div>
    ),
    { ...size },
  )
}
