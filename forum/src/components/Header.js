import { useRef, useEffect } from "react";

export default function Header({ token, setToken }) {
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

    // fetch는 비동기이기때문에 await 필수로 써줌!! (상위함수가 반드시 async 여야함 -> onclickhandler 함수앞에 async 붙여주기)
    const response = await fetch("http://localhost:8080/auth/token", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    const json = await response.json();
    setToken(json.token);

    // token의 값을 브라우저의 로컬 스토리지에 작성한다
    localStorage.setItem("token", json.token); //키 : 토큰, value : 발급받은거

    sessionStorage.setItem("token", json.token); //세션 스토리지에 저장한다.
  };

  return (
    <header>
      {token && <div>로그인이 완료되었습니다.</div>}
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