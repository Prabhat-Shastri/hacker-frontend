import React, { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const characterRef = useRef(null);
  const blockRef = useRef(null);
  const [jumping, setJumping] = useState(0);
  const [counter, setCounter] = useState(0);
  const [question, setQuestion] = useState("");
  const [gaps, setGaps] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0); // Add score state
  const [key, setKey] = useState(0);

  const gapSpacing = 150;
  const questions = [
    { question: "What is the male reproductive cell called?", answer: "Sperm" },
    { question: "What is the female reproductive cell called?", answer: "Egg" },
    { question: "What is the main female hormone?", answer: "Estrogen" },
    {
      question: "What is the term for the period when a female's body is ready for pregnancy?",
      answer: "Ovulation",
    },
    { question: "What is the term for sexual intercourse?", answer: "Coitus" },
    { question: "What is the name of the device used to prevent pregnancy?", answer: "Condom" },
    { question: "What is the STI caused by a virus that leads to genital warts?", answer: "HPV" },
    { question: "What is a common birth control pill?", answer: "Plan B" },
    { question: "What is the term for the monthly cycle in females?", answer: "Period" },
    { question: "What is the tube that carries sperm?", answer: "Vas deferens" },
  ];

  const initializeGaps = () => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    const { question, answer } = questions[randomIndex];
    setQuestion(question);

    let incorrectAnswer;
    do {
      incorrectAnswer = questions[Math.floor(Math.random() * questions.length)].answer;
    } while (incorrectAnswer === answer);

    const minGap = 50;
    const windowHeight = window.innerHeight - 300;
    const firstGapTop = Math.floor(Math.random() * (windowHeight - gapSpacing - minGap));
    const secondGapTop = firstGapTop + gapSpacing + minGap;

    const newGaps = [
      { top: firstGapTop, answer: answer, passable: true },
      { top: secondGapTop, answer: incorrectAnswer, passable: false },
    ];
    setGaps(newGaps);
    setCounter((prevCounter) => prevCounter + 1);
  };

  useEffect(() => {
    const character = characterRef.current;
    const block = blockRef.current;

    const handleBlockAnimation = () => initializeGaps();

    block.addEventListener("animationiteration", handleBlockAnimation);

    const newIntervalId = setInterval(() => {
      if (gameOver) return;

      const characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
      if (jumping === 0) {
        character.style.top = characterTop + 3 + "px";
      }

      const blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));

      if (blockLeft < 60 && blockLeft > -50) {
        const isColliding = gaps.every((gap) => {
          const holeTop = gap.top;
          const holeHeight = gapSpacing;
          const isInGap = characterTop > holeTop && characterTop < holeTop + holeHeight;
          return !(gap.passable && isInGap);
        });

        if (isColliding) {
          setGameOver(true);
          setScore(counter - 1); // Update score to the counter value at game over
          clearInterval(newIntervalId);
        }
      }
    }, 10);

    const handleKeyDown = (event) => {
      if (event.code === "Space" && !gameOver) jump();
      if (event.code === "KeyR" && gameOver) restartGame();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      block.removeEventListener("animationiteration", handleBlockAnimation);
      clearInterval(newIntervalId);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [jumping, gaps, gameOver]);

  const jump = () => {
    if (jumping === 0) {
      setJumping(1);
      let jumpCount = 0;

      const jumpInterval = setInterval(() => {
        const character = characterRef.current;
        const characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
        if (characterTop > 6 && jumpCount < 15) {
          character.style.top = characterTop - 5 + "px";
        }
        if (jumpCount > 20) {
          clearInterval(jumpInterval);
          setJumping(0);
        }
        jumpCount++;
      }, 10);
    }
  };

  const restartGame = () => {
    setCounter(0);
    setScore(0); // Reset score rto 0
    setGaps([]);
    setGameOver(false);
    setQuestion("");
    setJumping(0);
    setKey((prevKey) => prevKey + 1);
    initializeGaps();
  };

  return (
    <div key={key} id="game">
      <div className="cloud cloud1"></div>
      <div className="cloud cloud2"></div>
      <div className="cloud cloud3"></div>

      <div id="question">{question}</div>
      <div id="block" ref={blockRef}>
        {gaps.map((gap, index) => (
          <div
            key={index}
            className={`hole ${gap.passable ? "passable" : "non-passable"}`}
            style={{ top: `${gap.top}px` }}
          >
            <div className="answer">{gap.answer}</div>
          </div>
        ))}
      </div>
      <div id="character" ref={characterRef} style={{ top: "200px" }}>
        🤰
      </div>
      {gameOver && (
        <div className="broken-screen">
          <div>
            <h1>Game Over!</h1>
          </div>
          <div>
            <p>Score: {score}</p>
          </div>
          <div>
            <p>Press R to Restart</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
