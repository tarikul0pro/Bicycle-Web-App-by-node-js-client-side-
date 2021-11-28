import { useEffect, useState } from "react"
import initializeFirebaseApp from "../Pages/Firebase/Firebase.init.js"
import {
    getAuth, createUserWithEmailAndPassword, signOut, onAuthStateChanged, signInWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup,
} from "firebase/auth";

initializeFirebaseApp()

const useFirebase = () => {
    const [admin, setAdmin] = useState(false)
    const [user, setUser] = useState({})
    console.log(user);
    const [isLoading, setIsLoading] = useState(true);
    const [authError, setAuthError] = useState('');
    const auth = getAuth();


    const [error, setError] = useState(" ");
    const [email, SetEmail] = useState(" ");
    const [password, SetPassword] = useState(" ");
    const [name, SetName] = useState(" ");
    const googleProvider = new GoogleAuthProvider();

    const createUser = (email, password, name) => {
        console.log(name, email, password)
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                const newUser = { email, displayName: name };
                setUser(newUser);

                // save user to database
                saveUser(email, name, "POST");

                // send name to firebase
                updateProfile(auth.currentUser, {
                    displayName: name,
                })
                    .then(() => { })
                    .catch((error) => {
                        setError(error.message);
                    });
                // history.replace("/");
                setError("");
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => setIsLoading(false));
    };



    const setUserName = () => {
        updateProfile(auth.currentUser, {
            displayName: name
        }).then(() => { })
            .catch((error) => {
                setError(error.message);
            });
    }

    const handleSubmitForm = event => {
        event.preventDefault();

        console.log(email, password);

        createUserWithEmailAndPassword(auth, email, password)
        saveUser(user?.email, user?.displayName, "POST")

            .then(result => {
                setUser(result?.user);
                setUserName();
            })
            .catch((err) => {
                setError(err.message)
            })
    };

    const loginUser = (email, password, location, history) => {
        setIsLoading(true);
        console.log(email, password);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(' hello ');
                const destination = location?.state?.from || '/';
                history.replace(destination);
                setAuthError('');
            })
            .catch((error) => {
                setAuthError(error.message);
                console.log('kmon aso');

            })
            .finally(() => setIsLoading(false));


    }


    const signInWithGoogle = (location, history) => {
        setIsLoading(true);
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                setUser(user)
                console.log(user);
                saveUser(user?.email, user?.displayName, "PUT");
                setAuthError('');
                const destination = location?.state?.from || '/';
                history.replace(destination);
            })
            .catch((error) => {
                setAuthError(error.message);
            })
            .finally(() => setIsLoading(false));

    }

    useEffect(() => {
        fetch(`https://nameless-badlands-61718.herokuapp.com/checkAdmin/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                if (data?.role === 'admin') {
                    setAdmin(true)

                }
            })
    }, [user])

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {

                setUser(user)
            } else {
                setUser({})
            }
            setIsLoading(false);

        });
        return () => unsubscribe;
    }, [auth])



    const logOut = () => {
        setIsLoading(true);

        signOut(auth).then(() => {

        }).catch((error) => {

        })
            .finally(() => setIsLoading(false));


    }
    const saveUser = (email, displayName, method) => {
        const user = { email, displayName };
        console.log(user);
        fetch('https://nameless-badlands-61718.herokuapp.com/users', {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => { })
    }


    // get user name
    const getUserName = (event) => {
        SetName(event.target.value);
    };
    // get user email
    const getUserEmail = (event) => {
        SetEmail(event.target.value);
    };
    // get user password  
    const getUserPassword = (event) => {
        SetPassword(event.target.value);
    };

    return {
        user,
        isLoading,
        authError,
        signInWithGoogle,
        setError,
        SetName,
        SetPassword,
        SetEmail,
        loginUser,
        logOut,
        error,
        getUserPassword,
        getUserEmail,
        handleSubmitForm,
        getUserName,
        admin,
        createUser



    }

}
export default useFirebase