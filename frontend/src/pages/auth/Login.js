import { useContext, useEffect, useRef, useState } from "react"
import { UseTitle } from "../../hooks/UseTitle"
import { useLocation, useNavigate } from "react-router-dom"
import { AlertMessage } from "../../components"
import { getCurrentUser, login } from "../../services"
import { Password } from "./components"
import { AuthContext } from "../../context"


const validInput = "bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
const initialInput = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
const errorInput = "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"

const initialLabel = "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
const validLabel = "block mb-2 text-sm font-medium text-green-700 dark:text-green-500"
const errorLabel = "block mb-2 text-sm font-medium text-red-700 dark:text-red-500"


export const Login = () => {
    const location = useLocation();
  
  const returnTo = location.state?.returnTo;

  const { setUser } = useContext(AuthContext);
  UseTitle("Login");
  const [error, setError] = useState(null);
  const [validForm, setValidForm] = useState(false);
  const [errors, setErrors] = useState({
    username: null,
    password: null,

  });
  useEffect(() => {
    const allFilled =
      username.current?.value &&
      password.current?.value
    setValidForm(!!allFilled);
  }, [errors]);


  const username = useRef()
  const password = useRef()
  const navigate = useNavigate()


  const loginUser = async (event) => {
    try {
      event.preventDefault();
      const authData = {
        username: username.current.value,
        password: password.current.value,
      }
      const data = await login(authData);

      if (data.success) {
        const currentUser = await getCurrentUser();

        if (currentUser.isAuthenticated) {
          setUser(currentUser.user);
        }

        navigate(returnTo || "/campgrounds", {
          state: {
            type: "success",
            successMessage: data.message
          }
        });
      }

    } catch (error) {
      console.log(error)
      setError(error.message);
    }
  }

  const handleNoValidForm = (event) => {
    event.preventDefault();
    setErrors({
      username: !username.current.value.trim(),
      password: !password.current.value.trim(),
    });

  }


  const onChange = (e) => {
    const input = e.target.id
    switch (input) {
      case "username":
        setErrors((prev) => ({ ...prev, username: e.target.value.trim() === "" ? true : false, }))
        break;
      case "password":
        setErrors((prev) => ({ ...prev, password: e.target.value.trim() === "" ? true : false, }))
        break;
      default:
        break;
    }
  }

  return (
    <main>
      {error && <AlertMessage
        text={error}
        type="danger"
        onClose={() => setError(null)}
      />
      }
      <form onSubmit={validForm ? loginUser : handleNoValidForm} className="max-w-sm mx-auto" noValidate>
        <div className="mb-5">
          <label htmlFor="username" className={errors.username === null ? initialLabel : errors.username ? errorLabel : validLabel}>Username</label>
          <input onChange={onChange} ref={username} type="text" id="username" className={errors.username === null ? initialInput : errors.username ? errorInput : validInput} required />
        </div>
        <Password password={password} onChange={onChange} errors={errors} />
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
      </form>
    </main>
  )
}
