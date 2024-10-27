import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./CardMatchingGame.css";
import confetti from "canvas-confetti";

function CardMatchingGame() {
  const initialCards = shuffleCards([
    { id: 1, content: "HIV", type: "disease" },
    { id: 2, content: "Fever, Rash, Sore Throat", type: "symptom" },
    { id: 3, content: "Chlamydia", type: "disease" },
    { id: 4, content: "Painful Urination, Discharge", type: "symptom" },
    { id: 5, content: "Gonorrhea", type: "disease" },
    { id: 6, content: "Painful Urination, Pelvic Pain", type: "symptom" },
    { id: 7, content: "Syphilis", type: "disease" },
    { id: 8, content: "Sores, Rash, Fatigue", type: "symptom" },
    { id: 9, content: "Herpes", type: "disease" },
    { id: 10, content: "Blisters, Painful Sores", type: "symptom" },
    { id: 11, content: "HPV", type: "disease" },
    { id: 12, content: "Warts, Genital Itching", type: "symptom" },
    { id: 13, content: "Tricho\nmoniasis", type: "disease" },
    { id: 14, content: "Itching, Discharge", type: "symptom" },
    { id: 15, content: "Hepatitis B", type: "disease" },
    { id: 16, content: "Nausea, Vomiting, Fatigue", type: "symptom" },
  ]);

  const [cards, setCards] = useState(initialCards);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const gameBoardRef = useRef(null); // Ref for game board

  useEffect(() => {
    if (matchedPairs.length === cards.length) {
      triggerConfetti();
    }
  }, [matchedPairs]);

  const triggerConfetti = () => {
    if (gameBoardRef.current) {
      const rect = gameBoardRef.current.getBoundingClientRect();
      confetti({
        particleCount: 250,
        spread: 100,
        origin: {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight,
        },
        startVelocity: 45,
        ticks: 600,
        colors: ["#bb0000", "#ffffff"],
      });
    }
  };

  const handleCardClick = (id) => {
    if (flippedCards.length < 2 && !flippedCards.includes(id) && !matchedPairs.includes(id)) {
      const newFlippedCards = [...flippedCards, id];
      setFlippedCards(newFlippedCards);

      if (newFlippedCards.length === 2) {
        const [firstId, secondId] = newFlippedCards;
        const firstCard = cards.find((card) => card.id === firstId);
        const secondCard = cards.find((card) => card.id === secondId);

        if (
          (firstCard.type === "disease" &&
            secondCard.type === "symptom" &&
            isMatchingPair(firstCard, secondCard)) ||
          (firstCard.type === "symptom" &&
            secondCard.type === "disease" &&
            isMatchingPair(secondCard, firstCard))
        ) {
          setMatchedPairs((prev) => [...prev, firstId, secondId]);
        }

        setTimeout(() => setFlippedCards([]), 1000);
      }
    }
  };

  const isMatchingPair = (diseaseCard, symptomCard) => {
    const matchingPairs = {
      HIV: "Fever, Rash, Sore Throat",
      Chlamydia: "Painful Urination, Discharge",
      Gonorrhea: "Painful Urination, Pelvic Pain",
      Syphilis: "Sores, Rash, Fatigue",
      Herpes: "Blisters, Painful Sores",
      HPV: "Warts, Genital Itching",
      Trichomoniasis: "Itching, Discharge",
      "Hepatitis B": "Nausea, Vomiting, Fatigue",
    };
    return matchingPairs[diseaseCard.content] === symptomCard.content;
  };

  const resetGame = () => {
    setCards(shuffleCards([...initialCards]));
    setMatchedPairs([]);
    setFlippedCards([]);
  };

  return (
    <div className="card-matching-game">
      <h1 className="game-heading">Match STDs (🐶) to their symptoms (🦴)</h1>
      <div className="game-board" ref={gameBoardRef}>
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            isFlipped={flippedCards.includes(card.id) || matchedPairs.includes(card.id)}
            isMatched={matchedPairs.includes(card.id)} // Check if card is matched
            onClick={() => handleCardClick(card.id)}
          />
        ))}
      </div>
      <div className="start-over-container">
        <button className="start-over-button" onClick={resetGame}>
          Start Over
        </button>
      </div>
    </div>
  );
}

function Card({ card, isFlipped, isMatched, onClick }) {
  return (
    <div
      className={`card ${isMatched ? "matched" : ""}`} // Add "matched" class if cards are matched
      onClick={onClick}
    >
      {isFlipped ? card.content : card.type === "disease" ? "🐶" : "🦴"}
    </div>
  );
}

// Prop validation for Card component
Card.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  isFlipped: PropTypes.bool.isRequired,
  isMatched: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

// Function to shuffle cards
function shuffleCards(cards) {
  return cards.sort(() => Math.random() - 0.5);
}

export default CardMatchingGame;
