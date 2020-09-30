export class HexoCoreError extends Error {
  constructor (code, message, data) {
    super(process.env.DEV ? `${message}\n${data}` : message)
    this.code = code
    this.data = data
    Error.captureStackTrace(this)
  }
}
HexoCoreError.INVALID_ID = 'INVALID_ID'
HexoCoreError.LOAD_ERROR = 'LOAD_ERROR'
HexoCoreError.ACTION_ERROR = 'ACTION_ERROR'
