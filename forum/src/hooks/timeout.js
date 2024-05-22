// hook이라는 폴더를 만들었기때문에, use~ 로 파일명 안시작해도 됨

import { useEffect, useReducer, useRef, useState } from "react";

/**
 * 함수의 이름이 use로 시작하면, React는 Custom Hook으로 인식한다.
 */
export function useTimeout() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); //isLoading=ture : 현재 데이터를 불러오고 있는 중이라는것

  setTimeout(() => {
    setData((prevData) => [...prevData, "new Data"]);
    setIsLoading(false); //데이터를 다 불러 왔다
  }, 3000); //3초뒤에 setData가 실행되고, new Data에 값이 들어감

  return { data, isLoading }; //재실행되면 바뀐값들이 들어옴

  // use로 시작하는 아래함수들 다 쓸수있다
  // useEffect(()=> {});
  // useState();
  // useRef();
  // useReducer();
}
