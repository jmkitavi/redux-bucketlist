import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Accordion, AccordionItem } from 'react-sanfona';
import * as bucketlistActions from '../../actions/bucketlistActions';


class BucketListsPage extends React.Component {
  componentDidMount() {
    this.props.dispatch(bucketlistActions.fetchBucketlists());
  }

  render() {
    console.log(this.props)
    if (!this.props.bucketlists) {
      return (
        <div>Not found</div>
      )
    }
    return (
      <div className="container">
        <Accordion className="list-group" >
          {this.props.bucketlists.map(function (bucket) {
            return (
              <AccordionItem title={bucket.title} key={bucket.bucketlist_id} className="list-group-item" expandedClassName="active text-center">
                <div className="text-justify">
                  <hr />
                  <div>
                    Description: {bucket.description}
                    <br />
                    Date Created: {bucket.date_created}
                    <br />
                    Items: {bucket.items.length}
                  </div>
                </div>
              </AccordionItem>
            );
            })}
        </Accordion>
      </div>
    );
  }
}

BucketListsPage.PropTypes = {
  bucketlists: PropTypes.array.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    bucketlists: state.bucketlists
  }
}

export default connect(mapStateToProps)(BucketListsPage);
