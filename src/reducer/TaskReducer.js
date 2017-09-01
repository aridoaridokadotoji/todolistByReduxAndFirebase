import {
  UPDATE_TASK_VALUE,
  SAVE_TASK,
  DELETE_TASK,
  TOGGLE_COMPLETE_TASK,
  FETCHED_TASK,
  LOADING
} from '../actions/types'

const INITIAL_STATE = {
  textValue: '',
  complete: false,
  id: '',
  tasks: [],
  loading: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_TASK_VALUE:
      return { ...state, [action.payload.prop]: action.payload.value }

    case SAVE_TASK:
      console.log(action.payload)
      return {
        ...state,
        value: '',
        id: Date.now(),
        tasks: [...state.tasks, action.payload],
        render: true
      }

    case DELETE_TASK:
      return { ...state, tasks: action.payload }

    case TOGGLE_COMPLETE_TASK:
      return { ...state, tasks: action.payload }

    case FETCHED_TASK:
      console.log('FETCHED_TASK', action.payload)
      return {
        ...state,
        tasks: action.payload,
        textValue: '',
        loading: false
      }

    case LOADING:
      console.log('this is in reducer loading')
      return { ...state, loading: true }

    default:
      return state
  }
}
