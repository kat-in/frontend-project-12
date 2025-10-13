import Add from '../components/chat/modal/Add'
import Remove from '../components/chat/modal/Remove'
import Rename from '../components/chat/modal/Rename'

export default (mode) => {
  const components = {
    add: Add,
    remove: Remove,
    rename: Rename,
  }

  return components[mode]
}
