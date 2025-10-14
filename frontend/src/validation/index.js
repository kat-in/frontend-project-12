import addChannelSchema from './addChannelSchema'
import renameChannelSchema from './renameChannelSchema'
import loginSchema from './loginSchema'
import signupSchema from './signupSchema'

const validationSchema = (t, type, channels = [], modalData = {}) => {
  const schema = {
    add: addChannelSchema(t, channels),
    rename: renameChannelSchema(t, channels, modalData),
    login: loginSchema(t),
    signup: signupSchema(t),
  }
  return schema[type]
}

export default validationSchema
