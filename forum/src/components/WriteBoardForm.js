import { useRef } from "react";

export default function WriteBoardForm({
  setIsWriteMode,
  token,
  setNeedReload,
}) {
  const subjectRef = useRef();
  const fileRef = useRef();
  const contentRef = useRef();

  const onCancelClickHandler = () => {
    setIsWriteMode(false);
  };

  const onSaveClickHandler = async () => {
    const subject = subjectRef.current.value;
    const content = contentRef.current.value;
    const file = fileRef.current.files[0]; //선택된 파일들의 배열을 가져옴 (한개의 파일만 등록할수잇으므로 [0])

    //파일 업로드를 위해 formData 생성 (아래처럼 보내주면 multipartFormData로 간다)
    const formData = new FormData(); //JavaScript built-in 객체
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
    console.log(json);

    if (json.errors) {
      json.errors.forEach((error) => {
        alert(error);
      });
    } else if (json.body) {
      setIsWriteMode(false);
      setNeedReload(Math.random());
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="subject">제목</label>
        <input type="text" id="subject" ref={subjectRef} />
      </div>
      <div>
        <label htmlFor="file">첨부파일</label>
        <input type="file" id="file" ref={fileRef} />
      </div>
      <div>
        <label htmlFor="content">내용</label>
        <textarea id="content" ref={contentRef}></textarea>
      </div>
      <div className="button-area right-align">
        <button onClick={onCancelClickHandler}>취소</button>
        <button onClick={onSaveClickHandler}>등록</button>
      </div>
    </div>
  );
}
