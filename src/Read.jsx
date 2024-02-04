import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";
import AddData from "./AddData";
import swal from 'sweetalert';

const Read = ({ edit = false, del = false, activeSection }) => {
  const [formDispl, setFormDispl] = useState(false);
  const [editData, setEditData] = useState(null);
  const [getValue, setGetValue] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://63845d543fa7acb14ff276f1.mockapi.io/Employees"
      );
      setGetValue(response.data);
      // console.log("object", response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeSection, edit, del, formDispl]);

  const onDeleteClick = async (rowData) => {
    try {
      const deleteURL = `https://63845d543fa7acb14ff276f1.mockapi.io/Employees/${rowData.id}`;
      await axios.delete(deleteURL);
      setGetValue((prevData) =>
        prevData.filter((item) => item.id !== rowData.id)
      );
      swal({
        title: "Delete",
        text: "Data Deleted Successfully!...",
        icon: "success",
        button:false,
        timer:2000,
        
      })
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const editFunc = (rowData) => (
    <div>
      {edit && (
        <button
          type="button"
          className="edit-button"
          onClick={() => {
            setEditData(rowData);
            setFormDispl(true);
          }}
        >
          Edit
        </button>
      )}
      {del && (
        <button
          type="button"
          className="edit-button"
          onClick={() => onDeleteClick(rowData)}
        >
          Delete
        </button>
      )}
    </div>
  );

  return (
    <div>
      <div></div>
      {formDispl && editData ? (
        <>
          <div>
            <button
              type="button"
              className="edit-button"
              onClick={() => {
                setFormDispl(false);
              }}
            >
              Back
            </button>
          </div>
          <AddData formEdit={true} editData={editData} />
        </>
      ) : (
        <>
          <div className="my-table">
            <DataTable value={getValue} stripedRows>
              <Column field="id" header="Id"></Column>
              <Column field="name" header="Name"></Column>
              <Column field="email" header="Email"></Column>
              <Column field="phonenumber" header="Phone Number"></Column>

              {(edit || del) && (
                <Column
                  body={(rowData) => editFunc(rowData)}
                  header="Actions"
                ></Column>
              )}
            </DataTable>
          </div>
        </>
      )}
    </div>
  );
};

export default Read;
