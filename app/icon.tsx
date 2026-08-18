import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#070707",
        borderRadius: 14,
      }}
    >
      <div
        style={{
          width: 0,
          height: 0,
          borderLeft: "22px solid transparent",
          borderRight: "22px solid transparent",
          borderBottom: "48px solid #ff1838",
          transform: "translateY(-2px)",
          display: "flex",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 0,
          height: 0,
          borderLeft: "8px solid transparent",
          borderRight: "8px solid transparent",
          borderBottom: "22px solid #070707",
          transform: "translateY(8px)",
          display: "flex",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 22,
          height: 6,
          background: "#ff1838",
          transform: "translateY(12px) skewX(-20deg)",
          display: "flex",
        }}
      />
    </div>,
    size,
  );
}
