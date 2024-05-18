import "../navigationBar.css";

export function NavigationBar() {
  return (
    <div className="nContainer">
      <div className="cText-group">
        <span className="clicked-text">홈</span>
        <span className="regular-text">
          웹툰&nbsp;&nbsp;&nbsp;&nbsp;베스트도전&nbsp;&nbsp;&nbsp;&nbsp;
          도전만화&nbsp;&nbsp;&nbsp;&nbsp;마이페이지
        </span>
      </div>
      <button className="cButton">CREATOR'S</button>
    </div>
  );
}
