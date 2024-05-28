export async function getMainfestVersion() {
  return await fetch('/mainfest.json').then((res) => res.json());
}
