// import { useState } from "react";
import { useRef } from "react";

export function InputSection({ setTextArray }) {
  console.log("Run InputSection");
  const nameRef = useRef();
  const ageRef = useRef();

  // name state를 만듦
  // const [name, setName] = useState(); // name : 변수, setName : name값을 바꿔주는 함수
  // const [age, setAge] = useState();

  // const onKeyUpHandler = (event) => {
  //   const textValue = event.currentTarget.value;
  //   // setName(textValue);
  // };

  // const onKeyUpHandler1 = (event) => {
  //   const textValue = event.currentTarget.value;
  //   // setAge(textValue);
  // };

  // const inputValue = { name: name, age: age };

  // 배열을 풀어헤쳐서 원래있던 배열(...prevState)은 가져오고,
  // 그뒤에 text를 "추가"해서 새로운 배열을 가지고옴
  // setTextArray([...textArray, text]);
  const onClickHandler = () => {
    console.log("nameRef ==================== ");
    console.log("nameRef: ", nameRef);
    console.log("nameRef.current: ", nameRef.current);
    console.log("nameRef.current.value: ", nameRef.current.value);

    console.log("ageRef ==================== ");
    console.log("ageRef: ", ageRef);
    console.log("ageRef.current: ", ageRef.current);
    console.log("ageRef.current.value: ", ageRef.current.value);

    const name = nameRef.current.value;
    const age = ageRef.current.value;

    //만약 둘중하나라도 값 비어있다면 focus
    if (name === "") {
      alert("이름을 입력하세요");
      nameRef.current.focus();
      return; //함수의 실행을 중단시킴
    }
    if (age === "") {
      alert("나이를 입력하세요");
      ageRef.current.focus();
      return; //함수의 실행을 중단시킴
    }

    setTextArray((prevState) => [{ name: name, age: age }, ...prevState]);

    nameRef.current.value = "";
    ageRef.current.value = "";

    nameRef.current.focus(); // 바로위에서 값을 초기화 한 후 포커싱을 준다

    //() => {} 이 함수를 100ms(0.1초)이후에 실행해라
    // (별도의 상수 name, age를 안만들어주면 set과 timeout이 동시에 일어나지 않도록
    /// (ageRef.current.value변수의 메모리를 공유하고있기때문) 하기 위함)
    //setTextArray보다 (초기화를)조금 늦게 처리해라
    // setTimeout(() => {
    //   //초기화시키는 방법
    //   nameRef.current.value = "";
    //   ageRef.current.value = "";
    // }, 100);
  };

  return (
    <div>
      &nbsp;Name&nbsp;:&nbsp;
      {/**nameRef.current = <input type="text" id="name".../> */}
      <input
        id="name"
        type="text"
        placeholder="Name"
        ref={nameRef}
        // onKeyUp={onKeyUpHandler}
      />
      <br />
      &nbsp;&nbsp;&nbsp;Age&nbsp;&nbsp;:&nbsp;
      {/**ageRef.current = <input type="number" id="age".../> */}
      <input
        type="number"
        id="age"
        placeholder="Age"
        ref={ageRef}
        // onKeyUp={onKeyUpHandler1}
      />
      &nbsp;
      <button onClick={onClickHandler}>저장</button>
    </div>
  );
}
