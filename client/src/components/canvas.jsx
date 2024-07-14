import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  FaPen,
  FaEraser,
  FaBan,
  FaHighlighter,
  FaSave,
  FaUndo,
} from "react-icons/fa";
import { Stage, Layer, Line } from "react-konva";

const API_URL = import.meta.env.VITE_API_URL;

const Canvas = ({ isDarkMode }) => {
  const userId = useSelector((state) => state.auth.uid);

  const [lines, setLines] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [tool, setTool] = useState("pen");
  const [color, setColor] = useState("#000000");
  const [isDrawing, setIsDrawing] = useState(false);
  const stageRef = useRef(null);
  const containerRef = useRef(null);
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (userId) {
      fetchCanvas();
    }
  }, [userId]);

  const fetchCanvas = async () => {
    try {
      const response = await fetch(`${API_URL}/canvas/${userId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Fetched data:", data);
      if (Array.isArray(data) && data.length > 0 && data[0].elements) {
        setLines(data[0].elements);
      } else {
        console.log("No existing canvas data found");
        setLines([]);
      }
    } catch (error) {
      console.error("Error fetching canvas elements:", error);
    }
  };


  useEffect(() => {
    const resizeStage = () => {
      if (containerRef.current) {
        setStageSize({
          width: containerRef.current.offsetWidth - 10,
          height: containerRef.current.offsetHeight - 60,
        });
      }
    };

    resizeStage();
    window.addEventListener("resize", resizeStage);
    return () => window.removeEventListener("resize", resizeStage);
  }, []);

  const saveLines = async (linesToSave) => {
    try {
      const response = await fetch(`${API_URL}/canvas/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ elements: linesToSave }),
      });

      if (!response.ok) {
        throw new Error("Failed to save lines");
      }
      console.log("Lines saved successfully");
    } catch (error) {
      console.error("Error saving lines:", error);
    }
  };

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, color, points: [pos.x, pos.y] }]);
    setRedoStack([]);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];

    if (lastLine.tool !== tool || lastLine.color !== color) {
      lastLine = {
        tool,
        color,
        points: [...lastLine.points.slice(-2), point.x, point.y],
      };
      setLines([...lines, lastLine]);
    } else {
      lastLine.points = lastLine.points.concat([point.x, point.y]);
      lines.splice(lines.length - 1, 1, lastLine);
      setLines([...lines]);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    saveLines(lines);
  };

  const handleToolChange = (newTool) => {
    setTool(newTool);
    if (isDrawing) {
      setIsDrawing(false);
      const stage = stageRef.current.getStage();
      const point = stage.getPointerPosition();
      setLines([
        ...lines,
        { tool: newTool, color, points: [point.x, point.y] },
      ]);
      setIsDrawing(true);
    }
  };

  const handleColorChange = (newColor) => {
    setColor(newColor);
    if (isDrawing) {
      setIsDrawing(false);
      const stage = stageRef.current.getStage();
      const point = stage.getPointerPosition();
      setLines([
        ...lines,
        { tool, color: newColor, points: [point.x, point.y] },
      ]);
      setIsDrawing(true);
    }
  };

  const handleClear = () => {
    setRedoStack([...redoStack, ...lines]);
    setLines([]);
    saveLines([]);
  };

  const handleSave = () => {
    const uri = stageRef.current.toDataURL();
    const link = document.createElement("a");
    link.download = "whiteboard.png";
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleUndo = () => {
    if (lines.length > 0) {
      const lastLine = lines[lines.length - 1];
      setRedoStack([...redoStack, lastLine]);
      const newLines = lines.slice(0, -1);
      setLines(newLines);
    }
  };

  const handleRedo = () => {
    if (redoStack.length > 0) {
      const lastRedoLine = redoStack[redoStack.length - 1];
      const newLines = [...lines, lastRedoLine];
      setLines(newLines);
      setRedoStack(redoStack.slice(0, -1));
    }
  };

  const bgColor = isDarkMode ? "bg-white" : "bg-gray-100";
  const textColor = isDarkMode ? "text-gray-800" : "text-gray-900";
  const buttonHoverColor = isDarkMode
    ? "hover:bg-gray-200"
    : "hover:bg-gray-300";
  const borderColor = isDarkMode ? "border-black" : "border-[#D2A76A]";

  return (
    <div
      ref={containerRef}
      className={`flex flex-col h-full w-full rounded-b-lg rounded-l-lg rounded-tr-[120px] ${bgColor} ${textColor}`}
    >
      <div className="flex space-x-2 p-2 mb-2">
        <button
          onClick={() => handleToolChange("pen")}
          className={`p-2 rounded ${buttonHoverColor} ${
            tool === "pen" ? "bg-gray-300" : ""
          }`}
          title="Pen"
        >
          <FaPen />
        </button>
        <button
          onClick={() => handleToolChange("eraser")}
          className={`p-2 rounded ${buttonHoverColor} ${
            tool === "eraser" ? "bg-gray-300" : ""
          }`}
          title="Eraser"
        >
          <FaEraser />
        </button>
        <button
          onClick={() => handleToolChange("highlighter")}
          className={`p-2 rounded ${buttonHoverColor} ${
            tool === "highlighter" ? "bg-gray-300" : ""
          }`}
          title="Highlighter"
        >
          <FaHighlighter />
        </button>
        <input
          type="color"
          value={color}
          onChange={(e) => handleColorChange(e.target.value)}
          className="w-8 h-8 rounded-full cursor-pointer"
          title="Color Picker"
        />
        <button
          onClick={handleClear}
          className={`p-2 rounded ${buttonHoverColor}`}
          title="Clear"
        >
          <FaBan />
        </button>
        <button
          onClick={handleSave}
          className={`p-2 rounded ${buttonHoverColor}`}
          title="Save"
        >
          <FaSave />
        </button>
        <button
          onClick={handleUndo}
          className={`p-2 rounded ${buttonHoverColor}`}
          title="Undo"
        >
          <FaUndo />
        </button>
        <button
          onClick={handleRedo}
          className={`p-2 rounded ${buttonHoverColor}`}
          title="Redo"
        >
          <FaUndo className="transform rotate-180" />
        </button>
      </div>
      <div className="flex-grow">
        <Stage
          width={stageSize.width}
          height={stageSize.height}
          onMouseDown={handleMouseDown}
          onMousemove={handleMouseMove}
          onMouseup={handleMouseUp}
          ref={stageRef}
        >
          <Layer>
            {lines.map((line, i) => (
              <Line
                key={i}
                points={line.points}
                stroke={line.tool === "eraser" ? "#ffffff" : line.color}
                strokeWidth={line.tool === "highlighter" ? 20 : 5}
                tension={0.5}
                lineCap="round"
                globalCompositeOperation={
                  line.tool === "eraser" ? "destination-out" : "source-over"
                }
                opacity={line.tool === "highlighter" ? 0.5 : 1}
              />
            ))}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default Canvas;
