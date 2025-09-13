// import React from "react";
// import female from "../../../../assets/cardImgs/Images/female.png";
// import male from "../../../../assets/cardImgs/Images/male.png";

// const ProfilePageTable = ({user}) => {
//   return (
//     <>
//     <table
//   className="table text-white mb-0 custom-dark-table"
//   style={{

//     borderCollapse: "collapse"
//   }}
// >
//   <thead className="text-start thead-dark">
//     <tr style={{ backgroundColor: "var(--color-border)" }}>
//       <th className="text-white">Details</th>
//       <th className="text-white">
//         <img src={female} alt="Female" className="me-1" />
//         Char
//       </th>
//       <th className="text-white">
//         <img src={male} alt="Male" className="me-1" />
//         Parm
//       </th>
//     </tr>
//   </thead>
//   <tbody>
//     {[
//       ["Age", "57", "57"],
//       ["Body Hair", "Shave, Smooth", "Shave, Smooth"],
//       ["Height", "5'4 - (163cm)", "5'4 - (163cm)"],
//       ["Weight", "148 lb (67 kg)", "148 lb (67 kg)"],
//       ["Body type", "Average", "Average"],
//       ["Ethnic background", "Indian", "Indian"],
//       ["Smoking", "No", "No"],
//       ["Piercings", "No", "No"],
//       ["Tattoos", "None", "None"],
//       ["Languages Spoken", "English", "English"],
//       ["Looks are important?", "Low Importance", "Low Importance"],
//       ["Intelligence is important?", "Very Important", "Very Important"],
//       ["Sexuality", "Bi-sexual", "Bi-sexual"],
//       ["Relationship status", "Swinger", "Swinger"],
//       ["Experience level", "Advanced", "Advanced"]
//     ].map(([label, char, parm], i) => (
//       <tr key={i} style={{ borderBottom: "1px solid var(--color-background)" }}>
//         <td className="text-white">{label}</td>
//         <td className="text-white">{char}</td>
//         <td className="text-white">{parm}</td>
//       </tr>
//     ))}
//   </tbody>
// </table>


//     </>
//   )
// }

// export default ProfilePageTable


import React from "react";
import female from "../../../../assets/cardImgs/Images/female.png";
import male from "../../../../assets/cardImgs/Images/male.png";

const ProfilePageTable = ({ user }) => {
  const isCouple = user?.gender?.toLowerCase() === "couple";

  // ✅ Map API object to table-friendly format
  const userData = [
    {
      label: "Date of Birth",
      char: user?.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : "-",
      parm: isCouple && user?.partner?.dateOfBirth
        ? new Date(user.partner.dateOfBirth).toLocaleDateString()
        : "-",
    },
    {
      label: "Gender",
      char: user?.gender || "-",
      parm: isCouple ? user?.partner?.gender || "-" : "-",
    },
    {
      label: "Sexuality",
      char: user?.sexuality || "-",
      parm: isCouple ? user?.partner?.sexuality || "-" : "-",
    },
    {
      label: "Interested In",
      char: user?.interestedIn?.join(", ") || "-",
      parm: isCouple ? user?.partner?.interestedIn?.join(", ") || "-" : "-",
    },
    {
      label: "City",
      char: user?.address?.city || "-",
      parm: isCouple ? user?.partner?.address?.city || "-" : "-",
    },
    {
      label: "State",
      char: user?.address?.state || "-",
      parm: isCouple ? user?.partner?.address?.state || "-" : "-",
    },
    {
      label: "Country",
      char: user?.address?.country || "-",
      parm: isCouple ? user?.partner?.address?.country || "-" : "-",
    },
    {
      label: "Zip Code",
      char: user?.address?.zipcode || "-",
      parm: isCouple ? user?.partner?.address?.zipcode || "-" : "-",
    },
    {
      label: "Full Address",
      char: user?.address?.fullAddress || "-",
      parm: isCouple ? user?.partner?.address?.fullAddress || "-" : "-",
    },
    {
      label: "Languages Spoken",
      char: user?.languagesSpoken?.join(", ") || "-",
      parm: isCouple ? user?.partner?.languagesSpoken?.join(", ") || "-" : "-",
    },
    {
      label: "Bio",
      char: user?.bio || "-",
      parm: isCouple ? user?.partner?.bio || "-" : "-",
    },
  ];

  return (
    <table
      className="table text-white mb-0 custom-dark-table"
      style={{ borderCollapse: "collapse" }}
    >
      <thead className="text-start thead-dark">
        <tr style={{ backgroundColor: "var(--color-border)" }}>
          <th className="text-white">Details</th>
          <th className="text-white">
            <img src={isCouple ? male : user?.gender === "male" ? male : female} alt="Female" className="me-1" />
            {isCouple ? "Char" : user?.gender === "male" ? "Char" :"Parm" }
          </th>
          {isCouple && (
            <th className="text-white">
              <img src={female} alt="Male" className="me-1" />
              Partner
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {userData.map(({ label, char, parm }, i) => (
          <tr
            key={i}
            style={{ borderBottom: "1px solid var(--color-background)" }}
          >
            <td className="text-white">{label}</td>
            <td className="text-white">{char}</td>
            {isCouple && <td className="text-white">{parm}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProfilePageTable;
