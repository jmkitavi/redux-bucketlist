import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import moment from 'moment';
import toastr from 'toastr';
import { Button, ButtonToolbar } from 'react-bootstrap';

import * as bucketlistActions from '../../actions/bucketlistActions';
import CreateBucketList from './CreateBucketList';

class BucketListsPage extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false
    };
    this.deleteBucketlist = this.deleteBucketlist.bind(this)
    this.saveBucketlist = this.saveBucketlist.bind(this)
    this.closeModal = this.closeModal.bind(this);
    this.open = this.open.bind(this);
  }

  componentDidMount() {
    this.props.actions.fetchBucketlists();
  }

  saveBucketlist(bucketlist) {
    console.log("BucketListPage", bucketlist)
    this.props.actions.saveBucketlist(bucketlist).then(() => {
      toastr.success(`BucketList ${bucketlist.title} added successfully`)
    })
  }

  deleteBucketlist(bucketlist) {
    this.props.actions.deleteBucketlist(bucketlist.bucketlist_id).then(() => {
      toastr.success(`BucketList ${bucketlist.title} deleted successfully`)
    })
  }

  closeModal() {
    this.setState({showModal: false})
  }

  open() {
    this.setState({showModal: true })
  }

  render() {
    const { bucketlists } = this.props;
    let close = () => this.closeModal()

    return (
      <div>
        <h1>Bucketlists</h1>
        <Button
          bsStyle="primary"
          bsSize="small"
          onClick={() => this.open()}>
          Add BucketList
        </Button>
        <CreateBucketList showModal={this.state.showModal} closeModal={close} saveBucketlist={this.saveBucketlist}/>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Created</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {bucketlists.slice(0).reverse().map((bucketlist) =>
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
                        onClick={() => console.log("Edit Bucketlist", bucketlist)}>
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