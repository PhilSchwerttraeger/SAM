import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"

const config = {
  apiKey: "AIzaSyDxjBTFuIqOGUzSPqnbFjNOrbtBp-2IJDI",
  authDomain: "generic-webshop.firebaseapp.com",
  databaseURL: "https://generic-webshop.firebaseio.com",
  projectId: "generic-webshop",
  storageBucket: "generic-webshop.appspot.com",
  messagingSenderId: "1067906298216",
  appId: "1:1067906298216:web:554df97f518bea793ba6dd",
  measurementId: "G-QQFR9SW5VZ",
}

firebase.initializeApp(config)

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return

  const userRef = firestore.doc(`users/${userAuth.uid}`)
  const snapShot = await userRef.get()

  // when user not in database: create it
  if (!snapShot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      })
    } catch (error) {
      console.log("error creating user", error.message)
    }
  }

  return userRef
}

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd,
) => {
  const collectionRef = firestore.collection(collectionKey)
  const batch = firestore.batch()
  // Difference forEach and map: forEach does not return array
  objectsToAdd.forEach(object => {
    // Tell firestore to return/generate new empty document (with id)
    // To make fixed-name document: collectionRef.doc("Name") or collectonRef.doc(object.title)
    const newDocRef = collectionRef.doc()
    batch.set(newDocRef, object)
    console.log(newDocRef)
  })
  return await batch.commit()
}

// Array to object
export const convertCollectionsSnapshotToMap = collections => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data()

    // create object with enhanced properties
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    }
  })

  //console.log(transformedCollection)

  //
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection
    return accumulator
  }, {})
}

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: "select_account" })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
