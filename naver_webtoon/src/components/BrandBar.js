// import { useRef, useState } from "react";
import "../brandBar.css";

export function BrandBar() {
  return (
    <div className="container">
      <div className="text-group">
        <span className="bold-text">NAVER 웹툰 </span>
        <span className="small-gray-text">| 웹소설 | 시리즈</span>
      </div>
      <input
        className="input-box"
        id="name"
        type="text"
        placeholder="제목/작가로 검색할 수 있습니다."
      />
      <button className="button">로그인</button>
    </div>
  );
}
