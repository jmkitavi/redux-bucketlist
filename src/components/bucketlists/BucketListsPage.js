import React from 'react';
import PropTypes from 'prop-types';
import {browserHistory} from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import moment from 'moment';
import { Button } from 'react-bootstrap';

import * as bucketlistActions from '../../actions/bucketlistActions';

class BucketListsPage extends React.Component {
  constructor() {
    super();
    this.deleteBucketlist = this.deleteBucketlist.bind(this)
  }

  componentDidMount() {
    this.props.actions.fetchBucketlists();
  }

  deleteBucketlist(bucketlist_id) {
    this.props.actions.deleteBucketlist(bucketlist_id);
  }

  render() {
    const { bucketlists } = this.props;

    return (
      <div>
        <h1>Bucketlists</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Created</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {bucketlists.map(bucketlist =>
              <tr key={bucketlist.bucketlist_id}>
                <td>{bucketlist.title}</td>
                <td>{moment(bucketlist.date_created).format('ll')}</td>
                <td>
                <Button
                    bsStyle="danger"
                    bsSize="small"
                    onClick={() => this.deleteBucketlist(bucketlist.bucketlist_id)}>
                    Delete
                </Button>
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