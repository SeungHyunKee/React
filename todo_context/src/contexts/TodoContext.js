// createContext : state관리하는 저장소
import { createContext, useReducer } from "react";
import { todoReducers } from "../reducers/todoReducers";

//context store 생성
//todoContext를 이용할때, 자동완성(Content Assist)을 이용하기위해서
//store의 원형을 작성
const TodoContext = createContext({
  todo: [],
  done: (event) => {},
  add: (task, dueDate) => {},
});

export default TodoContext;

/**
 * Context store의 내용을 제공하기위해서
 * TodoContextProvider Component 를 생성
 */
export function TodoContextProvider({ children }) {
  //이게있어야 여기저기서 이걸 구독할수있음

  const [todoState, todoDispatcher] = useReducer(todoReducers, []);

  // provider가 관리할 state와 함수들을 작성
  const contextValue = {
    todo: todoState,
    done: (event) => {
      const checkbox = event.currentTarget;
      const id = parseInt(checkbox.value);
      todoDispatcher({
        type: "DONE",
        payload: { id, isDone: checkbox.checked },
      });

      // reference 타입들은 메모리주소가 바껴야 바꼈다고 판단함
      // setTodo(
      //   (preyTodo) =>
      //     preyTodo.map((todo) => {
      //       // 반복할때마다 todo 객체리터럴 하나 가져와서 비교한다
      //       if (todo.id === id) {
      //         // 체크했으면 true 로 바뀐다
      //         todo.isDone = checkbox.checked;
      //       }
      //       // todo를 반환시키는것 = 메모리주소를 다시 만드는것(객체리터럴을 펼쳐서 새롭게 만들어라)
      //       return { ...todo };
      //     })
      //   // --> 이후 리액트는 이 배열을 다시 화면에 뿌린다
      // );
    },
    add: (task, dueDate) => {
      todoDispatcher({ type: "ADD", payload: { task, dueDate } });
      // setTodo((prevTodos) => [
      //   ...prevTodos,
      //   {
      //     //기존배열에 아래항목을 추가해라
      //     id: prevTodos.length,
      //     isDone: false,
      //     task: task,
      //     dueDate: dueDate,
      //   },
      // ]);
    },
  };

  return (
    <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
  );
}
