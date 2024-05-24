import { isDocument } from "@testing-library/user-event/dist/utils";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AddTodo from "./AddTodo";
import { doneSubTodo, loadTodo } from "../../stores/toolkit/store";

export default function SubTodo() {
  //   const { id } = useParams(); //"/:id" 의 값이 객체리터럴 param으로 들어감
  //   console.log(id);
  //   //   console.log("param", param);

  //   return <div>SubTodo 입니다.</div>;]

  const sampleData = [
    {
      id: "sample1",
      isDone: false,
      task: "Sample Task1",
      dueDate: "2024-05-24",
    },
    {
      id: "sample2",
      isDone: true,
      task: "Sample Task2",
      dueDate: "2024-05-25",
    },
  ];

  const { id } = useParams();

  console.log("Run SubTodo", id);

  const styles = {
    //...style, //style 을 받아오는 방법 -- display, padding, marginTop  //router를 통해 들어오는것이기때문ㄴ에 style 없음
    display: "flex",
    borderBottom: "1px solid #CCC",
    padding: "1rem", //padding은 ...style로 인해 overwrite됨
  };

  // const checkboxRef = useRef();

  // React Router의 path를 이동시키는 Hook
  // Spring 의 redirect와 유사함
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate("/todo");
  };

  const todoDisPatch = useDispatch();
  //firebase에서 모든 todo를 받아오는 코드가 필요함
  // thunk 호출이 필요 (라우터에서 데이터가 왔다갔다해서 아래의 코드가 필요함)
  todoDisPatch(loadTodo()); //toolkit 의 state를 다 초기화시켜라

  //Redux Toolkit의 state를 받아온다
  const todo = useSelector((state) =>
    state.todo.find((item) => item.id === parseInt(id))
  );
  console.log(todo);

  const getSubTodoItems = () => {
    const todoArrays = [];
    for (let key in todo.sub) {
      todoArrays.push(todo.sub[key]);
    }
    return todoArrays;
  };

  //todo를 불러와서 todo의 sub가 있다면 getSubTodoItems 불러와서 할당
  const subItems = todo && todo.sub ? getSubTodoItems() : []; //firebase를 사용하기때문에 발생하는 이슈 ....
  console.log(">", subItems);

  const onDoneHandler = (event, item) => {
    const checkbox = event.currentTarget;
    const checked = checkbox.checked; //체크가 되면 true, 아니면 false

    todoDisPatch(
      doneSubTodo({
        parentTodoId: parseInt(id),
        id: item.id,
        isDone: checked,
        task: item.task,
        dueDate: item.dueDate,
      })
    );
  };

  //문자열을 제외한 값들은 중괄호로 전달해야됨
  return (
    <>
      <h3 style={{ padding: "1rem" }}>'{todo && todo.task}'의 하위 목록</h3>
      <h4 style={{ padding: "1rem" }}>
        완료: {subItems.filter((item) => item.isDone).length} / 미완료:{" "}
        {/* 반복하면서 원하는것만 골라줄게 : filter -> 반복하면서 원하는 조건만 가져와서 배열로 만들어라 */}
        {subItems.filter((item) => !item.isDone).length}
      </h4>
      <div className="button-area right-align">
        <button onClick={onClickHandler}>상위 목록으로 가기</button>
      </div>
      <ul>
        {/* //리스트로 보여주는것이므로ul */}
        {subItems.map((subTodo) => (
          <li
            key={subTodo.id}
            style={{
              ...styles,
              color: subTodo.isDone ? "#CCC" : "#333",
              textDecoration: subTodo.isDone ? "line-through" : "none",
            }}
          >
            {/*중괄호가 두번 쓰이는 이유 : style태그안에서 style 쓰기 때문 */}
            <div style={{ marginRight: "1rem" }}>
              {/* 하나의 input에서 여러번 반복된다면 key로 줌 */}
              <input
                type="checkbox"
                onChange={(event) => onDoneHandler(event, subTodo)} //체크박스의 상태가 바뀌었다면 onDone함수 실행시키는것
                checked={subTodo.isDone ? "checked" : ""}
                // ref={checkboxRef} //체크상태를 얻어옴
                key={subTodo.id}
                defaultValue={subTodo.id} //그냥 value는 값을 바꿀수 없음. 처음값을 고정하고, 값을 이후에 바꾸고싶다면 defaultValue로 써줘야함
                // defaultChecked={subTodo.isDone} //그냥 checked로 하면 기본값이 고정이 안되기 때문.
              />
              {/* // 리액트에서 value를 주면 값을 '고정'하는 의미이기때문에,
        defaultvalue를 줌(초기값만 설정하고 바뀔수 있도록) */}
            </div>
            <div style={{ flexGrow: 1 }}>{subTodo.task}</div>
            {/* // 아래는 다시한번  subtodo를 타고 다른 링크로 가는건데, 필요없으므로 삭제 */}
            {/* <Link to={`/todo/${id}`} style={{ color: isDone ? "#CCC" : "#333" }}>
          {task}
        </Link> */}
            <div>{subTodo.dueDate}</div>
          </li>
        ))}
      </ul>
      <AddTodo
        sub={true} //addtodo에서는 sub가 true일때 sub에 넣어주기 위해 써줌
        parentTodoId={parseInt(id)} //id=params로 받아온 parentId
        style={{
          display: "flex",
          padding: "0.5 rem",
          marginTop: "1rem",
        }}
      />
    </>
  );
}
