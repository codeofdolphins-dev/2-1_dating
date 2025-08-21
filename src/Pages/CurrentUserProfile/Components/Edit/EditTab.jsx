import React, { useEffect, useState } from 'react'

import maleIcon from "../../../../assets/icons/male.png";
import femaleIcon from "../../../../assets/icons/female.png";
import coupleIcon from "../../../../assets/icons/couple.png";
import transgenderIcon from "../../../../assets/icons/transgender.png";

import style from "./style.module.css";
import EditProfilePageInputPopup from '../../../../components/EditProfilePageInputPopup/EditProfilePageInputPopup';
import DropdownPopup from '../../../../components/EditProfilePageInputPopup/DropdownPopup';

const EditTab = () => {

  const bodyHairOptions = ["Prefer not to say", "Arms", "Bikini", "Buns", "Tummy", "Legs", "Everywhere", "Chest", "Treasure", "Arm Pits", "Shave", "Smooth"];

  const heightOptions = [`Prefer not to say`, `4'6" (137cm)`, `4'7" (140cm)`, `4'8" (142cm)`, `4'9" (145cm)`, `4'10" (147cm)`, `4'11" (150cm)`, `5'0" (152cm)`, `5'1" (155cm)`, `5'2" (157cm)`, `5'3" (160cm)`, `5'4" (163cm)`, `5'5" (165cm)`, `5'6" (168cm)`, `5'7" (170cm)`, `5'8" (173cm)`, `5'9" (175cm)`, `5'10" (178cm)`, `5'11" (180cm)`, `6'0" (183cm)`, `6'1" (185cm)`, `6'2" (188cm)`, `6'3" (190cm)`, `6'4" (193cm)`, `6'5" (195cm)`, `6'6" (198cm)`, `6'7" (200cm)`, `6'8" (203cm)`, `6'9" (205cm)`, `6'10" (208cm)`, `6'11" (210cm)`, `7'0" (213cm)`, `7'1" (215cm)`, `7'2" (218cm)`, `7'3" (220cm)`, `7'4" (223cm)`, `7'5" (225cm)`, `7'6" (228cm)`, `7'7" (230cm)`, `7'8" (233cm)`, `7'9" (235cm)`, `7'10" (238cm)`, `7'11" (240cm)`, `8'0" (244cm)`];

  const weightOptions = [`Prefer not to say`, `80 Lbs. (36 Kg.)`, `82 Lbs. (37 Kg.)`, `84 Lbs. (38 Kg.)`, `86 Lbs. (39 Kg.)`, `88 Lbs. (40 Kg.)`, `90 Lbs. (41 Kg.)`, `92 Lbs. (42 Kg.)`, `94 Lbs. (43 Kg.)`, `96 Lbs. (44 Kg.)`, `98 Lbs. (44.5 Kg.)`, `100 Lbs. (45 Kg.)`, `102 Lbs. (46 Kg.)`, `104 Lbs. (47 Kg.)`, `106 Lbs. (48 Kg.)`, `108 Lbs. (49 Kg.)`, `110 Lbs. (50 Kg.)`, `112 Lbs. (51 Kg.)`, `114 Lbs. (52 Kg.)`, `116 Lbs. (53 Kg.)`, `118 Lbs. (54 Kg.)`, `120 Lbs. (54.5 Kg.)`, `122 Lbs. (55 Kg.)`, `124 Lbs. (56 Kg.)`, `126 Lbs. (57 Kg.)`, `128 Lbs. (58 Kg.)`, `130 Lbs. (59 Kg.)`, `132 Lbs. (60 Kg.)`, `134 Lbs. (61 Kg.)`, `136 Lbs. (62 Kg.)`, `138 Lbs. (63 Kg.)`, `140 Lbs. (64 Kg.)`, `142 Lbs. (65 Kg.)`, `144 Lbs. (66 Kg.)`, `146 Lbs. (67 Kg.)`, `148 Lbs. (68 Kg.)`, `150 Lbs. (68 Kg.)`, `152 Lbs. (69 Kg.)`, `154 Lbs. (70 Kg.)`, `156 Lbs. (71 Kg.)`, `158 Lbs. (72 Kg.)`, `160 Lbs. (73 Kg.)`, `162 Lbs. (74 Kg.)`, `164 Lbs. (75 Kg.)`, `166 Lbs. (76 Kg.)`, `168 Lbs. (77 Kg.)`, `170 Lbs. (77 Kg.)`, `172 Lbs. (78 Kg.)`, `174 Lbs. (79 Kg.)`, `176 Lbs. (80 Kg.)`, `178 Lbs. (81 Kg.)`, `180 Lbs. (82 Kg.)`, `182 Lbs. (83 Kg.)`, `184 Lbs. (84 Kg.)`, `186 Lbs. (85 Kg.)`, `188 Lbs. (86 Kg.)`, `190 Lbs. (86 Kg.)`, `192 Lbs. (87 Kg.)`, `194 Lbs. (88 Kg.)`, `196 Lbs. (89 Kg.)`, `198 Lbs. (90 Kg.)`, `200 Lbs. (91 Kg.)`, `205 Lbs. (93 Kg.)`, `210 Lbs. (95 Kg.)`, `215 Lbs. (98 Kg.)`, `220 Lbs. (100 Kg.)`, `225 Lbs. (102 Kg.)`, `230 Lbs. (104 Kg.)`, `235 Lbs. (107 Kg.)`, `240 Lbs. (109 Kg.)`, `245 Lbs. (111 Kg.)`, `250 Lbs. (113 Kg.)`, `255 Lbs. (116 Kg.)`, `260 Lbs. (118 Kg.)`, `265 Lbs. (120 Kg.)`, `270 Lbs. (122 Kg.)`, `275 Lbs. (125 Kg.)`, `280 Lbs. (127 Kg.)`, `285 Lbs. (129 Kg.)`, `290 Lbs. (132 Kg.)`, `295 Lbs. (134 Kg.)`, `300 Lbs. (136 Kg.)`, `310 Lbs. (141 Kg.)`, `320 Lbs. (145 Kg.)`, `330 Lbs. (150 Kg.)`, `340 Lbs. (154 Kg.)`, `350 Lbs. (159 Kg.)`, `360 Lbs. (163 Kg.)`, `370 Lbs. (168 Kg.)`, `380 Lbs. (172 Kg.)`, `390 Lbs. (177 Kg.)`, `400 Lbs. (181 Kg.)`];

  const bodyTypeOptions = [`Prefer not to say`, `Slim`, `Athletic`, `Average`, `Nicely Shaped`, `More of me to love`, `Huggable and Heavy`];
  const ethnicOptions = [`Prefer not to say`, `Caucasian`, `Hispanic / Latin`, `Black / African-American`, `Asian`, `Indian`, `Indigenous`, `Middle Eastern`, `Other`];
  const smokingOptions = [`Prefer not to say`, `No`, `Yes`, `Occasionally`];
  const piercingsOptions = [`Prefer not to say`, `No`, `Yes`];
  const tattoosOptions = [`Prefer not to say`, `None`, `One`, `A few`, `Inked`];
  const languagesOptions = [`English`, `Nederlands`, `Deutsch`, `Francais`, `Español`, `Italiano`, `Português`];
  const looksOptions = [`No`, `Prefer not to say`, `Low Importance`, `Medium Importance`, `Very Important`];
  const intelligenceOptions = [`No`, `Prefer not to say`, `Low Importance`, `Medium Importance`, `Very Important`];
  const sexualityOptions = [`Prefer not to say`, `Straight`, `Bi-sexual`, `Bi-curious`, `Gay`, `Pansexual`];
  const relationshipOptions = [`Swinger`, `Prefer not to say`, `Monogamous`, `Open-Minded`, `Polyamorous`];
  const circumcisedOptions = [`Prefer not to say`, `No`, `Yes`];

  const [circumcised, setCircumcised] = useState("");
  const [desc, setDesc] = useState(`all desi couples join the group "usa-desi-couples" \n\nwell educated couple from nc , looking to meet decent, respectful couple friends \n\nDesi married couples ....`);


  const femaleInputOptions = {
    f_height: heightOptions,
    f_weight: weightOptions,
    f_bodyType: bodyTypeOptions,
    f_ethnicBackground: ethnicOptions,
    f_smoking: smokingOptions,
    f_piercings: piercingsOptions,
    f_tattoos: tattoosOptions,
    f_languages: languagesOptions,
    f_looks: looksOptions,
    f_intelligence: intelligenceOptions,
    f_sexuality: sexualityOptions,
    f_relationship: relationshipOptions
  }
  const maleInputOptions = {
    m_height: heightOptions,
    m_weight: weightOptions,
    m_bodyType: bodyTypeOptions,
    m_ethnicBackground: ethnicOptions,
    m_smoking: smokingOptions,
    m_piercings: piercingsOptions,
    m_tattoos: tattoosOptions,
    m_languages: languagesOptions,
    m_looks: looksOptions,
    m_intelligence: intelligenceOptions,
    m_sexuality: sexualityOptions,
    m_relationship: relationshipOptions
  }

  const [female, setFemale] = useState({
    f_name: "",
    f_dob: "",
    bodyHair: [],
    f_height: "",
    f_weight: "",
    f_bodyType: "",
    f_ethnicBackground: "",
    f_smoking: "",
    f_piercings: "",
    f_tattoos: "",
    f_languages: "",
    f_looks: "",
    f_intelligence: "",
    f_sexuality: "",
    f_relationship: "",
    experience: {
      f_curious: false,
      f_newbie: false,
      f_intermediate: false,
      f_advanced: false
    }
  });
  const [male, setMale] = useState({
    m_name: "",
    m_dob: "",
    bodyHair: [],
    m_height: "",
    m_weight: "",
    m_bodyType: "",
    m_ethnicBackground: "",
    m_smoking: "",
    m_piercings: "",
    m_tattoos: "",
    m_languages: "",
    m_looks: "",
    m_intelligence: "",
    m_sexuality: "",
    m_relationship: "",
    experience: {
      m_curious: false,
      m_newbie: false,
      m_intermediate: false,
      m_advanced: false
    }
  });
  const female_input = [
    { title: "Height", id: "f_height" },
    { title: "Weight", id: "f_weight" },
    { title: "Body Type", id: "f_bodyType" },
    { title: "Ethnic background", id: "f_ethnicBackground" },
    { title: "Smoking", id: "f_smoking" },
    { title: "Piercings", id: "f_piercings" },
    { title: "Tattoos", id: "f_tattoos" },
    { title: "Languages Spoken", id: "f_languages" },
    { title: "Looks are important?", id: "f_looks" },
    { title: "Intelligence is important?", id: "f_intelligence" },
    { title: "Sexuality", id: "f_sexuality" },
    { title: "Relationship Orientation", id: "f_relationship" }
  ];
  const male_input = [
    { title: "Height", id: "m_height" },
    { title: "Weight", id: "m_weight" },
    { title: "Body Type", id: "m_bodyType" },
    { title: "Ethnic background", id: "m_ethnicBackground" },
    { title: "Smoking", id: "m_smoking" },
    { title: "Piercings", id: "m_piercings" },
    { title: "Tattoos", id: "m_tattoos" },
    { title: "Languages Spoken", id: "m_languages" },
    { title: "Looks are important?", id: "m_looks" },
    { title: "Intelligence is important?", id: "m_intelligence" },
    { title: "Sexuality", id: "m_sexuality" },
    { title: "Relationship Orientation", id: "m_relationship" }
  ];
  const f_experiance = [
    { title: "Curious", id: "f_curious" },
    { title: "Intermediate", id: "f_intermediate" },
    { title: "Newbie", id: "f_newbie" },
    { title: "Advanced", id: "f_advanced" }
  ]
  const m_experiance = [
    { title: "Curious", id: "m_curious" },
    { title: "Intermediate", id: "m_intermediate" },
    { title: "Newbie", id: "m_newbie" },
    { title: "Advanced", id: "m_advanced" }
  ]

  const [interestOptions, setInterestOptions] = useState([
    { id: 1, title: "Couples Only", value: false },
    { id: 2, title: "Threesome", value: false },
    { id: 3, title: "Full Swap", value: false },
    { id: 4, title: "Gays", value: false },
    { id: 5, title: "Lesbian", value: false },
    { id: 6, title: "Exhibitionist", value: false },
    { id: 7, title: "Transgender", value: false },
    { id: 8, title: "BDSM", value: false },
    { id: 9, title: "Voyeur", value: false },
    { id: 10, title: "Gang bang", value: false },
    { id: 11, title: "Wife swap", value: false },
    { id: 12, title: "Hot wifing", value: false },
    { id: 13, title: "Bi Couple", value: false },
    { id: 14, title: "BBC", value: false },
    { id: 15, title: "Bare fun", value: false },
    { id: 16, title: "Body Tattoo", value: false },
    { id: 17, title: "BBW Hot Wives", value: false },
    { id: 18, title: "Flashing", value: false },
    { id: 19, title: "Nudism", value: false },
    { id: 20, title: "Public Sex", value: false },
    { id: 21, title: "Group Sex", value: false },
    { id: 22, title: "Interracial", value: false },
    { id: 23, title: "Beach Sex", value: false },
    { id: 24, title: "Anal Sex", value: false },
    { id: 25, title: "cougars and vixens", value: false },
    { id: 26, title: "Erotic Massage", value: false },
    { id: 27, title: "Tantra", value: false },
    { id: 28, title: "Masturbation", value: false },
    { id: 29, title: "Dildo & Toys", value: false },
    { id: 30, title: "Girl on Girl", value: false },
    { id: 31, title: "Soft Swap", value: false },
    { id: 32, title: "Full Swap", value: false }
  ]);
  const [profileType, setProfileType] = useState([
    { id: 1, icon: coupleIcon, title: "Couple", value: true },
    { id: 2, icon: femaleIcon, title: "Female", value: false },
    { id: 3, icon: maleIcon, title: "Male", value: false },
    { id: 4, icon: transgenderIcon, title: "Transgender", value: false }
  ]);

  // **********************handlers*************************

  const profileHandler = (id) => {
    setProfileType((prev) => (
      prev.map(field => (
        field.id === id ? { ...field, value: !field.value } : { ...field, value: false }
      ))
    ));
  };
  const handelInterest = (id) => {
    setInterestOptions((prev) => (
      prev.map(field => (
        field.id === id ? { ...field, value: !field.value } : field
      ))
    ));
  };

  const femaleExperienceHandler = (e) => {

    const { name, checked } = e.target;

    const resetObj = Object.fromEntries(
      Object.keys(female.experience).map(key => [key, false])
    );

    setFemale((prev) => ({
      ...prev,
      experience: {
        ...resetObj,
        [name]: checked
      }
    }))
  };

  const maleExperienceHandler = (e) => {
    const { name, checked } = e.target;

    const resetObj = Object.fromEntries(
      Object.keys(male.experience).map(key => [key, false])
    );

    setMale((prev) => ({
      ...prev,
      experience: {
        ...resetObj,
        [name]: checked
      }
    }))
  };






  // *************testing*******************
  // useEffect(() => {
  //   console.log(interestOptions);
  // }, [interestOptions])


  return (
    <>
      <div className="d-flex flex-column gap-3">

        {/* row 1 */}
        <div className="row align-items-center">
          {/* Left Side */}
          <div className="col-lg-7 col-md-6">
            <h3 style={{ fontSize: "18px" }}>CPLSUEPAUL</h3>
            <p className="mb-0" style={{ fontSize: "14px" }}> You are a... <span className='text-danger'>*</span> </p>
          </div>

          {/* Right Side */}
          <div className="col-lg-5 col-md-6 d-flex flex-column align-items-end gap-3">
            {/* Icons */}
            <div className="d-flex gap-1 flex-wrap">
              {profileType.map((item) => (
                <div
                  key={item.id}
                  className="d-flex flex-column justify-content-center align-items-center py-2 px-3 rounded-3"
                  style={{
                    maxWidth: "120px",
                    border: item.value ? "2px solid #fff" : "2px solid #343A40",
                    cursor: "pointer"
                  }}
                  onClick={() => profileHandler(item.id)}
                >
                  <img src={item.icon} alt={item.title} width="50" />
                  <p className="mb-0" style={{ fontSize: "10px" }}>{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* row 2 */}
        <div className="">
          <p className="mb-0" style={{ fontSize: "14px" }}> What are you looking for on SDC? <span className='text-danger'>*</span> </p>
          <div className="d-flex flex-wrap gap-2 rounded-3 p-2" style={{ border: "2px solid #343A40" }}>
            {interestOptions.map((item) => (
              <button
                key={item.id}
                onClick={() => handelInterest(item.id)}
                className={`border-0 py-2 px-4 rounded-3 ${item.value ? 'custom-button' : 'text-white'}`}
                style={{
                  fontSize: '14px',
                  backgroundColor: item.value ? '' : 'transparent',
                }}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>

        {/* row 3 */}
        <div style={{ fontSize: "14px" }}>
          <textarea
            rows={'5'}
            className='py-3 px-4 rounded-4 w-100 text-white border-0'
            style={{ backgroundColor: "var(--color-border)" }}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>

        {/* row 4 */}
        <div className="pb-5" style={{ borderBottom: "2px solid #343A40" }}>
          <div className="row">

            {/* female details */}
            {
              (
                (profileType[0].title === "Couple" && profileType[0].value)
                ||
                (profileType[1].title === "Female" && profileType[1].value)
                ||
                (profileType[3].title === "Transgender" && profileType[3].value)
              ) &&
              <div className="col-lg-6">
                <div className={`mx-4 d-flex flex-column gap-4 text-secondary ${style.parent}`}>

                  {/* name field */}
                  <div className="d-flex justify-content-between align-items-center mb-1" style={{ borderBottom: "2px solid red" }}>
                    <input
                      type="text"
                      className="form-control border-0 rounded-0 text-danger px-0" id='f_name'
                      name='f_name'
                      value={female.f_name}
                      onChange={(e) => setFemale((prev) => ({
                        ...prev,
                        f_name: e.target.value
                      }))}
                      style={{
                        fontSize: "20px",
                        backgroundColor: "transparent"
                      }}
                    />
                    <label htmlFor='f_name' className="form-label mb-0 text-danger fw-bold"><i className="bi bi-pencil-fill text-danger" style={{ cursor: "pointer" }}></i></label>
                  </div>

                  {/* female date of birth */}
                  <div style={{ borderBottom: "2px solid #343A40" }}>
                    {/* Label */}
                    <label className="form-label mb-0" htmlFor="f_dob"
                      style={{ fontSize: "14px", color: "#B0C3CC" }}>Date of Birth</label>

                    {/* Input */}
                    <div className="d-flex">
                      <input
                        type="date"
                        className="form-control rounded-0 p-0 pb-2 border-0"
                        id="f_dob"
                        value={female.f_dob}
                        onChange={(e) => setFemale((prev) => ({
                          ...prev,
                          f_dob: e.target.value
                        }))}
                        style={{
                          fontSize: "16px",
                          color: "#B0C3CC",
                          backgroundColor: "transparent"
                        }}
                      />
                    </div>
                  </div>

                  {/* for body type */}
                  <div style={{ borderBottom: "2px solid #343A40" }}>
                    {/* Label */}
                    <label className="form-label mb-0" htmlFor="f_bodyHair"
                      style={{ fontSize: "14px", color: "#B0C3CC" }}> Body Hair </label>

                    {/* Input */}
                    <div className="d-flex">
                      <EditProfilePageInputPopup options={bodyHairOptions} bodyHair={female} setbodyHair={setFemale} />
                    </div>
                  </div>

                  {female_input.map((field, i) => (
                    <div key={i} style={{ borderBottom: "2px solid #343A40" }}>
                      {/* Label */}
                      <label
                        className="form-label mb-0"
                        htmlFor={field.id}
                        style={{ fontSize: "14px", color: "#B0C3CC" }}
                      >
                        {field.title}
                      </label>

                      {/* Input */}
                      <div className="d-flex">
                        <DropdownPopup
                          name={field.id} // 🧠 key point: pass field ID as 'name'
                          options={femaleInputOptions[field.id]} // options per field
                          title={field.title}
                          selectedValue={female}
                          setSelectedValue={setFemale}
                        />
                      </div>
                    </div>
                  ))}


                  {/* experiance level */}
                  <div className="">
                    <h3 className='text-danger' style={{ fontSize: "20px" }}>Experience Level</h3>
                    <div className="row px-2 mt-3">
                      <div className="col-lg-6 w-100 ">
                        <div className={`d-flex flex-wrap align-items-center gap-5 ${style.parent}`}>
                          {
                            f_experiance.map((item, i) => (
                              <div key={i} className="d-flex gap-2 justify-content-start align-items-center">
                                <input
                                  className="form-check-input m-0"
                                  type="checkbox"
                                  id={item.id}
                                  name={item.id}
                                  checked={female.experience[item.id]}
                                  onChange={femaleExperienceHandler}
                                />
                                <label className="form-check-label" htmlFor={item.id} style={{ fontSize: "14px" }}> {item.title} </label>
                              </div>
                            ))
                          }
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            }

            {/* male details */}
            {
              (
                (profileType[0].title === "Couple" && profileType[0].value)
                ||
                (profileType[2].title === "Male" && profileType[2].value)
              ) &&
              <div className="col-lg-6 mt-5 mt-lg-0">

                <div className={`mx-4 d-flex flex-column gap-4 text-secondary ${style.parent}`}>

                  {/* name field */}
                  <div className="d-flex justify-content-between align-items-center mb-1" style={{ borderBottom: "2px solid #096BFF" }}>
                    <input
                      type="text"
                      className="form-control border-0 rounded-0 px-0" id='m_name'
                      name='m_name'
                      value={male.m_name}
                      onChange={(e) => setMale((prev) => ({
                        ...prev,
                        m_name: e.target.value
                      }))}
                      style={{
                        fontSize: "20px",
                        backgroundColor: "transparent",
                        color: "#096BFF"
                      }}
                    />
                    <label htmlFor='m_name' className="form-label mb-0 text-danger fw-bold"><i className="bi bi-pencil-fill" style={{ cursor: "pointer", color: "#096BFF" }}></i></label>
                  </div>

                  {/* male date of birth */}
                  <div style={{ borderBottom: "2px solid #343A40" }}>
                    {/* Label */}
                    <label className="form-label mb-0" htmlFor="m_dob"
                      style={{ fontSize: "14px", color: "#B0C3CC" }}>Date of Birth</label>

                    {/* Input */}
                    <div className="d-flex">
                      <input
                        type="date"
                        className="form-control rounded-0 p-0 pb-2 border-0"
                        id="m_dob"
                        value={male.m_dob}
                        onChange={(e) => setMale((prev) => ({
                          ...prev,
                          m_dob: e.target.value
                        }))}
                        style={{
                          fontSize: "16px",
                          color: "#B0C3CC",
                          backgroundColor: "transparent"
                        }}
                      />
                    </div>
                  </div>

                  {/* for body type */}
                  <div style={{ borderBottom: "2px solid #343A40" }}>
                    {/* Label */}
                    <label className="form-label mb-0" htmlFor="f_bodyHair"
                      style={{ fontSize: "14px", color: "#B0C3CC" }}> Body Hair </label>

                    {/* Input */}
                    <div className="d-flex">
                      <EditProfilePageInputPopup options={bodyHairOptions} bodyHair={male} setbodyHair={setMale} />
                    </div>
                  </div>

                  {male_input.map((field, i) => (
                    <div key={i} style={{ borderBottom: "2px solid #343A40" }}>
                      {/* Label */}
                      <label
                        className="form-label mb-0"
                        htmlFor={field.id}
                        style={{ fontSize: "14px", color: "#B0C3CC" }}
                      >
                        {field.title}
                      </label>

                      {/* Input */}
                      <div className="d-flex">
                        <DropdownPopup
                          name={field.id} // 🧠 key point: pass field ID as 'name'
                          options={maleInputOptions[field.id]} // options per field
                          title={field.title}
                          selectedValue={male}
                          setSelectedValue={setMale}
                        />
                      </div>
                    </div>
                  ))}

                  {/* experience level */}
                  <div className="">
                    <h3 style={{ fontSize: "20px", color: "#096BFF" }}>Experience Level</h3>
                    <div className="row px-2 mt-3">
                      <div className="col-lg-6 w-100">
                        <div className={`d-flex flex-wrap align-items-center gap-5 ${style.parent}`}>
                          {
                            m_experiance.map((item, i) => (
                              <div key={i} className="d-flex gap-2 justify-content-start align-items-center">
                                <input
                                  className="form-check-input m-0"
                                  type="checkbox"
                                  id={item.id}
                                  name={item.id}
                                  checked={male.experience[item.id]}
                                  onChange={maleExperienceHandler}
                                />
                                <label className="form-check-label" htmlFor={item.id} style={{ fontSize: "14px" }}> {item.title} </label>
                              </div>
                            ))
                          }
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            }
          </div>
        </div>

        {/* row 5 */}
        <div className="row">
          <div className="col-lg-6" style={{ margin: "auto" }}>
            <button className='custom-button py-1 px-5 rounded-4 border-0'>Save</button>
          </div>
          <div className="col-lg-6 mt-md-4">
            <div className={`w-lg-50 ${style.parent}`} style={{ borderBottom: "2px solid #343A40" }}>
              {/* Label */}
              <label className="form-label mb-0" htmlFor='circumcised'
                style={{ fontSize: "14px", color: "#B0C3CC" }}> Circumcised </label>

              {/* Input */}
              <div className="d-flex">
                <DropdownPopup
                  options={circumcisedOptions} // options per field
                  title={"Circumcised"}
                  selectedValue={circumcised}
                  setSelectedValue={setCircumcised}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditTab