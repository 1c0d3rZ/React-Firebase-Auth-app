import React, { useContext, useRef, useState } from 'react'
import { UserContext } from '../context/userContext'
import {useNavigate} from 'react-router-dom'


const SignUpModal = () => {

    const { modalState, toggleModals, signUp } = useContext(UserContext)

    console.log(signUp)
    const navigate = useNavigate()

    const [validation, setValidation] = useState('')

    const inputs = useRef([])
    const addInputs = el => {
        if (el && !inputs.current.includes(el)) {
            inputs.current.push(el)
        }
    }

    const formRef = useRef()

    const handleForm = async (e) => {
        e.preventDefault()
        console.log(inputs)

        if ((inputs.current[1].value.length || inputs.current[2].value.length) < 6) {
            setValidation('6 characters min')
            return;
        } else if (inputs.current[1].value !== inputs.current[2].value) {
            setValidation('Passwords do not match')
            return;
        }

        try {
            const cred = await signUp(
                inputs.current[0].value,
                inputs.current[1].value
            )
            console.log(cred)

            toggleModals('close')

            formRef.current.reset()
            setValidation('')

            navigate('/private/private-home')
        } catch (err) {
            if (err.code === 'auth/invalid-email'){
                setValidation('Email format invalid!')
            }
            
            if (err.code === 'auth/email-already-in-use'){
                setValidation('Email already used!')
            }
        }

    }

    const closeModal = () => {
        setValidation('')
        toggleModals('close')
    }

    return (
        <>
            {modalState.signUpmodal && (
                <div className="position-fixed top-0 vw-100 vh-100">
                    <div className="w-100 h-100 bg-dark bg-opacity-75"
                        onClick={closeModal}
                    >
                    </div>
                    <div className="position-absolute top-50 start-50 translate-middle bg-light px-4 py-4"
                        style={{ minWidth: "400px", borderRadius: 4 }}
                    >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header mb-4">
                                    <h4 className='modal-title'>Sign Up</h4>
                                    <button className="btn-close"
                                        onClick={closeModal}
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <form className="sign-up-form"
                                        onSubmit={handleForm}
                                        ref={formRef}
                                    >

                                        <div className="mb-3">
                                            <label htmlFor="signUpEmail" className="form-label">Email address</label>
                                            <input
                                                ref={addInputs}
                                                name='email'
                                                required
                                                type="text"
                                                className="form-control"
                                                id='signUpEmail'
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="signUpPwd" className="form-label">Password</label>
                                            <input
                                                ref={addInputs}
                                                name='pwd'
                                                required
                                                type="password"
                                                className="form-control"
                                                id='signUpPwd'
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="repeatPwd" className="form-label">Repeat Password</label>
                                            <input
                                                ref={addInputs}
                                                name='pwd'
                                                required
                                                type="password"
                                                className="form-control"
                                                id='repeatPwd'
                                            />
                                            <p className="text-danger mt-1">
                                                {validation}
                                            </p>
                                        </div>

                                        <button type='submit' className='btn btn-primary'>Submit</button>

                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </>
    )
}

export default SignUpModal