import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, Button, Modal } from 'react-bootstrap';

class BucketListModal extends React.Component {
  constructor() {
    super();
    this.state = {
      bucketlist: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.myClose =  this.myClose.bind(this);
    this.mySave =  this.mySave.bind(this);
  }

  componentDidMount() {
    if (this.props.editing) {
      this.setState({ bucketlist: {...this.props.bucketlist}})
    }
  }

  handleChange(event) {
    let changeBucketlist = this.state.bucketlist;
    const field = event.target.name
    changeBucketlist[field] = event.target.value
    this.setState({
      bucketlist: changeBucketlist
    });
  }

  mySave(event) {
    event.preventDefault();
    this.props.editing ? this.props.editBucketlist(this.state.bucketlist) : this.props.saveBucketlist(this.state.bucketlist)
    this.props.closeModal()
  }

  myClose() {
    this.setState({
      bucketlist: {}
    });
    return this.props.closeModal()
  }

  render() {
    return (
      <div>
        <Modal show={this.props.showModal} onHide={this.myClose}>
          <Modal.Header closeButton>
            <Modal.Title className="modal-title">{this.props.editing ? "Edit BucketList" : "Add BucketList"}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="app-container">
          <form onSubmit={this.mySave} >
            <div className="form-group">
              <label htmlFor="Title" className="control-label">Title</label>
              <input type="text" value={this.state.bucketlist.title} name="title" className="form-control" placeholder="Enter Title" onChange={this.handleChange} required /> 
            </div>
            <div className="form-group">
              <label htmlFor="Description">Description</label>
              <textarea type="text" value={this.state.bucketlist.description} name="description" className="form-control"  placeholder="Description" onChange={this.handleChange} />
            </div>
            <div>
            
            <Modal.Footer>
              <ButtonToolbar>
                <Button
                  type="submit"
                  bsSize="small"
                  bsStyle="info">
                  Save
                </Button>
                <Button
                  bsStyle="warning"
                  bsSize="small"
                  onClick={this.myClose}>
                  Cancel
                </Button>
              </ButtonToolbar>
            </Modal.Footer>
            </div>
          </form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

BucketListModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  editing: PropTypes.bool.isRequired,
  saveBucketlist: PropTypes.func,
  editBucketlist: PropTypes.func,
  bucketlist: PropTypes.object
}

export default BucketListModal;
