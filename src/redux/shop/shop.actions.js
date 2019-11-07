import ShopActionTypes from "./shop.types"
import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.util"

// Common pattern for async fetching in redux: Start, Success, Failure
export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START,
})

export const fetchCollectionsSuccess = collectionsMap => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap,
})

export const fetchCollectionsFailure = errorMessage => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage,
})

export const fetchCollectionsStartAsync = () => {
  return dispatch => {
    const collectionRef = firestore.collection("collections")
    dispatch(fetchCollectionsStart())

    // alternative: Promise with collectionRef.get().then(snapshot => ...)
    // CAVEAT: new data only when remounting shop (because not subscription anymore), just one API-call now
    // 2nd alternative: fetch"https://firestore.googleapis.com/v1/...
    collectionRef
      .get()
      .then(snapshot => {
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
        dispatch(fetchCollectionsSuccess(collectionsMap))
      })
      .catch(error => dispatch(fetchCollectionsFailure(error.message)))
  }
}
