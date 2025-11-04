import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast, Bounce } from "react-toastify";
const Manager = () => {
  const ref = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setpasswordArray(JSON.parse(passwords));
    }
  }, []);
  const showpassword = () => {
    let list = document.getElementById("password");
    let icon = document.getElementById("showPass");
    if (list.type === "password") {
      list.type = "text";
      icon.classList.remove("fa-eye");
      icon.classList.add("fa-eye-slash");
    } else {
      list.type = "password";
      icon.classList.remove("fa-eye-slash");
      icon.classList.add("fa-eye");
    }
  };
  const savePassword = () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      );
      console.log([...passwordArray, form]);
      (form.site = ""), (form.password = ""), (form.username = "");
      toast("Password saved!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } else {
      toast("Error: Password was not saved");
    }
  };
  const deletePassword = (id) => {
    console.log("Deleting password with id ", id);
    let c = confirm("Do you really want to delete this password?");
    if (c) {
      setpasswordArray(passwordArray.filter((item) => item.id !== id));
      localStorage.setItem(
        "passwords",
        JSON.stringify(passwordArray.filter((item) => item.id !== id))
      );
      toast("Password deleted successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }

    // console.log([...passwordArray, form]);
  };
  const editPassword = (id) => {
    console.log("Editing password with id ", id);
    setform(passwordArray.filter((i) => i.id === id)[0]);
    setpasswordArray(passwordArray.filter((item) => item.id !== id));
    // localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]));
    // console.log([...passwordArray, form]);
  };
  const copyText = (text) => {
    toast("Copied to clipboard", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    navigator.clipboard.writeText(text);
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
        style={{width:"auto", minWidth:"250px",maxWidth:"90vw"}}
      />
      <div className="p-3 md:mycontainer min-h-[88.2vh] pb-24 bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]">
        <h1 className="text-4xl text font-bold text-center">
          <span className="text-green-700">&lt;</span>
          <span>Pass</span>
          <span className="text-green-700">OP/&gt;</span>
        </h1>
        <p className="text-green-700 text-lg text-center">
          Your own password Manager{" "}
        </p>
        <div className="flex flex-col items-center p-4 text-black gap-8">
          <input
            value={form.site}
            placeholder="Enter website URL"
            className="rounded-full bg-white border-green-500 w-full p-4 py-1 border-2"
            type="text"
            onChange={(e) => {
              setform({ ...form, site: e.target.value });
            }}
          />
          {/* <div className="flex w-full justify-between gap-8"> */}
          <div className="flex flex-col md:flex-row w-full gap-4 md:gap-8">
            <input
              value={form.username}
              placeholder="Enter Username"
              className="bg-white rounded-full border-green-500 w-full p-4 py-1 border-2"
              type="text"
              onChange={(e) => {
                setform({ ...form, username: e.target.value });
              }}
            />
            <div className="relative">
              <input
                value={form.password}
                placeholder="Enter Password"
                className="bg-white rounded-full border-green-500 w-full p-4 py-1 border-2"
                type="password"
                id="password"
                onChange={(e) => {
                  setform({ ...form, password: e.target.value });
                }}
              />
              <span
                className="absolute right-[7px] top-1.5 cursor-pointer showPass"
                onClick={showpassword}
              >
                <i id="showPass" className="fa-solid fa-eye p-1 width={26}"></i>
              </span>
            </div>
          </div>
          <button
            className="flex justify-center gap-2 items-center bg-green-400 rounded-full px-8 py-2 w-fit hover:bg-green-300 border border-green-900"
            onClick={savePassword}
          >
            <i className="fa-solid fa-circle-plus"></i>Save Password
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-2xl py-4">Your passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length !== 0 && (
            <div className="w-full overflow-x-auto mb-10">
              <table className="table-auto w-full rounded-md overflow-hidden">
                <thead className="bg-green-800 text-white">
                  <tr>
                    <th className="py-2">Site</th>
                    <th className="py-2">Username</th>
                    <th className="py-2">Password</th>
                    <th className="py-2">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-green-100 ">
                  {passwordArray.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className="py-2 px-2 border border-white text-center ">
                          <a href={item.site} target="_blank" className="mx-2">
                            {item.site}
                          </a>
                          <i
                            className="fa-solid fa-copy"
                            onClick={() => {
                              copyText(item.site);
                            }}
                          ></i>
                        </td>
                        <td className="py-2 px-2 border border-white text-center">
                          {item.username}
                          <i
                            className="fa-solid fa-copy px-2"
                            onClick={() => {
                              copyText(item.username);
                            }}
                          ></i>
                        </td>
                        <td className="py-2px-2 border border-white text-center">
                          {item.password}
                          <i
                            className="fa-solid fa-copy px-2"
                            onClick={() => {
                              copyText(item.password);
                            }}
                          ></i>
                        </td>
                        <td className="py-2px-2 border border-white text-center">
                          <span
                            className="cursor-pointer mx-1"
                            onClick={() => {
                              editPassword(item.id);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/gwlusjdu.json"
                              trigger="hover"
                              style={{ width: "25px", height: "25px" }}
                            ></lord-icon>
                          </span>
                          <span
                            className="cursor-pointer mx-1"
                            onClick={() => {
                              deletePassword(item.id);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/skkahier.json"
                              trigger="hover"
                              style={{ width: "25px", height: "25px" }}
                            ></lord-icon>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
