import Link from "next/link";

export default function NotFound() {
  return (
    <div className="system-page">
      <div className="system-page-inner">
        <h1>没有找到这个页面</h1>
        <p>链接可能已经变化，项目案例仍然可以从项目列表进入。</p>
        <Link className="button button-primary" href="/projects">返回项目</Link>
      </div>
    </div>
  );
}
