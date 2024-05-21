import { useState, useEffect } from "react";
import BoardView from "./BoardView";
import WriteBoardForm from "./WriteBoardForm";
import ModifyBoardForm from "./ModifyBoardForm";

//테이블을 만들거나, 텍스트 보여주는 곳
export default function BoardApp({ token, loginInfo }) {
  const [boards, setBoards] = useState([]);
  const [selectedBoardId, setSelectedBoardId] = useState();
  const [isWriteMode, setIsWriteMode] = useState(false); //이게 true면 글쓰기 컴포넌트가 보이도록 하기 위해
  const [needReload, setNeedReload] = useState();

  const isSelect = selectedBoardId !== undefined;

  //게시글 불러오기
  useEffect(() => {
    const loadBoards = async () => {
      if (!token) {
        setBoards([]); //로그인안되어있을때 게시글내용 안보이도록
        return;
      }

      const response = await fetch("http://localhost:8080/api/v1/boards", {
        method: "GET", //GET 은 body가 없음
        headers: {
          //authorization에서의 키를 넣어주기 위함
          Authorization: token,
        },
      });

      const json = await response.json();
      console.log(json);
      setBoards(json.body);
    };

    loadBoards();
  }, [token, needReload]); //바뀔 염려가 있는 값들 or props로 가지고오는 값들 넣어줘야됨

  const onRowClickHandler = (rowId) => {
    setSelectedBoardId(rowId);
  };

  const onWriteModeClickHandler = () => {
    setIsWriteMode(true);
  };

  return (
    <>
      {" "}
      {/* 토큰이 있을때만 테이블 보여줌. 없으면 텍스트 보여줌 */}
      {token && !isSelect && !isWriteMode && (
        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>조회수</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {boards.map((boardItem) => (
              <tr
                key={boardItem.id}
                onClick={() => onRowClickHandler(boardItem.id)} //함수를 직접 만들어서 호출 -> 파라미터가 전달됨
              >
                <td>{boardItem.id}</td>
                <td>{boardItem.subject}</td>
                <td>{boardItem.memberVO.name}</td>
                <td>{boardItem.viewCnt}</td>
                <td>{boardItem.crtDt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {token && isSelect && !isWriteMode && (
        <BoardView
          token={token}
          selectedBoardId={selectedBoardId}
          setSelectedBoardId={setSelectedBoardId}
          setNeedReload={setNeedReload}
          loginInfo={loginInfo}
          setIsWriteMode={setIsWriteMode}
        />
      )}
      {isWriteMode && (
        <WriteBoardForm
          token={token}
          setIsWriteMode={setIsWriteMode}
          setNeedReload={setNeedReload}
        />
      )}
      {!token && <div>로그인이 필요합니다.</div>}
      {token && (
        <div className="button-area right-align">
          <button onClick={onWriteModeClickHandler}>게시글 등록</button>
        </div>
      )}
    </>
  );
}
