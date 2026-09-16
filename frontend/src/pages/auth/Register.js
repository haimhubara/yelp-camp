import { useContext, useEffect, useRef, useState } from "react"
import { UseTitle } from "../../hooks/UseTitle"
import { useNavigate } from "react-router-dom"
import { register } from "../../services"
import { AlertMessage } from "../../components"
import { Password } from "./components"
import { AuthContext } from "../../context"

const validInput = "bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
const initialInput = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
const errorInput = "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"

const initialLabel = "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
const validLabel = "block mb-2 text-sm font-medium text-green-700 dark:text-green-500"
const errorLabel = "block mb-2 text-sm font-medium text-red-700 dark:text-red-500"


export const Register = () => {

  const { setUser } = useContext(AuthContext);
  UseTitle("Register");
  const [error, setError] = useState(null);
  const [validForm, setValidForm] = useState(false);
  const [errors, setErrors] = useState({

    username: null,
    password: null,
    email: null,

  });
  useEffect(() => {
    const allFilled =
      username.current?.value &&
      password.current?.value &&
      email.current?.value
    setValidForm(!!allFilled);
  }, [errors]);


  const username = useRef()
  const password = useRef()
  const email = useRef()
  const navigate = useNavigate()


  const registerUser = async (event) => {
    try {
      event.preventDefault();
      const authData = {
        username: username.current.value,
        password: password.current.value,
        email: email.current.value,
      };

      const data = await register(authData);
      if (data.success) {
        setUser(data.user);

        navigate('/campgrounds', {
          state: {
            type: "success",
            successMessage: data.message
          }
        });
      }

    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  const handleNoValidForm = (event) => {
    event.preventDefault();
    setErrors({
      username: !username.current.value.trim(),
      password: !password.current.value.trim(),
      email: !email.current.value.trim(),
    });

  }

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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
      case "email":
        setErrors((prev) => ({
          ...prev,
          email: !isValidEmail(e.target.value.trim())
        }));
        break;
      default:
        break;
    }
  }

  return (
  <main>
    {error && (
      <AlertMessage
        text={error}
        type="danger"
        onClose={() => setError(null)}
      />
    )}

    <div className="max-w-md mx-auto bg-white dark:bg-slate-700 rounded-2xl shadow-xl overflow-hidden">
      
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Camping"
          className="w-full h-64 object-cover"
        />

        <div className="absolute inset-0 bg-black/30"></div>

        <div className="absolute bottom-0 left-0 p-6 text-white">
          <h2 className="text-3xl font-bold">
            Join YelpCamp
          </h2>

          <p className="text-sm text-gray-200 mt-1">
            Create an account and start your adventure
          </p>
        </div>
      </div>

      <div className="p-6">
        <form
          onSubmit={validForm ? registerUser : handleNoValidForm}
          noValidate
        >
          <div className="mb-5">
            <label
              htmlFor="username"
              className={
                errors.username === null
                  ? initialLabel
                  : errors.username
                    ? errorLabel
                    : validLabel
              }
            >
              Username
            </label>

            <input
              onChange={onChange}
              ref={username}
              type="text"
              id="username"
              className={
                errors.username === null
                  ? initialInput
                  : errors.username
                    ? errorInput
                    : validInput
              }
              required
            />
          </div>

          <Password
            password={password}
            onChange={onChange}
            errors={errors}
          />

          <div className="mb-5">
            <label
              htmlFor="email"
              className={
                errors.email === null
                  ? initialLabel
                  : errors.email
                    ? errorLabel
                    : validLabel
              }
            >
              Email
            </label>

            <input
              onChange={onChange}
              ref={email}
              type="email"
              id="email"
              className={
                errors.email === null
                  ? initialInput
                  : errors.email
                    ? errorInput
                    : validInput
              }
              required
            />
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  </main>
  )
}
