import { Outlet } from "react-router-dom";
import HeaderNav from "./HeaderNav";

export default function MainLayout() {
  return (
    <div className="main-container">
      <HeaderNav />
      {/* Nested Route (children)의 element(Component)가 노출되는 자리 
        Path(url)가 달라질때마다 Outlet에 노출되는 컴포넌트가 달라진다.  
        (Main outlet에서 layout? 만 왔다갔다한다)
        */}
      <Outlet />
    </div>
  );
}
