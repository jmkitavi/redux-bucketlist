import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import moment from 'moment';
import { Button, ButtonToolbar, Badge } from 'react-bootstrap';

import * as bucketlistActions from '../../actions/bucketlistActions';
import CreateBucketList from './CreateBucketList';
import EditBucketList from './EditBucketList';
import ViewItems from './ViewItems';

class BucketListsPage extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      showEditModal: false,
      showViewModal: false,
      editBucketlist: {},
      viewBucketlist: {}
    };
    this.saveBucketlist = this.saveBucketlist.bind(this)
    this.editBucketlist = this.editBucketlist.bind(this)
    this.deleteBucketlist = this.deleteBucketlist.bind(this)
    this.closeModal = this.closeModal.bind(this);
    this.renderCreateModal = this.renderCreateModal.bind(this);
    this.openAdd = this.openAdd.bind(this);
    this.openEdit = this.openEdit.bind(this);
    this.openView = this.openView.bind(this);
  }

  componentDidMount() {
    this.props.actions.fetchBucketlists();
  }

  saveBucketlist(bucketlist) {
    this.props.actions.saveBucketlist(bucketlist)
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
      showViewModal: false,
      showEditModal: false
    })
  }

  openAdd() {
    this.setState({showModal: true })
  }

  openView(bucketlist) {
    this.setState({
      showViewModal: true,
      viewBucketlist: bucketlist.bucketlist_id
    })
  }

  openEdit(bucketlist) {
    this.setState({
      showEditModal: true,
      editBucketlist: bucketlist
    })
  }

  renderCreateModal() {
    return (
      <CreateBucketList
        showModal={this.state.showModal}
        closeModal={this.closeModal}
        saveBucketlist={this.saveBucketlist}/>
    );
  }

  renderViewModal() {
    const bucketlist = this.props.bucketlists.find(bucketlist => bucketlist.bucketlist_id === this.state.viewBucketlist)
    return (
      <ViewItems
        showModal={this.state.showViewModal}
        closeModal={this.closeModal}
        viewBucketlist={bucketlist}
        deleteItem={this.deleteItem}/>
    )
  }

  renderEditModal() {
    return (
      <EditBucketList
        showModal={this.state.showEditModal}
        closeModal={this.closeModal}
        editFunc={this.editBucketlist}
        editBucketlist={this.state.editBucketlist}/>
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
          <span className="glyphicon glyphicon-plus"></span> Add BucketList
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
                <td>{bucketlist.title} <Badge>{ bucketlist.items.length}</Badge></td>
                <td>{moment(bucketlist.date_created).format('ll')}</td>
                <td className="pull-right">
                  <ButtonToolbar>
                    <Button
                        bsStyle="info"
                        bsSize="small"
                        onClick={() => this.openView(bucketlist)}>
                        <span className="glyphicon glyphicon-eye-open"></span> View Items
                    </Button>
                    <Button
                        bsStyle="warning"
                        bsSize="small"
                        onClick={() => this.openEdit(bucketlist)}>
                        <span className="glyphicon glyphicon-pencil"></span> Edit
                    </Button>
                    <Button
                        bsStyle="danger"
                        bsSize="small"
                        onClick={() => this.deleteBucketlist(bucketlist)}>
                        <span className="glyphicon glyphicon-trash"></span> Delete
                    </Button>
                  </ButtonToolbar>
                </td>
              </tr>
            )}
            {this.state.showEditModal &&
              this.renderEditModal()
            }
            { this.state.showViewModal &&
              this.renderViewModal()
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
export default connect(mapStateToProps, mapDispatchToProps)(BucketListsPage);
