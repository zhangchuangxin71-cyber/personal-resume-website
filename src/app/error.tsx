"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="system-page">
      <div className="system-page-inner">
        <h1>页面没有正常加载</h1>
        <p>内容仍然在原处。可以重新尝试，或返回项目列表继续浏览。</p>
        <button className="button button-primary" type="button" onClick={() => reset()}>
          重新尝试
        </button>
      </div>
    </div>
  );
}
