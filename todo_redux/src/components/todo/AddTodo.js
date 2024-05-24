import { useRef, memo } from "react";
import { useDispatch } from "react-redux";
import { addSubTodo, addTodo } from "../../stores/toolkit/store";

/*
* TODO 아이템을 등록하는 컴포넌트

* 함수(setTODO) = 객체
* 객체리터럴 = 객체
* ==> 이 둘은 객체이기때문에 : Reference type -> 메모리를 들고다님 
*     (메모리주소가 바뀌었다면 바뀐것. 메모리안에있는 데이터가 바뀌는것은 바뀐게 아님)
*     (전달되는 함수 props (onAdd) 의 메모리가 바뀌어 전달될 경우 재실행됨)
*/
export default memo(function AddTodo({ style, sub, parentTodoId }) {
  //setTodo라는 함수(props)가 바뀌었을 경우에만 재실행!
  console.log("Run AddTodo");
  //공통스타일

  //레이블에 줄 스타일
  const labelStyles = { flexShrink: 1, margin: "0.5rem 1rem" };
  const inputStyles = { flexGrow: 1 };
  const buttonStyles = { flexShrink: 1, margin: "0 0 0 1rem" };

  //2가지 항목의 등록을 연결시켜줄 ref
  const taskRef = useRef();
  const dueDateRef = useRef();

  const todoDispatch = useDispatch();
  /**
   * 등록버튼을 클릭했을때의 핸들러
   * setTodo 를 이ㅣ용해서 todo아이템을 등록해야한다
   */
  const onClickHandler = () => {
    // onAdd(taskRef.current.value, dueDateRef.current.value);

    // thunk dispatch 코드

    const payload = {
      id: parseInt(Math.random() * 100_000_000),
      isDone: false,
      task: taskRef.current.value,
      dueDate: dueDateRef.current.value,
    };

    if (sub) {
      // subTodo 등록
      payload.parentTodoId = parentTodoId;
    }

    const thunk = sub ? addSubTodo(payload) : addTodo(payload);

    todoDispatch(thunk);
    //addTodo의 리턴에 있는 dispatch 함수가 전달된다 (액션을 만드는 생성자, thunk)

    // toolkit dispatch 코드
    // todoDisPatch(
    //   todoActions.add({
    //     task: taskRef.current.value,
    //     dueDate: dueDateRef.current.value,
    //   })
    // );
    // ** redux dispatch 코드 **
    // todoDisPatch({
    //   type: "ADD-TODO",
    //   payload: {
    //     task: taskRef.current.value,
    //     dueDate: dueDateRef.current.value,
    //   },
    // });
  };

  return (
    <div style={style}>
      <label htmlFor="task" style={labelStyles}>
        TASK
      </label>
      <input
        type="text"
        id="task"
        placeholder="InputTask"
        style={inputStyles}
        ref={taskRef}
      />

      <label htmlFor="due-date" style={labelStyles}>
        DueDate
      </label>
      <input type="date" id="due-date" style={inputStyles} ref={dueDateRef} />

      <button style={buttonStyles} onClick={onClickHandler}>
        등록
      </button>
    </div>
  );
});
