import React from 'react';
import styled from "styled-components";
//import Logo from './logo.jpg';
import Logo from "./Sanjivani.png";
import { ethers } from "ethers";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Certification from './Certification.json'
import {connectWallet} from './login';

export default function Dashboard() {

  const [certificateId, setCertificateId] = useState('');
  const [certificateData, setCertificateData] = useState({});
  const contractAddress = '0xAB53AaE6B007DBE08dA62C0C1F5935EA40816a8a';
  const privateKeya = process.env.REACT_APP_PRIVATE_KEY;
  const privateKey = 'ae2e5855bfe5cf2cf575e7a39127a0a10ef682fbbde14d50209c5dd0bd7be417';
  const providerUrl = 'https://polygon-mumbai.infura.io/v3/35b5b5f38ace48d9a4db144f27c29ba0';

  const provider = new ethers.providers.JsonRpcProvider(providerUrl);
  const signer = provider.getSigner('0x58aA76C20fFcA2e38Cb7ed6fCfa5cdEeb20b7E63');
  const wallet = new ethers.Wallet(privateKey, provider);

  const contract = new ethers.Contract(contractAddress, Certification.abi, wallet);
 
console.log(privateKeya);


  const generateCertificate = async () => {
    try {

  let CertificateId = document.querySelector("#CertificateId").value;
  let NameOfStudent = document.querySelector("#NameOfStudent").value;
  let NameOfOrg = document.querySelector("#NameOfOrg").value;
  let NameOfCourse = document.querySelector("#NameOfCourse").value;
  let ExpeiryYear = document.querySelector("#ExpeiryYear").value;

      const tx = await contract.generateCertificate(
        CertificateId,
        NameOfStudent,
        NameOfOrg,
        NameOfCourse,
        ExpeiryYear
      );
      await tx.wait();
      console.log('Certificate generated!');
      alert("Certificate generated!");
    } catch (error) {
      console.log('Error generating certificate:', error);
    }
  };
  
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
    } catch (error) {
      console.log('Error getting certificate data:', error);
    }
  };





  return(
    <FormContainer> 
      <div className='forms'>
    <form action=''>
      <div className="brand">
      <img src={Logo} alt="Sanjivani.png"/>
        <h1>SCOE Certificate Verification</h1>
      </div>
      <label>Certificate ID</label>
      <input type="text" id = "CertificateId"
        placeholder="Certificate ID" name="Certificate ID" required/>
      <label>Name of Student</label>
      <input type="text" id='NameOfStudent' placeholder="Name of Student"
        name="Name of Student" required/>
      <label>Name of Organiztion</label>
      <input type="text" id='NameOfOrg'
        placeholder="Name of Organization"  name="COrganization Name" required/>
    <label>Name of Course</label>
      <input type="text" id='NameOfCourse'
        placeholder="Name of Course" name="Course Name" required/>
      <label>Expiration Year</label>
      <input type="text" id='ExpeiryYear'
        placeholder="Expiration Year"  name="Expiration Year" required/>
    </form>
    <button className="button1" type="submit" onClick={generateCertificate}>Generate Certificate</button>
      </div>
      
      <div className='data1'>
        <button className="button" onClick={getData}>Get Certificate Data</button>
        <label>Certificate ID</label>
      <input type="text" id = "CertificateId1" placeholder="Certificate ID" name="Certificate ID" required/>
          <h2>Certificate Data:</h2>
          <p>Candidate Name: <span className='data'>{certificateData.candidateName}</span></p>
          <p>Organization Name: <span className='data'>{certificateData.orgName}</span></p>
          <p>Course Name: <span className='data'>{certificateData.courseName}</span></p>
          <p>Expiration Year: <span className='data'>{certificateData.expirationYear}</span></p>
      </div>
      
    </FormContainer> 

  );

}
const FormContainer = styled.div`
height: auto;
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }


  }
  .data1{  
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
    border: 0.1rem solid #4e0eff;

    h2 {
      color: white;
      text-transform: uppercase;
    }
    p {
      color: white;
      text-transform: capitalize;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      padding: 1rem;
     }
    }
  
  .button{
    margin-right: 10px;
    margin-left: 10px;
  }

  form {
    height: 100vh;
    display: flex;
    justify-items: center;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }

  .forms {
    position: relative;
  }

  .button1{
    position: absolute;
    bottom: 2rem;
    left: 15rem;
    margin-bottom: 2rem;
  }
  
 
  h3{
    color: white;
      text-transform: uppercase;
  }
  label{
    color: white;
      text-transform: uppercase;
  }
  h4{
    color: white;
      text-transform: uppercase;
  }

  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 60%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  .data {
    
    font-weight:bold;
    
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }

`;