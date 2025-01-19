import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { viewRecepients } from '../../../../services/operations/donorAPI';

const ViewRecepientDetails = () => {

    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)
    const [recepients, setRecepients] = useState(null);
    const navigate = useNavigate()

    //Fetching All Recepients Who Has Made One Or More Requests
    const getRecepients = async () => {
        try {
            const response = await viewRecepients(token);
            setRecepients(response);
        }
        catch (error) {
            console.log("Unable To Fetch Recepients");
        }
    }

    useEffect(() => {
        getRecepients();
    }, []);

    return (
        <div>
            {
                //Checking For Approved Recepients Having Created Earlier Requests
                (user?.approved === true && !recepients?.length) ? (
                    <p className="font-bold text-4xl text-center text-richblack-600">
                        No Recepients Has Registered Yet!
                    </p>
                ) : (user?.approved === true && recepients?.length) ? (
                    <div>
                        <div className="text-3xl text-richblack-800">All Recepients</div>
                        <div className="my-8 text-richblack-600">
                            <div className="flex rounded-t-lg bg-richblack-50">
                                <p className="w-[60%] px-5 py-3">Recepient Details ( Tap On A Recepient To View There Contact Details )</p>
                            </div>

                            {recepients.map((recepient, i, arr) => (
                                <div
                                    className={`flex items-center border border-richblack-700 ${i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
                                        }`}
                                    key={i}
                                >

                                    <div
                                        className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                                        onClick={() => {
                                            navigate(
                                                `/view-recepient`
                                            )
                                        }}
                                    >

                                        <div className="flex max-w-xl flex-col gap-2">
                                            <p className="text-lg font-semibold">Frequency Of Need: {recepient.frequencyOfNeed}</p>
                                            <p className="text-sm font-medium text-richblack-500">
                                                Request Description: {recepient.requestDescription.length > 50
                                                    ? `${recepient.requestDescription.slice(0, 50)}...`
                                                    : recepient.requestDescription}
                                            </p>
                                            <p className="text-sm font-medium text-richblack-500">
                                                Type Of Food: {recepient.typeOfFood}
                                            </p>
                                            <p className="text-sm font-medium text-richblack-500">
                                                Quantity: {recepient.quantity}
                                            </p>
                                            <p className="text-sm font-medium text-richblack-500">
                                                Receiving Option: {recepient.receivingOption}
                                            </p>
                                            <p className="text-sm font-medium text-richblack-500">
                                                Preffered Time: {recepient.prefferedPickUpTime}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className='text-brown-600 text-center font-bold text-4xl'>
                        Please Wait Until Verification To Proceed!
                    </div>
                )
            }
        </div>
    )
}

export default ViewRecepientDetails