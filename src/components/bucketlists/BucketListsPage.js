import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

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
                console.log(response)
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
                <hr />
                {this.state.bucketlists.map(function (bucketlist) {
                    return <div>{bucketlist.title}</div>
                })}
            </div >
        );

    }
}

export default BucketListsPage;
