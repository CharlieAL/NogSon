export async function getScrap() {
  const res = await fetch(`/api/scrap`)
  const scrap = await res.json()
  return scrap
}
