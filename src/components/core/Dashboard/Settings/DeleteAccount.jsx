import { FiTrash2 } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { deleteProfile } from "../../../../services/operations/settingsAPI"

export default function DeleteAccount() {
    const { token } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    async function handleDeleteAccount() {
        try {
            dispatch(deleteProfile(token, navigate))
        } catch (error) {
            console.log("ERROR MESSAGE - ", error.message)
        }
    }

    return (
        <>
            <div className="my-10 flex flex-row gap-x-5 rounded-md border-[1px] border-pink-700 bg-pink-900 p-8 px-12">
                <div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700">
                    <FiTrash2 className="text-3xl text-pink-200" />
                </div>
                <div className="flex flex-col space-y-2">
                    <h2 className="text-lg font-semibold text-richblack-5">
                        Delete Account
                    </h2>
                    <div className="w-3/5 text-pink-25">
                        <p>Would You Like To Delete Account?</p>
                        <p>
                            This account may contain certain information. Deleting your account is
                            permanent and will remove all the content associated with it.
                        </p>
                    </div>
                    <button
                        type="button"
                        className="w-fit cursor-pointer italic text-pink-300"
                        onClick={handleDeleteAccount}
                    >
                        I Want To Delete My Account.
                    </button>
                </div>
            </div>
        </>
    )
}