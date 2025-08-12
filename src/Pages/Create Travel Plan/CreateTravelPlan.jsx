import React, { useEffect, useState } from 'react';
import PageWrapper from '../../components/PageWrapper';
import { useNavigate } from 'react-router-dom';
import calender from "../../assets/calender.png";
import style from "./CreateTravelPlan.module.css";


const CreateTravelPlan = () => {

  const navigate = useNavigate();

  const [resort, setResort] = useState({
    desire_rm: false,
    desire_pearl: false,
    hedonism_ii: false,
    cap_naturist: false,
    caliente: false,
    temptation: false,
    rooftop: false,
    sea_mountain: false,
    la_mirage: false,
    venus_resort: false,
    miches_resort: false,
    desire_miches: false,
    blue_lotus_escape: false
  })
  const [cruise, setCruise] = useState({
    explorer: false,
    wonder: false,
    reflection: false,
    radiance: false,
    silhouette: false,
    fanta_sea: false
  })

  const [details_char_len, setDetails_char_len] = useState(1000);
  const [details, setDetails] = useState("");


  // methods
  const handleResortChange = (e) => {
    const { name, checked } = e.target;
    setResort((prev) => ({
      ...prev,
      [name]: checked
    }));
  };
  const handleCruiseChange = (e) => {
    const { name, checked } = e.target;
    setCruise((prev) => ({
      ...prev,
      [name]: checked
    }));
  };
  const handleDetailInput = (e) => {

    if(details_char_len === 0)
      return
    else
      setDetails(e.target.value);
  }

  useEffect(() => {
    
    let lenth = details.trim().length;

    setDetails_char_len(1000 - lenth);    

  }, [details])


  return (
    <>
      <PageWrapper >
        <div className="container-fluid py-5 px-5 d-flex flex-column align-items-start justify-content-center gap-2" style={{ backgroundColor: "var(--color-background)" }}>

          {/* nav */}
          <div className="nav text-white">
            <div className="d-flex justify-content-start align-items-center gap-3">
              <i
                className="bi bi-chevron-left fs-5 text-white back-icon"
                onClick={() => navigate("/feed")}
              ></i>
              <h4 className='text-white mb-0'>Travel Plan</h4>
            </div>
          </div>

          {/* row 1 */}
          <div className={`${style.custome_row}`}>
            <p className='text-white mb-0 label-text fs-5'>When</p>
            <img src={calender} alt="" width={"550px"} />
          </div>

          {/* row 2 */}
          <div className={`${style.custome_row}`}>
            <p className='text-white mb-0 label-text fs-5'>Where</p>
            <input
              type="text"
              name='search-country'
              id='search-country'
              className={`${style.country_search}`}
              placeholder='Search by country'
            />
          </div>

          {/* row 3 */}
          <div className={`${style.custome_row}`}>
            <p className='text-white mb-0 label-text fs-5'>Resort</p>
            <div className={`${style.filter_section_row}`}>
              <div className={`${style.custome_form_check}`}>
                <input className="form-check-input customCheckBox" type="checkbox" id="desire_rm"
                  name='desire_rm'
                  checked={resort.desire_rm}
                  onChange={handleResortChange}
                />
                <label className="form-check-label" htmlFor="desire_rm">Desire RM</label>
              </div>
              <div className={`${style.custome_form_check}`}>
                <input className="form-check-input customCheckBox" type="checkbox" id="desire_pearl"
                  name='desire_pearl'
                  checked={resort.desire_pearl}
                  onChange={handleResortChange}
                />
                <label className="form-check-label" htmlFor="desire_pearl">Desire Pearl</label>
              </div>
              <div className={`${style.custome_form_check}`}>
                <input className="form-check-input customCheckBox" type="checkbox" id="hedonism_ii"
                  name='hedonism_ii'
                  checked={resort.hedonism_ii}
                  onChange={handleResortChange}
                />
                <label className="form-check-label" htmlFor="hedonism_ii">Hedonism II</label>
              </div>
              <div className={`${style.custome_form_check}`}>
                <input className="form-check-input customCheckBox" type="checkbox" id="cap_naturist"
                  name='cap_naturist'
                  checked={resort.cap_naturist}
                  onChange={handleResortChange}
                />
                <label className="form-check-label" htmlFor="cap_naturist">Cap Naturist</label>
              </div>
              <div className={`${style.custome_form_check}`}>
                <input className="form-check-input customCheckBox" type="checkbox" id="caliente"
                  name='caliente'
                  checked={resort.caliente}
                  onChange={handleResortChange}
                />
                <label className="form-check-label" htmlFor="caliente">Caliente</label>
              </div>
              <div className={`${style.custome_form_check}`}>
                <input className="form-check-input customCheckBox" type="checkbox" id="temptation"
                  name='temptation'
                  checked={resort.temptation}
                  onChange={handleResortChange}
                />
                <label className="form-check-label" htmlFor="temptation">Temptation</label>
              </div>
              <div className={`${style.custome_form_check}`}>
                <input className="form-check-input customCheckBox" type="checkbox" id="rooftop"
                  name='rooftop'
                  checked={resort.rooftop}
                  onChange={handleResortChange}
                />
                <label className="form-check-label" htmlFor="rooftop">Rooftop</label>
              </div>
              <div className={`${style.custome_form_check}`}>
                <input className="form-check-input customCheckBox" type="checkbox" id="sea_mountain"
                  name='sea_mountain'
                  checked={resort.sea_mountain}
                  onChange={handleResortChange}
                />
                <label className="form-check-label" htmlFor="sea_mountain">Sea Mountain</label>
              </div>
              <div className={`${style.custome_form_check}`}>
                <input className="form-check-input customCheckBox" type="checkbox" id="la_mirage"
                  name='la_mirage'
                  checked={resort.la_mirage}
                  onChange={handleResortChange}
                />
                <label className="form-check-label" htmlFor="la_mirage">La Mirage</label>
              </div>
              <div className={`${style.custome_form_check}`}>
                <input className="form-check-input customCheckBox" type="checkbox" id="venus_resort"
                  name='venus_resort'
                  checked={resort.venus_resort}
                  onChange={handleResortChange}
                />
                <label className="form-check-label" htmlFor="venus_resort">Venus Resort</label>
              </div>
              <div className={`${style.custome_form_check}`}>
                <input className="form-check-input customCheckBox" type="checkbox" id="desire_pearl2"
                  name='desire_pearl2'
                />
                <label className="form-check-label" htmlFor="desire_pearl2">Desire Pearl</label>
              </div>
              <div className={`${style.custome_form_check}`}>
                <input className="form-check-input customCheckBox" type="checkbox" id="miches_resort"
                  name='miches_resort'
                  checked={resort.miches_resort}
                  onChange={handleResortChange}
                />
                <label className="form-check-label" htmlFor="miches_resort">Miches Resort</label>
              </div>
              <div className={`${style.custome_form_check}`}>
                <input className="form-check-input customCheckBox" type="checkbox" id="desire_miches"
                  name='desire_miches'
                  checked={resort.desire_miches}
                  onChange={handleResortChange}
                />
                <label className="form-check-label" htmlFor="desire_miches">Desire Miches</label>
              </div>
              <div className={`${style.custome_form_check}`}>
                <input className="form-check-input customCheckBox" type="checkbox" id="blue_lotus_escape"
                  name='blue_lotus_escape'
                  checked={resort.blue_lotus_escape}
                  onChange={handleResortChange}
                />
                <label className="form-check-label" htmlFor="blue_lotus_escape">Blue Lotus Escape</label>
              </div>
            </div>
          </div>

          {/* row 4 */}
          <div className={`${style.custome_row}`}>
            <p className='text-white mb-0 label-text fs-5'>Cruise</p>
            <div className={`${style.filter_section_column}`}>
              <div className={`${style.custome_form_check}`}>
                <input className="form-check-input customCheckBox" type="checkbox" id="explorer"
                  name='explorer'
                  checked={cruise.explorer}
                  onChange={handleCruiseChange}
                />
                <label className="form-check-label" htmlFor="explorer">Bliss Cruise: RCI Explorer of the Seas</label>
              </div>
              <div className={`${style.custome_form_check}`}>
                <input className="form-check-input customCheckBox" type="checkbox" id="wonder"
                  name='wonder'
                  checked={cruise.wonder}
                  onChange={handleCruiseChange}
                />
                <label className="form-check-label" htmlFor="wonder">Bliss Cruise: RCI Wonder of the Seas 2026</label>
              </div>
              <div className={`${style.custome_form_check}`}>
                <input className="form-check-input customCheckBox" type="checkbox" id="reflection"
                  name='reflection'
                  checked={cruise.reflection}
                  onChange={handleCruiseChange}
                />
                <label className="form-check-label" htmlFor="reflection">Bliss Cruise: Celebrity Reflection 2025</label>
              </div>
              <div className={`${style.custome_form_check}`}>
                <input className="form-check-input customCheckBox" type="checkbox" id="radiance"
                  name='radiance'
                  checked={cruise.radiance}
                  onChange={handleCruiseChange}
                />
                <label className="form-check-label" htmlFor="radiance">Bliss Cruise: RCI Radiance of the Seas 2026</label>
              </div>
              <div className={`${style.custome_form_check}`}>
                <input className="form-check-input customCheckBox" type="checkbox" id="silhouette"
                  name='silhouette'
                  checked={cruise.silhouette}
                  onChange={handleCruiseChange}
                />
                <label className="form-check-label" htmlFor="silhouette">Bliss Cruise: Celebrity Silhouette 2026</label>
              </div>
              <div className={`${style.custome_form_check}`}>
                <input className="form-check-input customCheckBox" type="checkbox" id="fanta_sea"
                  name='fanta_sea'
                  checked={cruise.fanta_sea}
                  onChange={handleCruiseChange}
                />
                <label className="form-check-label" htmlFor="fanta_sea">FantaSea Connections Cruise 2026</label>
              </div>
            </div>
          </div>

          {/* row 5 */}
          <div className={`${style.custome_row} w-100`}>
            <div className={`${style.header_label}`}>
              <p className='text-white mb-0 label-text fs-5'>Details</p>
              <p className='mb-0 label-text'> {details_char_len} characters left </p>
            </div>
            <div className={`${style.filter_section_column}`}>
              <textarea 
                name=""
                id=""
                value={details}
                onChange={ handleDetailInput }
                placeholder='Descriptions'
                className={`w-100 rounded-3 py-2 px-3`}
              />
            </div>
          </div>

          {/* submit button */}
          <div className={`${style.custome_row}`}>
            <button type="submit" className='custom-button'>Post</button>
          </div>



        </div>
      </PageWrapper>
    </>
  )
}

export default CreateTravelPlan