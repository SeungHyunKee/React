export function Table({ textArray }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
        </tr>
      </thead>
      <tbody>
        {textArray.map((item, index) => (
          <tr key={index}>
            <th>{item.name}</th>
            <th>{item.age}</th>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
