export function getAreaDiff(areaM, areaP, cantidad) {
  const areaPTotal = areaP * cantidad

  if (areaPTotal > areaM)
    return { error: `solo se pueden crear ${Math.floor(areaM / areaP)}` }
  const areaTotal = areaM - areaPTotal
  return { areaTotal }
}
