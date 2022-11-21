import React, { useState, useRef } from 'react';
import './App.css'

interface divEL {
  current: any;
}

function App() {
  const inputRef: divEL = useRef(null);
  const [file, setFile] = useState(null);
  const [parsedLogs, setParsedLogs] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  }

  const handleUploadFile = async () => {
    if (!file) {
      return alert("Please select a file");
    }
    setLoading(true);
    let formData = new FormData();
    formData.append("file", file);
    try {
      let result = await fetch('http://localhost:4000/api/v1/log-parser', {
        method: 'POST',
        body: formData,
      });
      let res = await result.json();
      setLoading(false);
      setParsedLogs(res.data);
      setMessage(res.message);
      if (inputRef.current !== null) {
        inputRef.current.value = null;
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      if (inputRef.current !== null) {
        inputRef.current.value = null;
      }

    }
  }

  return (
    <div className="App">
      <div className="uploadDiv">
        <h2>Upload a logs files (Should be a txt file)</h2>
        <div>
          <input ref={inputRef} onChange={handleFileChange} type="file" accept="text/plain" />
        </div>
        <div style={{ marginTop: '30px' }}>
          <button onClick={() => handleUploadFile()}>Upload File</button>
        </div>
        {loading === true ? <p>Loading Data</p> : null}
        {parsedLogs.length !== 0 ? <div className="uploadDiv">
          {message ? <p>{message}</p> : null}
          <h2>Data fetched</h2>
          {parsedLogs?.map((log: any) => (
            <p>{JSON.stringify(log)}</p>
          ))}
        </div> : null}
      </div>
    </div>
  );
}

export default App;
