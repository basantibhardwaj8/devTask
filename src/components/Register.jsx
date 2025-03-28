import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

function Register() {
  const [focus, setFocus] = useState({});
  const [agencyError, setAgencyError] = useState(false);
  const navigate = useNavigate();

  const handleFocus = (field) =>
    setFocus((prev) => ({ ...prev, [field]: true }));
  const handleBlur = (field, value) =>
    setFocus((prev) => ({ ...prev, [field]: value.trim() !== "" }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    setAgencyError(false);

    // Check for empty required fields
    const requiredFields = ['name', 'number', 'email', 'password'];
    for (const field of requiredFields) {
      if (!form[field].value.trim()) {
        toast.error(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
        return;
      }
    }

    // Check agency selection
    const agencyValue = form.querySelector('input[name="agency"]:checked')?.value;
    if (!agencyValue) {
      setAgencyError(true);
      toast.error('Please select whether you are an agency');
      return;
    }

    if (form.checkValidity()) {
      // Get form data
      const formData = {
        name: form.name.value,
        phoneNumber: form.number.value,
        email: form.email.value,
        password: form.password.value,
        company: form.company.value,
        isAgency: agencyValue === "yes"
      };

      // Store in localStorage
      localStorage.setItem('userData', JSON.stringify(formData));
      localStorage.setItem('isLoggedIn', 'true');
      
      toast.success('Account created successfully!');
      navigate("/profile");
    } else {
      if (!form.email.validity.valid) {
        toast.error('Please enter a valid email address');
      }
      if (!form.number.validity.valid) {
        toast.error('Please enter a valid phone number');
      }
      form.reportValidity();
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="h-[90%] w-full max-w-[300px] bg-gray-200 pt-4 px-5 rounded-sm shadow-md">
        <h2 className="w-[180px] font-bold text-2xl text-gray-900">
          Create your PopX account
        </h2>

        <form onSubmit={handleSubmit} className="h-[80%] flex flex-col justify-between mt-5">
          <div>
            {[
              { id: "name", label: "Full Name", req: "*", type: "text" },
              { id: "number", label: "Phone number", req: "*", type: "number" },
              { id: "email", label: "Email address", req: "*", type: "email" },
              { id: "password", label: "Password", req: "*", type: "password" },
              { id: "company", label: "Company name", type: "text" },
            ].map(({ id, label, req, type }) => (
              <div key={id} className="relative mb-3 ">
                <label
                  htmlFor={id}
                  className={`absolute left-2 px-1 text-sm text-[#542dde] bg-gray-200 transition-all duration-300 ${
                    focus[id] ? "text-xs -translate-y-2" : "translate-y-3"
                  }`}
                >
                  {label}
                  <span className="text-red-500">{req}</span>
                </label>
                <input
                  id={id}
                  onFocus={() => handleFocus(id)}
                  onBlur={(e) => handleBlur(id, e.target.value)}
                  className="w-full mt-1 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  type={type}
                />
              </div>
            ))}

            <div className="flex flex-col gap-2 mt-3">
              <label className={`text-sm font-medium ${agencyError ? 'text-red-500' : ''}`}>
                Are you an Agency?<span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <input
                    id="yes"
                    type="radio"
                    name="agency"
                    value="yes"
                    className="accent-[#542dde]"
                    onChange={() => setAgencyError(false)}
                  />
                  <label htmlFor="yes">Yes</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    id="no"
                    type="radio"
                    name="agency"
                    value="no"
                    className="accent-purple-600"
                    onChange={() => setAgencyError(false)}
                  />
                  <label htmlFor="no">No</label>
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="bg-[#542dde] w-full hover:bg-[#411ebe] text-white font-semibold py-2 rounded-lg"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;