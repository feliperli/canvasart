const RECORDED = []

const canvasUtils = new CanvasUtils()
const originalContext = document.querySelector('#original').getContext('2d')
const resultContext = document.querySelector('#result').getContext('2d')

const loadImage = async () => {
  const baseImage = new Image()
  baseImage.src = '../images/earthling.jpg'

  return new Promise((resolve) => {
    baseImage.onload = () => {
      const { width, height } = baseImage
  
      originalContext.canvas.height = height
      originalContext.canvas.width = width
      resultContext.canvas.height = height
      resultContext.canvas.width = width

      originalContext.drawImage(baseImage, 0, 0, width, height)
  
      const imageInfo = originalContext.getImageData(0, 0, width, height)

      resolve(imageInfo)
    }
  })
}

const init = async (imageInfo) => {
  const splitted = canvasUtils.splitRGB(imageInfo.data)

  plotResult(imageInfo.data, splitted, RECORDED)
}

const plotResult = (imageData) => {
  const pixelMatrix = canvasUtils.toMatrix(imageData, originalContext.canvas.width)

  const resultMatrix = applySignal(pixelMatrix)

  canvasUtils.plotMatrix({ matrix: resultMatrix, context: resultContext })
}

const multiply = (color, signal) => {
  return color.map((v, i) => {
    return v * (signal[i] || 1)
  })
}

const applySignal = (matrix) => {
  const res = eval(document.querySelector('.code').value)

  return res
}

(async () => {
  const imageInfo = await loadImage()

  document.querySelector('.start').addEventListener('click', async () => {
    init(imageInfo)
  })
})()