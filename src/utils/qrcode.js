import * as QRCode from 'qrcode'
export async function genQRCode (text) {
  return QRCode.toDataURL(text)
}
