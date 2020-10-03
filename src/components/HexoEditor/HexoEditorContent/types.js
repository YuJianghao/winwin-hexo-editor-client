export class DirectionType {
  static hasType (t) {
    return Object.keys(DirectionType).includes(t)
  }
}
DirectionType.horizontal = 'horizontal'
DirectionType.vertical = 'vertical'
