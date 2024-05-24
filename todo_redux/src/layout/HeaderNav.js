import { NavLink } from "react-router-dom";
// NavLink : 어디를 보고있는지 하이라이트 표시하고 싶을 때 사용 -> <a class="active"> 가 생성됨
// Link : 글쓰기, 더보기 등의 글을 클릭할 경우에는 Link 사용 !!

export default function HeaderNav() {
  return (
    <header>
      <nav className="menu-navigation">
        <ul>
          <li>
            {/* href 대신 to를 써서 링크를 지정한다 */}
            {/* 여기에선 router에서 정의한 path 중 하나를 써야한다. 
                     반드시 부모라우터부터 시작한 url전부를 적어줘야됨 */}
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li>
            <NavLink to={"/todo"}>Todo</NavLink>
          </li>
          <li>
            <NavLink to={"/forum"}>Forum</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
