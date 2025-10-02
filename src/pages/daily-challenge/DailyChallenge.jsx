import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./DailyChallenge.css";
import { BACKEND_URL } from "../config";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css"; // or another Prism theme

// Import icons (you may need to install react-icons or use your preferred icon library)
import { FaPlay, FaRedo, FaTerminal, FaCode, FaSpinner } from "react-icons/fa";

function DailyChallenge() {
  const highlight = (code) =>
    Prism.highlight(code, Prism.languages.javascript, "javascript");

  const location = useLocation();
  const challengeFromState = location.state?.challenge;
    const functionNameFromState = location.state?.functionName;

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
  const [functionName, setFunctionName] = useState("");

  useEffect(() => {
    // If we have challenge data from navigation state, use it directly
    if (challengeFromState) {
      setChallenge(challengeFromState);
      setSource(challengeFromState.content || "");
      setFunctionName(functionNameFromState);
      setIsLoading(false);
      return;
    }

    // Otherwise, fetch the daily challenge as before
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
          content: challenge.content || "",
          tests: challenge.tests || [],
        });
        setFunctionName(challenge.functionName || "");
        // Set the editor content to the challenge content
        setSource(challenge.content || "");
        console.log(challenge.functionName);
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
  }, [challengeFromState]);

  const runCode = () => {
    if (!source.trim()) {
      setOutput("Please enter some code to run.");
      return;
    }

    setIsRunning(true);
    setOutput("Running...");
    
    setTimeout(() => {
      try {
        // Extract test function
        const fn = new Function(`
          ${source}
          return ${functionName}
        `)
        const reverseString = fn();

        if (typeof reverseString !== 'function') {
          setOutput(`❌ Must have a function named "${functionName}".`);
          setIsRunning(false);
          return;
        }
        
        if (challenge.testCases.length === 0) {
          setOutput("⚠️ No tests available for this challenge. Please verify your solution manually.");
          return;
        }

        for (const test of challenge.testCases) {
          const out = reverseString(test.input);
          if (out !== test.expectedOutput) {
            setOutput(`❌ Test failed for input "${test.input}". Expected "${test.expectedOutput}", but got "${out}".`);
            return;
          }
        }

        let i = 0;
        while (i < Math.min(challenge.generator.cases, 1000)) { // Limit to 1000 cases to prevent infinite loops
          i++;

          let input;
          try {
            input = eval(challenge.generator.inFn)
          } catch (err) {
            setOutput(`❌ Error during test case generation: ${err.message}`);
            return;
          }
          try {
            const output = reverseString(input);
            const out = eval(`
              const output = \`${JSON.stringify(output)}\`;
              const input = \`${JSON.stringify(input)}\`;
              ${challenge.generator.outFn}`);
            if (out === false) {
              setOutput(`❌ Test failed for the input: \"${input.trim()}\", returned \"${output}\"`);
              return;
            }
          } catch (err) {
            setOutput(`❌ Error during test case execution: ${err.message}`);
            return;
          }
        }

        ret = fetch(`${BACKEND_URL}/user/complete-daily-challenge`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Include cookies for authentication if needed
          body: JSON.stringify({ challengeId: challenge.id, code: source })
        })
        if (ret.ok) {
          setOutput(`✅ All tests passed! Great job!`);
        }
        else {
          setOutput(`⚠️ All tests passed, but failed to record completion. Please try again later.`);
        }

        return;
      } catch (err) {
        console.log(err);
        setOutput(`❌ Error: ${err.message}`);
      } finally {
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
        <Editor
          className="code-editor"                // wrapper we control
          textareaClassName="code-textarea"     // put this class on the inner textarea
          value={source}
          onValueChange={setSource}
          highlight={highlight}
          padding={12}
          style={{
            fontFamily: '"Fira Code", monospace',
            fontSize: 14,
            minHeight: "200px",
          }}
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
