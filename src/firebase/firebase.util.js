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

  /* 

  // Guest Login Refreshing
  if (snapShot.id === "wtDaqlaKbDgeRdIj2iWI8veVRfV2") {
    firestore
      .collection(`users`)
      .doc("wtDaqlaKbDgeRdIj2iWI8veVRfV2")
      .get()
      .then(async UserDoc => {
        const refreshedAtOld = toDateTime(UserDoc.data().refreshedAt.seconds)
        const hoursDifference = Math.abs(refreshedAtOld - new Date()) / 36e5
        if (hoursDifference > 24) {
          // delete all columns
          deleteCollection(firestore, "columns", 10)

          // delete all entries
          deleteCollection(firestore, "entries", 10)

          // Collect all further op in this batch action
          const batch = firestore.batch()

          // Refresh date
          batch.set(userRef, {
            ...UserDoc.data(),
            refreshedAt: new Date(),
          })

          // Create default columns
          const columnsRef = firestore.collection(
            `users/${snapShot.id}/columns`,
          )
          defaultColumns.forEach(column => {
            const newDocRef = columnsRef.doc()
            batch.set(newDocRef, column)
            console.log(column)
          })

          // Create default entries
          const entriesRef = firestore.collection(
            `users/${snapShot.id}/entries`,
          )
          defaultEntries.forEach(entries => {
            const newDocRef = entriesRef.doc()
            batch.set(newDocRef, entries)
            console.log(entries)
          })

          // Fire batch actions
          try {
            await batch.commit()
          } catch (error) {
            console.log(
              "error creating default columns and entries",
              error.message,
            )
          }
        }
      })
  }*/

  if (!snapShot.exists) {
    // when user not in database yet: create it + default database values (default template)
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

/* 
const deleteCollection = (db, collectionPath, batchSize) => {
  let collectionRef = db.collection(collectionPath)
  let query = collectionRef.orderBy("__name__").limit(batchSize)

  return new Promise((resolve, reject) => {
    deleteQueryBatch(db, query, batchSize, resolve, reject)
  })
}

const deleteQueryBatch = (db, query, batchSize, resolve, reject) => {
  query
    .get()
    .then(snapshot => {
      // When there are no documents left, we are done
      if (snapshot.size === 0) {
        return 0
      }

      // Delete documents in a batch
      let batch = db.batch()
      snapshot.docs.forEach(doc => {
        batch.delete(doc.ref)
      })

      return batch.commit().then(() => {
        return snapshot.size
      })
    })
    .then(numDeleted => {
      if (numDeleted === 0) {
        resolve()
        return
      }

      // Recurse on the next process tick, to avoid
      // exploding the stack.
      process.nextTick(() => {
        deleteQueryBatch(db, query, batchSize, resolve, reject)
      })
    })
    .catch(reject)
}
*/

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
