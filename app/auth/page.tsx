import Image from "next/image"
import LoginForm from "./components/login"
import '../admin/admin.css'


type Props = {}

const Login = (props: Props) => {
    return (
        <>
            <LoginForm />
        </>
    )
}

export default Login