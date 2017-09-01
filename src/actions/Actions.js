import {
  UPDATE_TASK_VALUE,
  SAVE_TASK,
  DELETE_TASK,
  TOGGLE_COMPLETE_TASK,
  LOADING,
  FETCHED_TASK
} from './types'
import configureStore from '../store/configureStore'
import firebase from 'firebase'
import _ from 'lodash'

export function updateTaskValue ({ prop, value }) {
  console.log('this is update')
  return {
    type: UPDATE_TASK_VALUE,
    payload: { prop, value }
  }
}

export function saveTaskValue ({ id, complete, textValue }) {
  console.log('this is save action ', { id, complete, textValue })
  return (dispatch, getState) => {
    dispatch({
      type: LOADING
    })

    var taskListRef = firebase.database().ref('taskDataStore')
    var taskRef = taskListRef.push()
    taskRef
      .set({ id: Date.now(), complete: false, textValue: textValue })
      .then(() => getTask(dispatch))
      .catch(e => {
        console.error(e)
      })
  }
}

const getTask = dispatch => {
  firebase.database().ref(`/taskDataStore`).on('value', snapshot => {
    const newTasks = _.map(snapshot.val(), (key, index) => {
      return key
    })
    dispatch({
      type: FETCHED_TASK,
      payload: newTasks
    })
  })
}

export function deleteTask (value) {
  console.log('Delete Action', value.id)
  return (dispatch, getState) => {
    dispatch({
      type: LOADING
    })

    const { tasks } = getState().task
    console.log('getting state', tasks)

    const newTaskDataStore = tasks.filter(t => {
      console.log(t)
      return t.id !== value.id
    })
    console.log('getting new state', newTaskDataStore)

    firebase
      .database()
      .ref('taskDataStore')
      .set(newTaskDataStore)
      .then(() => getTask(dispatch))

    console.log('Deleted!')
  }
}

export function toggleComplete (value) {
  console.log('Switch Action', value.id)
  return (dispatch, getState) => {
    dispatch({
      type: LOADING
    })

    const { tasks } = getState().task
    console.log('getting state for switch', tasks)

    const temp = tasks.map(t => {
      if (value.id !== t.id) return t
      return { ...t, complete: !t.complete }
    })

    console.log('getting new state for switch', temp)
    firebase
      .database()
      .ref('taskDataStore')
      .set(temp)
      .then(() => getTask(dispatch))

    console.log('Switch!')
  }
}

export function fetchTaskList () {
  return (dispatch, getState) => {
    dispatch({
      type: LOADING
    })
    getTask(dispatch)
  }
}
