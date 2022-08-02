import { createContext, useEffect, useState } from "react";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged
} from "firebase/auth"
import { auth } from "../firebase-config"

export const UserContext = createContext()

export function UserContextProvider(props) {

    const [currentUser, setCurrentUser] = useState()
    const [loadingData, setLoadingData] = useState(true)

    const signUp = (email, pwd) => {
        createUserWithEmailAndPassword(auth, email, pwd)
    }

    const signIn = (email, pwd) => {
        signInWithEmailAndPassword(auth, email, pwd)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setCurrentUser(currentUser)
            setLoadingData(false)
        })
        return unsubscribe
    }, [])

    // modal
    const [modalState, setModalState] = useState({
        signUpModal: false,
        signInmodal: false
    })

    const toggleModals = modal => {
        if (modal === 'signin') {
            setModalState({
                signUpmodal: false,
                signInmodal: true
            })
        } if (modal === 'signup') {
            setModalState({
                signUpmodal: true,
                signInmodal: false
            })
        } if (modal === 'close') {
            setModalState({
                signUpmodal: false,
                signInmodal: false
            })
        }
    }

    return (
        <UserContext.Provider value={{ modalState, toggleModals, signUp, currentUser, signIn }}>
            {!loadingData && props.children}
        </UserContext.Provider>
    )

}