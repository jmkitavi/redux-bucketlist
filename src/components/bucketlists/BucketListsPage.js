import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import moment from 'moment';
import { Button, ButtonToolbar } from 'react-bootstrap';

import * as bucketlistActions from '../../actions/bucketlistActions';
import CreateBucketList from './CreateBucketList';
import EditBucketList from './EditBucketList';

class BucketListsPage extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      showEditModal: false,
      editBucketlist: {}
    };
    this.saveBucketlist = this.saveBucketlist.bind(this)
    this.editBucketlist = this.editBucketlist.bind(this)
    this.deleteBucketlist = this.deleteBucketlist.bind(this)
    this.closeModal = this.closeModal.bind(this);
    this.renderCreateModal = this.renderCreateModal.bind(this);
    this.openAdd = this.openAdd.bind(this);
    this.openEdit = this.openEdit.bind(this);
  }

  componentDidMount() {
    this.props.actions.fetchBucketlists();
  }

  saveBucketlist(bucketlist) {
    this.props.actions.saveBucketlist(bucketlist).then((response) => {
    })
  }

  editBucketlist(bucketlist) {
    this.props.actions.editBucketlist(bucketlist)
  }

  deleteBucketlist(bucketlist) {
    this.props.actions.deleteBucketlist(bucketlist)
  }

  closeModal() {
    this.setState({
      showModal: false,
      showEditModal: false
    })
  }

  openAdd() {
    this.setState({showModal: true })
  }

  openEdit(bucketlist) {
    this.setState({
      showEditModal: true,
      editBucketlist: bucketlist
    })
  }

  renderCreateModal() {
    return (
      <CreateBucketList showModal={this.state.showModal} closeModal={this.closeModal} saveBucketlist={this.saveBucketlist}/>
    );
  }

  renderEditModal() {
    return (
      <EditBucketList showModal={this.state.showEditModal} closeModal={this.closeModal} editFunc={this.editBucketlist} editBucketlist={this.state.editBucketlist}/>
    );
  }

  render() {
    return (
      <div>
        <h1>Bucketlists</h1>
        <Button
          bsStyle="primary"
          bsSize="small"
          onClick={() => this.openAdd()}>
          Add BucketList
        </Button>
        { this.renderCreateModal() }
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Created</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {this.props.bucketlists.slice(0).reverse().map((bucketlist) =>
              <tr key={bucketlist.bucketlist_id}>
                <td>{bucketlist.title}</td>
                <td>{moment(bucketlist.date_created).format('ll')}</td>
                <td>
                  <Button
                      bsStyle="info"
                      bsSize="small"
                      onClick={() => console.log("View Items", bucketlist)}>
                      View Items
                  </Button>
                </td>
                <td>
                  <ButtonToolbar>
                    <Button
                        bsStyle="warning"
                        bsSize="small"
                        onClick={() => this.openEdit(bucketlist)}>
                        Edit
                    </Button>
                    <Button
                        bsStyle="danger"
                        bsSize="small"
                        onClick={() => this.deleteBucketlist(bucketlist)}>
                        Delete
                    </Button>
                  </ButtonToolbar>
                </td>
              </tr>
            )}
            {this.state.showEditModal &&
              this.renderEditModal()
            }
          </tbody>
        </table>
      </div>
    );

  }
}

// Props Validation
BucketListsPage.propTypes = {
  bucketlists: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

// mapping state to props
function mapStateToProps(state, ownProps) {
  return {
    bucketlists: state.bucketlists
  };
}

// mapping actions to props
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(bucketlistActions, dispatch)
  };
}

// connect to redux
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BucketListsPage));
