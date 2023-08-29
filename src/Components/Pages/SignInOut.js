import React, { useState, useEffect } from 'react';
import { getAuthInstance, getFirestoreInstance, translateFirebaseError } from '../../Services/FirebaseService.js';

function SignInCreate(stripePromise) {
    const states = [
        "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
        "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
        "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine",
        "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
        "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
        "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
        "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
        "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia",
        "Washington", "West Virginia", "Wisconsin", "Wyoming"
    ];

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(true);
    const [inputErrors, setInputErrors] = useState({});
    const [authError, setAuthError] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [firebaseError, setFirebaseError] = useState('');

    useEffect(() => {
        setInputErrors({});
        setAuthError('');
    }, [isLoggingIn]);

    const toggleIsLoggingIn = () => {
        setIsLoggingIn(!isLoggingIn);
        setInputErrors({});
        setAuthError('');
    };

    const handleSetState = (state) => {
        setSelectedState(state);
        setInputErrors({ ...inputErrors, state: false });
        setIsDropdownOpen(false);
    };

    function isValidEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        return emailPattern.test(email);
    }


    const handleAuth = async () => {
        try {
            if (isLoggingIn) {
                await getAuthInstance().signInWithEmailAndPassword(email, password);
            } else {
                const data = {
                    fullName,
                    address: "None",
                    city: "None",
                    selectedState,
                    acyuId: 'None',
                    keys: [''],
                    currentChapter: 'None',
                };

                await getAuthInstance().createUserWithEmailAndPassword(email, password);

                const userdocref = getFirestoreInstance().collection("members").doc(getAuthInstance().currentUser.uid);
                await userdocref.set(data);
            }
        } catch (error) {
            setFirebaseError(error.code);
            window.error.showModal();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = {};
        if (!email) errors.email = true;

        if (!password) errors.password = true;
        if (!isLoggingIn && !fullName) errors.fullName = true;
        if (!selectedState) errors.state = true;

        setInputErrors(errors);

        if (Object.keys(errors).length === 0) {
            handleAuth();
        }
    };

    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-900 text-white'>
            <div className="mx-auto flex w-full max-w-sm flex-col gap-3 items-center">
                <div className="flex flex-col items-center">
                    <h1 className="text-3xl font-semibold">{isLoggingIn ? "Login" : "Sign Up"}</h1>
                    <p className="text-sm">{isLoggingIn ? "Sign in to access your account" : "Sign up to access the dashboard"}</p>
                </div>
                <div className="flex flex-col gap-2 w-full items-center">
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Email Address</span>
                        </label>
                        <input
                            type="text"
                            placeholder="johndoe@example.com"
                            className={`input input-bordered w-full max-w-xs ${isValidEmail(email) ? 'input-success' : 'input-error'}`}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                    </div>
                </div>
                <div className="flex flex-col gap-2 w-full items-center">
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Start typing..."
                            className="input input-bordered w-full max-w-xs"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                {!isLoggingIn && (
                    <div className="flex flex-col gap-2 w-full items-center">
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Legal Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="John Anthony Doe"
                                className="input input-bordered w-full max-w-xs"
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </div>
                    </div>
                )}
                {!isLoggingIn && (
                    <div className="flex flex-col gap-2 w-full items-center">
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">State</span>
                            </label>
                            {selectedState == '' && (
                                <select className="select select-success w-full max-w-xs">
                                    <option disabled selected>Select State</option>
                                    {states.map((state) => (
                                        <option key={state} value={state} onClick={() => handleSetState(state)}>{state}</option>
                                    ))}
                                </select>
                            )}
                        </div>
                    </div>
                )}

                <button className="btn btn-outline btn-success" onClick={handleAuth}>{isLoggingIn ? "Login" : "Sign Up"}</button>
                <div className="divider">OR</div>
                <a onClick={toggleIsLoggingIn} className="link link-success">{isLoggingIn ? "Create an Account" : "Log In to an Existing Account"}</a>

            </div>
            <dialog id="error" className="modal">
                    <form method="dialog" className="modal-box">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        <h3 className="font-bold text-lg">Error</h3>
                        <p className="py-4">{translateFirebaseError(firebaseError)}</p>
                    </form>
                </dialog>
        </div>

    );
}

export default SignInCreate;
