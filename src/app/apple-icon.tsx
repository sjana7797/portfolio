import { ImageResponse } from "next/og"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

/**
 * Home-screen icon. Same straw hat as the favicon, but 180px affords
 * the scene around it: horizon, sea, a sun low behind the hat. iOS
 * masks the corners itself, so the artwork keeps clear of the edges.
 */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(170deg,#2ea9d6 0%,#7fd3ea 46%,#f6e3bd 100%)",
        }}
      >
        <svg width="180" height="180" viewBox="0 0 180 180">
          {/* sun, low and behind everything */}
          <circle cx="142" cy="58" r="24" fill="#fff2c8" opacity="0.9" />
          {/* sea */}
          <path d="M0 118h180v62H0z" fill="#1ba2cd" />
          <path
            d="M0 118h180v10H0z"
            fill="#0f2036"
            opacity="0.16"
          />
          {/* distant island */}
          <path d="M18 118 40 84l22 34z" fill="#2f7d5c" />

          {/* Brim first, then crown over it, then the band flush to the
              crown's base. Reversed, the brim buries the crown and the
              band floats free of the hat. */}
          <ellipse
            cx="90"
            cy="122"
            rx="76"
            ry="25"
            fill="#f2d489"
            stroke="#0f2036"
            strokeWidth="6.5"
          />
          {/* Low, wide crown — a straw hat's dome is about a third as
              tall as it is wide. Taller and it turns into a bowler. */}
          <path
            d="M52 122v-16a38 25 0 0 1 76 0v16z"
            fill="#f2d489"
            stroke="#0f2036"
            strokeWidth="6.5"
            strokeLinejoin="round"
          />
          <path d="M55.5 105h69v17h-69z" fill="#b81d22" />
        </svg>
      </div>
    ),
    { ...size },
  )
}
