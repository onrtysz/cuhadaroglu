import React, { useRef, useEffect, useState } from "react";
import paper from "paper";

const CanvasDrawing: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [canvasWidth, setCanvasWidth] = useState<number>(800);
  const [canvasHeight, setCanvasHeight] = useState<number>(600);
  const [verticalCount, setVerticalCount] = useState<number>(4);
  const [horizontalCount, setHorizontalCount] = useState<number>(3);
  const [profileThickness, setProfileThickness] = useState<number>(10);

  const drawScene = () => {
    paper.project.clear();
    paper.view.viewSize = new paper.Size(canvasWidth + 100, canvasHeight + 100);
    const halfWidth = profileThickness / 2;
    new paper.Path.Rectangle({
      point: [halfWidth, halfWidth],
      size: [canvasWidth, canvasHeight],
      strokeColor: "black",
      opacity: 0.5,
      strokeWidth: profileThickness,
    });

    new paper.PointText({
      point: [profileThickness / 2, canvasHeight / 2],
      content: `${canvasHeight.toFixed(0)} mm`,
      fillColor: "black",
      fontSize: 12,
      justification: "center",
      rotation: -90,
    });
    new paper.PointText({
      point: [canvasWidth / 2, profileThickness],
      content: `${canvasWidth.toFixed(0)} mm`,
      fillColor: "black",
      fontSize: 12,
      justification: "center",
    });

    const effectiveWidth = canvasWidth - 2 * profileThickness;
    const effectiveHeight = canvasHeight - 2 * profileThickness;

    for (let i = 1; i < verticalCount; i++) {
      const xOffset = profileThickness + i * (effectiveWidth / verticalCount);
      new paper.Path.Line({
        from: [xOffset, 0 + profileThickness],
        to: [xOffset, canvasHeight],
        strokeColor: "blue",
        opacity: 0.8,
        strokeWidth: profileThickness,
      });
    }

    for (let j = 1; j < horizontalCount; j++) {
      const yOffset =
        profileThickness + j * (effectiveHeight / horizontalCount);
      new paper.Path.Line({
        from: [profileThickness, yOffset],
        to: [canvasWidth, yOffset],
        strokeColor: "#28a745",
        opacity: 0.8,
        strokeWidth: profileThickness,
      });
    }

    const cellWidth = canvasWidth / verticalCount;
    const cellHeight = canvasHeight / horizontalCount;

    for (let i = 0; i < verticalCount; i++) {
      for (let j = 0; j < horizontalCount; j++) {
        const leftX = profileThickness + i * cellWidth;
        const topY = profileThickness + j * cellHeight;

        const centerX = leftX + cellWidth / 2;
        const centerY = topY + cellHeight / 2;

        new paper.PointText({
          point: [centerX, centerY],
          content: `${cellWidth.toFixed(0)} x ${cellHeight.toFixed(0)} mm`,
          fillColor: "black",
          fontSize: 12,
          justification: "center",
        });
      }
    }
  };

  useEffect(() => {
    if (canvasRef.current) {
      paper.setup(canvasRef.current);
      drawScene();
    }
    return () => {
      paper.project.clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    drawScene();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    canvasWidth,
    canvasHeight,
    verticalCount,
    horizontalCount,
    profileThickness,
  ]);

  const addVerticalRecord = () => {
    setVerticalCount(verticalCount + 1);
  };

  const addHorizontalRecord = () => {
    setHorizontalCount(horizontalCount + 1);
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        backgroundColor: "#f7f7f7",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>
        Çuhadaroğlu Profil Çizimi
      </h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "15px",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <label style={{ fontWeight: "bold", color: "#555" }}>Genişlik:</label>
          <input
            type="number"
            value={canvasWidth}
            onChange={(e) => setCanvasWidth(Number(e.target.value))}
            style={{
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              outline: "none",
              width: "100px",
            }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <label style={{ fontWeight: "bold", color: "#555" }}>
            Yükseklik:
          </label>
          <input
            type="number"
            value={canvasHeight}
            onChange={(e) => setCanvasHeight(Number(e.target.value))}
            style={{
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              outline: "none",
              width: "100px",
            }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <label style={{ fontWeight: "bold", color: "#555" }}>
            Dikey Kayıt Sayısı:
          </label>
          <input
            type="number"
            value={verticalCount}
            onChange={(e) => setVerticalCount(Number(e.target.value))}
            style={{
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              outline: "none",
              width: "100px",
            }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <label style={{ fontWeight: "bold", color: "#555" }}>
            Yatay Kayıt Sayısı:
          </label>
          <input
            type="number"
            value={horizontalCount}
            onChange={(e) => setHorizontalCount(Number(e.target.value))}
            style={{
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              outline: "none",
              width: "100px",
            }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <label style={{ fontWeight: "bold", color: "#555" }}>
            Profil Kalınlığı:
          </label>
          <input
            type="number"
            value={profileThickness}
            onChange={(e) => setProfileThickness(Number(e.target.value))}
            style={{
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              outline: "none",
              width: "100px",
            }}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={addVerticalRecord}
          style={{
            padding: "10px 20px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#007bff",
            color: "#fff",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#0056b3")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#007bff")
          }
        >
          Yeni Dikey Kayıt Ekle
        </button>
        <button
          onClick={addHorizontalRecord}
          style={{
            padding: "10px 20px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#28a745",
            color: "#fff",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#218838")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#28a745")
          }
        >
          Yeni Yatay Kayıt Ekle
        </button>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />
      </div>
    </div>
  );
};

export default CanvasDrawing;
