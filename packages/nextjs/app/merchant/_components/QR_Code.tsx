import React from 'react'
import { useQRCode } from 'next-qrcode'
 
function QR_Code() {
  const { Canvas } = useQRCode()
 
  return (
    <Canvas
      text={'address:0x06e4D2772CF81B7D7BC60001F3EC581528b08517fCc842ce7c4515fd51d37723'}
      options={{
        type: 'image/jpeg',
        quality: 0.3,
        errorCorrectionLevel: 'M',
        margin: 3,
        scale: 4,
        width: 200,
        color: {
          dark: '#010599FF',
          light: '#FFBF60FF',
        },
      }}
    />
  )
}
 
export default QR_Code