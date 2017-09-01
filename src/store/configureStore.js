import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import app from '../reducer'
const store = null

export default function configureStore () {
  if (!store) {
    console.log('Store is created')
    store = createStore(app, applyMiddleware(thunk))
  }
  return store
}
