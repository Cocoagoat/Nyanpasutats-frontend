import { SeasonName } from "@/app/interfaces";
import fallBackground from "@/public/FallBackground.png";
import springBackground from "@/public/SpringBackground.png";
import summerBackground from "@/public/SummerBackground.png";
import winterBackground from "@/public/WinterBackground.png";

export function getBackgroundColor(seasonName: SeasonName) {
  switch (seasonName) {
    case "Winter":
      return "#7DD3FC"; // RGB: 125, 211, 252
    case "Spring":
      return "#66C55E"; // RGB: 54, 197, 94
    case "Summer":
      return "#EAC555"; // RGB: 235, 191, 77
    case "Fall":
      return "#CD6702"; // RGB: 205, 87, 34
    default:
      throw Error("Invalid season name");
  }
}

export function getAltBackgroundColor(seasonName: SeasonName) {
  switch (seasonName) {
    case "Winter":
      return "#9FD9FD";
    case "Spring":
      return "#66C11E";
    case "Summer":
      return "#CCB937";
    case "Fall":
      return "#BD7744";
    default:
      throw Error("Invalid season name");
  }
}

export function getDayBackgroundImage(seasonName: SeasonName) {
  switch (seasonName) {
    case "Winter":
      return winterBackground.src;
    case "Spring":
      return springBackground.src;
    case "Summer":
      return summerBackground.src;
    case "Fall":
      return fallBackground.src;
    default:
      throw Error("Invalid season name");
  }
}
