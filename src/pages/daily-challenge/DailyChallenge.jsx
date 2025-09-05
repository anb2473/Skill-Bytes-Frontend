import React, { useState, useEffect } from "react";
import "./DailyChallenge.css";

// Import icons (you may need to install react-icons or use your preferred icon library)
import { FaPlay, FaRedo, FaTerminal, FaCode } from "react-icons/fa";

function DailyChallenge() {
  const [source, setSource] = useState(`// Welcome to Daily Challenge!
// Write your JavaScript code here and click Run to see the output.
// Example:
for (let i = 1; i <= 5; i++) {
  console.log("Iteration:", i);
}

// You can also return values
const result = 42 + 1;
result; // This will be displayed in the output`);
  
  const [output, setOutput] = useState("Click 'Run Code' to execute your JavaScript and see the output here.");
  const [isRunning, setIsRunning] = useState(false);
  const [challenge, setChallenge] = useState({
    title: "Daily JavaScript Challenge",
    description: "Solve today's coding challenge by writing JavaScript code. Test your skills and see the results instantly!",
    difficulty: "Beginner",
    points: 100
  });

  const runCode = () => {
    if (!source.trim()) {
      setOutput("Please enter some code to run.");
      return;
    }

    setIsRunning(true);
    setOutput("Running...");
    
    // Use setTimeout to allow the UI to update before running potentially blocking code
    setTimeout(() => {
      let logs = [];
      const originalConsoleLog = console.log;

      try {
        // Intercept console.log
        console.log = (...args) => {
          logs.push(args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
          ).join(' '));
        };

        // Execute the user code
        const result = Function('"use strict";\n' + source)();

        if (result !== undefined) {
          logs.push(
            typeof result === 'object' 
              ? JSON.stringify(result, null, 2) 
              : String(result)
          );
        }

        setOutput(logs.join("\n") || "Code executed successfully (no output).");
      } catch (err) {
        setOutput(`❌ Error: ${err.message}`);
      } finally {
        // Restore original console.log
        console.log = originalConsoleLog;
        setIsRunning(false);
      }
    }, 100);
  };

  const resetCode = () => {
    if (window.confirm("Are you sure you want to reset the code to the default example?")) {
      setSource(`// Welcome to Daily Challenge!\n// Write your JavaScript code here and click Run to see the output.\n// Example:\nfor (let i = 1; i <= 5; i++) {\n  console.log(\"Iteration:\", i);\n}\n\n// You can also return values\nconst result = 42 + 1;\nresult; // This will be displayed in the output`);
      setOutput("Click 'Run Code' to execute your JavaScript and see the output here.");
    }
  };

  return (
    <div className="wat-container">
      <div className="wat-header">
        <h1 className="wat-title">{challenge.title}</h1>
        <p className="wat-description">
          {challenge.description}
        </p>
        <div className="wat-meta">
          <span className="wat-difficulty">Difficulty: {challenge.difficulty}</span>
          <span className="wat-points">Points: {challenge.points}</span>
        </div>
      </div>

      <div className="wat-editor-container">
        <div className="wat-toolbar">
          <span className="wat-toolbar-title">
            <FaCode className="wat-icon" /> Editor
          </span>
          <div className="wat-buttons">
            <button 
              onClick={resetCode} 
              className="wat-button wat-button-secondary"
              disabled={isRunning}
            >
              <FaRedo className="wat-button-icon" /> Reset
            </button>
            <button 
              onClick={runCode} 
              className="wat-button wat-button-primary"
              disabled={isRunning}
            >
              <FaPlay className="wat-button-icon" /> {isRunning ? 'Running...' : 'Run Code'}
            </button>
          </div>
        </div>
        <textarea
          className="wat-textarea"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          placeholder="Enter your JavaScript code here..."
          spellCheck="false"
        />
      </div>

      <div className="wat-output-container">
        <div className="wat-output-header">
          <FaTerminal className="wat-icon" /> Output
        </div>
        <pre className="wat-output">
          {output}
        </pre>
      </div>
    </div>
  );
}

export default DailyChallenge;
