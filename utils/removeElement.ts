export const removeElement = <T extends { id: number | string }>(array: T[], element: T): boolean => {
  /**
     * return true if element in list and remove it
     * return false if no element in list
     */
  const index = array.findIndex(el => el.id === element.id)
  if (index > -1) {
    array.splice(index, 1)
    return true
  }
  return false
}
