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
    { id: 1, imageSrc: "../webtoon1.jpg", title: " 웹툰이미지 1" },
    { id: 2, imageSrc: "/path/to/image2.jpg", title: "웹툰이미지 2" },
    { id: 3, imageSrc: "/path/to/image3.jpg", title: "웹툰이미지 3" },
  ];

  return (
    <div className="container">
      {rectangles.map((rectangle) => (
        <Rectangle
          key={rectangle.id}
          imageSrc={rectangle.imageSrc}
          title={rectangle.title}
        />
      ))}
    </div>
  );
}
