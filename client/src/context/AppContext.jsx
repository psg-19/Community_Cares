import { createContext, useEffect } from "react";
import { useState } from "react";




export const AppContext=createContext();


export default function AppContextProvider({children}){

const [isLogged,setIsLogged]=useState(false);
const[token1,setToken1]=useState('')
const [user,setUser]=useState({});

const [donorPosts,setDonorPosts]=useState('');

const [currentPostEdit,setCurrentPostEdit]=useState('');

const backendUrl='https://community-cares.onrender.com/api/v1';
// const backendUrl='http://localhost:4000/api/v1';



const Districts=[
    'Ujjain', 'Gorakhpur', 'Mumbai', 'Chennai', 'Kolkata', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Pune', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur', 'Patna', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Agra', 'Ghaziabad', 'Ludhiana', 'Coimbatore', 'Madurai', 'Nashik', 'Faridabad', 'Meerut', 'Rajkot', 'Varanasi', 'Srinagar', 'Aurangabad', 'Dhanbad', 'Amritsar', 'Allahabad', 'Howrah', 'Gwalior', 'Vadodara', 'Ranchi', 'Raipur', 'Jodhpur', 'Guwahati', 'Chandigarh', 'Mysore', 'Tiruchirappalli', 'Bhubaneswar', 'Salem', 'Warangal', 'Kota', 'Jalandhar', 'Jamshedpur', 'Bhilai', 'Gurgaon', 'Bareilly', 'Aligarh', 'Jammu', 'Moradabad', 'Kolhapur', 'Durgapur', 'Ajmer', 'Gulbarga', 'Jamnagar', 'Ujjain', 'Loni', 'Siliguri', 'Jhansi', 'Ulhasnagar', 'Nellore', 'Jammu', 'Sangli-Miraj & Kupwad', 'Belgaum', 'Mangalore', 'Ambattur', 'Tirunelveli', 'Malegaon', 'Gaya', 'Jalgaon', 'Udaipur', 'Maheshtala', 'Tirupur', 'Davanagere', 'Kozhikode', 'Akola', 'Kurnool', 'Bokaro Steel City', 'Rajahmundry', 'Ballari', 'Agartala', 'Bhagalpur', 'Latur', 'Dhule', 'Korba', 'Bhilwara', 'Brahmapur', 'Mysore', 'Muzaffarpur', 'Ahmednagar', 'Kollam', 'Raghunathganj', 'Bilaspur', 'Shahjahanpur', 'Thrissur', 'Alwar', 'Kakinada', 'Nizamabad', 'Sagar', 'Tumkur', 'Hisar', 'Rohtak', 'Panipat', 'Darbhanga', 'Kharagpur', 'Aizawl', 'Ichalkaranji', 'Tirupati', 'Karnal', 'Bathinda', 'Rampur', 'Shivamogga', 'Ratlam', 'Modinagar', 'Durg', 'Shillong', 'Imphal', 'Hapur', 'Ranipet', 'Anantapur', 'Arrah', 'Karimnagar', 'Parbhani', 'Etawah', 'Bharatpur', 'Begusarai', 'New Delhi', 'Chhapra', 'Kadapa', 'Ramagundam', 'Pali', 'Satna', 'Vizianagaram', 'Katihar', 'Hardwar', 'Sonipat', 'Nagercoil', 'Thanjavur', 'Murwara (Katni)', 'Naihati', 'Sambhal', 'Nadiad', 'Yamunanagar', 'English Bazar', 'Eluru', 'Munger', 'Panchkula', 'Raayachuru', 'Panvel', 'Deoghar', 'Ongole', 'Nandyal', 'Morena', 'Bhiwani', 'Porbandar', 'Palakkad', 'Anand', 'Purnia', 'Baharampur', 'Barmer', 'Morvi', 'Orai', 'Bahraich', 'Sikar', 'Vellore', 'Kumbakonam', 'Pudukkottai', 'Hazaribagh', 'Nalgonda', 'Godhra', 'Madanapalle', 'Haldia', 'Sasaram', 'Hajipur', 'Bhimavaram', 'Karwar', 'Suryapet', 'Jind', 'Tonk', 'Vellore', 'Adoni', 'Giridih', 'Bhuj', 'Alappuzha', 'Karaikudi', 'Khammam', 'Kaithal', 'Malegaon', 'Machilipatnam', 'Shimla', 'Phagwara', 'Rajapalayam', 'Batala', 'Kapurthala', 'Chilakaluripet', 'Bargarh', 'Pathankot', 'Proddatur', 'Sirkali', 'Pilibhit', 'Dimapur', 'Rajnandgaon', 'Godda', 'Vizianagaram', 'Palanpur', 'Kullu', 'Sirsaganj', 'Baripada', 'Puducherry', 'Sawai Madhopur', 'Navsari', 'Srikakulam', 'Sangamner', 'Bijnor', 'Tiruvannamalai', 'Parbhani', 'Siwan', 'Kamareddy', 'Rishikesh', 'Dhaulpur', 'Narasaraopet', 'Kothagudem', 'Thiruvalla', 'Madikeri', 'Firozpur', 'Adilabad', 'Sehore', 'Alibag', 'Narnaul', 'Nawada',
    
  ]




const value={
    isLogged,setIsLogged,
    user,setUser,
    token1,setToken1,
    donorPosts,setDonorPosts
    ,Districts,
    currentPostEdit,setCurrentPostEdit,
    backendUrl
   
}
return <AppContext.Provider value={value}>
    {children}
</AppContext.Provider>
}


