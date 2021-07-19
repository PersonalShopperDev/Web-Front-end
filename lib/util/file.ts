export default function convertDataURLToBlob(dataURL: string) {
  const base64Marker = ';base64,'

  if (!dataURL.includes(base64Marker)) {
    const parts = dataURL.split(',')
    const contentType = parts[0].split(':')[1]
    const raw = parts[1]
    return new Blob([raw], {
      type: contentType,
    })
  }

  const parts = dataURL.split(base64Marker)
  const contentType = parts[0].split(':')[1]
  const raw = window.atob(parts[1])

  const rawLength = raw.length

  const uInt8Array = new Uint8Array(rawLength)

  for (let i = 0; i < rawLength; i++) {
    uInt8Array[i] = raw.charCodeAt(i)
  }

  return new Blob([uInt8Array], {
    type: contentType,
  })
}
