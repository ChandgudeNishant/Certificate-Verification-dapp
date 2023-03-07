import React from 'react';
import styled from "styled-components";
//import Logo from './logo.jpg';
import Logo from "./Sanjivani.png";
import { ethers } from "ethers";
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Certification from './Certification.json'
import {connectWallet} from './login';

 function Dashboard() {
  let navigate = useNavigate();

  const [walletAddress, setWalletAddress] = useState("");
  const [certificateId, setCertificateId] = useState('');
  const [certificateData, setCertificateData] = useState({});
  const contractAddress = '0xAB53AaE6B007DBE08dA62C0C1F5935EA40816a8a';
  const privateKey = process.env.REACT_APP_PRIVATE_KEY;
  const providerUrl = process.env.REACT_APP_PROVIDER_URL;
  
  const provider = new ethers.providers.JsonRpcProvider(providerUrl);
  const signer = provider.getSigner();
  const wallet = new ethers.Wallet(privateKey, provider);

  const contract = new ethers.Contract(contractAddress, Certification.abi, wallet);
 

  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('');

  useEffect(() => {
    async function getAccountInfo() {
      if (typeof window.ethereum !== 'undefined') {
        try {
          // Connect to MetaMask
          await window.ethereum.request({ method: 'eth_requestAccounts' });

          // Create provider and signer objects
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();

          // Get account address
          const address = await signer.getAddress();
          setAddress(address);

          // Get account balance
          const balanceWei = await signer.getBalance();
          const balanceEth = ethers.utils.formatEther(balanceWei);
          setBalance(balanceEth);
        } catch (err) {
          console.error(err);
        }
      } else {
        console.log('MetaMask not detected');
      }
    }

    getAccountInfo();
  }, []);
  // async function accountData(){
  //   const address = await signer.getAddress();
  //   console.log('Account Address:', address);
  //   const balanceWei = await signer.getBalance();
  //   const balanceEth = ethers.utils.formatEther(balanceWei);
  //   console.log('Account Balance:', balanceEth, 'Matic');
  // }
  // accountData();
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
      console.log(data);
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

        <p ><span>Account Address:</span> <p className='under'>{address}</p></p>
        <p><span>Account Balance:</span> <p className='under'> {balance}</p> <span>Matic</span></p>   
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
         <button className="button1" type="submit" onClick={generateCertificate}> register</button>
    </form>
   
      </div>
      
      
      
      <div className='data1'>
        <label>Certificate ID</label>
      <input type="text" id = "CertificateId1" placeholder="Certificate ID" name="Certificate ID" required/>
      <button className="button" onClick={getData}>Get Certificate Data</button>
          <h2>Certificate Data:</h2>
          <p>Candidate Name: <span className='data'>{certificateData.candidateName}</span></p>
          <p>Organization Name: <span className='data'>{certificateData.orgName}</span></p>
          <p>Course Name: <span className='data'>{certificateData.courseName}</span></p>
          <p>Expiration Year: <span className='data'>{certificateData.expirationYear}</span></p>
      </div>
      <button className='button2' onClick={() => {navigate('/down')}}> Generate Certificate</button>
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
    .under{
      color:grey;
      text-decoration: underline;
    }
    p {
   
      color: white;
      text-transform: uppercase;
    }



  }
  .data1{  
    height: auto;
    width: 1100px;
    justify-items: center;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
    margin-top:50px;
    margin-bottom: 10px;
    border: 0.1rem solid #4e0eff;

    h2 {
      color: white;
      text-transform: uppercase;
    }
    p{
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
    position:bottom
  }

  form {
    margin-top :50px;
    margin-right:50px;
    margin-left: 50px;
    height: auto;
    display: flex;
    justify-items: center;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
    border: 0.1rem solid #4e0eff;
  }

  .forms {
    position: relative;
  }

  .button1{
    position: bottom;
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
      background-color: #926BFF;
    }
    
  }.button2{
     margin-top:10px;
     margin-bottom: 10px;
      align-items: center;

    }
  .data {
    text-decoration: underline;

    font-weight:bold;
    
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
  span{
    font-weight:bold;

  }

`;
export default Dashboard;
export async function getData(){};
