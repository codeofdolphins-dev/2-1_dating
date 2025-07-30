import React, { useEffect, useState } from 'react'
import "./AdvanceMemberSearch.css"
import PageWrapper from '../../components/PageWrapper'
import { useNavigate } from 'react-router-dom'

const AdvanceMemberSearch = () => {

  const navigate = useNavigate();

  const [femaleMinValue, setFemaleMinValue] = useState(100);
  const [femaleMaxValue, setFemaleMaxValue] = useState(10);

  const [maleMinValue, setMaleMinValue] = useState(100);
  const [maleMaxValue, setMaleMaxValue] = useState(10);


  const [LocationValue, setLocationValue] = useState(10);


  //  for female
  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), femaleMinValue + 1);
    setFemaleMinValue(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), femaleMaxValue - 1);
    setFemaleMaxValue(value);
  };

  //for male
  const handleMinChangeForMale = (e) => {
    const value = Math.min(Number(e.target.value), maleMinValue + 1);
    setMaleMinValue(value);
  };

  const handleMaxChangeForMale = (e) => {
    const value = Math.max(Number(e.target.value), maleMaxValue - 1);
    setMaleMaxValue(value);
  };

  //location slider

  const handleLocationSliderChange = (e) => {
    const value = Math.min(Number(e.target.value), LocationValue + 1);
    setLocationValue(value);
  };




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
    bengali: false,
    marathi: false,
    other: {
      selected: false,
      text: ""
    }
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
    profileName: {
      selected: false,
      text: ""
    }
  });
  const [sexuality, setSexuality] = useState({
    searchMode: {
      and: false,
      or: false
    },
    female: {
      any: false,
      straight: false,
      bi_sexual: false,
      bi_curious: false,
      lesbian: false,
      pansexual: false
    },
    male: {
      any: false,
      straight: false,
      bi_sexual: false,
      bi_curious: false,
      gay: false,
      pansexual: false
    }
  });
  const [smoking, setSmoking] = useState({
    male: {
      not_important: false,
      no: false,
      yes: false
    },
    female: {
      not_important: false,
      no: false,
      yes: false
    }
  });
  const [relationship, setRelationship] = useState({
    relation_any: false,
    monogamous: false,
    open_minded: false,
    swinger: false,
    polyamorous: false
  });
  const [ethnic_background, setEthnic_background] = useState({
    Ethnic_any: false,
    caucasian: false,
    latin: false,
    african_american: false,
    asian: false,
    indian: false,
    pakistani: false,
    nepali: false,
    sri_lankan: false,
    bangladeshi: false,
    mauritian: false,
    Ethnic_other: false
  });
  const [relationship_orientation, setRelationship_orientation] = useState({
    hindu: false,
    islam: false,
    christan: false,
    jew: false,
    relationship_other: false
  });
  const [body_type, setBody_type] = useState({
    searchMode: {
      and: false,
      or: false
    },
    female: {
      any: false,
      slim: false,
      athletic: false,
      average: false,
      nicely_shaped: false,
      me_to_love: false,
      huggable_and_heavy: false,
    },
    male: {
      any: false,
      slim: false,
      athletic: false,
      average: false,
      nicely_shaped: false,
      me_to_love: false,
      huggable_and_heavy: false,
    }
  });

  const [save_search, setSave_search] = useState(false);


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
  const handleLangChange = (e) => {
    const { name, checked } = e.target;
    setLang((prev) => ({
      ...prev,
      [name]: checked
    }));
  };
  const handleSubscriptionChange = (e) => {
    const { name, checked } = e.target;
    setSubscription((prev) => ({
      ...prev,
      [name]: checked
    }));
  };
  const handleFeaturesChange = (e) => {
    const { name, checked } = e.target;
    setFeatures((prev) => ({
      ...prev,
      [name]: checked
    }));
  };
  const handleRelationshipChange = (e) => {
    const { name, checked } = e.target;
    setRelationship((prev) => ({
      ...prev,
      [name]: checked
    }));
  };
  const handleEthnic_backgroundChange = (e) => {
    const { name, checked } = e.target;
    setEthnic_background((prev) => ({
      ...prev,
      [name]: checked
    }));
  };
  const handleRelationship_orientationChange = (e) => {
    const { name, checked } = e.target;
    setRelationship_orientation((prev) => ({
      ...prev,
      [name]: checked
    }));
  };

  const handelSubmit = () => {};

  return (
    <>
      <PageWrapper>
        <div className="container-fluid py-5 px-5 d-flex flex-column align-items-start justify-content-center gap-2" style={{ backgroundColor: "var(--color-background)" }}>

          {/* row 1 */}
          <div className="row-1 text-white">
            <div className="d-flex justify-content-start align-items-center gap-3">
              <i 
                className="bi bi-chevron-left fs-5 text-white back-icon"
                onClick={() => navigate("/feed")}
              ></i>
              <h4 className='text-white mb-0'>Member Search</h4>
            </div>
            <p className='para mt-2'>Select who you are looking for and refine your search parameters in the sections below. Next to "Search Mode", you can either select "and" to narrow down your search results to show profiles that have all the features you select below; or you can select "or" to show profiles that have minimum one of the features you select below.</p>
          </div>

          {/* row 2 */}
          <div className="row-2 d-flex justify-content-start align-items-center gap-2">
            <input
              type="text"
              value={search}
              onChange={() => setSearch(e.target.value)}
              placeholder='Login Name'
              className='customeTextBox'
            />
            <button>Submit</button>
          </div>

          {/* row 3 */}
          <div className="row-3 text-white">

            <div className="row-3_0">
              <h5>What you are looking for</h5>
              <div className="filterSection">
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="couple"
                    name='couple'
                    checked={lookingFor.couple}
                    onChange={handleLookingForChange}
                  />
                  <label className="form-check-label" htmlFor="couple">Couple Female / Male</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="female"
                    name='female'
                    checked={lookingFor.female}
                    onChange={handleLookingForChange}
                  />
                  <label className="form-check-label" htmlFor="female">Female</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="male"
                    name='male'
                    checked={lookingFor.male}
                    onChange={handleLookingForChange}
                  />
                  <label className="form-check-label" htmlFor="male">Male</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="transgender"
                    name='transgender'
                    checked={lookingFor.transgender}
                    onChange={handleLookingForChange}
                  />
                  <label className="form-check-label" htmlFor="transgender">Transgender</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="business"
                    name='business'
                    checked={lookingFor.business}
                    onChange={handleLookingForChange}
                  />
                  <label className="form-check-label" htmlFor="business">Businesses</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="me_us"
                    name='me_us'
                    checked={lookingFor.me_us}
                    onChange={handleLookingForChange}
                  />
                  <label className="form-check-label" htmlFor="me_us">Looking for me / us</label>
                </div>
              </div>
            </div>

            <div className="row-3_1">
              <div className="header">
                <h5>Status</h5>
                <div className="circle">
                  <i className="bi bi-chevron-down"></i>
                </div>
              </div>

              <div className="filterSection">
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="online"
                    name='online'
                    checked={status.online}
                    onChange={handleStatusChange}
                  />
                  <label className="form-check-label" htmlFor="online">Online</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="newMember"
                    name='newMember'
                    checked={status.newMember}
                    onChange={handleStatusChange}
                  />
                  <label className="form-check-label" htmlFor="newMember">New Member</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="birthday"
                    name='birthday'
                    checked={status.birthday}
                    onChange={handleStatusChange}
                  />
                  <label className="form-check-label" htmlFor="birthday">Has a Birthday</label>
                </div>
              </div>
            </div>

            <div className="row-3_2">
              <div className="header">
                <h5>Visuals</h5>
                <div className="circle">
                  <i className="bi bi-chevron-down"></i>
                </div>
              </div>

              <div className="filterSection">
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="picture"
                    name='picture'
                    checked={visual.picture}
                    onChange={handleVisualChange}
                  />
                  <label className="form-check-label" htmlFor="picture">Profile Picture</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="video"
                    name='video'
                    checked={visual.video}
                    onChange={handleVisualChange}
                  />
                  <label className="form-check-label" htmlFor="video">video</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="album"
                    name='album'
                    checked={visual.album}
                    onChange={handleVisualChange}
                  />
                  <label className="form-check-label" htmlFor="album">Album</label>
                </div>
              </div>
            </div>

            {/* language */}
            <div className="row-3_3">
              <div className="header">
                <h5>Languages</h5>
                <div className="circle">
                  <i className="bi bi-chevron-down"></i>
                </div>
              </div>

              {/* search mode */}
              <div className="filterSection">
                <h5>Search Mode</h5>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="langAnd"
                    name='langAnd'
                    checked={lang.searchMode.and}
                    onChange={(e) =>
                      setLang((prev) => ({
                        ...prev,
                        searchMode: {
                          ...prev.searchMode,
                          and: e.target.checked
                        }
                      }))
                    }
                  />
                  <label className="form-check-label" htmlFor="langAnd">and</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="langOr"
                    name='langOr'
                    checked={lang.searchMode.or}
                    onChange={(e) =>
                      setLang((prev) => ({
                        ...prev,
                        searchMode: {
                          ...prev.searchMode,
                          or: e.target.checked
                        }
                      }))
                    }
                  />
                  <label className="form-check-label" htmlFor="langOr">or</label>
                </div>
              </div>

              {/* languages */}
              <div className="filterSection">
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="any"
                    name='any'
                    checked={lang.any}
                    onChange={handleLangChange}
                  />
                  <label className="form-check-label" htmlFor="any">Any</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="nederlands"
                    name='nederlands'
                    checked={lang.nederlands}
                    onChange={handleLangChange}
                  />
                  <label className="form-check-label" htmlFor="nederlands">Nederlands</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="deutsch"
                    name='deutsch'
                    checked={lang.deutsch}
                    onChange={handleLangChange}
                  />
                  <label className="form-check-label" htmlFor="deutsch">Deutsch</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="français"
                    name='français'
                    checked={lang.français}
                    onChange={handleLangChange}
                  />
                  <label className="form-check-label" htmlFor="français">Français</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="español"
                    name='español'
                    checked={lang.español}
                    onChange={handleLangChange}
                  />
                  <label className="form-check-label" htmlFor="español">Español</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="italiano"
                    name='italiano'
                    checked={lang.italiano}
                    onChange={handleLangChange}
                  />
                  <label className="form-check-label" htmlFor="italiano">Italiano</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="english"
                    name='english'
                    checked={lang.english}
                    onChange={handleLangChange}
                  />
                  <label className="form-check-label" htmlFor="english">English</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="português"
                    name='português'
                    checked={lang.português}
                    onChange={handleLangChange}
                  />
                  <label className="form-check-label" htmlFor="português">Português</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="hindi"
                    name='hindi'
                    checked={lang.hindi}
                    onChange={handleLangChange}
                  />
                  <label className="form-check-label" htmlFor="hindi">Hindi</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="tamil"
                    name='tamil'
                    checked={lang.tamil}
                    onChange={handleLangChange}
                  />
                  <label className="form-check-label" htmlFor="tamil">Tamil</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="telugu"
                    name='telugu'
                    checked={lang.telugu}
                    onChange={handleLangChange}
                  />
                  <label className="form-check-label" htmlFor="telugu">Telugu</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="malyali"
                    name='malyali'
                    checked={lang.malyali}
                    onChange={handleLangChange}
                  />
                  <label className="form-check-label" htmlFor="malyali">Malyali</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="kanada"
                    name='kanada'
                    checked={lang.kanada}
                    onChange={handleLangChange}
                  />
                  <label className="form-check-label" htmlFor="kanada">Kanada</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="gujrati"
                    name='gujrati'
                    checked={lang.gujrati}
                    onChange={handleLangChange}
                  />
                  <label className="form-check-label" htmlFor="gujrati">Gujrati</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="panjabi"
                    name='panjabi'
                    checked={lang.panjabi}
                    onChange={handleLangChange}
                  />
                  <label className="form-check-label" htmlFor="panjabi">Panjabi</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="bengali"
                    name='bengali'
                    checked={lang.bengali}
                    onChange={handleLangChange}
                  />
                  <label className="form-check-label" htmlFor="bengali">Bengali</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="marathi"
                    name='marathi'
                    checked={lang.marathi}
                    onChange={handleLangChange}
                  />
                  <label className="form-check-label" htmlFor="marathi">Marathi</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="other"
                    name='other'
                    checked={lang.other.selected}
                    onChange={(e) =>
                      setLang((prev) => ({
                        ...prev,
                        other: {
                          ...prev.other,
                          selected: e.target.checked
                        }
                      }))
                    }
                  />
                  <label className="form-check-label" htmlFor="other">Others</label>
                  <input
                    className="form-input inputFiled-background customeTextBox"
                    type="text"
                    id="other"
                    name='other'
                    placeholder='Type your language here'
                    value={lang.other.text}
                    onChange={(e) =>
                      setLang((prev) => ({
                        ...prev,
                        other: {
                          ...prev.other,
                          text: e.target.value
                        }
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            {/* location */}
            <div className="row-3_4">
              <div className="header">
                <h5>Location / Distance</h5>
                <div className="circle">
                  <i className="bi bi-chevron-down"></i>
                </div>
              </div>

              <div className="filterSection" style={{ width: '100%' }}>
                <div
                  className="custome-form-check"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.5rem',
                    width: '40%',
                  }}
                >
                  <input className="form-input inputFiled-background customeTextBox"
                    type="text"
                    id="location"
                    name="location"
                    placeholder="Kolkata, West Bengal, IN"
                    style={{ flexGrow: 1 }}

                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                  <p style={{ margin: 0, whiteSpace: 'nowrap' }}>{LocationValue} mi</p>
                </div>

                <div className="loction-range w-100" style={{ marginTop: '0.5rem' }}>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={LocationValue}
                    onChange={handleLocationSliderChange}
                    className="range"
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

            </div>

            {/* Subscription */}
            <div className="row-3_5">
              <div className="header">
                <h5>Subscription</h5>
                <div className="circle">
                  <i className="bi bi-chevron-down"></i>
                </div>
              </div>

              <div className="filterSection">
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="lifeTime"
                    name='lifeTime'
                    checked={subscription.lifeTime}
                    onChange={handleSubscriptionChange}
                  />
                  <label className="form-check-label" htmlFor="lifeTime">Lifetime Member</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="fullMember" name='fullMember'
                    checked={subscription.fullMember}
                    onChange={handleSubscriptionChange}
                  />
                  <label className="form-check-label" htmlFor="fullMember">Full Member</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="trailMember"
                    name='trailMember'
                    checked={subscription.trailMember}
                    onChange={handleSubscriptionChange}
                  />
                  <label className="form-check-label" htmlFor="trailMember">Trail Member</label>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="row-3_6">
              <div className="header">
                <h5>Features</h5>
                <div className="circle">
                  <i className="bi bi-chevron-down"></i>
                </div>
              </div>

              {/* search mode */}
              <div className="filterSection">
                <h5>Search Mode</h5>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="featAnd" name='featAnd'
                    checked={features.searchMode.and}
                    onChange={(e) =>
                      setFeatures((prev) => ({
                        ...prev,
                        searchMode: {
                          ...prev.searchMode,
                          and: e.target.checked
                        }
                      }))
                    }
                  />
                  <label className="form-check-label" htmlFor="featAnd">and</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="featOr" name='featOr'
                    checked={features.searchMode.or}
                    onChange={(e) =>
                      setFeatures((prev) => ({
                        ...prev,
                        searchMode: {
                          ...prev.searchMode,
                          or: e.target.checked
                        }
                      }))
                    }
                  />
                  <label className="form-check-label" htmlFor="featOr">or</label>
                </div>
              </div>

              {/* features */}
              <div className="filterSection">
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="certificate"
                    name='certificate'
                    checked={features.certificate}
                    onChange={handleFeaturesChange}
                  />
                  <label className="form-check-label" htmlFor="certificate">Certification</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="hotDate"
                    name='hotDate'
                    checked={features.hotDate}
                    onChange={handleFeaturesChange}
                  />
                  <label className="form-check-label" htmlFor="hotDate">Hot Date</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="travelDate"
                    name='travelDate'
                    checked={features.travelDate}
                    onChange={handleFeaturesChange}
                  />
                  <label className="form-check-label" htmlFor="travelDate">Travel Date</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="nameKeyword" name='nameKeyword'
                    checked={features.profileName.selected}
                    onChange={(e) =>
                      setFeatures((prev) => ({
                        ...prev,
                        profileName: {
                          ...prev.profileName,
                          selected: e.target.checked
                        }
                      }))
                    }
                  />
                  <label className="form-check-label" htmlFor="nameKeyword">Profile Name/Keyword</label>
                  <input
                    className="form-input inputFiled-background customeTextBox"
                    type="text"
                    id="nameKeyword_input"
                    name='nameKeyword_input'
                    placeholder='Type...'
                    value={features.profileName.text}
                    onChange={(e) =>
                      setFeatures((prev) => ({
                        ...prev,
                        profileName: {
                          ...prev.profileName,
                          text: e.target.value
                        }
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            {/* Sexuality */}
            <div className="row-3_7">
              <div className="header">
                <h5>Sexuality</h5>
                <div className="circle">
                  <i className="bi bi-chevron-down"></i>
                </div>
              </div>

              {/* search mode */}
              <div className="filterSection">
                <h6>Search Mode</h6>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="sexAnd" name='sexAnd'
                    checked={sexuality.searchMode.and}
                    onChange={(e) =>
                      setSexuality((prev) => ({
                        ...prev,
                        searchMode: {
                          ...prev.searchMode,
                          and: e.target.checked
                        }
                      }))
                    }
                  />
                  <label className="form-check-label" htmlFor="sexAnd">and</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="sexOr" name='sexOr'
                    checked={sexuality.searchMode.or}
                    onChange={(e) =>
                      setSexuality((prev) => ({
                        ...prev,
                        searchMode: {
                          ...prev.searchMode,
                          or: e.target.checked
                        }
                      }))
                    }
                  />
                  <label className="form-check-label" htmlFor="sexOr">or</label>
                </div>
              </div>

              {/* Females */}
              <h5 className='femaleHeader'>Females</h5>
              <div className="filterSection pt-2">
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="f_any" name='f_any'
                    checked={sexuality.female.any}
                    onChange={(e) =>
                      setSexuality((prev) => ({
                        ...prev,
                        female: {
                          ...prev.female,
                          any: e.target.checked
                        }
                      }))
                    }
                  />
                  <label className="form-check-label" htmlFor="f_any">Any</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="f_straight" name='f_straight'
                    checked={sexuality.female.straight}
                    onChange={(e) =>
                      setSexuality((prev) => ({
                        ...prev,
                        female: {
                          ...prev.female,
                          straight: e.target.checked
                        }
                      }))
                    }
                  />
                  <label className="form-check-label" htmlFor="f_straight">Straight</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="f_bi-sexual" name='f_bi-sexual'
                    checked={sexuality.female.bi_sexual}
                    onChange={(e) =>
                      setSexuality((prev) => ({
                        ...prev,
                        female: {
                          ...prev.female,
                          bi_sexual: e.target.checked
                        }
                      }))
                    }
                  />
                  <label className="form-check-label" htmlFor="f_bi-sexual">Bi-sexual</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="f_bi-curious" name='f_bi-curious'
                    checked={sexuality.female.bi_curious}
                    onChange={(e) =>
                      setSexuality((prev) => ({
                        ...prev,
                        female: {
                          ...prev.female,
                          bi_curious: e.target.checked
                        }
                      }))
                    }
                  />
                  <label className="form-check-label" htmlFor="f_bi-curious">Bi-curious</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="lesbian" name='lesbian'
                    checked={sexuality.female.lesbian}
                    onChange={(e) =>
                      setSexuality((prev) => ({
                        ...prev,
                        female: {
                          ...prev.female,
                          lesbian: e.target.checked
                        }
                      }))
                    }
                  />
                  <label className="form-check-label" htmlFor="lesbian">Lesbian</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="f_pansexual" name='f_pansexual'
                    checked={sexuality.female.pansexual}
                    onChange={(e) =>
                      setSexuality((prev) => ({
                        ...prev,
                        female: {
                          ...prev.female,
                          pansexual: e.target.checked
                        }
                      }))
                    }
                  />
                  <label className="form-check-label" htmlFor="f_pansexual">Pansexual</label>
                </div>
              </div>

              {/* Males */}
              <h5 className='maleHeader'>Males</h5>
              <div className="filterSection pt-2">
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="m_any" name='m_any'
                    checked={sexuality.male.any}
                    onChange={(e) =>
                      setSexuality((prev) => ({
                        ...prev,
                        male: {
                          ...prev.male,
                          any: e.target.checked
                        }
                      }))
                    }
                  />
                  <label className="form-check-label" htmlFor="m_any">Any</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="m_straight" name='m_straight'
                    checked={sexuality.male.straight}
                    onChange={(e) =>
                      setSexuality((prev) => ({
                        ...prev,
                        male: {
                          ...prev.male,
                          straight: e.target.checked
                        }
                      }))
                    }
                  />
                  <label className="form-check-label" htmlFor="m_straight">Straight</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="m_bi-sexual" name='m_bi-sexual'
                    checked={sexuality.male.bi_sexual}
                    onChange={(e) =>
                      setSexuality((prev) => ({
                        ...prev,
                        male: {
                          ...prev.male,
                          bi_sexual: e.target.checked
                        }
                      }))
                    }
                  />
                  <label className="form-check-label" htmlFor="m_bi-sexual">Bi-sexual</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="m_bi-curious" name='m_bi-curious'
                    checked={sexuality.male.bi_curious}
                    onChange={(e) =>
                      setSexuality((prev) => ({
                        ...prev,
                        male: {
                          ...prev.male,
                          bi_curious: e.target.checked
                        }
                      }))
                    }
                  />
                  <label className="form-check-label" htmlFor="m_bi-curious">Bi-curious</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="gay" name='gay'
                    checked={sexuality.male.gay}
                    onChange={(e) =>
                      setSexuality((prev) => ({
                        ...prev,
                        male: {
                          ...prev.male,
                          gay: e.target.checked
                        }
                      }))
                    }
                  />
                  <label className="form-check-label" htmlFor="gay">Gay</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="m_pansexual" name='m_pansexual'
                    checked={sexuality.male.pansexual}
                    onChange={(e) =>
                      setSexuality((prev) => ({
                        ...prev,
                        male: {
                          ...prev.male,
                          pansexual: e.target.checked
                        }
                      }))
                    }
                  />
                  <label className="form-check-label" htmlFor="m_pansexual">Pansexual</label>
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
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={femaleMinValue}
                        onChange={handleMinChange}
                        className="range"
                      />
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={femaleMaxValue}
                        onChange={handleMaxChange}
                        className="range"
                      />
                    </div>
                    <span className="rangeLabel left">{femaleMinValue}</span>
                    <span className="rangeLabel right">{femaleMaxValue}</span>
                  </div>
                </div>

                {/* Males */}
                <div className="ageGroup maleAge">
                  <h6>Males</h6>
                  <div className="sliderRow">
                    <div className="rangeGroup">
                      <input type="range"
                        min="0"
                        max="100"
                        value={maleMinValue}
                        onChange={handleMinChangeForMale}
                        className="range blu"
                      />
                      <input type="range"
                        min="0"
                        max="100"
                        value={maleMaxValue}
                        onChange={handleMaxChangeForMale}
                        className="range blu"
                      />
                    </div>
                    <span className="rangeLabel left">{maleMinValue}</span>
                    <span className="rangeLabel right">{maleMaxValue}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* smoking */}
            <div className="row-3_9">
              <div className="header">
                <h5>Smoking</h5>
                <div className="circle">
                  <i className="bi bi-chevron-down"></i>
                </div>
              </div>

              {/* Females */}
              <h5 className='femaleHeader'>Females</h5>
              <div className="filterSection pt-2">
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="f_notImportant" name='f_notImportant'
                    checked={smoking.female.not_important}
                    onChange={(e) =>
                      setSmoking((prev) => ({
                        ...prev,
                        female: {
                          ...prev.female,
                          not_important: e.target.checked
                        }
                      }))
                    }
                  />
                  <label className="form-check-label" htmlFor="f_notImportant">Not important</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="f_yes" name='f_yes'
                    checked={smoking.female.yes}
                    onChange={(e) =>
                      setSmoking((prev) => ({
                        ...prev,
                        female: {
                          ...prev.female,
                          yes: e.target.checked
                        }
                      }))
                    }
                  />
                  <label className="form-check-label" htmlFor="f_yes">Yes</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="f_no" name='f_no'
                    checked={smoking.female.no}
                    onChange={(e) =>
                      setSmoking((prev) => ({
                        ...prev,
                        female: {
                          ...prev.female,
                          no: e.target.checked
                        }
                      }))
                    }
                  />
                  <label className="form-check-label" htmlFor="f_no">No</label>
                </div>

              </div>

              {/* Males */}
              <h5 className='maleHeader'>Males</h5>
              <div className="filterSection pt-2">
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="m_notImportant" name='m_notImportant'
                    checked={smoking.male.not_important}
                    onChange={(e) =>
                      setSmoking((prev) => ({
                        ...prev,
                        male: {
                          ...prev.male,
                          not_important: e.target.checked
                        }
                      }))
                    }
                  />
                  <label className="form-check-label" htmlFor="m_notImportant">Not important</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="m_yes" name='m_yes'
                    checked={smoking.male.yes}
                    onChange={(e) =>
                      setSmoking((prev) => ({
                        ...prev,
                        male: {
                          ...prev.male,
                          yes: e.target.checked
                        }
                      }))
                    }
                  />
                  <label className="form-check-label" htmlFor="m_yes">Yes</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="m_no" name='m_no'
                    checked={smoking.male.no}
                    onChange={(e) =>
                      setSmoking((prev) => ({
                        ...prev,
                        male: {
                          ...prev.male,
                          no: e.target.checked
                        }
                      }))
                    }
                  />
                  <label className="form-check-label" htmlFor="m_no">No</label>
                </div>
              </div>
            </div>

            {/* Relationship Orientation */}
            <div className="row-3_10">
              <div className="header">
                <h5>Relationship Orientation</h5>
                <div className="circle">
                  <i className="bi bi-chevron-down"></i>
                </div>
              </div>

              <div className="filterSection">
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="relation_any"
                    name='relation_any'
                    checked={relationship.relation_any}
                    onChange={handleRelationshipChange}
                  />
                  <label className="form-check-label" htmlFor="relation_any">Any</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="monogamous"
                    name='monogamous'
                    checked={relationship.monogamous}
                    onChange={handleRelationshipChange}
                  />
                  <label className="form-check-label" htmlFor="monogamous">Monogamous</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="open_minded"
                    name='open_minded'
                    checked={relationship.open_minded}
                    onChange={handleRelationshipChange}
                  />
                  <label className="form-check-label" htmlFor="open-Minded">Open-Minded</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="swinger"
                    name='swinger'
                    checked={relationship.swinger}
                    onChange={handleRelationshipChange}
                  />
                  <label className="form-check-label" htmlFor="swinger">Swinger</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="polyamorous"
                    name='polyamorous'
                    checked={relationship.polyamorous}
                    onChange={handleRelationshipChange}
                  />
                  <label className="form-check-label" htmlFor="polyamorous">Polyamorous</label>
                </div>
              </div>
            </div>

            {/* Ethnic background */}
            <div className="row-3_11">
              <div className="header">
                <h5>Ethnic background</h5>
                <div className="circle">
                  <i className="bi bi-chevron-down"></i>
                </div>
              </div>

              <div className="filterSection">
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="Ethnic_any"
                    name='Ethnic_any'
                    checked={ethnic_background.Ethnic_any}
                    onChange={handleEthnic_backgroundChange}
                  />
                  <label className="form-check-label" htmlFor="Ethnic_any">Any</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="caucasian"
                    name='caucasian'
                    checked={ethnic_background.caucasian}
                    onChange={handleEthnic_backgroundChange}
                  />
                  <label className="form-check-label" htmlFor="caucasian">Caucasian</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="latin"
                    name='latin'
                    checked={ethnic_background.latin}
                    onChange={handleEthnic_backgroundChange}
                  />
                  <label className="form-check-label" htmlFor="latin">Hispanic / Latin</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="african_american"
                    name='african_american'
                    checked={ethnic_background.african_american}
                    onChange={handleEthnic_backgroundChange}
                  />
                  <label className="form-check-label" htmlFor="african_american">Black / African-American</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="asian"
                    name='asian'
                    checked={ethnic_background.asian}
                    onChange={handleEthnic_backgroundChange}
                  />
                  <label className="form-check-label" htmlFor="asian">Asian</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="indian"
                    name='indian'
                    checked={ethnic_background.indian}
                    onChange={handleEthnic_backgroundChange}
                  />
                  <label className="form-check-label" htmlFor="indian">Indian</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="pakistani"
                    name='pakistani'
                    checked={ethnic_background.pakistani}
                    onChange={handleEthnic_backgroundChange}
                  />
                  <label className="form-check-label" htmlFor="pakistani">Pakistani</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="nepali"
                    name='nepali'
                    checked={ethnic_background.nepali}
                    onChange={handleEthnic_backgroundChange}
                  />
                  <label className="form-check-label" htmlFor="nepali">Nepali</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="sri_lankan"
                    name='sri_lankan'
                    checked={ethnic_background.sri_lankan}
                    onChange={handleEthnic_backgroundChange}
                  />
                  <label className="form-check-label" htmlFor="sri_lankan">Sri lankan</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="bangladeshi"
                    name='bangladeshi'
                    checked={ethnic_background.bangladeshi}
                    onChange={handleEthnic_backgroundChange}
                  />
                  <label className="form-check-label" htmlFor="bangladeshi">Bangladeshi</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="mauritian"
                    name='mauritian'
                    checked={ethnic_background.mauritian}
                    onChange={handleEthnic_backgroundChange}
                  />
                  <label className="form-check-label" htmlFor="mauritian">Mauritian</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="Ethnic_other"
                    name='Ethnic_other'
                    checked={ethnic_background.Ethnic_other}
                    onChange={handleEthnic_backgroundChange}
                  />
                  <label className="form-check-label" htmlFor="Ethnic_other">Other</label>
                </div>
              </div>
            </div>

            {/* Relationship Orientation */}
            <div className="row-3_12">
              <div className="header">
                <h5>Relationship Orientation</h5>
                <div className="circle">
                  <i className="bi bi-chevron-down"></i>
                </div>
              </div>

              <div className="filterSection">
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="hindu"
                    name='hindu'
                    checked={relationship_orientation.hindu}
                    onChange={handleRelationship_orientationChange}
                  />
                  <label className="form-check-label" htmlFor="hindu">Hindu</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="islam"
                    name='islam'
                    checked={relationship_orientation.islam}
                    onChange={handleRelationship_orientationChange}
                  />
                  <label className="form-check-label" htmlFor="islam">Islam</label>
                </div>
                <div clasNamclass="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="christan"
                    name='christan'
                    checked={relationship_orientation.christan}
                    onChange={handleRelationship_orientationChange}
                  />
                  <label className="form-check-label" htmlFor="christan">Christan</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="jew"
                    name='jew'
                    checked={relationship_orientation.jew}
                    onChange={handleRelationship_orientationChange}
                  />
                  <label className="form-check-label" htmlFor="jew">Jew</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input " type="checkbox" id="relationship_other"
                    name='relationship_other'
                    checked={relationship_orientation.relationship_other}
                    onChange={handleRelationship_orientationChange}
                  />
                  <label className="form-check-label" htmlFor="relationship_other">Other</label>
                  <input
                    className="form-input inputFiled-background customeTextBox"
                    type="text"
                    id="relationship_input"
                    name='relationship_input'
                    placeholder='Other...'
                  />
                </div>
              </div>
            </div>

            {/* Body type */}
            <div className="row-3_13">
              <div className="header">
                <h5>Body type</h5>
                <div className="circle">
                  <i className="bi bi-chevron-down"></i>
                </div>
              </div>

              {/* search mode */}
              <div className="filterSection">
                <h6>Search Mode</h6>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="body_and" name='body_and'
                    checked={body_type.searchMode.and}
                    onChange={(e) =>
                      setBody_type((prev) => ({
                        ...prev,
                        searchMode: {
                          ...prev.searchMode,
                          and: e.target.checked
                        }
                      }))
                    }
                  />
                  <label className="form-check-label" htmlFor="body_and">and</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="body_or" name='body_or'
                    checked={body_type.searchMode.or}
                    onChange={(e) =>
                      setBody_type((prev) => ({
                        ...prev,
                        searchMode: {
                          ...prev.searchMode,
                          or: e.target.checked
                        }
                      }))
                    }
                  />
                  <label className="form-check-label" htmlFor="body_or">or</label>
                </div>
              </div>

              {/* Females */}
              <h5 className='femaleHeader'>Females</h5>
              <div className="filterSection pt-2">
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="body_f_any" name='body_f_any'
                    checked={body_type.female.any}
                    onChange={(e) =>
                      setBody_type((prev) => ({
                        ...prev,
                        female: {
                          ...prev.female,
                          any: e.target.checked
                        }
                      }))
                    }
                  />
                  <label className="form-check-label" htmlFor="body_f_any">Any</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="f_slim" name='f_slim'
                    checked={body_type.female.slim}
                    onChange={(e) =>
                      setBody_type((prev) => ({
                        ...prev,
                        female: {
                          ...prev.female,
                          slim: e.target.checked
                        }
                      }))
                    }
                  />
                  <label className="form-check-label" htmlFor="f_slim">Slim</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="f_athletic" name='f_athletic'
                    checked={body_type.female.athletic}
                    onChange={(e) =>
                      setBody_type((prev) => ({
                        ...prev,
                        female: {
                          ...prev.female,
                          athletic: e.target.checked
                        }
                      }))
                    }
                  />
                  <label className="form-check-label" htmlFor="f_athletic">Athletic</label>
                </div>
                <div class="custome-form-check">
                  <input class="form-check-input custome-form-check-input" type="checkbox" id="f_average" name='f_average'
                    checked={body_type.female.average}
                    onChange={(e) =>
                      setBody_type((prev) => ({
                        ...prev,
                        female: {
                          ...prev.female,
                          average: e.target.checked
                        }
                      }))
                    }
                  />
                  <label class="form-check-label" htmlFor="f_average">Average</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="f_nicely_shaped" name='f_nicely_shaped'
                    checked={body_type.female.nicely_shaped}
                    onChange={(e) =>
                      setBody_type((prev) => ({
                        ...prev,
                        female: {
                          ...prev.female,
                          nicely_shaped: e.target.checked
                        }
                      }))
                    }
                  />
                  <label className="form-check-label" htmlFor="f_nicely_shaped">Nicely Shaped</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="f_love" name='f_love'
                    checked={body_type.female.me_to_love}
                    onChange={(e) =>
                      setBody_type((prev) => ({
                        ...prev,
                        female: {
                          ...prev.female,
                          me_to_love: e.target.checked
                        }
                      }))
                    }
                  />
                  <label className="form-check-label" htmlFor="f_love">More of me to love</label>
                </div>
                <div className="custome-form-check">
                  <input className="form-check-input custome-form-check-input" type="checkbox" id="f_heavy" name='f_heavy'
                    checked={body_type.female.huggable_and_heavy}
                    onChange={(e) =>
                      setBody_type((prev) => ({
                        ...prev,
                        female: {
                          ...prev.female,
                          huggable_and_heavy: e.target.checked
                        }
                      }))
                    }
                  />
                  <label className="form-check-label" htmlFor="f_heavy">Huggable and Heavy</label>
                </div>
              </div>

              {/* Males */}
              <h5 className='maleHeader'>Males</h5>
              <div className="filterSection pt-2">
                <div class="custome-form-check">
                  <input class="form-check-input custome-form-check-input" type="checkbox" id="body_m_any" name='body_m_any'
                    checked={body_type.male.any}
                    onChange={(e) =>
                      setBody_type((prev) => ({
                        ...prev,
                        male: {
                          ...prev.male,
                          any: e.target.checked
                        }
                      }))
                    }
                  />
                  <label class="form-check-label" for="body_m_any">Any</label>
                </div>
                <div class="custome-form-check">
                  <input class="form-check-input custome-form-check-input" type="checkbox" id="m_slim" name='m_slim'
                    checked={body_type.male.slim}
                    onChange={(e) =>
                      setBody_type((prev) => ({
                        ...prev,
                        male: {
                          ...prev.male,
                          slim: e.target.checked
                        }
                      }))
                    }
                  />
                  <label class="form-check-label" for="m_slim">Slim</label>
                </div>
                <div class="custome-form-check">
                  <input class="form-check-input custome-form-check-input" type="checkbox" id="m_athletic" name='m_athletic'
                    checked={body_type.male.athletic}
                    onChange={(e) =>
                      setBody_type((prev) => ({
                        ...prev,
                        male: {
                          ...prev.male,
                          athletic: e.target.checked
                        }
                      }))
                    }
                  />
                  <label class="form-check-label" for="m_athletic">Athletic</label>
                </div>
                <div class="custome-form-check">
                  <input class="form-check-input custome-form-check-input" type="checkbox" id="m_average" name='m_average'
                    checked={body_type.male.average}
                    onChange={(e) =>
                      setBody_type((prev) => ({
                        ...prev,
                        male: {
                          ...prev.male,
                          average: e.target.checked
                        }
                      }))
                    }
                  />
                  <label class="form-check-label" for="m_average">Average</label>
                </div>
                <div class="custome-form-check">
                  <input class="form-check-input custome-form-check-input" type="checkbox" id="m_nicely_shaped" name='m_nicely_shaped'
                    checked={body_type.male.nicely_shaped}
                    onChange={(e) =>
                      setBody_type((prev) => ({
                        ...prev,
                        male: {
                          ...prev.male,
                          nicely_shaped: e.target.checked
                        }
                      }))
                    }
                  />
                  <label class="form-check-label" for="m_nicely_shaped">Nicely Shaped</label>
                </div>
                <div class="custome-form-check">
                  <input class="form-check-input custome-form-check-input" type="checkbox" id="m_love" name='m_love'
                    checked={body_type.male.me_to_love}
                    onChange={(e) =>
                      setBody_type((prev) => ({
                        ...prev,
                        male: {
                          ...prev.male,
                          me_to_love: e.target.checked
                        }
                      }))
                    }
                  />
                  <label class="form-check-label" for="m_love">More of me to love</label>
                </div>
                <div class="custome-form-check">
                  <input class="form-check-input custome-form-check-input" type="checkbox" id="m_heavy" name='m_heavy'
                    checked={body_type.male.huggable_and_heavy}
                    onChange={(e) =>
                      setBody_type((prev) => ({
                        ...prev,
                        male: {
                          ...prev.male,
                          huggable_and_heavy: e.target.checked
                        }
                      }))
                    }
                  />
                  <label class="form-check-label" for="m_heavy">Huggable and Heavy</label>
                </div>
              </div>
            </div>

            <div className="row-4">
              <h6>Reset Search</h6>
              <div className="custome-form-check form-switch">
                <label className="form-check-label" for="flexSwitchCheckDefault">Save Search</label>
                <input className="no-radius form-check-input custome-form-check-input" type="checkbox" id="flexSwitchCheckDefault"
                  checked={save_search}
                  onChange={(e) => setSave_search(e.target.checked)}
                />
              </div>
            </div>

            <div className="row-5">
              <button 
                className='submitBtn'
                onClick={handelSubmit}
              >Submit</button>
            </div>

          </div>
        </div>
      </PageWrapper>
    </>
  )
}

export default AdvanceMemberSearch