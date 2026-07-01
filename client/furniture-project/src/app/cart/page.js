import React from "react";
import Testimonial from "../component/common/Testimonial";
import CartTable from "../component/Cart/CartTable";


export default function Page() {
//   useEffect(() => {
//     const token = localStorage.getItem("token")

//     if (!token) {
//       alert("Please login first")
//       window.location.href = "/login-register"
//     }
//   }, [])

  return (
    <div>
      <Testimonial title="Shopping Cart" />
      <CartTable />
    </div>
  );
}  
