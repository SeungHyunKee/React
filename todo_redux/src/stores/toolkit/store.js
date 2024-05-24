import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
// 1. Slice Store 생성
//      'todo'라는 이름의 Slice Store 생성
const todoSliceStore = createSlice({
  //여기안에는 reducer 라는 객체가 만들어짐

  // 항상 sliceStore은 아래의 3가지가 만들어져야됨
  // 1.slice Store의 이름 -> name 이라는 키를 가지고 만든다
  name: "todo slice", // -> actions에서 target 이라는 이름으로 전달됨 ex) target: "todo slice"

  // 2.slicce Store의 초기 state 값 -> 초기값(여기선 배열)
  initialState: [],

  // 3.slice Store reduccers 생성 -> 객체리터럴로 만든다
  reducers: {
    //firebase에서 데이터를 가져오기 위함
    load(state, action) {
      if (state.length === 0) {
        state.push(...action.payload);
      }
    },

    add(state, action) {
      //state : 변경가능한 state, action: state를 변경시켜주는 값들이 들어있음
      // console.log("todo > add: ", action);
      const payload = action.payload;
      state.push({
        id: payload.id,
        isDone: false,
        task: payload.task,
        dueDate: payload.dueDate,
      });
    },
    done(state, action) {
      // console.log("todo > done: ", action);
      const payload = action.payload;
      // payload: { id: 2, isDone: true } //id가 2번인 isDone의 값을 true로 바꿔라
      // -> 배열 내 아이템들의 인덱스를 알아야됨
      /* state: [
       *       {id: 0, isDone: false, task: "ABC", dueDate: "2024-05-23"},
       *       {id: 1, isDone: false, task: "ABC", dueDate: "2024-05-23"},
       *       {id: 2, isDone: false, task: "ABC", dueDate: "2024-05-23"},
       *       {id: 3, isDone: false, task: "ABC", dueDate: "2024-05-23"},
       */

      // state에서 id가 2인 객체리터럴의 인덱스값을 알아야한다
      // const index = state.findIndex() 로 찾을 수 있음 (조건함수!!)
      // const index = state.findIndex(아이템 => 아이템.id === payload.id);
      // 만약, 인덱스값이 2라면,  state[2].isDone => payload.isDone 해주면 됨

      const { id, isDone } = payload;
      const index = state.findIndex((item) => item.id === id);
      state[index].isDone = isDone;
    },

    // **subtodo 추가할때 호출 (toolkit을 위한 reducer)**
    addSubTodo(state, action) {
      //todo state의 구조
      /**
       * todo : [
       *   {id, task, dueDate, isDone, sub:[ -> subtodo가 있을경우 이렇게 구조 바뀌도록 함
       *      {id, task, dueDate, isDone},
       *      {id, task, dueDate, isDone},
       *   ]},
       *   {id, task, dueDate, isDone}, -> subtodo 가 없을경우
       *   {id, task, dueDate, isDone},
       * ]
       */
      //action을 분리해서 literal 로 가져옴
      const { parentTodoId, id, task, dueDate } = action.payload;
      // 1.parentTodoId와 todo의 id가 같은 객체 리터럴의 인덱스를 찾는다
      const index = state.findIndex((todo) => todo.id === parentTodoId);
      // 2.parentTodo의 인덱스에 ssub 항목이 존재하는지 확인한다
      if (!state[index].sub) {
        // 2-1. sub항목이 존재하지 않는다면, sub배열을 생성
        state[index].sub = {}; //firebase가 배열을 관리못하기때문에 객체리터럴{}로 받음
      }
      // 2-2. sub 항목이 존재한다면, sub항목에 새로운 todo를 추가한다
      state[index].sub[id] = { id, isDone: false, task, dueDate };
    },
    doneSubTodo(state, action) {
      const { parentTodoId, id, isDone } = action.payload;
      //      부모todoId,  내todoId
      const index = state.findIndex((todo) => todo.id === parentTodoId);
      // sub가 배열이 아닌 객체리터럴이기때문에, 주석처리된 아래와같이 못씀
      // const subTodoIndex = state[index].sub.findIndex((todo) => todo.id === id);
      // state[index].sub[subTodoIndex].isDone = isDone;
      state[index].sub[id].isDone = isDone;
    },
  },
});

