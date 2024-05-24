import { useRef, useEffect } from "react";
import { login } from "../../http/http";

export default function Header({ token, setToken, loginInfo }) {
  //state의 set은 상태가 바뀌지 않음
  const emailRef = useRef();
  const passwordRef = useRef();

  // 자동로그인
  // 이 컴포넌트가 실행되자마자 local storage에 token값이 있는지 확인한다.
  // token 값이 있다면 token state에 값을 할당
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, [setToken]);

  const onLoginClickHandler = async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email) {
      alert("이메일을 입력하세요");
      emailRef.current.focus();
      return;
    }
    if (!password) {
      alert("비밀번호를 입력하세요");
      passwordRef.current.focus();
      return;
    }

    const json = await login(email, password);

    if (json.message) {
      alert(json.message);
      return;
    } else if (json.token) {
      setToken(json.token);
    }

    // token의 값을 브라우저의 로컬 스토리지에 작성한다
    localStorage.setItem("token", json.token); //키 : 토큰, value : 발급받은거

    sessionStorage.setItem("token", json.token); //세션 스토리지에 저장한다.
  };

  //App.js가 가지고있는 토큰의 값이 바뀌고, App 컴포넌트 재실행
  // -> header컴포넌트 재실행 -> 토큰을 localstorage에서 가지고와서 다시 세팅함 => 지워줘야됨
  const onLogoutClickHandler = () => {
    localStorage.removeItem("token");
    setToken(undefined);
  };

  return (
    <header>
      {token && loginInfo && (
        <div>
          <span>
            {loginInfo.name} ({loginInfo.email})
          </span>
          <span onClick={onLogoutClickHandler}>로그아웃</span>
        </div>
      )}
      {!token && (
        <div>
          <label htmlFor="email">EMAIL</label>
          <input
            type="email"
            id="email"
            placeholder="email"
            ref={emailRef}
          ></input>

          <label htmlFor="password">PASSWORD</label>
          <input
            type="password"
            id="password"
            placeholder="password"
            ref={passwordRef}
          ></input>

          <button onClick={onLoginClickHandler}>로그인</button>
        </div>
      )}
    </header>
  );
}
