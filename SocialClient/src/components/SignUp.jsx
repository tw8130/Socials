import React from 'react';
import { TEInput, TERipple } from "tw-elements-react";
import { Link} from 'react-router-dom';
import { useEffect,useState } from 'react';
import axios from "axios"
import LoginPage from './Login';
import { useNavigate } from 'react-router-dom';

function SignUpPage() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [c_password, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [signedUp, setSignedUp] = useState(false);

 
const registerData={username:username,password:password,c_password:c_password,email:email,firstName:firstName,lastName:lastName}
  
    const handleRegister = async () => {
      try {
        // Make the API call to your backend server
        const response = await axios.post('http://localhost:4040/register',registerData, {
          
        });
  
        if (response.data) {
          // Signup successful, redirect to the login page
           
            setSignedUp(true);
          const navigateTo = useNavigate();
        // Redirect to the login page
        navigateTo('/Login');
        } else {
          // Handle signup error
          console.error('Signup failed');
        }
      } catch (error) {
        console.error('Error signing up:', error.response.data);
      }
    };
    if (signedUp) {
        return <LoginPage />;
      }
      
      


    return (
      <section className="h-full bg-neutral-200 dark:bg-neutral-700">
        <div className="container h-full p-10">
          <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
            <div className="w-full">
              <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
                <div className="g-0 lg:flex lg:flex-wrap">
                  {/* <!-- Left column container--> */}
                  <div className="px-4 md:px-0 lg:w-6/12">
                    <div className="md:mx-6 md:p-12">
                      {/* <!--Logo--> */}
                      <div className="text-center">
                        <img
                          className="mx-auto w-48"
                          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                          alt="logo"
                        />
                        <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                          We are The SociLite Team
                        </h4>
                      </div>
  
                      <form>
                        <p className="mb-4">Please register an account</p>
                        {/* <!--Username input--> */}
                        <TEInput
                          type="text"
                          label="Username"
                          className="mb-4"
                          value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        ></TEInput>

                        {/* <!--Email input--> */}
                        <TEInput
                          type="email"
                          label="Email"
                          className="mb-4"
                          value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        ></TEInput>

                        {/* <!--Password input--> */}
                        <TEInput
                          type="password"
                          label="Password"
                          className="mb-4"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        ></TEInput>

                        {/* <!-- Confirm Password input--> */}
                        <TEInput
                          type="password"
                          label="c-Password"
                          className="mb-4"
                          value={c_password}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        ></TEInput>

                         {/* <!-- First Name input--> */}
                         <TEInput
                          type="text"
                          label="FirstName"
                          className="mb-4"
                          value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        ></TEInput>

                         {/* <!-- Last Name input--> */}
                         <TEInput
                          type="text"
                          label="LastName"
                          className="mb-4"
                          value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        ></TEInput>
  
                        {/* <!--Submit button--> */}
                        <div className="mb-12 pb-1 pt-1 text-center">
                          <TERipple rippleColor="light" className="w-full">
                            <button
                              className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                              type="button"
                              onClick={handleRegister}
                              style={{
                                background:
                                  "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                              }}
                            >
                              Sign up
                            </button>
                          </TERipple>
  
                          {/* <!--Forgot password link--> */}
                          <a href="#!">Terms and conditions</a>
                        </div>
  
                        {/* <!--Register button--> */}
                        <div className="flex items-center justify-between pb-6">
                          <p className="mb-0 mr-2">Have an account?</p>
                          <TERipple rippleColor="light">
                            <button
                              type="button"
                              className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                            >
                              <a href="/Login">Login</a>
                            </button>
                          </TERipple>
                        </div>
                      </form>
                    </div>
                  </div>
  
                  {/* <!-- Right column container with background and description--> */}
                  <div
                    className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                    style={{
                      background:
                        "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                    }}
                  >
                    <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                      <h4 className="mb-6 text-xl font-semibold">
                        We are more than just a company
                      </h4>
                      <p className="text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}

export default SignUpPage;