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
import DobCalculator from "../../../../helper/DobCalculator"

const ProfilePageTable = ({ user }) => {
  const isCouple = user?.gender?.toLowerCase() === "couple";

  console.log("user", user)

  // ✅ Map API object to table-friendly format
  const userData = [
    {
      label: "Age",
      char: user?.dateOfBirth ? <DobCalculator birthDate={user.dateOfBirth} /> : "-",
      parm: isCouple && user?.partner?.dateOfBirth
        ? <DobCalculator birthDate={user?.partner?.dateOfBirth} />
        : "-",
    },
    {
      label: "Body Hair",
      char: Array.isArray(user?.bodyHair) ? user.bodyHair : [],  // always an array
      parm: isCouple ? (Array.isArray(user?.partner?.bodyHair) ? user.partner.bodyHair : []) : []
    }
    ,
    {
      label: "Height",
      char: user?.height || "-",
      parm: isCouple ? user?.partner?.height || "-" : "-",
    },
    {
      label: "Weight",
      char: user?.weight || "-",
      parm: isCouple ? user?.partner?.weight || "-" : "-",
    },
    {
      label: "Body type",
      char: user?.bodyType || "-",
      parm: isCouple ? user?.partner?.bodyType || "-" : "-",
    },
    {
      label: "Ethnic background",
      char: user?.ethnicBackground || "-",
      parm: isCouple ? user?.partner?.ethnicBackground || "-" : "-",
    },
    {
      label: "Smoking",
      char: user?.smoking || "-",
      parm: isCouple ? user?.partner?.smoking || "-" : "-",
    },
    {
      label: "Languages Spoken",
      char: Array.isArray(user?.languagesSpoken) ? user.languagesSpoken : [],  // always an array
      parm: isCouple ? (Array.isArray(user?.partner?.languagesSpoken) ? user.partner.languagesSpoken : []) : []
    },
    {
      label: "Looks are important?",
      char: user?.looksAreImportant || "-",
      parm: isCouple ? user?.partner?.looksAreImportant || "-" : "-",
    },
    {
      label: "Intelligence is important?",
      char: user?.intelligenceIsImportant || "-",
      parm: isCouple ? user?.partner?.intelligenceIsImportant || "-" : "-",
    },
    {
      label: "Languages Spoken",
      char: user?.languagesSpoken?.join(", ") || "-",
      parm: isCouple ? user?.partner?.languagesSpoken?.join(", ") || "-" : "-",
    },
    {
      label: "Sexuality",
      char: user?.sexuality || "-",
      parm: isCouple ? user?.partner?.sexuality || "-" : "-",
    },
    {
      label: "Relationship status",
      char: user?.relationshipOrientation || "-",
      parm: isCouple ? user?.partner?.relationshipOrientation || "-" : "-",
    },
    {
      label: "Experience level",
      char: user?.experienceLevel || "-",
      parm: isCouple ? user?.partner?.experienceLevel || "-" : "-",
    },
    {
      label: "Looking For",
      char: user?.lookingFor || "-",
      parm: isCouple ? user?.lookingFor || "-" : "-",
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
            {isCouple ? "Char" : user?.gender === "male" ? "Char" : "Parm"}
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
        {userData.map(({ label, char, parm }, i) => {
          const formatValue = (val) => {
            if (React.isValidElement(val)) {
              return val; // ✅ return component directly without formatting
            }

            if (Array.isArray(val)) {
              return val.length > 0 ? val.join(", ") : "-";
            }

            if (typeof val === "object" && val !== null) {
              // ✅ Pick only keys where value is true
              const trueKeys = Object.keys(val).filter((key) => val[key]);
              return trueKeys.length > 0
                ? trueKeys.map(k => k.charAt(0).toUpperCase() + k.slice(1)).join(", ")
                : "-";
            }

            if (typeof val === "boolean") {
              return val ? "Yes" : "No";
            }

            if (typeof val === "number") {
              return val.toString();
            }

            return val !== undefined && val !== null && val !== "" ? val : "-";
          };

          return (
            <tr
              key={i}
              style={{ borderBottom: "1px solid var(--color-background)" }}
            >
              <td className="text-white">{label}</td>
              <td className="text-white">{formatValue(char)}</td>
              {isCouple && <td className="text-white">{formatValue(parm)}</td>}
            </tr>
          );
        })}





      </tbody>
    </table>
  );
};

export default ProfilePageTable;
