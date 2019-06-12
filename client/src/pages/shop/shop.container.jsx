import React, { useEffect } from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';

import {
  fetchCollectionsStart,
  fetchCollectionsFailure,
  fetchCollectionsSuccess
} from '../../redux/shop/shop.actions';
import { convertCollectionsArrayToMap } from './shop.utils';

import ShopPage from './shop.component';

const GET_COLLECTIONS = gql`
  {
    collection {
      title
      id
      items {
        id
        name
        imageUrl
        price
      }
    }
  }
`;

const ShopPageQuery = ({
  fetchCollectionsStart,
  fetchCollectionsSuccess,
  fetchCollectionsFailure,
  ...props
}) => {
  useEffect(() => {
    fetchCollectionsStart();
  }, [fetchCollectionsStart]);

  return (
    <Query query={GET_COLLECTIONS}>
      {({ loading, error, data }) => {
        if (loading) return null;
        if (error) {
          fetchCollectionsFailure(error);
        }

        if (data) {
          fetchCollectionsSuccess(
            convertCollectionsArrayToMap(data.collection)
          );
        }

        return <ShopPage {...props} />;
      }}
    </Query>
  );
};

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
  fetchCollectionsFailure: error => dispatch(fetchCollectionsFailure(error)),
  fetchCollectionsSuccess: collections =>
    dispatch(fetchCollectionsSuccess(collections))
});

export default connect(
  null,
  mapDispatchToProps
)(ShopPageQuery);
