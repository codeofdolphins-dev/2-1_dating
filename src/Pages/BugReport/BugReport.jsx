import React from 'react'
import GlobalPageWrapper from '../../components/GlobalPageWrapper'

const BugReport = () => {
    return (
        <>
            <GlobalPageWrapper>
                <div className="container-fluid">
                    {/* Header Section */}
                    <div className="mt-5 text-white">
                        <h2 className="fw-bold">Bug Report</h2>
                        <p className="mt-2 text-white">
                            Please be as detailed as possible providing information like device,
                            operating system, browser, internet connection (WiFi/mobile) and upload a
                            screenshot of the issue if possible. Thank you.
                        </p>
                    </div>

                    {/* Comment Section */}
                    <div className="mt-4">
                        <div className=" border-0 shadow-sm p-3">
                            <h5 className="text-white fw-semibold mb-2">Comment</h5>
                            <textarea
                                className="form-control bg-white text-black border-0 rounded-3"
                                rows="6"
                                placeholder="Describe the issue in detail..."
                            ></textarea>
                        </div>
                    </div>

                    {/* Browser / System Info Section */}
                    <div className="mt-4">
                        <div className=" border-0 shadow-sm p-3">
                            <h6 className="text-white fw-semibold mb-2">System Info</h6>
                            <pre className="bg-white text-black p-2 rounded-3 small m-0">
                                {`{
  "os": "Mac OS",
  "osVersion": "10.15.7",
  "browser": "Chrome",
  "browserVersion": "134",
  "language": "en-US",
  "screen_resolution": "1470 x 956",
  "device": "Desktop"
}`}
                            </pre>
                        </div>
                    </div>

                    {/* Upload Screenshot */}
                    {/* <div className="mt-4">
                        <div className="card bg-dark border-0 shadow-sm p-3">
                            <h6 className="text-white fw-semibold mb-2">Upload Screenshot</h6>
                            <input
                                type="file"
                                className="form-control bg-secondary text-white border-0"
                            />
                        </div>
                    </div> */}

                    {/* Submit Button */}
                    <div className="mt-4 text-end">
                        <button className="btn btn-primary text-black border-0 px-5 rounded-pill fw-semibold" style={{backgroundColor:"var( --color-primary-green)"}}>
                            Submit Report
                        </button>
                    </div>
                </div>

            </GlobalPageWrapper>
        </>
    )
}

export default BugReport