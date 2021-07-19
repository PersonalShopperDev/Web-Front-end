import convertDataURLToBlob from './file'

export default async function resizeImageFile(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const image = new Image()
      image.src = e.target.result as string
      image.onload = () => {
        const canvas = document.createElement('canvas')
        const maxSize = 1024

        let { width, height } = image

        if (width > height) {
          if (width > maxSize) {
            width = maxSize
            height *= maxSize / width
          }
        } else if (height > maxSize) {
          height = maxSize
          width *= maxSize / height
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
