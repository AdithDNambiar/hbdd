import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import {
  Star,
  Heart,
  Sparkles,
  MoonStar,
  Gift,
  Award,
} from "lucide-react";
import "./App.css";

const memories = [
  {
    title: "Advices of eachi",
    image: "/photo1.jpg",
    message: "nalla look aayit po and impressive aayit cheyy... athellathe veryum ind..but thapeet kaanunilla ",
    note: "You probably forgot sending this. ",
    Icon: Star,
  },
  {
    title: "Support of an eachi",
    image: "/photo2.jpg",
    message: "U will achieve your dreams...most touched one",
    note: "This stayed with me.",
    Icon: Star,
  },
  {
    title: "Ookal..hmmmmmm",
    image: "/photo3.jpg",
    message: "Ookiyathaanelum..it was funny",
    note: "Still makes me smile.",
    Icon: Star,
  },
  {
    title: "sheriyaaya DHEEDHI",
    image: "/photo4.jpg",
    message: "Eachi being eachi",
    note: "Some words become memories.",
    Icon: Star,
  },
  {
    title: "Vere enth vendppa",
    image: "/photo5.jpg",
    message: "HUFFFFFFFFFFFFFFFF",
    note: "This one is one of my favourites.",
    Icon: Star,
  },
];

export default function App() {
  const [started, setStarted] = useState(false);
  const [activeMemory, setActiveMemory] = useState(null);
  const [opened, setOpened] = useState([]);
  const [final, setFinal] = useState(false);
  const [gift, setGift] = useState(false);

  const openStar = (index) => {
    setActiveMemory(index);
    if (!opened.includes(index)) setOpened([...opened, index]);
  };

  const allOpened = opened.length === memories.length;

  return (
    <div className="app">
      {final && <Confetti />}

      <div className="stars-bg">
        {[...Array(90)].map((_, i) => (
          <span key={i} className={`tiny-star tiny-star-${i + 1}`} />
        ))}
      </div>

      {!started && (
        <motion.div
          className="intro"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <MoonStar size={52} className="main-icon" />
          <h1>Constellation for Dheedhi</h1>
          <p>Play this ...Click on every stars </p>
          <p>  </p>
          <p>Click on every  5 stars that appears after clicking starts </p>
          <p> </p>
          <p>Every star showing opens a memory.</p>
          <p> </p>
          <p>Cringe aano bohr aano rasundo areela... ente mindil vannath cheythu..FOR YOU.</p>

          <button className="icon-btn" onClick={() => setStarted(true)}>
            <Sparkles size={18} />
            <span> Start </span>
          </button>
        </motion.div>
      )}

      {started && !final && (
        <>
          <div className="sky-title">
            <h2>Unlock 5 stars, Dheedhii</h2>
            <p>{opened.length}/5 memories opened</p>
          </div>

          <div className="constellation">
            {memories.map((memory, index) => {
              const Icon = memory.Icon;

              return (
                <motion.button
                  key={index}
                  className={`star star-${index} ${
                    opened.includes(index) ? "opened" : ""
                  }`}
                  onClick={() => openStar(index)}
                  whileTap={{ scale: 0.8 }}
                  animate={{
                    scale: opened.includes(index) ? 1.15 : [1, 1.18, 1],
                  }}
                  transition={{
                    repeat: opened.includes(index) ? 0 : Infinity,
                    duration: 1.6,
                  }}
                >
                  <Icon size={46} strokeWidth={1.8} />
                </motion.button>
              );
            })}
          </div>

          {allOpened && (
            <motion.button
              className="final-btn icon-btn"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setFinal(true)}
            >
              <Award size={20} />
              <span>Open the Final Star</span>
            </motion.button>
          )}
        </>
      )}

      <AnimatePresence>
        {activeMemory !== null && !final && (
          <motion.div
            className="modal-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveMemory(null)}
          >
            <motion.div
              className="memory-card"
              initial={{ scale: 0.75, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.75, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const Icon = memories[activeMemory].Icon;
                return <Icon size={44} className="card-icon" />;
              })()}

              <h2>{memories[activeMemory].title}</h2>

              <img src={memories[activeMemory].image} alt="memory" />

              <p className="quote">“{memories[activeMemory].message}”</p>
              <p className="note">{memories[activeMemory].note}</p>

              <button onClick={() => setActiveMemory(null)}>Close Star</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {final && (
        <motion.div
          className="final-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 1 }}
          >
            <Heart size={64} className="main-icon" />
          </motion.div>

          <motion.h1
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 1 }}
          >
            HAPPY BIRTHDAY DHEEDHIIII
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            Thank you for every advice.
            <br />
            Thank you for being human diary.
            <br />
            Thank you for being the best dheedhi.
          </motion.p>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
          >
            — enn Aadii
          </motion.h2>

          {!gift ? (
            <button className="icon-btn" onClick={() => setGift(true)}>
              <Gift size={18} />
              <span>One Last Surprise</span>
            </button>
          ) : (
            <motion.div
              className="gift-box"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              <Gift size={28} />
              <span>Waiting for your coming bdays for bigger gifts</span>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}