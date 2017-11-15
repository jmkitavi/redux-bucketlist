import React from 'react';
import axios from 'axios';
import { Accordion, AccordionItem } from 'react-sanfona';

class BucketListsPage extends React.Component {
  constructor() {
    super();
    this.state = { "pages": [], "bucketlists": [] };
    this.fetch = this.fetch.bind(this);
  }
  componentDidMount() {
    this.fetch();
  }

  fetch() {
    const config = {
      headers: { 'Authorization': `token ${localStorage.getItem("Authorization")}`}
    };
    const url = 'http://127.0.0.1:5000/bucketlists/';

    return axios.get(url, config)
      .then(response => {
        this.setState({
          pages: response.data.pages,
          bucketlists: response.data.bucketlists
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="container">
        <Accordion className="list-group" >
          {this.state.bucketlists.map(function (bucket) {
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

export default BucketListsPage;