//action 생성자를 이용한 액션 정의
// Thunk = 액션생성자를 의미함
// 총 3가지 액션생성자를 만들어야됨 : load, add, done (위의 reducer 항목과 일치하도록)

// 1. loadTodo가 하는 일 : firebase 에서 Todo목록을 가져와서, todoSliceStore에 저장함
export const loadTodo = () => {
  return async (dispatch) => {
    // firebase 에서 Todo목록을 가져와서
    const url = "https://react-todo-2181c-default-rtdb.firebaseio.com";
    const response = await fetch(`${url}/todo.json`, {
      method: "GET",
    });
    const json = await response.json();
    // console.log(json);

    const todoList = [];
    for (let key in json) {
      // console.log("json key", key);
      // console.log("json value", json[key]);
      todoList.push(json[key]);
    }
    // console.log(todoList);

    // todoSliceStore에 저장함
    dispatch(todoActions.load(todoList));
  };
};

export const addTodo = (newTodoItem) => {
  // 2.1 사용자가 생성한 새로운 todo 항목을
  return async (dispatch) => {
    //addtodo에서 호출하는 todoDispatch가 dispatch로 전달됨
    // 2.2 todoSliceStore에도 저장하고,
    dispatch(todoActions.add(newTodoItem));
    // 2.3 firebase에도 저장함
    const url = "https://react-todo-2181c-default-rtdb.firebaseio.com";

    // async내부에서 fetch결과 받아와야되므로 await 써줘야됨 ????????
    const response = await fetch(`${url}/todo/${newTodoItem.id}.json`, {
      method: "PUT",
      body: JSON.stringify(newTodoItem), //json을 String으로 변환   (json은 객체이므로 주소를 던져주므로 ? )
      // json으로 보내면 객체리터럴 형태로 간다. string으로 바꿔야 json형태로 나온다
    });

    const json = await response.json();
    // console.log();
  };
};
// todoSliceStore에 저장하고, 실제db인 firebase에도 저장함
export const doneTodo = (doneTodoItem) => {
  // 사용자가 완료한 todo항목을
  return async (dispatch) => {
    //todoSliceStore에 저장하고
    dispatch(todoActions.done(doneTodoItem));

    // 2.3 firebase에도 저장함
    const url = "https://react-todo-2181c-default-rtdb.firebaseio.com";

    // async내부에서 fetch결과 받아와야되므로 await 써줘야됨 ????????
    const response = await fetch(`${url}/todo/${doneTodoItem.id}.json`, {
      method: "PUT",
      body: JSON.stringify(doneTodoItem), //json을 String으로 변환시켜서 보내줘야됨 ??????왜 ?///?
    });

    const json = await response.json();
    // console.log();
  };
};

// *********thunk만들어주기**********
export const addSubTodo = (addSubTodoItem) => {
  return async (dispatch) => {
    dispatch(todoActions.addSubTodo(addSubTodoItem));

    //firebase에 저장
    const url = "https://react-todo-2181c-default-rtdb.firebaseio.com";
    await fetch(
      `${url}/todo/${addSubTodoItem.parentTodoId}/sub/${addSubTodoItem.id}.json`,
      {
        method: "PUT",
        body: JSON.stringify(addSubTodoItem),
      }
    );
  };
};

export const doneSubTodo = (doneSubTodoItem) => {
  return async (dispatch) => {
    dispatch(todoActions.doneSubTodo(doneSubTodoItem));
    // firebase에 저장
    const url = "https://react-todo-2181c-default-rtdb.firebaseio.com";
    // async내부에서 fetch결과 받아와야되므로 await 써줘야됨
    await fetch(
      `${url}/todo/${doneSubTodoItem.parentTodoId}/sub/${doneSubTodoItem.id}.json`,
      {
        method: "PUT",
        body: JSON.stringify(doneSubTodoItem),
      }
    );
  };
};

// 2.Redux Store 생성
const toolkitStore = configureStore({
  reducer: {
    todo: todoSliceStore.reducer, //reducer안에는 reducers() 가 들어가있다!!!
  },
});

// 3. Slice Store의 Actionis 공유
export const todoActions = todoSliceStore.actions;
// todoActions.add(payload{id:"", isDone});

// 4. Provider Component 생성
// todo state인 todoSliceStore 를 제공하기 위함
export default function ToolkitProvider({ children }) {
  return <Provider store={toolkitStore}>{children}</Provider>;
}
