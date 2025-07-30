import React, { useState } from 'react'
import "./AdvanceMemberSearch.css"
import PageWrapper from '../../components/PageWrapper'

const AdvanceMemberSearch = () => {

  const [search, setSearch] = useState("");

  const [lookingFor, setLookingFor] = useState({
    couple: false,
    female: false,
    male: false,
    transgender: false,
    business: false,
    me_us: false
  });

  const [status, setStatus] = useState({
    online: false,
    newMember: false,
    birthday: false,
  });

  const [visual, setVisual] = useState({
    picture: false,
    video: false,
    album: false,
  });

  const [lang, setLang] = useState({
    searchMode: {
      and: false,
      or: false
    },
    any: false,
    nederlands: false,
    deutsch: false,
    français: false,
    español: false,
    italiano: false,
    english: false,
    português: false,
    hindi: false,
    tamil: false,
    telugu: false,
    malyali: false,
    kanada: false,
    gujrati: false,
    panjabi: false,
    bangali: false,
    marathi: false,
    other: ""
  });

  const [location, setLocation] = useState("");

  const [subscription, setSubscription] = useState({
    lifeTime: false,
    fullMember: false,
    trailMember: false
  });

  const [features, setFeatures] = useState({
    searchMode: {
      and: false,
      or: false
    },
    certificate: false,
    hotDate: false,
    travelDate: false,
    profileName: ""
  });


  const handleLookingForChange = (e) => {
    const { name, checked } = e.target;
    setLookingFor((prev) => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleStatusChange = (e) => {
    const { name, checked } = e.target;
    setStatus((prev) => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleVisualChange = (e) => {
    const { name, checked } = e.target;
    setVisual((prev) => ({
      ...prev,
      [name]: checked
    }));
  };




  return (
    <>
      <PageWrapper>
        <div className="container-fluid py-5 px-5 d-flex flex-column align-items-start justify-content-center gap-2" style={{ backgroundColor: "var(--color-background)" }}>

          {/* row 1 */}
          <div className="row-1 text-white">
            <div className="d-flex justify-content-start align-items-center gap-3">
              <a href="#"><i class="bi bi-chevron-left fs-5 text-white"></i></a>
              <h4 className='text-white'>Member Search</h4>
            </div>
            <p className='para mt-2'>Select who you are looking for and refine your search parameters in the sections below. Next to "Search Mode", you can either select "and" to narrow down your search results to show profiles that have all the features you select below; or you can select "or" to show profiles that have minimum one of the features you select below.</p>
          </div>

          {/* row 2 */}
          <div className="row-2 d-flex justify-content-start align-items-center gap-2">
            <input
              type="text"
              onChange={() => setSearch(e.target.value)}
              placeholder='Login Name'
            />
            <button>Submit</button>
          </div>

          {/* row 3 */}
          <div className="row-3 text-white">

            <div className="row-3_0">
              <h5>What you are looking for</h5>
              <div className="filterSection">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="couple"
                    name='couple'
                    checked={lookingFor.couple}
                    onChange={handleLookingForChange}
                  />
                  <label class="form-check-label" for="couple">Couple Female / Male</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="female" name='female'
                    checked={lookingFor.female}
                    onChange={handleLookingForChange}
                  />
                  <label class="form-check-label" for="female">Female</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="male" name='male'
                    checked={lookingFor.male}
                    onChange={handleLookingForChange}
                  />
                  <label class="form-check-label" for="male">Male</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="transgender" name='transgender'
                    checked={lookingFor.transgender}
                    onChange={handleLookingForChange}
                  />
                  <label class="form-check-label" for="transgender">Transgender</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="business" name='business'
                    checked={lookingFor.business}
                    onChange={handleLookingForChange}
                  />
                  <label class="form-check-label" for="business">Businesses</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="me_us" name='me_us'
                    checked={lookingFor.me_us}
                    onChange={handleLookingForChange}
                  />
                  <label class="form-check-label" for="me_us">Looking for me / us</label>
                </div>
              </div>
            </div>

            <div className="row-3_1">
              <div className="header">
                <h5>Status</h5>
                <div className="circle">
                  <i class="bi bi-chevron-down"></i>
                </div>
              </div>

              <div className="filterSection">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="online" name='online'
                    checked={status.online}
                    onChange={handleStatusChange}
                  />
                  <label class="form-check-label" for="online">Online</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="newMember" name='newMember'
                    checked={status.newMember}
                    onChange={handleStatusChange}
                  />
                  <label class="form-check-label" for="newMember">New Member</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="birthday" name='birthday'
                    checked={status.birthday}
                    onChange={handleStatusChange}
                  />
                  <label class="form-check-label" for="birthday">Has a Birthday</label>
                </div>
              </div>
            </div>

            <div className="row-3_2">
              <div className="header">
                <h5>Visuals</h5>
                <div className="circle">
                  <i class="bi bi-chevron-down"></i>
                </div>
              </div>

              <div className="filterSection">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="picture" name='picture'
                    checked={visual.picture}
                    onChange={handleVisualChange}
                  />
                  <label class="form-check-label" for="picture">Profile Picture</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="video" name='video'
                    checked={visual.video}
                    onChange={handleVisualChange}
                  />
                  <label class="form-check-label" for="video">video</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="album" name='album'
                    checked={visual.album}
                    onChange={handleVisualChange}
                  />
                  <label class="form-check-label" for="album">Album</label>
                </div>
              </div>
            </div>

            {/* language */}
            <div className="row-3_3">
              <div className="header">
                <h5>Languages</h5>
                <div className="circle">
                  <i class="bi bi-chevron-down"></i>
                </div>
              </div>

              {/* search mode */}
              <div className="filterSection">
                <h5>Search Mode</h5>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="langAnd" name='langAnd' />
                  <label class="form-check-label" for="langAnd">and</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="langOr" name='langOr'
                    checked={visual.picture}
                    onChange={((e) => (
                      setLang((prev) => ({
                        ...prev,
                        // {searchMode.and: e.target.checked}
                      }))
                    ))}
                  />
                  <label class="form-check-label" for="langOr">or</label>
                </div>
              </div>

              {/* languages */}
              <div className="filterSection">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="any" name='any' />
                  <label class="form-check-label" for="any">Any</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="nederlands" name='nederlands' />
                  <label class="form-check-label" for="nederlands">Nederlands</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="deutsch" name='deutsch' />
                  <label class="form-check-label" for="deutsch">Deutsch</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="français" name='français' />
                  <label class="form-check-label" for="français">Français</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="español" name='español' />
                  <label class="form-check-label" for="español">Español</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="italiano" name='italiano' />
                  <label class="form-check-label" for="italiano">Italiano</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="english" name='english' />
                  <label class="form-check-label" for="english">English</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="português" name='português' />
                  <label class="form-check-label" for="português">Português</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="hindi" name='hindi' />
                  <label class="form-check-label" for="hindi">Hindi</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="tamil" name='tamil' />
                  <label class="form-check-label" for="tamil">Tamil</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="telugu" name='telugu' />
                  <label class="form-check-label" for="telugu">Telugu</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="malyali" name='malyali' />
                  <label class="form-check-label" for="malyali">Malyali</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="kanada" name='kanada' />
                  <label class="form-check-label" for="kanada">Kanada</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="gujrati" name='gujrati' />
                  <label class="form-check-label" for="gujrati">Gujrati</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="panjabi" name='panjabi' />
                  <label class="form-check-label" for="panjabi">Panjabi</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="bengali" name='bengali' />
                  <label class="form-check-label" for="bengali">Bengali</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="marathi" name='marathi' />
                  <label class="form-check-label" for="marathi">Marathi</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="other" name='other' />
                  <label class="form-check-label" for="other">Others</label>
                  <input
                    class="form-input"
                    type="text"
                    id="other"
                    name='other'
                    placeholder='Type your language here'
                  />
                </div>
              </div>
            </div>

            {/* location */}
            <div className="row-3_4">
              <div className="header">
                <h5>Location / Distance</h5>
                <div className="circle">
                  <i class="bi bi-chevron-down"></i>
                </div>
              </div>

              <div className="filterSection">
                <div class="form-check">
                  <input class="form-input" type="text" id="location" name='location' placeholder='Kolkata, West Bengal, IN' />
                  <p>0 mi</p>
                </div>
              </div>
            </div>

            {/* Subscription */}
            <div className="row-3_5">
              <div className="header">
                <h5>Subscription</h5>
                <div className="circle">
                  <i class="bi bi-chevron-down"></i>
                </div>
              </div>

              <div className="filterSection">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="fileMember" name='fileMember' />
                  <label class="form-check-label" for="fileMember">Lifetime Member</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="fullMember" name='fullMember' />
                  <label class="form-check-label" for="fullMember">Full Member</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="trailMember" name='trailMember' />
                  <label class="form-check-label" for="trailMember">Trail Member</label>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="row-3_6">
              <div className="header">
                <h5>Features</h5>
                <div className="circle">
                  <i class="bi bi-chevron-down"></i>
                </div>
              </div>

              {/* search mode */}
              <div className="filterSection">
                <h5>Search Mode</h5>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="featAnd" name='featAnd' />
                  <label class="form-check-label" for="featAnd">and</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="featOr" name='featOr' />
                  <label class="form-check-label" for="featOr">or</label>
                </div>
              </div>

              {/* features */}
              <div className="filterSection">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="certificate" name='certificate' />
                  <label class="form-check-label" for="certificate">Certification</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="hotDate" name='hotDate' />
                  <label class="form-check-label" for="hotDate">Hot Date</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="travelDate" name='travelDate' />
                  <label class="form-check-label" for="travelDate">Travel Date</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="nameKeyword" name='nameKeyword' />
                  <label class="form-check-label" for="nameKeyword">Profile Name/Keyword</label>
                  <input
                    class="form-input"
                    type="text"
                    id="nameKeyword_input"
                    name='nameKeyword_input'
                  />
                </div>
              </div>
            </div>

            {/* Sexuality */}
            <div className="row-3_7">
              <div className="header">
                <h5>Sexuality</h5>
                <div className="circle">
                  <i class="bi bi-chevron-down"></i>
                </div>
              </div>

              {/* search mode */}
              <div className="filterSection">
                <h6>Search Mode</h6>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="sexAnd" name='sexAnd' />
                  <label class="form-check-label" for="sexAnd">and</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="sexOr" name='sexOr' />
                  <label class="form-check-label" for="sexOr">or</label>
                </div>
              </div>

              {/* Females */}
              <h5 className='femaleHeader'>Females</h5>
              <div className="filterSection pt-2">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="f_any" name='f_any' />
                  <label class="form-check-label" for="f_any">Any</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="f_straight" name='f_straight' />
                  <label class="form-check-label" for="f_straight">Straight</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="f_bi-sexual" name='f_bi-sexual' />
                  <label class="form-check-label" for="f_bi-sexual">Bi-sexual</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="f_bi-curious" name='f_bi-curious' />
                  <label class="form-check-label" for="f_bi-curious">Bi-curious</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="lesbian" name='lesbian' />
                  <label class="form-check-label" for="lesbian">Lesbian</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="f_pansexual" name='f_pansexual' />
                  <label class="form-check-label" for="f_pansexual">Pansexual</label>
                </div>
              </div>

              {/* Males */}
              <h5 className='maleHeader'>Males</h5>
              <div className="filterSection pt-2">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="m_any" name='m_any' />
                  <label class="form-check-label" for="m_any">Any</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="m_straight" name='m_straight' />
                  <label class="form-check-label" for="m_straight">Straight</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="m_bi-sexual" name='m_bi-sexual' />
                  <label class="form-check-label" for="m_bi-sexual">Bi-sexual</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="m_bi-curious" name='m_bi-curious' />
                  <label class="form-check-label" for="m_bi-curious">Bi-curious</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="gay" name='gay' />
                  <label class="form-check-label" for="gay">Gay</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="m_pansexual" name='m_pansexual' />
                  <label class="form-check-label" for="m_pansexual">Pansexual</label>
                </div>
              </div>
            </div>

            {/* age */}
            <div className="row-3_8">
              <div className="header">
                <h5>Age</h5>
                <div className="circle">
                  <i className="bi bi-chevron-down"></i>
                </div>
              </div>

              <div className="d-flex pt-3 pb-5 age-wrapper">
                {/* Females */}
                <div className="ageGroup femaleAge">
                  <h6>Females</h6>
                  <div className="sliderRow">
                    <div className="rangeGroup">
                      <input type="range" min="0" max="100" className="range" />
                      <input type="range" min="0" max="100" className="range" />
                    </div>
                    <span className="rangeLabel left">20</span>
                    <span className="rangeLabel right">60</span>
                  </div>
                </div>

                {/* Males */}
                <div className="ageGroup maleAge">
                  <h6>Males</h6>
                  <div className="sliderRow">
                    <div className="rangeGroup">
                      <input type="range" min="0" max="100" className="range blu" />
                      <input type="range" min="0" max="100" className="range blu" />
                    </div>
                    <span className="rangeLabel left">20</span>
                    <span className="rangeLabel right">60</span>
                  </div>
                </div>
              </div>
            </div>



            {/* smoking */}
            <div className="row-3_9">
              <div className="header">
                <h5>Smoking</h5>
                <div className="circle">
                  <i class="bi bi-chevron-down"></i>
                </div>
              </div>

              {/* Females */}
              <h5 className='femaleHeader'>Females</h5>
              <div className="filterSection pt-2">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="f_notImportant" name='f_notImportant' />
                  <label class="form-check-label" for="f_notImportant">Not important</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="f_yes" name='f_yes' />
                  <label class="form-check-label" for="f_yes">Yes</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="f_no" name='f_no' />
                  <label class="form-check-label" for="f_no">No</label>
                </div>

              </div>

              {/* Males */}
              <h5 className='maleHeader'>Males</h5>
              <div className="filterSection pt-2">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="m_notImportant" name='m_notImportant' />
                  <label class="form-check-label" for="m_notImportant">Not important</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="m_yes" name='m_yes' />
                  <label class="form-check-label" for="m_yes">Yes</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="m_no" name='m_no' />
                  <label class="form-check-label" for="m_no">No</label>
                </div>
              </div>
            </div>

            {/* Relationship Orientation */}
            <div className="row-3_10">
              <div className="header">
                <h5>Relationship Orientation</h5>
                <div className="circle">
                  <i class="bi bi-chevron-down"></i>
                </div>
              </div>

              <div className="filterSection">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="relation_any" name='relation_any' />
                  <label class="form-check-label" for="relation_any">Any</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="monogamous" name='monogamous' />
                  <label class="form-check-label" for="monogamous">Monogamous</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="open-Minded" name='open-Minded' />
                  <label class="form-check-label" for="open-Minded">Open-Minded</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="swinger" name='swinger' />
                  <label class="form-check-label" for="swinger">Swinger</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="polyamorous" name='polyamorous' />
                  <label class="form-check-label" for="polyamorous">Polyamorous</label>
                </div>
              </div>
            </div>

            {/* Ethnic background */}
            <div className="row-3_11">
              <div className="header">
                <h5>Ethnic background</h5>
                <div className="circle">
                  <i class="bi bi-chevron-down"></i>
                </div>
              </div>

              <div className="filterSection">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="Ethnic_any" name='Ethnic_any' />
                  <label class="form-check-label" for="Ethnic_any">Any</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="caucasian" name='caucasian' />
                  <label class="form-check-label" for="caucasian">Caucasian</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="latin" name='latin' />
                  <label class="form-check-label" for="latin">Hispanic / Latin</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="african_american" name='african_american' />
                  <label class="form-check-label" for="african_american">Black / African-American</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="asian" name='asian' />
                  <label class="form-check-label" for="asian">Asian</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="indian" name='indian' />
                  <label class="form-check-label" for="indian">Indian</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="pakistani" name='pakistani' />
                  <label class="form-check-label" for="pakistani">Pakistani</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="nepali" name='nepali' />
                  <label class="form-check-label" for="nepali">Nepali</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="sri_lankan" name='sri_lankan' />
                  <label class="form-check-label" for="sri_lankan">Sri lankan</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="bangladeshi" name='bangladeshi' />
                  <label class="form-check-label" for="bangladeshi">Bangladeshi</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="mauritian" name='mauritian' />
                  <label class="form-check-label" for="mauritian">Mauritian</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="Ethnic_other" name='Ethnic_other' />
                  <label class="form-check-label" for="Ethnic_other">Other</label>
                </div>
              </div>
            </div>

            {/* Relationship Orientation */}
            <div className="row-3_12">
              <div className="header">
                <h5>Relationship Orientation</h5>
                <div className="circle">
                  <i class="bi bi-chevron-down"></i>
                </div>
              </div>

              <div className="filterSection">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="hindu" name='hindu' />
                  <label class="form-check-label" for="hindu">Hindu</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="islam" name='islam' />
                  <label class="form-check-label" for="islam">Islam</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="christan" name='christan' />
                  <label class="form-check-label" for="christan">Christan</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="jew" name='jew' />
                  <label class="form-check-label" for="jew">Jew</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="relationship_other" name='relationship_other' />
                  <label class="form-check-label" for="relationship_other">Other</label>
                  <input
                    class="form-input"
                    type="text"
                    id="relationship_input"
                    name='relationship_input'
                  />
                </div>
              </div>
            </div>

            {/* Body type */}
            <div className="row-3_13">
              <div className="header">
                <h5>Body type</h5>
                <div className="circle">
                  <i class="bi bi-chevron-down"></i>
                </div>
              </div>

              {/* search mode */}
              <div className="filterSection">
                <h6>Search Mode</h6>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="body_and" name='body_and' />
                  <label class="form-check-label" for="body_and">and</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="body_or" name='body_or' />
                  <label class="form-check-label" for="body_or">or</label>
                </div>
              </div>

              {/* Females */}
              <h5 className='femaleHeader'>Females</h5>
              <div className="filterSection pt-2">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="body_f_any" name='body_f_any' />
                  <label class="form-check-label" for="body_f_any">Any</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="f_slim" name='f_slim' />
                  <label class="form-check-label" for="f_slim">Slim</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="f_athletic" name='f_athletic' />
                  <label class="form-check-label" for="f_athletic">Athletic</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="f_average" name='f_average' />
                  <label class="form-check-label" for="f_average">Average</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="f_nicely_shaped" name='f_nicely_shaped' />
                  <label class="form-check-label" for="f_nicely_shaped">Nicely Shaped</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="f_love" name='f_love' />
                  <label class="form-check-label" for="f_love">More of me to love</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="f_heavy" name='f_heavy' />
                  <label class="form-check-label" for="f_heavy">Huggable and Heavy</label>
                </div>
              </div>

              {/* Males */}
              <h5 className='maleHeader'>Males</h5>
              <div className="filterSection pt-2">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="body_m_any" name='body_m_any' />
                  <label class="form-check-label" for="body_m_any">Any</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="m_slim" name='m_slim' />
                  <label class="form-check-label" for="m_slim">Slim</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="m_athletic" name='m_athletic' />
                  <label class="form-check-label" for="m_athletic">Athletic</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="m_average" name='m_average' />
                  <label class="form-check-label" for="m_average">Average</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="m_nicely_shaped" name='m_nicely_shaped' />
                  <label class="form-check-label" for="m_nicely_shaped">Nicely Shaped</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="m_love" name='m_love' />
                  <label class="form-check-label" for="m_love">More of me to love</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="m_heavy" name='m_heavy' />
                  <label class="form-check-label" for="m_heavy">Huggable and Heavy</label>
                </div>
              </div>
            </div>

            <div className="row-4">
              <h6>Reset Search</h6>
              <div class="form-check form-switch">
                <label class="form-check-label" for="flexSwitchCheckDefault">Save Search</label>
                <input class="no-radius form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
              </div>
            </div>

            <div className="row-5">
              <button className='submitBtn'>Submit</button>
            </div>

          </div>
        </div>
      </PageWrapper>
    </>
  )
}

export default AdvanceMemberSearch