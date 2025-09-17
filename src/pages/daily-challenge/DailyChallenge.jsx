import React, { useState, useEffect } from "react";
import "./DailyChallenge.css";
import { BACKEND_URL } from "../config";

// Import icons (you may need to install react-icons or use your preferred icon library)
import { FaPlay, FaRedo, FaTerminal, FaCode, FaSpinner } from "react-icons/fa";

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
    title: "Loading challenge...",
    description: "Please wait while we load today's challenge.",
    difficulty: "-",
    points: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDailyChallenge = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/user/get-daily-challenge`, {
          credentials: 'include' // Include cookies for authentication if needed
        });
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        
        const data = await response.json();
        const challenge = data.challenge;
        setChallenge({
          title: challenge.title || "Failed to Load Daily Challenge",
          description: challenge.description || "We know this sucks, but we failed to load your daily challenge. Try again later! Also, please report this issue if it persists. Thanks! :)",
          difficulty: challenge.difficulty || "Impossible",
          points: challenge.points || "∞",
          content: challenge.content || ""
        });
        // Set the editor content to the challenge content
        setSource(challenge.content || "");
        setError(null);
      } catch (err) {
        console.error("Failed to fetch daily challenge:", err);
        setError("Failed to load the daily challenge. Please try again later.");
        setChallenge({
          title: "Failed to Load Daily Challenge",
          description: "We know this sucks, but we failed to load your daily challenge. Try again later! Also, please report this issue if it persists. Thanks! :)",
          difficulty: "Impossible",
          points: "∞"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDailyChallenge();
  }, []);

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
    if (window.confirm("Are you sure you want to reset the code to the challenge template?")) {
      setSource(challenge.content || "");
      setOutput("Click 'Run Code' to execute your JavaScript and see the output here.");
    }
  };

  return (
    <div className="wat-container">
      <div className="wat-header">
        {isLoading ? (
          <div className="wat-loading">
            <div className="wat-loading-dots">
              <div className="wat-loading-dot"></div>
              <div className="wat-loading-dot"></div>
              <div className="wat-loading-dot"></div>
            </div>
            <div className="wat-loading-text">Loading today's challenge...</div>
          </div>
        ) : error ? (
          <div className="wat-error">
            <p className="error-message">{error}</p>
          </div>
        ) : (
          <>
            <h1 className="wat-title">{challenge.title}</h1>
            <div className="wat-meta">
              <span className="wat-difficulty">Difficulty: {challenge.difficulty}</span>
              <span className="wat-points">Points: {challenge.points}</span>
            </div>
            <div className="wat-description" dangerouslySetInnerHTML={{ __html: challenge.description }}></div>
          </>
        )}
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
              {isRunning ? (
                <>
                  <div className="wat-button-spinner"></div>
                  Running...
                </>
              ) : (
                <>
                  <FaPlay className="wat-button-icon" />
                  Run Code
                </>
              )}
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
