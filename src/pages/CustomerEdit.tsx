import React from "react";
import useFetch from "../hook/useFetch";
import { useParams } from "react-router-dom";
import EditCustomer from "../components/edit/editCustomer/EditCustomer";

// import { customers } from "../constants/tables";
import LoadingSpinner from "../components/UI/loadingSpinner/LoadingSpinner";
import {IemployeeTable} from "../interfaces/Itable";

const url = "https://admin-panel-79c71-default-rtdb.europe-west1.firebasedatabase.app/customers";
function CustomerEdit() {
  const params = useParams();
  let { customerId } = params;

  /* fallback in case of time limit to test firebase database will over */
  // let customerInfo: IemployeeTable = customers.filter(
  //   (item) => item.ID.toString() === customerId)[0];

  let customerEdit;

  const { data, error, status } = useFetch<IemployeeTable>(`${url}/${customerId}.json`);

  if (status === "loading") {
    customerEdit = <LoadingSpinner />;
  }

  if (error) {
    // customerEdit = <EditCustomer customer={customerInfo} />;
  }

  if (status === "fetched" && data) {
    customerEdit = <EditCustomer customer={data} />;
  }

  return (
    <section>
      <h2 className="title" style={{textAlign: 'center', justifyContent: 'center'}}>
        {"Edit Customer"}
      </h2>
      {customerEdit}
    </section>
  );
}

export default CustomerEdit;
