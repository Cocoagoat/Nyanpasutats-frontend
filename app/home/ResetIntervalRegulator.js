import getCookie from "../actions/getCookie";
import updateCookie from "../actions/updateCookie";

let intervalSet = false;

export default function startGlobalInterval() {
  if (!intervalSet) {
    setInterval(
      () => {
        let resetCount = localStorage.getItem("resetCount");
        if (resetCount !== null) {
          let count = parseInt(resetCount, 10);
          if (count > 0) {
            count--;
            localStorage.setItem("resetCount", count.toString());
          }
        }
      },
      5 * 60 * 1000,
    ); // 5 minutes
    intervalSet = true;
  }
}

export function startGlobalIntervalServerSide() {
  if (!intervalSet) {
    setInterval(
      async () => {
        let resetCount = await getCookie("resetCount");
        if (resetCount !== null) {
          let count = parseInt(resetCount, 10);
          if (count > 0) {
            count--;
            updateCookie("resetCount", count.toString());
          }
        }
      },
      2 * 60 * 1000,
    ); // 2 minutes
    intervalSet = true;
  }
}
