import convertDataURLToBlob from './file'

export default async function resizeImageFile(file: File, maxSize = 512): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const image = new Image()
      image.src = e.target.result as string
      image.onload = () => {
        const canvas = document.createElement('canvas')

        let { width, height } = image

        if (width > height) {
          if (width > maxSize) {
            height *= maxSize / width
            width = maxSize
          }
        } else if (height > maxSize) {
          width *= maxSize / height
          height = maxSize
        }

        canvas.width = width
        canvas.height = height
        canvas.getContext('2d').drawImage(image, 0, 0, width, height)

        const dataUrl = canvas.toDataURL()

        const blob = convertDataURLToBlob(dataUrl)

        resolve(blob)
      }
      image.onerror = () => reject()
    }
    reader.onerror = () => reject()
    reader.readAsDataURL(file)
  })
}
