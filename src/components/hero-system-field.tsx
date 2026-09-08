import Image from "next/image";

export function HeroSystemField() {
  return (
    <div className="hero-illustration-frame">
      <Image
        src="/media/zcx-hero-illustration.png"
        alt="张创新与 AI 助手一起处理视频时间线、文档结构和检索证据的插画"
        fill
        priority
        sizes="(max-width: 900px) 100vw, 50vw"
        className="hero-illustration"
      />
    </div>
  );
}
