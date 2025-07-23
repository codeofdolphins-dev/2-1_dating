import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import "../RegistrationCss/registration.css";

const CustomPhonenumberInputField = ({ formData, setFormData, errors }) => {
    const [countryOptions] = useState(countryList().getData());
    const [currentCountry, setCurrentCountry] = useState("in"); // ✅ lowercase

    return (
        <div className="row g-3 align-items-center mb-3">
            <div className="col-md-12">
                <PhoneInput
                    country={currentCountry} // ✅ 'in' will default to India 🇮🇳
                    value={formData.phoneNumber}
                    onChange={(value, country) => {
                        setFormData({
                            ...formData,
                            phoneNumber: value,
                            countryCode: country?.dialCode,
                        });
                        setCurrentCountry(country?.countryCode?.toLowerCase()); // ✅ lowercase
                    }}
                    enableSearch
                    placeholder="+91 9999999999"
                    inputClass="custom-phone-input custom-placeholder"
                    buttonClass="custom-flag-dropdown"
                    containerClass="custom-phone-container"
                    dropdownClass="custom-phone-dropdown"
                    dropdownStyle={{
                        position: 'absolute',
                        bottom: '100%',
                        top: 'auto',
                        left: 0,
                        right: 0,
                        zIndex: 9999,
                        backgroundColor: '#1c1c3a',
                        color: '#fff',
                    }}
                />

                {errors.phoneNumber && (
                    <div className="invalid-feedback d-block">{errors.phoneNumber}</div>
                )}
            </div>
        </div>
    );
};

export default CustomPhonenumberInputField;






// import React, { useState, useEffect } from 'react';
// import PhoneInput from 'react-phone-input-2';
// import 'react-phone-input-2/lib/style.css';
// import Select from 'react-select';
// import countryList from 'react-select-country-list';
// import "../RegistrationCss/registration.css";

// const CustomPhonenumberInputField = ({ formData, setFormData, errors }) => {
//     const [countryOptions] = useState(countryList().getData());
//     const [currentCountry, setCurrentCountry] = useState("IN");
//     const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//     // Set default country code when component mounts
//     useEffect(() => {
//         if (formData.countryCode) {
//             const countryData = countryOptions.find(c => c.value === formData.countryCode);
//             if (countryData) {
//                 setCurrentCountry(countryData.value);
//             }
//         }
//     }, [formData.countryCode, countryOptions]);

//     const handleCountryChange = (selectedCountry) => {
//         setCurrentCountry(selectedCountry.value);
//         setFormData({
//             ...formData,
//             countryCode: selectedCountry.value
//         });
//     };

//     const handlePhoneChange = (value, country) => {
//         setFormData({
//             ...formData,
//             phoneNumber: value,
//             countryCode: country?.dialCode
//         });
//         setCurrentCountry(country?.countryCode);
//     };

//     return (
//         <div className="row g-3 align-items-center mb-3">
//             <div className="col-md-12 position-relative">
//                 <div className="d-flex align-items-center">
//                     {/* Country Select Dropdown */}
//                     <div className="me-2" style={{ width: '150px' }}>
//                         <Select
//                             options={countryOptions}
//                             value={countryOptions.find(c => c.value === currentCountry)}
//                             onChange={handleCountryChange}
//                             placeholder="Select country"
//                             classNamePrefix="country-select"
//                             menuPlacement="auto"
//                             onMenuOpen={() => setIsDropdownOpen(true)}
//                             onMenuClose={() => setIsDropdownOpen(false)}
//                             styles={{
//                                 control: (base) => ({
//                                     ...base,
//                                     backgroundColor: '#1c1c3a',
//                                     borderColor: '#2d2d5a',
//                                     color: '#fff',
//                                     height: '44px'
//                                 }),
//                                 singleValue: (base) => ({
//                                     ...base,
//                                     color: '#fff'
//                                 }),
//                                 menu: (base) => ({
//                                     ...base,
//                                     backgroundColor: '#1c1c3a',
//                                     zIndex: 9999
//                                 }),
//                                 option: (base, { isFocused }) => ({
//                                     ...base,
//                                     backgroundColor: isFocused ? '#2d2d5a' : '#1c1c3a',
//                                     color: '#fff'
//                                 }),
//                                 input: (base) => ({
//                                     ...base,
//                                     color: '#fff'
//                                 })
//                             }}
//                         />
//                     </div>

