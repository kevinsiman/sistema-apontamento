import { useEffect, useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export function useElapsedTime(startDate: string) {
  const [time, setTime] = useState(calcElapsed(startDate));

  function calcElapsed(dateStr: string) {
    const start = dayjs(dateStr, "DD/MM/YYYY HH:mm:ss");
    const now = dayjs();
    let diff = now.diff(start, "second"); // diferença em segundos

    if (diff < 0) diff = 0; // se a data ainda não chegou, mostra 00:00:00

    const hours = Math.floor(diff / 3600);
    const minutes = Math.floor((diff % 3600) / 60);
    const seconds = diff % 60;

    // formata como HH:mm:ss (sempre 2 dígitos)
    return [
      String(hours).padStart(2, "0"),
      String(minutes).padStart(2, "0"),
      String(seconds).padStart(2, "0"),
    ].join(":");
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(calcElapsed(startDate));
    }, 1000); // atualiza a cada segundo

    return () => clearInterval(timer);
  }, [startDate]);

  return time;
}
