//createStore가 Deprecated되었음 ->> 변경관리가 복잡하기때문에 더이상 사용하지 않음
import { createStore } from "redux";
import { Provider } from "react-redux";

// 1st. React redux reducer 생성
function reduxReducer(state = [], action) {
  // action : {type, payload}
  // const type = action.type;
  // const payload = action.payload;
  const { type, payload } = action;

  if (type === "ADD-TODO") {
    return [
      ...state,
      {
        id: state.length,
        isDone: false,
        task: payload.task,
        dueDate: payload.dueDate,
      },
    ]; //읽기전용이기때문에 새로운 배열에 넣어줘야됨
  } else if (type === "DONE") {
    return state.map((todo) => {
      // 반복할때마다 todo 객체리터럴 하나 가져와서 비교한다
      if (todo.id === payload.id) {
        // 체크했으면 true 로 바뀐다
        todo.isDone = payload.isDone;
      }
      // todo를 반환시키는것 = 메모리주소를 다시 만드는것(객체리터럴을 펼쳐서 새롭게 만들어라)
      return { ...todo };
    });
  }

  // 전달받은 state 그대로 반환
  return state;
}

// 2nd. React redux reducer를 이용하는 "Redux Store" 생성
function reduxStore() {
  return createStore(reduxReducer);
}

// 3rd. Redux Store를 제공할 Redux Provider생성
export default function ReduxProvider({ children }) {
  // 3-1. Redux Store 객체 생성
  const reduxStoreObject = reduxStore();

  // 3-2. Provider 생성  -- children에 들어가는 모든곳에 reduxStoreObject를 쓰게해주겠다
  return <Provider store={reduxStoreObject}>{children}</Provider>;
}
