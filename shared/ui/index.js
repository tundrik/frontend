import { LoadingIcon } from "@/svg/Loading"

export const LoaderButtom = ({ message, pending }) => (
    <div className="loaderButtom">
        {message}
        {pending && <LoadingIcon />}
    </div>
)
