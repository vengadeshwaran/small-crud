import React, { useState } from "react";
import Read from "./Read";
import AddData from "./AddData";

const FormCurd = ({ createData = false }) => {
  const [activeSection, setActiveSection] = useState("create");

  const selectDiv = (section) => {
    setActiveSection(section);
  };


  return (
    <div>
      <div className="div-bts">
        {["create", "read", "update", "delete"].map((operationType) => (
          <button
            key={operationType}
            type="button"
            className={
              activeSection === operationType
                ? "crud-function active"
                : "crud-function "
            }
            onClick={() => {
              selectDiv(operationType);
              // handleCRUDOperation(operationType);
            }}
          >
            {operationType.charAt(0).toUpperCase() + operationType.slice(1)}
          </button>
        ))}
      </div>

      <section
        style={{ display: activeSection === "create" ? "block" : "none" }}
      >
        <h2>Create</h2>
        <AddData />
      </section>
      <section style={{ display: activeSection === "read" ? "block" : "none" }}>
        <h2>Read</h2>
        <Read activeSection={activeSection} />
      </section>
      <section
        style={{ display: activeSection === "update" ? "block" : "none" }}
      >
        <h2>Update</h2>
        <Read edit={true} activeSection={activeSection} />
      </section>
      <section
        style={{ display: activeSection === "delete" ? "block" : "none" }}
      >
        <h2>Delete</h2>
        <Read del={true} activeSection={activeSection} />
      </section>
    </div>
  );
};

export default FormCurd;
