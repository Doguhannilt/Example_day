import { useState } from "react";
import "./App.css";

const Terminal = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState([
    "Hoş geldin! Mevcut komutları görmek için aşağıya bak. 💖",
    "/Cnn.soz - Özel bir mesaj",
    "/Cnn14.subat - Sevgililer günü notu",
    "/Cnn.anilar - En güzel anılarımız",
    "/mors",
    "/ascii",
    "/fav_music"
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const commands = {
    "/Cnn.soz":
      "Seninle her anım öylesine özel ve anlamlı ki, her geçen gün seni biraz daha çok seviyorum. ❤️ Seninle olmak, dünyadaki en güzel şey! Hayatımda olduğun için minnettarım, seni her şeyden çok seviyorum! 💖",
    "/Cnn14.subat":
      "Bugün 14 Şubat, sevgililer günümüz! Seninle her anı paylaşmak, bir ömre bedel. 💝 Sen benim en değerli hediyem, bu dünyada benim için en anlamlı varlıksın. Birlikte geçirdiğimiz her an, hayatımın en güzel anı. Seninle yaşamak bir mucize. 🎁💖",
    "/Cnn.anilar":
      "İlk buluşmamız, o anki heyecanımız, gözlerimizdeki mutluluk… Her anımız o kadar değerli ki! Her gülüşün, her tatlı sohbetimiz, seninle geçen her saniye, benim için tarifsiz bir hazine. 💕 Seninle geçirdiğim her an, ölümsüz bir anı oluyor. Birlikte yaşadığımız her şey, kalbimdeki en özel yeri alıyor. Seninle her şey daha güzel! 💫",
  };

  const handleCommand = (cmd) => {
    if (cmd === "/clear") {
      setOutput([]);
    } else if (cmd === "/mors") {
      playTypingSound();
      setOutput((prev) => [...prev, "🔊 Morse kod sesi çalınıyor..."]);
    } else if (cmd === "/ascii") {
      setOutput((prev) => [
        ...prev,
        <img
          key={prev.length}
          src="/ascii-art.png"
          alt="ASCII Art"
          style={{ maxWidth: "50%", height: "auto", marginTop: "10px" }}
        />,
      ]);
    } else if (commands[cmd]) {
      simulateTyping(commands[cmd]);
    }
    else if (cmd == "/fav_music") {
      playHalseySound()
      setOutput((prev) => [...prev, "🔊 Müzik çalınıyor..."]);

    }
    else {
      setOutput((prev) => [...prev, `Komut bulunamadı: ${cmd}`]);
    }
    setInput("");
  };

  const simulateTyping = (text) => {
    setIsTyping(true);
    let index = 0;
    let displayedText = "";
    const interval = setInterval(() => {
      if (index < text.length) {
        displayedText += text[index];
        setOutput((prev) => [...prev.slice(0, -1), displayedText]);
        index++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 80);
  };

  const playTypingSound = () => {
    const audio = new Audio("/click.mp3");
    audio.playbackRate = 0.5; 
    audio.volume = 0.3;
    audio.play();
  };

  const playHalseySound = () => {
    const audio = new Audio("/halsey.mp3")
    audio.volume = 0.3;
    audio.play();
  }

  return (
    <div className="terminal-container">
      <div className="title">💻 Sevgililer Günü Terminaline Hoş Geldin! 🎉</div>
      <div className="terminal">
        {output.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>
      <input
        className="terminal-input"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleCommand(input)}
        disabled={isTyping}
        placeholder="Komut girin..."
      />
    </div>
  );
};

export default function App() {
  return <Terminal />;
}
