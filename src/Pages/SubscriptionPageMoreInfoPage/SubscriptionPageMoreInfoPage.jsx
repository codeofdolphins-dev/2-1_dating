// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom"; // if you're using dynamic routes
// import httpService from "../../helper/httpService";
// import Navbar from "../HomePage/HomeComponents/Navbar";

// const SubscriptionPageMoreInfoPage = () => {
//   const { planId } = useParams(); // e.g. /plans/:planId
//   const [plan, setPlan] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Fetch plan details by ID
//     httpService(`/plans/${planId}`, "GET")
//       .then((res) => {
//         console.log("info",res)
//         setPlan(res?.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching plan:", err);
//         setLoading(false);
//       });
//   }, [planId]);

//   if (loading) {
//     return <div className="text-center text-white mt-5">Loading...</div>;
//   }

//   if (!plan) {
//     return <div className="text-center text-danger mt-5">Plan not found!</div>;
//   }

//   return (
//     <>
//     <Navbar />
//     <div className="container mt-5 text-white pt-5">
//       {/* Card Container */}
//       <div
//         className="rounded-3 shadow-sm p-4"
//         style={{ backgroundColor: "var(--color-border)", border: "1px solid #374151" }}
//       >
//         {/* Title & Price */}
//         <div className="d-flex justify-content-between align-items-center mb-3">
//           <h3 className="fw-bold">{plan.name}</h3>
//           <h4 className="fw-bold text-success">{plan.formattedPrice}</h4>
//         </div>

//         {/* Duration */}
//         <p className="small text-secondary mb-2">Duration: {plan.durationText}</p>

//         {/* Description */}
//         <p className="mb-4">{plan.description}</p>

//         {/* Features */}
//         <h5 className="mb-3">Features</h5>
//         <ul style={{ listStyle: "none", padding: 0 }}>
//           {plan.features.map((feature) => (
//             <li key={feature.id} className="d-flex align-items-center mb-2">
//               <i className="bi bi-check2-circle me-2" style={{ color: "var(--color-success-green)" }}></i>
//               <span>
//                 {feature.description}{" "}
//                 {feature.limit > 0 && <strong>({feature.limit} limit)</strong>}
//               </span>
//             </li>
//           ))}
//         </ul>

//         {/* Permissions */}
//         <h5 className="mt-4 mb-3">Permissions</h5>
//         <ul style={{ listStyle: "none", padding: 0 }}>
//           {plan.permissions.map((perm, index) => (
//             <li key={index} className="d-flex align-items-center mb-2">
//               <i className="bi bi-shield-check me-2" style={{ color: "var(--color-success-green)" }}></i>
//               <span>{perm.replace(/_/g, " ")}</span>
//             </li>
//           ))}
//         </ul>

//         {/* Subscribe Button */}
//         <div className="text-center mt-4">
//           <button
//             className="btn btn-lg text-uppercase"
//             style={{ backgroundColor: "var(--color-primary-green)", color: "#000000" }}
//             onClick={() => alert(`Subscribing to ${plan.name}`)}
//           >
//             Subscribe Now
//           </button>
//         </div>
//       </div>
//     </div>
//     </>
//   );
// };

// export default SubscriptionPageMoreInfoPage;

















import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import httpService from "../../helper/httpService";
import Navbar from "../HomePage/HomeComponents/Navbar";
import axios from "axios";
import RazorpayButton from "../../components/RazorPayButton/RazorPayButton";

const SubscriptionPageMoreInfoPage = () => {
  const { planId } = useParams();
  const location = useLocation();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  const orderData = location.state?.orderData; // ✅ This is the res.data you passed

  console.log("Plan ID:", planId);
  console.log("Order Data:", orderData);

  useEffect(() => {
    // Fetch plan details by ID
    httpService(`/plans/${planId}`, "GET")
      .then((res) => {
        console.log("info", res);
        setPlan(res?.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching plan:", err);
        setLoading(false);
      });
  }, [planId]);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async () => {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Razorpay SDK failed to load. Check your connection.");
      return;
    }

    const baseURL = import.meta.env.VITE_BASE_URL
    // 1️⃣ Create order by calling backend
    const orderRes = await httpService(`${baseURL}/razorpay/create-order`, "POST", { body: "1000" });
    const order = await orderRes.json();

    // 2️⃣ Setup Razorpay Checkout

    const options = {
      key: "rzp_test_3WmknLIqcUo9erRAZORPAY_SECRET=ftRLb1NpewT6A2otsCNKS8Qd", // Replace with your Razorpay Key ID
      amount: order.amount,
      currency: order.currency,
      name: "My App",
      description: plan.name,
      order_id: order.id,
      handler: async function (response) {
        // 3️⃣ Verify payment with backend
        const verifyRes = await axios(`${baseURL}/razorpay/verify-payment`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(response),
        });
        const verifyData = await verifyRes.json();

        if (verifyData.success) {
          alert(`✅ Payment successful for ${plan.name}!`);
        } else {
          alert("❌ Payment verification failed!");
        }
      },
      prefill: {
        name: "Test User",
        email: "test@example.com",
        contact: "9876543210",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  if (loading) {
    return <div className="text-center text-white mt-5">Loading...</div>;
  }

  if (!plan) {
    return <div className="text-center text-danger mt-5">Plan not found!</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container mt-5 text-white pt-5">
        <div
          className="rounded-3 shadow-sm p-4"
          style={{ backgroundColor: "var(--color-border)", border: "1px solid #374151" }}
        >
          {/* Title & Price */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 className="fw-bold">{plan.name}</h3>
            <h4 className="fw-bold text-success">{plan.formattedPrice}</h4>
          </div>

          {/* Duration */}
          <p className="small text-secondary mb-2">Duration: {plan.durationText}</p>

          {/* Description */}
          <p className="mb-4">{plan.description}</p>

          {/* Features */}
          <h5 className="mb-3">Features</h5>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {plan.features.map((feature) => (
              <li key={feature.id} className="d-flex align-items-center mb-2">
                <i className="bi bi-check2-circle me-2" style={{ color: "var(--color-success-green)" }}></i>
                <span>
                  {feature.description}{" "}
                  {feature.limit > 0 && <strong>({feature.limit} limit)</strong>}
                </span>
              </li>
            ))}
          </ul>

          {/* Permissions */}
          <h5 className="mt-4 mb-3">Permissions</h5>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {plan.permissions.map((perm, index) => (
              <li key={index} className="d-flex align-items-center mb-2">
                <i className="bi bi-shield-check me-2" style={{ color: "var(--color-success-green)" }}></i>
                <span>{perm.replace(/_/g, " ")}</span>
              </li>
            ))}
          </ul>

          {/* Razorpay Button */}
          <div className="text-center mt-4">
            {orderData ? (
              <RazorpayButton orderDetails={orderData} />
            ) : (
              <p className="text-warning">⚠️ No order details found. Please go back and select a plan again.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SubscriptionPageMoreInfoPage;

