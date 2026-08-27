import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        display: "flex",
        background: "#050505",
        borderRadius: 14,
      }}
    >
      <div style={{ position: "absolute", left: 26, top: 11, width: 12, height: 5, background: "linear-gradient(92deg,#ff5870,#ed1238 72%,#780014)", clipPath: "polygon(5% 0,100% 0,91% 100%,20% 100%)", display: "flex" }} />
      <div style={{ position: "absolute", left: 11, top: 11, width: 26, height: 39, background: "linear-gradient(132deg,#ff5870,#ed1238 39%,#780014 74%,#240006)", clipPath: "polygon(61.5% 0,100% 0,50% 100%,0 100%)", display: "flex" }} />
      <div style={{ position: "absolute", right: 11, top: 11, width: 27, height: 39, background: "linear-gradient(128deg,#ff5870,#ed1238 42%,#780014 76%,#240006)", clipPath: "polygon(0 0,40% 0,100% 100%,60% 100%,17% 43%)", display: "flex" }} />
      <div style={{ position: "absolute", left: 31, top: 35, width: 13, height: 15, background: "linear-gradient(132deg,#ed1238,#780014 60%,#240006)", clipPath: "polygon(0 0,62% 0,100% 100%,72% 100%)", display: "flex" }} />
      <div style={{ position: "absolute", left: 11, top: 16, width: 40, height: 34, background: "linear-gradient(142deg,#fff 7%,#f8f8f6 56%,#d7d7d4)", clipPath: "polygon(0 100%,15.4% 100%,100% 0,0 87.8%)", filter: "drop-shadow(0 0 3px rgba(255,255,255,.68))", display: "flex" }} />
    </div>,
    size,
  );
}
