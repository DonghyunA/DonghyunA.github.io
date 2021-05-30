import React, { useState, useEffect } from "react";

function CbmCalculator() {
  const [update, setUpdate] = useState(false);
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [unit, setUnit] = useState("");
  const [count, setCount] = useState("");
  const [cbmValue, setCbmValue] = useState("");
  const onChange = (event) => {
    console.log(event);
    const {
      target: { name, value },
    } = event;
    if (name === "length") {
      setLength(value);
    } else if (name === "width") {
      setWidth(value);
    } else if (name === "height") {
      setHeight(value);
    }
    setCbmValue(length * width * height);
    // if (length && width && height){
    //     setCbmValue(length*width*height);
    // }
  };
  useEffect(() => {
    setCbmValue(length * width * height);
  });
  return (
    <>
      <input
        name="length"
        type="text"
        placeholder="가로"
        required
        value={length}
        onChange={onChange}
        className="cbmLength"
        number="true"
      />
      <input
        name="width"
        type="text"
        placeholder="세로"
        required
        value={width}
        onChange={onChange}
        className="cbmWidth"
        number="true"
      />
      <input
        name="height"
        type="text"
        placeholder="높이"
        required
        value={height}
        onChange={onChange}
        className="cbmHeight"
        number="true"
      />
      <span>{cbmValue}</span>
    </>
  );
}
export default CbmCalculator;
