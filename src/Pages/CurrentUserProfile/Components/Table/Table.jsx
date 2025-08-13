import React from "react";
import female from "../../../../assets/cardImgs/Images/female.png";
import male from "../../../../assets/cardImgs/Images/male.png";

const ProfilePageTable = () => {
  return (
    <>
    <table
  className="table text-white mb-0 custom-dark-table"
  style={{
  
    borderCollapse: "collapse"
  }}
>
  <thead className="text-start thead-dark">
    <tr style={{ backgroundColor: "var(--color-border)" }}>
      <th className="text-white">Details</th>
      <th className="text-white">
        <img src={female} alt="Female" className="me-1" />
        Char
      </th>
      <th className="text-white">
        <img src={male} alt="Male" className="me-1" />
        Parm
      </th>
    </tr>
  </thead>
  <tbody>
    {[
      ["Age", "57", "57"],
      ["Body Hair", "Shave, Smooth", "Shave, Smooth"],
      ["Height", "5'4 - (163cm)", "5'4 - (163cm)"],
      ["Weight", "148 lb (67 kg)", "148 lb (67 kg)"],
      ["Body type", "Average", "Average"],
      ["Ethnic background", "Indian", "Indian"],
      ["Smoking", "No", "No"],
      ["Piercings", "No", "No"],
      ["Tattoos", "None", "None"],
      ["Languages Spoken", "English", "English"],
      ["Looks are important?", "Low Importance", "Low Importance"],
      ["Intelligence is important?", "Very Important", "Very Important"],
      ["Sexuality", "Bi-sexual", "Bi-sexual"],
      ["Relationship status", "Swinger", "Swinger"],
      ["Experience level", "Advanced", "Advanced"]
    ].map(([label, char, parm], i) => (
      <tr key={i} style={{ borderBottom: "1px solid var(--color-background)" }}>
        <td className="text-white">{label}</td>
        <td className="text-white">{char}</td>
        <td className="text-white">{parm}</td>
      </tr>
    ))}
  </tbody>
</table>


    </>
  )
}

export default ProfilePageTable