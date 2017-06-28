import React, { Component } from 'react';
import { gql, graphql, compose } from 'react-apollo';

class NewStatusUpdate extends Component {
  state = {
    redirectToReferrer: false,
    crossingId: '',
    statusId: ''
  }

  handleCrossingChange(e) {
    this.setState({crossingId: e.target.value});
  }

  handleStatusChange(e) {
    this.setState({statusId: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.mutate({
      variables: { statusId: this.state.statusId, crossingId: this.state.crossingId, authorId: 1 }
    })
      .then(({ data }) => {
        console.log('got data', data);
      }).catch((error) => {
        console.log('there was an error sending the query', error);
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <select name="select-crossing" value={this.state.crossingId} onChange={this.handleCrossingChange.bind(this)}>
          {this.props.data.loading ? null : this.props.data.allCrossings.edges.map((crossing) =>
            <option key={crossing.node.id} value={crossing.node.id}>{crossing.node.name}</option>
          )}
        </select>
        <select name="select-status" value={this.state.statusId} onChange={this.handleStatusChange.bind(this)}>
          {this.props.data.loading ? null : this.props.data.allStatuses.nodes.map((status) =>
            <option key={status.id} value={status.id}>{status.name}</option>
          )}
        </select>
        <input type="submit"/>
      </form>
    );
  }
}

const createStatusUpdate = gql`
  mutation($statusId: Int!, $crossingId: Int!, $authorId: Int!) {
    createStatusUpdate(input: {statusUpdate: 
      {
        statusId: $statusId,
        crossingId: $crossingId,
        authorId: $authorId
      }
    }) {
      statusUpdate {
        id
      }
    }
  }
`;

const getDropdownData = gql`
  {
    allCrossings {
      edges {
        node {
          id
          name
        }
      }
    }
    allStatuses {
      nodes {
        id,
        name
      }
    }
  }
`;

export default compose(graphql(createStatusUpdate),graphql(getDropdownData))(NewStatusUpdate);