export function DataSection({ textArray }) {
  return (
    <div>
      Name | Age
      {
        // 단순한 text 를 tag로 바꿀 때 사용
        // *배열을 노출시킬때 사용하는 방법 : 형태를 바꿔서 태그로 보여줌*
        textArray.map((text, index) => (
          <div key={index}>{text}</div>
        ))
      }
    </div>
  );
}
