import Add from './Add'
import Remove from './Remove'
import Rename from './Rename'

export default (mode) => {
  const components = {
    add: Add,
    remove: Remove,
    rename: Rename,
  }

  return components[mode]
}
