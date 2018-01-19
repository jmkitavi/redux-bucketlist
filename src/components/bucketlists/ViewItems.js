import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Modal, Button, ButtonToolbar } from 'react-bootstrap';
import Toggle from 'react-bootstrap-toggle';


import * as itemActions from '../../actions/itemActions';


class ViewItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item_name: '',
      editing: false,
      editItem: {}
    }
    this.myClose =  this.myClose.bind(this);
    this.handleChange = this.handleChange.bind(this)
    this.renderItems =  this.renderItems.bind(this);
    this.saveItem = this.saveItem.bind(this)
    this.deleteItem = this.deleteItem.bind(this);
    this.toggleItem = this.toggleItem.bind(this);
    this.editItem = this.editItem.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.saveEdited = this.saveEdited.bind(this);
  }

  // handleChange event in form
  handleChange(name, event) {
    var change = {};
    change[name] =  event.target.value;
    this.setState(change);
  }

  // save new item
  saveItem(event) {
    event.preventDefault();
    const item = {
      item_name: this.state.item_name
    }
    this.props.actions.saveItem(item, this.props.viewBucketlist.bucketlist_id)
    this.setState({
      item_name: ''
    })
  }

  // update item on status toggle
  toggleItem(item) {
    const newItem = { ...item, status: !item.status }
    this.props.actions.editItem(newItem);
  }

  // on click to start editing
  editItem(item) {
    this.setState({
      item_name: item.item_name,
      editing: true,
      editItem: item
    })
  }

  // save edited data for item
  saveEdited(event) {
    event.preventDefault();
    const newItem = {...this.state.editItem, item_name: this.state.item_name}
    this.props.actions.editItem(newItem);
    this.cancelEdit()
  }

  // cancel starting to edit
  cancelEdit() {
    this.setState({
      item_name: '',
      editing: false,
      editItem: {}
    })
  }

  // delete item
  deleteItem(item) {
    this.props.actions.deleteItem(item);
  }

  // close modal
  myClose() {
    this.props.closeModal()
  }

  // showing all items
  renderItems(items) {
    if (items.length > 0) {
      return items.slice(0).reverse().map(item => 
        <tbody key={item.item_id}>
          <tr>
            <td>{item.item_name}</td>
            <td>
            <Toggle
              on={<div>Done <span className="glyphicon glyphicon-ok"></span></div>}
              off={<div>Pending <span className="glyphicon glyphicon-time"></span></div>}
              onstyle="success"
              offstyle="warning"
              active={item.status}
              onClick={() => this.toggleItem(item)}/>
            </td>
            <td className="pull-right">
              <ButtonToolbar>
                <Button
                  bsStyle="info"
                  bsSize="small"
                  onClick={() => this.editItem(item)}>
                  <span className="glyphicon glyphicon-pencil"></span>
                </Button>
                <Button
                  bsStyle="danger"
                  bsSize="small"
                  onClick={() => this.deleteItem(item)}>
                  <span className="glyphicon glyphicon-trash"></span>
                </Button>
              </ButtonToolbar>
            </td>
          </tr>
        </tbody>
      )
    } else {
      return <tbody>No Items for this BucketList</tbody>
    }
  }

  render() {
    return (
      <div>
        <Modal show={this.props.showModal} onHide={this.myClose}>
          <Modal.Header closeButton>
            <Modal.Title className="modal-title">{this.props.viewBucketlist.title}</Modal.Title>
            <hr/>
            <i>{this.props.viewBucketlist.description} </i>
          </Modal.Header>
          <Modal.Body className="app-container">
            <div>
              <form onSubmit={ this.state.editing ? this.saveEdited : this.saveItem }>
              {this.state.editing ? (
                <label className="control-label">Edit Item</label>
              ):(
                <label className="control-label">Add Item</label>
              )}
                <div className="input-group">
                  <input value={this.state.item_name} type="text" name="item_name" className="form-control" placeholder="Enter Item Name" onChange={this.handleChange.bind(this, "item_name")} required/>
                  <span className="input-group-btn">
                    {this.state.editing ? (
                      <div>
                        <button className="btn btn-info" type="submit"><span className="glyphicon glyphicon-pencil"></span> Edit</button>
                        <button className="btn btn-warning" onClick={this.cancelEdit}><span className="glyphicon glyphicon-remove"></span> Cancel</button>
                      </div>
                    ):(
                      <button className="btn btn-primary" type="submit"><span className="glyphicon glyphicon-plus"></span> Add</button>
                    )}
                  </span>
                </div>
              </form>
            </div>
            <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Status</th>
                </tr>
              </thead>
              { this.renderItems(this.props.viewBucketlist.items) }
            </table>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

ViewItems.propTypes = {
  showModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  viewBucketlist: PropTypes.object.isRequired,
  deleteItem: PropTypes.func.isRequired
}

// mapping actions to props
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(itemActions, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(ViewItems);
