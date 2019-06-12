export const convertCollectionsArrayToMap = collectionsArray =>
  collectionsArray.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = {
      routeName: encodeURI(collection.title.toLowerCase()),
      ...collection
    };
    return accumulator;
  }, {});
