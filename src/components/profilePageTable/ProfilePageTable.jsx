import React from 'react'

const ProfilePageTable = () => {
  return (
    <>
    <table
  className="table text-white mb-0"
  style={{ backgroundColor: "#343a40", borderCollapse: "collapse" }}
>
  <thead className="text-start">
    <tr style={{ backgroundColor: "transparent" }}>
      <th className="text-white">Details</th>
      <th className="text-white">Char</th>
      <th className="text-white">Parm</th>
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
      ["Experience level", "Advanced", "Advanced"],
    ].map(([label, char, parm], i) => (
      <tr
        key={i}
        style={{ borderBottom: "1px solid #555" }}
      >
        <td className='text-white'>{label}</td>
        <td className='text-white'>{char}</td>
        <td className='text-white'>{parm}</td>
      </tr>
    ))}
  </tbody>
</table>

    </>
  )
}

export default ProfilePageTable