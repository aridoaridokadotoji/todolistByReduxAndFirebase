import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  Button,
  AsyncStorage,
  Switch
} from 'react-native'
import {
  updateTaskValue,
  saveTaskValue,
  deleteTask,
  toggleComplete,
  fetchTaskList
} from '../actions/Actions'
import { connect } from 'react-redux'

class Main extends Component {
  constructor () {
    super()
    this.state = {
      textValue: '',
      complete: false,
      id: '',
      tasks: []
    }
  }

  componentWillMount () {
    this.props.fetchTaskList()
  }

  handleTextValueChange (value) {
    console.log('Change text')
    this.props.updateTaskValue({ prop: 'textValue', value })
  }

  handleTextValueSave () {
    console.log('Save!')
    if (!this.props.textValue) return
    const { id, complete, textValue } = this.props
    console.log({ id, complete, textValue })
    this.props.saveTaskValue({ id, complete, textValue })
  }

  handleSwitch (value) {
    console.log('Switch Main!')
    this.props.toggleComplete(value)
  }

  handleDelete (value) {
    console.log('Delete Main!')
    this.props.deleteTask(value)
  }

  renderTasks () {
    const listItem = this.props.tasks.map((value, index) => {
      const { id, textValue, complete } = value
      return (
        <View style={styles.container} key={index}>
          <Switch
            value={complete}
            onValueChange={e => this.handleSwitch(value)}
          />
          <Text key={index} style={complete && styles.complete}>
            {textValue}
          </Text>
          <Button title='Delete' onPress={p => this.handleDelete(value)} />
        </View>
      )
    })
    return listItem
  }

  render () {
    return (
      <View>
        <View style={styles.container}>
          <TextInput
            style={{ flex: 1 }}
            value={this.props.textValue}
            onChangeText={this.handleTextValueChange.bind(this)}
          />
          <Button title='Add' onPress={this.handleTextValueSave.bind(this)} />
        </View>

        <View>
          {this.renderTasks()}
        </View>
      </View>
    )
  }
}

const styles = {
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 15
  },
  complete: {
    textDecorationLine: 'line-through'
  }
}

const mapStateToProps = state => {
  console.log(state)
  const { textValue, tasks, id, complete, loading } = state.task
  return { textValue, tasks, id, complete, loading }
}

export default connect(mapStateToProps, {
  updateTaskValue,
  saveTaskValue,
  deleteTask,
  toggleComplete,
  fetchTaskList
})(Main)
