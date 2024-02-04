import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from 'sweetalert';



const AddData = ({ formEdit, editData  }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });

  useEffect(() => {
    // Populate form fields with existing data when in edit mode
    if (formEdit) {
      setFormData({
        name: editData.name || "",
        email: editData.email || "",
        phoneNumber: editData.phonenumber || "",
      });
    }
  }, [formEdit]);

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    } else {
      newErrors.name = "";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = "Valid email is required";
      valid = false;
    } else {
      newErrors.email = "";
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (
      !formData.phoneNumber.trim() ||
      !phoneRegex.test(formData.phoneNumber)
    ) {
      newErrors.phoneNumber = "Valid phone number is required";
      valid = false;
    } else {
      newErrors.phoneNumber = "";
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (validateForm()) {
      await handleClick();
    } else {
      console.log("Form validation failed");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleClick = async () => {
    if (formEdit) {
      await onEditClick(formData);
    } else {
      await AddData(formData);
    }
  
    // Clear form data after submission
    setFormData({
      name: "",
      email: "",
      phoneNumber: "",
    });
  };
  

const baseURL = "https://63845d543fa7acb14ff276f1.mockapi.io/Employees";

const AddData = async (addDatas) =>{
    try {
        const requestData = await axios.post(baseURL, {
            name: addDatas.name,
            email: addDatas.email,
            phonenumber: addDatas.phoneNumber
          });
        console.log("Add data:", requestData.data);
        swal({
          title: "Success",
          text: "Data Added Successfully!...",
          icon: "success",
          button:false,
          timer:2000,          
        })
      } catch (error) {
        console.error("Error updating data:", error);
      }

}


const onEditClick = async (updateData) => {
    try {
      const updateURL = `${baseURL}/${editData.id}`; // Include the ID of the item you want to update
      const requestData = await axios.put(updateURL, {
        name: updateData.name,
        email: updateData.email,
        phonenumber: updateData.phoneNumber
      });
      console.log("Updated data:", requestData.data);
      swal({
        title: "Success",
        text: "Data Updated Successfully!...",
        icon: "success",
        button:false,
        timer:2000,          
      }).then(function() {
        window.location.href = "index2.php";
    })
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };
  

  return (
    <div>
      <h2>{formEdit ? "Edit Data" : "Add Data"}</h2>
      <form  onSubmit={handleSubmit}>
        <div className="fomDisplay">
          <label htmlFor="name" className="labelDisplay">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="inputCls"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="error-display">
          <div className="error">{errors.name}</div>
        </div>

        <div className="fomDisplay">
          <label htmlFor="email" className="labelDisplay">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="inputCls"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="error-display">
          <div className="error">{errors.email}</div>
        </div>

        <div className="fomDisplay">
          <label htmlFor="phoneNumber" className="labelDisplay">
            Phone Number:
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            className="inputCls"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div className="error-display">
          <div className="error">{errors.phoneNumber}</div>
        </div>

        <button type="submit" className="edit-button" >
          {formEdit ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddData;
