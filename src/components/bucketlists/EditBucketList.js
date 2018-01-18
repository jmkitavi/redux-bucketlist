import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, Button, Modal } from 'react-bootstrap';

class EditBucketList extends React.Component {
  constructor() {
    super();
    this.state = {
      editBucketlist: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.myClose =  this.myClose.bind(this);
    this.myEdit =  this.myEdit.bind(this);
  }

  componentDidMount() {
    this.setState({ editBucketlist: {...this.props.editBucketlist}})
  }

  handleChange(name, event) {
    let changeBucketlist = this.state.editBucketlist;
    changeBucketlist[name] =  event.target.value;
    this.setState({
      editBucketlist: changeBucketlist
    });
  }

  myClose() {
    this.setState({editBucketlist: {}});
    return this.props.closeModal()
  }

  myEdit(event) {
    event.preventDefault();
    this.props.editFunc(this.state.editBucketlist)
    this.props.closeModal()
  }

  render() {
    return (
      <div>
        <Modal show={this.props.showModal} onHide={this.myClose}>
          <Modal.Header closeButton>
            <Modal.Title className="modal-title">Edit BucketList</Modal.Title>
          </Modal.Header>
          <Modal.Body className="app-container">
            <form onSubmit={this.myEdit} >
              <div className="form-group">
                <label htmlFor="Title" className="control-label">Title</label>
                <input value={this.state.editBucketlist.title} type="title" name="title" className="form-control" placeholder="Enter Title" onChange={(event) => this.handleChange("title", event)} required /> 
              </div>
              <div className="form-group">
                <label htmlFor="Description">Description</label>
                <textarea value={this.state.editBucketlist.description} name="description" className="form-control"  placeholder="Description" onChange={(event) => this.handleChange("description", event)} />
              </div>

              <Modal.Footer>
                <ButtonToolbar>
                  <Button
                    type="submit"
                    bsSize="small"
                    bsStyle="info">
                    Edit
                  </Button>
                  <Button
                    bsStyle="warning"
                    bsSize="small"
                    onClick={this.myClose}>
                    Cancel
                  </Button>
                </ButtonToolbar>
              </Modal.Footer>
            </form>
          </Modal.Body>
          
        </Modal>
      </div>
    );
  }
}

EditBucketList.PropTypes = {
  showModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  editFunc: PropTypes.func.isRequired,
  editBucketlist: PropTypes.object.isRequired
}

export default EditBucketList;
