/**
 * React Applicdation의 URL규칙을 정의한다.
 * Spring framework의 controller와 유사하게 동작.
 * URL (End-point) 에 대응할 component를 지정
 *     - spring에서는 Controller의 url에 대응하는 view를 지정
 */

/**
 * createBrowserRouter : url 규칙을 정의
 *          - url별로 브라우저에 노출시킬 컴포넌트를 정의
 * RouterProvider : createBrowserRouter에서 정의한 규칙을 전파하는 역할
 */
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Main from "../components/main/Main";
import TodoApp from "../components/todo/TodoApp";
import ForumApp from "../components/forum/ForumApp";
import ToolkitProvider from "../stores/toolkit/store";
import MainLayout from "../layout/MainLayout";
import NotFound from "../components/errors/NotFound";
import SubTodo from "../components/todo/SubTodo";

export default function RouterAppProvider() {
  const routers = createBrowserRouter([
    // children : "/" 의 하위 엘리먼트들 적어줌
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <NotFound />, //에러페이지로 접근했을때 !
      children: [
        // MainLayout 컴포넌트의 Outlet 컴포넌트에 Main 컴포넌트를 노출시킨다
        { index: true, element: <Main /> },
        //index: true : index라우터 사용방법! <= path:"" 대신(비어있는 path)에 index:true 써주는것

        // MainLayout 컴포넌트의 Outlet 컴포넌트에 ToolkitProvider 컴포넌트를 노출시킨다
        {
          path: "todo/",
          element: (
            <ToolkitProvider>
              <Outlet />
            </ToolkitProvider>
          ),
          // 만약, todo의 하위항목이 더 추가될경우 아래와같이 설정
          // children: [{path: "/sub", element: <SubTodo />}]
          children: [
            { index: true, element: <TodoApp /> }, //이렇게 해야 <TodoApp/> 이 위의 <Outlet /> 자리에 보임. 즉, url이 todo/ 이어서 바로 이어지게 됨
            { path: ":id", element: <SubTodo /> },
          ], //이 route의 전체적인 path : /todo/:id (단 이 path에 ":"이 붙어있으면 아무값이나 받아올수있음)
        },
        // { path: "testtodo/:id", element: <SubTodo /> },
        { path: "forum", element: <ForumApp /> },
        // 만약, todo의 하위항목이 더 추가될경우 아래와같이 설정
        // children: [{path: "/sub", element: <SubTodo />}]
      ],
    },
  ]);

  // const routers = createBrowserRouter([
  //   // path : url (end-point)
  //   // element: Component (spring 으로 치면: view )
  //   // path : "/"" => http://localhost:3000
  //   { path: "/", element: <Main /> },
  //   // path : "/todo"" => http://localhost:3000/todo
  //   {
  //     path: "/todo",
  //     element: (
  //       <ToolkitProvider>
  //         <TodoApp />
  //       </ToolkitProvider>
  //     ),
  //   },
  // ]);

  return <RouterProvider router={routers} />;
}
