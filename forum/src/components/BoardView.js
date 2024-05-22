import { useCallback, useEffect, useMemo, useState } from "react";
import ModifyBoardForm from "./ModifyBoardForm";
import { viewBoard, viewOneBoard } from "../http/http";
import { useFetch } from "../hooks/useFetch";

export default function BoardView({
  selectedBoardId,
  setSelectedBoardId,
  token,
  setNeedReload,
  loginInfo,
  setIsWriteMode,
  needReload,
}) {
  const [isModifyMode, setIsModifyMode] = useState(false);

  const onModifyClickHandler = () => {
    setIsModifyMode(true);
  };

  const onDeleteClickHandler = async () => {
    const json = await viewBoard(boardItem, token);
    if (json.body) {
      //삭제성공
      //목록컴포넌트 노출
      setSelectedBoardId(undefined); //삭제 되고 목록 컴포넌트 노출
      // 목록을 새롭게 고쳐야한다
      setNeedReload(Math.random()); //삭제할때마다 새로운 난수를 만들고, react는 status가 바뀌었다고 판단
    } else {
      //삭제실패
      //실패한사유 알려주기
      console.log(json);
      alert(json.errors);
    }
  };

  const onViewListClickHandler = () => {
    setSelectedBoardId(undefined);
  };

  // const [boardItem, setboardItem] = useState();

  const fetchLoadOneBoard = useCallback(viewOneBoard, []);

  const fetchParam = useMemo(() => {
    return { selectedBoardId, token, needReload };
  }, [selectedBoardId, token, needReload]);

  const { data, isLoading } = useFetch(
    undefined,
    fetchLoadOneBoard,
    fetchParam
  );

  const { body: boardItem } = data || {};

  // useEffect(() => {
  //   const loadOneBoard = async () => {
  //     const json = await viewOneBoard(selectedBoardId, token);
  //     setboardItem(json.body);
  //   };
  //   loadOneBoard();
  // }, [selectedBoardId, token, needReload]);

  return (
    <div>
      {!isModifyMode && (
        <div>
          {isLoading && <div>데이터를 불러오는 중입니다.</div>}
          {boardItem && (
            <div>
              <h3>제목 : {boardItem.subject}</h3>
              <h1>게시글 조회</h1>
              <div className="grid">
                <div>작성자 : {boardItem.memberVO.name}</div>
                <div>조회수 : {boardItem.viewCnt}</div>
                <div>등록일 : {boardItem.crtDt}</div>
                <div>수정일 : {boardItem.mdfyDt}</div>
                <div>내용 : {boardItem.content}</div>
                {/* <label for="originFileName">첨부파일</label>
      <div>
        <a href="/board/file/download/${boardVO.id}">
          ${selectedOneBoardId.originFileName}
        </a>
      </div> */}
              </div>
            </div>
          )}
          <div className="button-area right-align">
            {boardItem &&
              loginInfo &&
              (loginInfo.email === boardItem.email ||
                loginInfo.adminYN === "Y") && (
                <>
                  <button onClick={onModifyClickHandler}>수정</button>
                  <button onClick={onDeleteClickHandler}>삭제</button>
                </>
              )}
            <button onClick={onViewListClickHandler}>목록보기</button>
          </div>
        </div>
      )}
      {isModifyMode && (
        <ModifyBoardForm
          token={token}
          setIsModifyMode={setIsModifyMode}
          setNeedReload={setNeedReload}
          boardItem={boardItem}
          selectedBoardId={selectedBoardId}
        />
      )}
    </div>
  );
}
