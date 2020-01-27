import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"
import defaultColumns from "./defaultColumns"
import defaultEntries from "./defaultEntries"
import defaultUserData from "./defaultUserData"

const config = {
  apiKey: "AIzaSyAxXzuM3l6_AzNkGj5Zf4aEyEw0qqXf_Is",
  authDomain: "sam2-1337.firebaseapp.com",
  databaseURL: "https://sam2-1337.firebaseio.com",
  projectId: "sam2-1337",
  storageBucket: "sam2-1337.appspot.com",
  messagingSenderId: "462200892207",
  appId: "1:462200892207:web:4e2c7142a3cbd44896cfda",
  measurementId: "G-BNG1817REQ",
}

firebase.initializeApp(config)

export const createUserProfileDocument = async userAuth => {
  if (!userAuth) return

  const userRef = firestore.doc(`users/${userAuth.uid}`)
  const snapShot = await userRef.get()

  // when user not in database yet: create it + default database values (default template)
  if (!snapShot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    // Create default user properties
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...defaultUserData,
      })
    } catch (error) {
      console.log("error creating user", error.message)
    }

    // Collect all further op in this batch action
    const batch = firestore.batch()

    // Create default columns
    const columnsRef = firestore.collection(`users/${userAuth.uid}/columns`)
    defaultColumns.forEach(column => {
      const newDocRef = columnsRef.doc()
      batch.set(newDocRef, column)
      console.log(column)
    })

    // Create default entries
    const entriesRef = firestore.collection(`users/${userAuth.uid}/entries`)
    defaultEntries.forEach(entries => {
      const newDocRef = entriesRef.doc()
      batch.set(newDocRef, entries)
      console.log(entries)
    })

    // Fire batch actions
    try {
      await batch.commit()
    } catch (error) {
      console.log("error creating default columns and entries", error.message)
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

const toDateTime = secs => {
  var t = new Date()
  t.setTime(secs * 1000)
  return t
}

export const convertFirestoreDatesToJsDates = properties => {
  for (var subProperty in properties) {
    if (properties[subProperty].seconds) {
      properties[subProperty] = toDateTime(properties[subProperty].seconds)
    }
  }
  return properties
}

// Array to object
export const convertEntriesSnapshotToMap = entries => {
  const transformedEntries = entries.docs.map(doc => {
    var docProperties = doc.data()

    // convert all properties of "date" type (has property "seconds") to JS date format
    docProperties = convertFirestoreDatesToJsDates(docProperties)

    return {
      id: doc.id,
      ...docProperties,
    }
  })

  return transformedEntries.reduce((accumulator, entry) => {
    accumulator[entry.id] = entry
    return accumulator
  }, {})
}

// Array to object
export const convertColumnsSnapshotToMap = columns => {
  const transformedColumns = columns.docs.map(doc => {
    const { ...rest } = doc.data()
    return {
      id: doc.id,
      ...rest,
    }
  })

  //console.log(transformedCollection)

  return transformedColumns.reduce((accumulator, column) => {
    accumulator[column.id] = column
    return accumulator
  }, {})
}

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: "select_account" })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export const createFirestoreDate = jsDate => {
  const newDate = new firebase.firestore.Timestamp.fromDate(jsDate)
  return newDate
}

export default firebase