//                     {/* Phone Input */}
//                     <div className="flex-grow-1">
//                         <PhoneInput
//                             country={currentCountry.toLowerCase()}
//                             value={formData.phoneNumber}
//                             onChange={handlePhoneChange}
//                             enableSearch
//                             placeholder={currentCountry ? `+${countryOptions.find(c => c.value === currentCountry)?.dialCode || '91'} 9999999999` : "Enter phone number"}
//                             inputClass="custom-phone-input"
//                             buttonClass="custom-flag-dropdown"
//                             containerClass="custom-phone-container"
//                             dropdownClass={`custom-phone-dropdown ${isDropdownOpen ? 'dropdown-above' : ''}`}
//                             dropdownStyle={{
//                                 backgroundColor: '#1c1c3a',
//                                 color: '#fff',
//                             }}
//                             inputStyle={{
//                                 width: '100%',
//                                 backgroundColor: '#1c1c3a',
//                                 borderColor: '#2d2d5a',
//                                 color: '#fff',
//                                 height: '44px'
//                             }}
//                             buttonStyle={{
//                                 backgroundColor: '#1c1c3a',
//                                 borderColor: '#2d2d5a'
//                             }}
//                         />
//                     </div>
//                 </div>

//                 {errors.phoneNumber && (
//                     <div className="invalid-feedback d-block mt-2">{errors.phoneNumber}</div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default CustomPhonenumberInputField;





// import React, { useState, useMemo } from 'react';
// import Select from 'react-select';
// import countryList from 'react-select-country-list';
// import 'react-phone-input-2/lib/style.css';
// import "../RegistrationCss/registration.css";

// // Helper to get the flag emoji
// const getFlagEmoji = (countryCode) => {
//   if (!countryCode) return '';
//   return countryCode
//     .toUpperCase()
//     .replace(/./g, (char) =>
//       String.fromCodePoint(127397 + char.charCodeAt())
//     );
// };

// // Optional: Static map of country dial codes
// const countryDialCodes = {
//   IN: '+91',
//   US: '+1',
//   GB: '+44',
//   AU: '+61',
//   // Add more as needed
// };

// const CustomPhonenumberInputField = ({ formData, setFormData, errors }) => {
//   const countryOptions = useMemo(() => {
//     return countryList().getData().map((country) => ({
//       value: country.value,
//       label: `${getFlagEmoji(country.value)} ${country.label}`,
//       dialCode: countryDialCodes[country.value] || '',
//     }));
//   }, []);

//   const [selectedCountry, setSelectedCountry] = useState(null);

//   const handleCountryChange = (selected) => {
//     setSelectedCountry(selected);
//     setFormData({
//       ...formData,
//       countryCode: selected.dialCode,
//     });
//   };

//   return (
//     <div className="row g-3 align-items-center mb-3">
//       <div className="col-md-6">
//         <label className="form-label">Select Country</label>
//         <Select
//           options={countryOptions}
//           value={selectedCountry}
//           onChange={handleCountryChange}
//           classNamePrefix="react-select"
//         />
//       </div>

//       <div className="col-md-6">
//         <label className="form-label">Phone Number</label>
//         <div className="d-flex align-items-center">
//           {formData.countryCode && (
//             <span className="me-2 fw-bold">{formData.countryCode}</span>
//           )}
//           <input
//             type="tel"
//             className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
//             placeholder="Enter phone number"
//             value={formData.phoneNumber}
//             onChange={(e) =>
//               setFormData({ ...formData, phoneNumber: e.target.value })
//             }
//           />
//         </div>
//         {errors.phoneNumber && (
//           <div className="invalid-feedback d-block">{errors.phoneNumber}</div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CustomPhonenumberInputField;


