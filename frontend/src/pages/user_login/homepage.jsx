  import * as React from "react";
  function Homepage() {
    const [activeStatus, setActiveStatus] = React.useState("Active")
    const [disclaimer, setDisclaimer] = React.useState("Release of stickers on Monday!")
    const [Profile, setProfile] = React.useState("Profile")
    const clickSample = () => {
        alert("bitchOten");
    }
    return (
      <>
        <div className="div">
          
          <div className="div-2">
            <img
              loading="lazy"
              srcSet="cit-logo.png"
              className="img"
            />
            <div className="div-3">
              <div className="div-4">Home</div>
              <div className="div-5">About Us</div>
            </div>
          </div>
          <div className="div-6">
            <div className="div-7">
              <div className="column">
                <div className="div-8">
                  
                  {/* <div className="div-9">Profile</div> */}
                  <button
                      onClick={clickSample}
                    >
                        Profile
                    </button>
                </div>
              </div>
              <div className="column-2">
                <div className="div-10">

                  <div className="div-11">
                    {/* <div className="div-12">
                      <div className="div-13">Status</div>
                      <div className="div-14">Active</div>
                    </div> */}
                    <button
                      onClick={clickSample}
                    >
                        Status:<br/> {activeStatus}
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </div>
          <div className="div-15">
            <div className="div-16">
              <div className="column-3">
                <div className="div-17">
                  <div className="div-18">
                    <div className="div-19">Disclaimer</div>
                    <div className="div-20">
                      {disclaimer}
                      
                    </div>
                  </div>
                </div>
              </div>
              <div className="column-4">
                <div className="div-21">
                  {/* TO MAKE INTO BUTTON and HAVE "FUNCTIONALITY" */}
                  {/* <div className="div-22">Register/Renewal</div> */}
                  <button
                      onClick={clickSample}
                    >
                        Register/Renewal
                    </button>
                </div>
              </div>
            </div>
          </div>
          <div className="div-23">
            <div className="div-24">
              <div className="div-25">
                <div className="column-5">
                  <img
                    loading="lazy"
                    srcSet="footer-logo.png"
                    className="img-2"
                  />
                </div>
                <div className="column-6">
                  <div className="div-26">
                    <div className="div-27">Contact Us</div>
                    <div className="div-28">
                      N. Bacalso Avenue, Cebu City Philippines 6000
                    </div>
                    <div className="div-29">+63 32 411 2000(trunkline)</div>
                    <div className="div-30">info@cit.edu</div>
                  </div>
                </div>
                <div className="column-7">
                  <div className="div-31">
                    <div className="div-32">Quick Links</div>
                    <div className="div-33">Cit.edu</div>
                    <div className="div-34">Lair</div>
                    <div className="div-35">AIMS</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <style jsx>{`
          .div {
            background-color: #fff;
            display: flex;
            padding-top: 6px;
            flex-direction: column;
          }
          .div-2 {
            background-color: #fff;
            display: flex;
            width: 100%;
            gap: 20px;
            font-size: 20px;
            color: #000;
            font-weight: 700;
            text-align: center;
            justify-content: space-between;
            padding: 0 80px;
          }
          @media (max-width: 991px) {
            .div-2 {
              max-width: 100%;
              flex-wrap: wrap;
              padding: 0 20px;
            }
          }
          .img {
            aspect-ratio: 5;
            object-fit: auto;
            object-position: center;
            width: 478px;
          }
          @media (max-width: 991px) {
            .img {
              max-width: 100%;
            }
          }
          .div-3 {
            display: flex;
            gap: 20px;
            margin: auto 0;
            padding: 10px;
          }
          .div-4 {
            font-family: Kumbh Sans, sans-serif;
          }
          .div-5 {
            font-family: Kumbh Sans, sans-serif;
          }
          .div-6 {
            align-self: center;
            margin-top: 141px;
            width: 995px;
            max-width: 100%;
          }
          @media (max-width: 991px) {
            .div-6 {
              margin-top: 40px;
            }
          }
          .div-7 {
            gap: 20px;
            display: flex;
          }
          @media (max-width: 991px) {
            .div-7 {
              flex-direction: column;
              align-items: stretch;
              gap: 0px;
            }
          }
          .column {
            display: flex;
            flex-direction: column;
            line-height: normal;
            width: 31%;
            margin-left: 0px;
          }
          @media (max-width: 991px) {
            .column {
              width: 100%;
            }
          }
          .div-8 {
            display: flex;
            flex-grow: 1;
            flex-direction: column;
            font-size: 32px;
            color: #fff;
            font-weight: 700;
            white-space: nowrap;
            text-align: center;
            justify-content: center;
          }

          .div-8 button{
            width:100%;
            font-size: 100%;
            font-weight: bold;
            background-color: #5f191e;
            color: white;
            border-radius: 30px;
            padding-top: 35%;
            padding-bottom: 35%
          }
          @media (max-width: 991px) {
            .div-8 {
              margin-top: 24px;
              white-space: initial;
            }
            .div-8 button{

            }
          }
          .div-9 {
            font-family: Kumbh Sans, sans-serif;
            border-radius: 20px;
            background-color: #8a252c;
            align-items: center;
            justify-content: center;
            padding: 124px 60px 96px;
          }
          .div-9 button{
            width:100%;
            font-size: 100%;
            font-weight: bold;
            background-color: #5f191e;
            color: white;
            border-radius: 30px;
            padding-top: 35%;
            padding-bottom: 35%
          }
          @media (max-width: 991px) {
            .div-9 {
              white-space: initial;
              padding: 40px 20px 0;
            }
            .div-9 button{

            }
          }
          .column-2 {
            display: flex;
            flex-direction: column;
            line-height: normal;
            width: 69%;
            
          }
          @media (max-width: 991px) {
            .column-2 {
              width: 100%;
            }
          }
          .div-10 {
            display: flex;
            flex-direction: column;
            color: #fff;
            white-space: nowrap;
            text-align: center;
            justify-content: center;
          }
          .div-10 button{
            width:100%;
            font-size: 100%;
            font-weight: bold;
            background-color: #5f191e;
            color: white;
            border-radius: 30px;
            padding-top: 35%;
            padding-bottom: 35%
          }
          @media (max-width: 991px) {
            .div-10 {
              max-width: 100%;
              margin-top: 24px;
              white-space: initial;
            }
          }
          .div-11 {
            border-radius: 20px;
            
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 15px 15px;
          }
          .div-11 button {
            width:100%;
            font-size: 200%;
            font-weight: bold;
            background-color: #5f191e;
            color: white;
            border-radius: 30px;
            padding-top: 15%;
            padding-bottom: 15%
          }

          @media (max-width: 991px) {
            .div-11 {
              max-width: 100%;
              white-space: initial;
              padding: 0 20px;
              
              .div-11 button {
                width: 80%;
                font-size: 200%;
                font-weight: bold;
                background-color: #5f191e;
                color: white;
                border-radius: 30px;
              }
      
            }
          }
          .div-12 {
            display: flex;
            margin-bottom: 10px;
            flex-direction: column;
          }
          @media (max-width: 991px) {
            .div-12 {
              white-space: initial;
            }
          }
          .div-13 {
            font: 600 36px Kumbh Sans, -apple-system, Roboto, Helvetica,
              sans-serif;
          }
          .div-14 {
            margin-top: 62px;
            font: 800 40px Kumbh Sans, -apple-system, Roboto, Helvetica,
              sans-serif;
          }
          @media (max-width: 991px) {
            .div-14 {
              margin-top: 40px;
            }
          }
          .div-15 {
            align-self: center;
            margin-top: 18px;
            width: 995px;
            max-width: 100%;
          }
          .div-16 {
            gap: 20px;
            display: flex;
          }
          @media (max-width: 991px) {
            .div-16 {
              flex-direction: column;
              align-items: stretch;
              gap: 0px;
            }
          }
          .column-3 {
            display: flex;
            flex-direction: column;
            line-height: normal;
            width: 69%;
            margin-left: 0px;
          }
          @media (max-width: 991px) {
            .column-3 {
              width: 100%;
            }
          }
          .div-17 {
            display: flex;
            flex-grow: 1;
            flex-direction: column;
            font-size: 32px;
            color: #000;
            justify-content: center;
          }
          @media (max-width: 991px) {
            .div-17 {
              max-width: 100%;
              margin-top: 24px;
            }
          }
          .div-18 {
            border-radius: 20px;
            background-color: #f4c522;
            display: flex;
            flex-direction: column;
            align-items: start;
            padding: 31px 80px 80px 31px;
          }
          @media (max-width: 991px) {
            .div-18 {
              max-width: 100%;
              padding: 0 20px;
            }
          }
          .div-19 {
            text-align: center;
            font-family: Kumbh Sans, sans-serif;
            font-weight: 700;
          }
          @media (max-width: 991px) {
            .div-19 {
              max-width: 100%;
            }
          }
          .div-20 {
            font-family: Kumbh Sans, sans-serif;
            font-weight: 600;
            margin: 54px 0 7px;
          }
          @media (max-width: 991px) {
            .div-20 {
              max-width: 100%;
              margin-top: 40px;
            }
          }
          .column-4 {
            display: flex;
            flex-direction: column;
            line-height: normal;
            width: 31%;
            margin-left: 20px;
          }
          @media (max-width: 991px) {
            .column-4 {
              width: 100%;
            }
          }
          .div-21 {
            display: flex;
            flex-grow: 1;
            flex-direction: column;
            font-size: 32px;
            color: #000;
            font-weight: 700;
            white-space: nowrap;
            text-align: center;
            justify-content: center;
          }

          .div-21 button {
            width:100%;
            font-size: 100%;
            font-weight: bold;
            background-color: #EFEFEF;
            color: black;
            border-radius: 30px;
            padding-top: 35%;
            padding-bottom: 35%
          }
          @media (max-width: 991px) {
            .div-21 {
              margin-top: 24px;
              white-space: initial;
            }
          }
          .div-22 {
            font-family: Kumbh Sans, sans-serif;
            width: 100%;
            border-radius: 20px;
            background-color: #efefef;
            align-items: center;
            justify-content: center;
            padding: 101px 60px 80px;
          }
          @media (max-width: 991px) {
            .div-22 {
              white-space: initial;
              padding: 0 20px;
            }
          }
          .div-23 {
            background-color: #fff;
            display: flex;
            margin-top: 197px;
            width: 100%;
            flex-direction: column;
            align-items: start;
            justify-content: center;
            padding: 9px 60px;
          }
          @media (max-width: 991px) {
            .div-23 {
              max-width: 100%;
              margin-top: 40px;
              padding: 0 20px;
            }
          }
          .div-24 {
            width: 1187px;
            max-width: 100%;
            padding: 0 2px;
          }
          .div-25 {
            gap: 20px;
            display: flex;
          }
          @media (max-width: 991px) {
            .div-25 {
              flex-direction: column;
              align-items: stretch;
              gap: 0px;
            }
          }
          .column-5 {
            display: flex;
            flex-direction: column;
            line-height: normal;
            width: 42%;
            margin-left: 0px;
          }
          @media (max-width: 991px) {
            .column-5 {
              width: 100%;
            }
          }
          .img-2 {
            aspect-ratio: 1.41;
            object-fit: auto;
            object-position: center;
            width: 100%;
            flex-grow: 1;
          }
          @media (max-width: 991px) {
            .img-2 {
              margin-top: 40px;
            }
          }
          .column-6 {
            display: flex;
            flex-direction: column;
            line-height: normal;
            width: 33%;
            margin-left: 20px;
          }
          @media (max-width: 991px) {
            .column-6 {
              width: 100%;
            }
          }
          .div-26 {
            display: flex;
            flex-direction: column;
            align-self: stretch;
            font-size: 20px;
            color: #7d7d7d;
            font-weight: 400;
            text-align: center;
            line-height: 124%;
            margin: auto 0;
            padding: 7px 0;
          }
          @media (max-width: 991px) {
            .div-26 {
              margin-top: 40px;
            }
          }
          .div-27 {
            color: #000;
            align-self: center;
            font: 600 30px Kumbh Sans, -apple-system, Roboto, Helvetica,
              sans-serif;
          }
          .div-28 {
            font-family: Kumbh Sans, sans-serif;
            line-height: 25px;
            margin-top: 27px;
          }
          .div-29 {
            font-family: Kumbh Sans, sans-serif;
            margin-top: 27px;
          }
          .div-30 {
            font-family: Kumbh Sans, sans-serif;
            align-self: center;
            margin-top: 23px;
          }
          .column-7 {
            display: flex;
            flex-direction: column;
            line-height: normal;
            width: 25%;
            margin-left: 20px;
          }
          @media (max-width: 991px) {
            .column-7 {
              width: 100%;
            }
          }
          .div-31 {
            display: flex;
            flex-direction: column;
            align-self: stretch;
            align-items: center;
            font-size: 20px;
            color: #7d7d7d;
            font-weight: 400;
            text-align: center;
            line-height: 124%;
            margin: auto 0;
            padding: 8px 41px;
          }
          @media (max-width: 991px) {
            .div-31 {
              margin-top: 40px;
              padding: 0 20px;
            }
          }
          .div-32 {
            color: #000;
            align-self: stretch;
            font: 600 30px Kumbh Sans, -apple-system, Roboto, Helvetica,
              sans-serif;
          }
          .div-33 {
            font-family: Kumbh Sans, sans-serif;
            font-weight: 500;
            margin-top: 19px;
          }
          .div-34 {
            font-family: Kumbh Sans, sans-serif;
            margin-top: 14px;
          }
          .div-35 {
            font-family: Kumbh Sans, sans-serif;
            margin-top: 15px;
          }
        `}</style>
      </>
    );
  }

  export default Homepage;
