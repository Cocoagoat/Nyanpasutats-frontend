let intervalSet = false;

export default function startGlobalInterval() {
  if (!intervalSet) {
    setInterval(
      () => {
        if (localStorage.getItem("resetCount") !== null) {
          let count = parseInt(localStorage.getItem("resetCount"), 10);
          console.log(count);
          if (count > 0) {
            count--;
            localStorage.setItem("resetCount", count.toString());
          }
        }
      },
      2 * 60 * 1000,
    ); // 2 minutes
    intervalSet = true;
  }
  console.log(
    "Reset count after startGlobalInterval :",
    localStorage.getItem("resetCount"),
  );
}
