// 컴포넌트가 아닌, 함수의 집합
export const loadMyData = async ({ token }) => {
  // 함수 내에서 훅을 쓰고 싶을때 사용하는것 : custom hook

  //로그인한 사용자의 정보 가져옴
  const response = await fetch(`http://localhost:8080/api/v1/member`, {
    method: "GET",
    headers: { Authorization: token },
  });
  // 위 함수는 json 데이터를 돌려줌
  const json = await response.json();
  return json;
};

export const login = async (email, password) => {
  // 로그인을 처리해줌
  // fetch는 비동기이기때문에 await 필수로 써줌!! (상위함수가 반드시 async 여야함 -> onclickhandler 함수앞에 async 붙여주기)
  const response = await fetch("http://localhost:8080/auth/token", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
  });

  const json = await response.json();
  return json;
};

export const loadBoardList = async ({ token, pageNo = 0 }) => {
  if (!token) {
    return undefined;
  }

  //이 url 전달될때마다 새로운 값 받음
  const response = await fetch(
    `http://localhost:8080/api/v1/boards?pageNo=${pageNo}`,
    {
      method: "GET", //GET 은 body가 없음
      headers: {
        //authorization에서의 키를 넣어주기 위함
        Authorization: token,
      },
    }
  );
  const json = await response.json();
  return json;
};

export const viewBoard = async (boardItem, token) => {
  const response = await fetch(
    `http://localhost:8080/api/v1/boards/${boardItem.id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    }
  );
  const json = await response.json();
  return json;
};

export const viewOneBoard = async ({ selectedBoardId, token }) => {
  const response = await fetch(
    `http://localhost:8080/api/v1/boards/${selectedBoardId}`,
    {
      method: "GET",
      headers: { Authorization: token },
    }
  );
  const json = await response.json();
  return json;
};

export const writeBoardForm = async (subject, content, file, token) => {
  const formData = new FormData();
  formData.append("subject", subject);
  formData.append("content", content);
  formData.append("file", file);

  const response = await fetch("http://localhost:8080/api/v1/boards", {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: formData,
  });
  const json = await response.json();
  return json;
};

export const modifyBoardForm = async (boardItem, token, formData) => {
  const response = await fetch(
    `http://localhost:8080/api/v1/boards/${boardItem.id}`,
    {
      method: "PUT",
      headers: {
        Authorization: token,
      },
      body: formData,
    }
  );
  const json = await response.json();
  return json;
};
