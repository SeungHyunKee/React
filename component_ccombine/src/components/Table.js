export default function Grid({ cols, bodys }) {
  return (
    <Table>
      {/* table을 통해서 thead, tbody 가져올수있도록 함 
    합성하려는 컴포넌트는 숨겨놓고, 공개되어있는것의 자식으로 붙인다 !!*/}
      <Table.Header>
        {cols.map((title, index) => (
          //  여기서 map 하는 과정에서 header의 chlidren으로 값 들어오게됨
          <th key={index}>{title}</th>
        ))}
      </Table.Header>
      <Table.Body>
        {bodys.map((row, index) => (
          <tr key={index}>
            {" "}
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </Table.Body>
    </Table>
  );
}

function Table({ children }) {
  return <table>{children}</table>;
}

// 컴포넌트를 대입했으므로 왼쪽도 컴포넌트임
Table.Header = THead;
Table.Body = TBody;

//props
function THead({ children }) {
  return (
    <thead>
      <tr>
        {children}
        {/* {{props.cols.map((title, index) => (
          <th key={index}>{title}</th>
        ))}} */}
      </tr>
    </thead>
  );
}

function TBody({ children }) {
  return (
    <tbody>
      {children}
      {/* {props.bodys.map((row, index) => (
        <tr key={index}>
          {row.map((cell, cellIndex) => (
            <td key={cellIndex}>{cell}</td>
          ))}
        </tr>
      ))} */}
    </tbody>
  );
}
