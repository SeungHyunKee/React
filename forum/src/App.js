import { useCallback, useMemo, useState } from "react";
import Header from "./components/Header.js";
import BoardApp from "./components/BoardApp.js";
import { loadMyData } from "./http/http.js";
import { useFetch } from "./hooks/useFetch.js";

export default function App() {
  const [token, setToken] = useState();

  // loadmydata(함수)
  // {token} (객체)
  // 캐싱 해줘야됨(안해주면 무한반복됨)
  const fetchLoadMyData = useCallback(() => {
    //이함수가 동작될때, 토큰이 있을경우에만 loadmydata실행해서 결과 돌려줌
    //토큰의 유무에 따라 전달되는 함수가 달라짐
    if (token) {
      return loadMyData;
    } else {
      //토큰이 없다면 undefined 반환시키는 함수를 반환시킴
      return () => {
        return undefined; //이후 undefined가 data에 들어감
      };
    }
  }, [token]);

  const fetchToken = useMemo(() => {
    return { token };
  }, [token]);

  const { data } = useFetch(
    undefined, //data 로 받아올 상태state의 초기값={}
    fetchLoadMyData(),
    fetchToken
  );
  // data가 undefined가 아니라면, myInfo에 할당시키고, undefined라면 {}를 (body) 반환시켜라
  // data가 undefinedf라면, data에서 body를 꺼내어서 loginInfo이름으로 할당함
  const { body: loginInfo } = data || {};
  // 회원정보가 있는 body 가 필요함. data는 undefined / undefined아닐수도잇음

  //세번째값은 리터럴로 주기로 했으니 {token} 이런식으로 준다

  // const [loginInfo, setLoginInfo] = useState();
  // const { data, isLoading } = useTimeout(); // 객체리터럴이므로 분해가 가능함

  // useEffect(() => {
  //   const loadMember = async () => {
  //     if (!token) {
  //       setLoginInfo(undefined);
  //       return;
  //     }
  //     const json = await loadMyData(token);
  //     // loadMyData가 async 함수라서 새로운타임라인 말고, 이 안에서 쓰이도록하는 용도
  //     setLoginInfo(json.body);
  //   };
  //   loadMember();
  // }, [token]);

  // const [boards, setBoards] = useState([]);
  // const [selectedBoardId, setSelectedBoardId] = useState();
  // const isSelect = selectedBoardId !== undefined; //게시글을 선택한 상태인지 아닌지를 알고싶어서

  return (
    <div className="main-container">
      {/* {isLoading ? <div>데이터를 불러오는 중입니다.</div> : <div>{data}</div>} */}
      {/* token의 값이 있다 = 로그인을 했다, token의 값이 undefined, null 이 아님 */}
      <Header token={token} setToken={setToken} loginInfo={loginInfo} />
      <main>
        <BoardApp token={token} loginInfo={loginInfo} />
      </main>
    </div>
  );
}

// function App() {
//   //서버가 발행해준 토큰을 기억하기위한 state 생성.
//   const [token, setToken] = useState();

//   //React에서 Spring Server로 데이터를 요청
//   // API로만 통신 : 요청 Json ---> Json 응답 (AJAX는 json으로 요청하는것같지만, 아님)
//   // AJAX : iframe + Form Request
//   // form 요청 --> 응답 : JSON / html
//   // API : 실제로 Browser에서 server로 요청하는 방법
//   // JSON요청 ---> JSON

//   // JavaScript의 내장함수 (API요청)
//   // 비동기 통신을 하는 함수
//   // await가 동작하기 위해서는 : 상위 함수가 async 함수여야 한다.
//   // const promise = await fetch("URL", Header ==> {}); //url, header를 주면 실제 response를 돌려줌

//   // Spring Server에 접근하기 위한 JWT 발급
//   // Component가 처음 실행될 때 단 한번만 함수가 실행된다
//   useEffect(() => {
//     // Spring Server에 접근하기 위한 JWT 발급을 해줌
//     const loadToken = async () => {
//       const response = await fetch("http://localhost:8080/auth/token", {
//         // 실제로 보낼때는 json을 문자로 바꿔서 보내야됨
//         // => JSON.stringify Object를 String으로 바꿔줌 / JSON.parse : String type json을 객체로 바꿔줌
//         body: JSON.stringify({
//           email: "qwer@naver.com",
//           password: "QWERqwer1234",
//         }), //body라는 키로 JSON을 보내야됨(규칙)
//         method: "POST", //"http://localhost:8080/auth/token" url을 어떤 방식으로 호출할 것인가
//         headers: {
//           // 내가보내는 형식이 JSON임을 알리기 위함 (json 마임타입 적어줌)
//           "Content-Type": "application/json",
//         },
//       });

//       console.log(response);

//       //response에서 body값을 알고싶을때, response.json()을 호출
//       // response.json() 함수 또한 비동기 함수 : await response.json(); 처럼 비동기함수앞에는 await 써주기
//       const body = await response.json();
//       console.log(body);
//       setToken(body.token + Math.random());
//       // setToken(body.token);
//     };
//     loadToken();
//   }, []);

//   // 이 컴포넌트가 실행될 때, 아이디와 패스워드를 통해 서버에게 로그인을 시도한다.
//   // 로그인 결과인 token을 가져와서 브라우저가 기억하도록 한다. (그렇지않다면 매번 로그인을 해야하기 때문)
//   // 발급받은 토큰을 state에 넣어준다

//   return <>{token}</>;
// }

// export default App;
