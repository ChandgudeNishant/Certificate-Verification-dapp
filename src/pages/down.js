import React, { useState, useRef } from "react";
import styled from "styled-components";
import { ethers } from "ethers";
import Certification from './Certification.json'

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Cert from './Certificate.png';
import{getData} from "./register";

const CertificateGenerator = () => {


  const [certificateData, setCertificateData] = useState({});
  const contractAddress = '0xAB53AaE6B007DBE08dA62C0C1F5935EA40816a8a';
  const privateKey = process.env.REACT_APP_PRIVATE_KEY;
  const providerUrl = process.env.REACT_APP_PROVIDER_URL;
  
  const provider = new ethers.providers.JsonRpcProvider(providerUrl);
  const signer = provider.getSigner();
  const wallet = new ethers.Wallet(privateKey, provider);

  const contract = new ethers.Contract(contractAddress, Certification.abi, wallet);
  
  const getData = async () => {
  
    try {
      
  let CertificateId1 = document.querySelector("#CertificateId1").value;
       const data = await contract.getData(CertificateId1);
      setCertificateData({
        
        candidateName: data[0],
        orgName: data[1],
        courseName: data[2],
        expirationYear: data[3].toString(),
      });
      console.log(data);
    } catch (error) {
      console.log('Error getting certificate data:', error);
    }
  };


  const [certificateId, setCertificateId] = useState("");
  // const [studentName, setStudentName] = useState("");
  // const [orgName, setOrgName] = useState("");
  // const [courseName, setCourseName] = useState("");
  // const [expiryYear, setExpiryYear] = useState("");
  //const certificateWrapper = React.createRef();

  const certificateRef = useRef(null);

  function generateCertificate() {
    // Get the certificate element
    const certificateElement = certificateRef.current;

    // Create a canvas from the certificate element
    html2canvas(certificateElement).then(canvas => {
      // Create a PDF document
      const pdf = new jsPDF();

      // Add the canvas to the PDF document
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', -20, 10, 250, 100);

      // Save the PDF document with the candidate's name as the filename
      pdf.save(`${certificateData.candidateName}-certificate.pdf`);
    });
  }
  return (


    <FormContainer>
         <div className="details">
        <label ><h2>Certificate ID:</h2></label>
        <input type="text" id = "CertificateId1" value={certificateId} onChange={(e) => setCertificateId(e.target.value)}  placeholder="Certificate ID" name="Certificate ID" required/>
        <button  onClick={getData}>Get Certificate Data</button>
        <button onClick={generateCertificate}>Generate Certificate</button>


        <div className="certificate" ref={certificateRef}> 
         <p id="name">{certificateData.candidateName}</p>
          <p id="orgName">{certificateData.orgName}</p>
          <p id="courseName">{certificateData.courseName}</p>
          <p id="expiryYear">{certificateData.expirationYear}</p>
          <p id="certificateId">{certificateId}</p>
          <img src={Cert} alt="Certificate" />

        
      </div>
      </div>
</FormContainer>
  );
};

export default CertificateGenerator;

const FormContainer = styled.div`
background-color: #FFFFFF;
position: relative;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;

  .details {
    position: relative;
    display: inline-block;
    display: flex;
    height: auto;
    flex-direction: column;
    gap: 2rem;
    background-color: #FFFFFF;
    padding: 3rem 5rem;
    align-items: center;
   img {
    display: block;
    margin-top:10px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10px;
    width: 60%;
  }
  #name {
    font-family: 'Halimun', sans-serif;
    font-size: calc(10px + 2vmin);
    position: absolute;
    top: 52%;
    left: 61%;
    width: 980px; 
    height: 140px; 
    transform: translate(-50%, 50%);
        }  
  #orgName {
    position: absolute;
    font-size: calc(8px + 2vmin);
    top: 51%;
    left: 61%;
    width: 985px; 
    height: 345px; 
    transform: translate(-50%, 50%);
        }

  #courseName {
    position: absolute;
    font-size: calc(8px + 2vmin);
    top: 47%;
    left: 61%;
    width: 985px; 
    height: 530px; 
    transform: translate(-50%, 50%);
      }
  #expiryYear {
    position: absolute;
    font-size: calc(8px + 2vmin);
    top: 45%;
    left: 61%;
    width: 985px; 
    height: 710px; 
    transform: translate(-50%, 50%);
          }
  #certificateId {
    position: absolute;
    font-size: calc(8px + 2vmin);
    top: 42%;
    left: 61%;
    width: 985px; 
    height: 885px; 
    transform: translate(-50%, 50%);
     }
    

  
    }
  }
label{
  align-items: center;
  
  color: Black;
}

input {
  background-color: transparent;
  padding: 1rem;
  border: 0.1rem solid #4e0eff;
  border-radius: 0.4rem;
  color: Black;
  width: 60%;
  font-size: 1rem;
  &:focus {
    border: 0.1rem solid #997af0;
    outline: none;
  
  }}  button { 
      background-color: #4e0eff;
      color: white;
      padding: 1rem 1rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      &:hover {
        background-color: #926BFF;
      }
`;

    {/* <div className='data1'>
    <button className="button" onClick={getData}>Get Certificate Data</button>
    <label>Certificate ID</label>
  <input type="text" id = "CertificateId1" placeholder="Certificate ID" name="Certificate ID" required/>
      <h2>Certificate Data:</h2>
      <p>Candidate Name: <span className='data'>{certificateData.candidateName}</span></p>
      <p>Organization Name: <span className='data'>{certificateData.orgName}</span></p>
      <p>Course Name: <span className='data'>{certificateData.courseName}</span></p>
      <p>Expiration Year: <span className='data'>{certificateData.expirationYear}</span></p>
  </div> */}
      {/* <form>
        <label>
          Certificate ID:
          <input type="text" value={certificateId} onChange={(e) => setCertificateId(e.target.value)} />
        </label>
        <label>
          Student Name:
          <input type="text" value={studentName} onChange={(e) => setStudentName(e.target.value)} />
        </label>
        <label>
          Origination Name:
          <input type="text" value={orgName} onChange={(e) => setOrgName(e.target.value)} />
        </label>
        <label>
          Course Name:
          <input type="text" value={courseName} onChange={(e) => setCourseName(e.target.value)} />
        </label>
        <label>
          Expiry Year:
          <input type="text" value={expiryYear} onChange={(e) => setExpiryYear(e.target.value)} />
        </label>
      </form> */}

