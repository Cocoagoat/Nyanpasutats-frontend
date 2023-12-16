export async function getData() {
  const res = await fetch("https://external-service.com/data", {
);

  return res.json();
}
