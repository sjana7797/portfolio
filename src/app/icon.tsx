import { ImageResponse } from "next/og"

export const size = { width: 32, height: 32 }
export const contentType = "image/png"

/**
 * Favicon: the straw hat over the voyage sky.
 *
 * A monogram was the obvious alternative, but two letters at 16px in a
 * crowded tab strip is a grey smudge — a single high-contrast silhouette
 * is what stays recognisable. Shapes are drawn as SVG rather than
 * divs because Satori's border-radius rounding gets imprecise at this
 * size, and an ellipse has to actually be an ellipse.
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 7,
          background: "linear-gradient(160deg,#2ea9d6 0%,#7fd3ea 55%,#cfe9ef 100%)",
        }}
      >
        {/* Brim first, then crown on top of it, then the band flush to
            the crown's base — draw the brim last and the band has no
            crown left to wrap and reads as a floating rectangle. */}
        <svg width="32" height="32" viewBox="0 0 32 32">
          <ellipse
            cx="16"
            cy="20.2"
            rx="13.6"
            ry="5.3"
            fill="#f2d489"
            stroke="#0f2036"
            strokeWidth="1.25"
          />
          {/* low, wide crown — see apple-icon for the proportions */}
          <path
            d="M9.6 20.2v-3.4a6.4 4.8 0 0 1 12.8 0v3.4z"
            fill="#f2d489"
            stroke="#0f2036"
            strokeWidth="1.25"
            strokeLinejoin="round"
          />
          <path d="M10.3 16.8h11.4v3.4H10.3z" fill="#b81d22" />
        </svg>
      </div>
    ),
    { ...size },
  )
}
