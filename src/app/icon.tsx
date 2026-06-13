import { ImageResponse } from "next/og"

export const size = { width: 32, height: 32 }
export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: "linear-gradient(135deg, #4f46e5 0%, #6366f1 60%, #818cf8 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "monospace",
          fontSize: 13,
          fontWeight: 700,
          color: "white",
          letterSpacing: "-0.5px",
        }}
      >
        SJ
      </div>
    ),
    { ...size },
  )
}
