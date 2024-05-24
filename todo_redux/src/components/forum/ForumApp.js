import { useCallback, useMemo, useState } from "react";
import BoardApp from "./BoardApp";
import { useFetch } from "../../hooks/useFetch.js";
import { loadMyData } from "../../http/http.js";
import Header from "./Header.js";

export default function ForumApp() {
  const [token, setToken] = useState();

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
  const { body: loginInfo } = data || {};

  return (
    <>
      {/* {isLoading ? <div>데이터를 불러오는 중입니다.</div> : <div>{data}</div>} */}
      {/* token의 값이 있다 = 로그인을 했다, token의 값이 undefined, null 이 아님 */}
      <Header token={token} setToken={setToken} loginInfo={loginInfo} />
      <main>
        <BoardApp token={token} loginInfo={loginInfo} />
      </main>
    </>
  );
}
