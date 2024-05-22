import { useState, useEffect, useCallback, useMemo } from "react";
import BoardView from "./BoardView";
import WriteBoardForm from "./WriteBoardForm";
import ModifyBoardForm from "./ModifyBoardForm";
import { loadBoardList } from "../http/http";
import { useFetch } from "../hooks/useFetch";

let pageNo = 0;
//테이블을 만들거나, 텍스트 보여주는 곳
export default function BoardApp({ token, loginInfo }) {
  // const [boards, setBoards] = useState([]);
  const [selectedBoardId, setSelectedBoardId] = useState();
  const [isWriteMode, setIsWriteMode] = useState(false); //이게 true면 글쓰기 컴포넌트가 보이도록 하기 위해
  const [needReload, setNeedReload] = useState();

  const isSelect = selectedBoardId !== undefined;

  const fetchBoardList = useCallback(loadBoardList, []);

  const fetchParam = useMemo(() => {
    return { token, needReload };
  }, [token, needReload]);

  const { data, setData } = useFetch(undefined, fetchBoardList, fetchParam);

  const { count, pages, next } = data || {}; //data에서 꺼내옴

  const { body: boards } = data || {};

  // //게시글 불러오기
  // useEffect(() => {
  //   const loadBoards = async () => {
  //     // if (!token) {
  //     //   setBoards([]); //로그인안되어있을때 게시글내용 안보이도록
  //     //   return;
  //     // }
  //     const json = await loadBoardList(token);
  //     console.log(json);
  //     setBoards(json.body);
  //   };

  //   loadBoards();
  // }, [token, needReload]); //바뀔 염려가 있는 값들 or props로 가지고오는 값들 넣어줘야됨

  const onRowClickHandler = (rowId) => {
    setSelectedBoardId(rowId);
  };

  const onLoadMoreClickHandler = async () => {
    const json = await loadBoardList({ token, pageNo: ++pageNo }); //파라미터가 객체이므로 {}로 받아옴
    setData((prevData) => {
      return {
        //기존의 prev data 항목들을 전부 풀어서 적어줌
        ...prevData,
        // 이 중 변경될수있는 값들만 덮어쓰기 함
        next: json.next, // 기존의 nexxt 중 변경된값들만 json에서 가져옴
        pages: json.pages,
        errors: json.errors,
        count: json.count,
        body: [...prevData.body, ...json.body],
        // 여기선 기존의 항목들이 유지돼야함 + 바뀐거 붙여줌 (둘다 배열이므로 ...로 펼쳐줘야함)
      };
    });
  };

  const onWriteModeClickHandler = () => {
    setIsWriteMode(true);
  };

  return (
    <>
      {" "}
      {/* 토큰이 있을때만 테이블 보여줌. 없으면 텍스트 보여줌 */}
      {token && !isSelect && !isWriteMode && boards && (
        <>
          <div>총 {count}개의 게시글이 검색되었습니다.</div>
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
              {boards.map((BItem) => (
                <tr
                  key={BItem.id}
                  onClick={() => onRowClickHandler(BItem.id)} //함수를 직접 만들어서 호출 -> 파라미터가 전달됨
                >
                  <td>{BItem.id}</td>
                  <td>{BItem.subject}</td>
                  <td>{BItem.memberVO.name}</td>
                  <td>{BItem.viewCnt}</td>
                  <td>{BItem.crtDt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      {token && isSelect && !isWriteMode && (
        <BoardView
          token={token}
          selectedBoardId={selectedBoardId}
          setSelectedBoardId={setSelectedBoardId}
          setNeedReload={setNeedReload}
          loginInfo={loginInfo}
          setIsWriteMode={setIsWriteMode}
          needReload={needReload}
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
          {next && <button onClick={onLoadMoreClickHandler}>더보기</button>}
          <button onClick={onWriteModeClickHandler}>게시글 등록</button>
        </div>
      )}
    </>
  );
}
