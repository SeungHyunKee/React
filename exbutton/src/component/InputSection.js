import { useState } from "react";

export function InputSection({ setTextArray }) {
  // text를 관리하는 state
  const [name, setName] = useState(); // name : 변수 / setName : name값을 바꿔주는 함수
  const [age, setAge] = useState();

  const onKeyUpHandler = (event) => {
    const textValue = event.currentTarget.value;
    setName(textValue);
  };

  const onKeyUpHandler1 = (event) => {
    const textValue = event.currentTarget.value;
    setAge(textValue);
  };

  const inputValue = { name: name, age: age };

  // 배열을 풀어헤쳐서 원래있던 배열(...prevState)은 가져오고,
  // 그뒤에 text를 추가해서 새로운 배열을 가지고옴
  // setTextArray([...textArray, text]);
  const onClickHandler = () => {
    setTextArray((prevState) => [inputValue, ...prevState]);
  };

  return (
    <div>
      &nbsp;Name&nbsp;:&nbsp;
      <input
        type="text"
        placeholder="이름을 입력하세요"
        onKeyUp={onKeyUpHandler}
      />
      <br />
      &nbsp;&nbsp;&nbsp;Age&nbsp;&nbsp;:&nbsp;
      <input
        type="text"
        placeholder="나이를 입력하세요"
        onKeyUp={onKeyUpHandler1}
      />
      &nbsp;
      <button onClick={onClickHandler}>저장</button>
    </div>
  );
}
