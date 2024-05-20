import React from "react";
import "../image.css";

function Rectangle({ imageSrc, title }) {
  return (
    <div className="rectangle">
      <img src={imageSrc} alt={title} className="image" />
      <p className="title">{title}</p>
    </div>
  );
}

export function Image() {
  // 여러 개의 네모 정보를 담은 배열
  const rectangles = [
    {
      id: 1,
      imageSrc: "/webtoon1.jpg",
      title: "그해 우리는",
    },
    {
      id: 2,
      imageSrc:
        "https://img3.yna.co.kr/etc/inner/EN/2022/12/08/AEN20221208003100315_01_i_P2.jpg",
      title: "외모지상주의",
    },
    {
      id: 3,
      imageSrc:
        "https://image.edaily.co.kr/images/photo/files/NP/S/2024/01/PS24011300020.jpg",
      title: "내남편과 결혼해줘",
    },
    {
      id: 4,
      imageSrc:
        "https://i.scdn.co/image/ab67616d0000b273863b35ee3f971892c2a6189a",
      title: "오늘도 사랑스럽개",
    },
  ];

  return (
    <div className="container">
      {rectangles.map((rectangle) => (
        <div key={rectangle.id} className="rectangle-container">
          <Rectangle {...rectangle} />
          {/* <p className="title">{rectangle.title}</p> */}
        </div>
      ))}
    </div>
  );
}
