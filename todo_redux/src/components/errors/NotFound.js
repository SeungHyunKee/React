import HeaderNav from "../../layout/HeaderNav";

export default function NotFound() {
  return (
    <div className="main-container">
      <HeaderNav />
      <div>찾을수 없는 페이지 입니다.</div>
      <div>잘못된 접근입니다. </div>
    </div>
  );
}
