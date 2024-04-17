import { createContext, useEffect } from "react";
import { useState } from "react";




export const AppContext=createContext();


export default function AppContextProvider({children}){

const [isLogged,setIsLogged]=useState(false);
const[token1,setToken1]=useState('')
const [user,setUser]=useState({});
const [click,setClick]=useState(null)
const [donorPosts,setDonorPosts]=useState('');

const [currentPostEdit,setCurrentPostEdit]=useState('');



const backendUrl=process.env.REACT_APP_BACKEND_URL

// const backendUrl='http://localhost:4000/api/v1';
const [ct,setCt]=useState(0)


const Districts=['Agar Malwa', 'Agatti', 'Agra', 'Ahmedabad', 'Ahmednagar', 'Aizawl', 'Ajmer', 'Akola', 'Alappuzha', 'Aligarh', 'Alipurduar', 'Alirajpur', 'Allahabad', 'Almora', 'Alwar', 'Ambedkar Nagar', 'Amethi (Chatrapati Sahuji Mahraj Nagar)', 'Amravati', 'Amreli', 'Amritsar', 'Anand', 'Anantapur', 'Anjaw', 'Anuppur', 'Araria', 'Aravalli', 'Ariyalur', 'Ashoknagar', 'Auraiya', 'Aurangabad', 'Azamgarh', 'Bagalkot', 'Bageshwar', 'Baghpat', 'Bahraich', 'Balaghat', 'Balangir', 'Balasore', 'Ballari (Bellary)', 'Ballia', 'Balod', 'Baloda Bazar', 'Balrampur', 'Banda', 'Bandipore', 'Banka', 'Bankura', 'Banswara', 'Barabanki', 'Baramulla', 'Baran', 'Bardhaman (Burdwan)', 'Bareilly', 'Bargarh', 'Barmer', 'Barnala', 'Barpeta', 'Barwani', 'Bastar', 'Bathinda', 'Begusarai', 'Belagavi (Belgaum)', 'Bemetara', 'Bengaluru (Bangalore) Rural', 'Bengaluru (Bangalore) Urban', 'Betul', 'Bhadrak', 'Bhagalpur', 'Bhandara', 'Bharatpur', 'Bharuch', 'Bhavnagar', 'Bhilwara', 'Bhind', 'Bhiwani', 'Bhojpur', 'Bhopal', 'Bidar', 'Bijapur', 'Bijapur', 'Bijnor', 'Bikaner', 'Bilaspur', 'Bilaspur', 'Birbhum', 'Bishnupur', 'Bokaro', 'Botad', 'Boudh', 'Budaun', 'Budgam', 'Bulandshahr', 'Bundi', 'Buxar', 'Central Delhi', 'Chamarajanagar', 'Chamba', 'Chamoli', 'Champawat', 'Champhai', 'Chandauli', 'Chandel', 'Chandigarh', 'Charkhi Dadri', 'Chatra', 'Chengalpattu', 'Chennai', 'Chhatarpur', 'Chhindwara', 'Chhota Udepur', 'Chikkamagaluru (Chikmagalur)', 'Chitradurga', 'Chittorgarh', 'Chittoor', 'Chittorgarh', 'Churachandpur', 'Churu', 'Coimbatore', 'Cooch Behar', 'Cuddalore', 'Cuttack', 'Dadra & Nagar Haveli', 'Dahod', 'Dakshina Kannada', 'Dakshin Dinajpur (South Dinajpur)', 'Daman', 'Daman & Diu', 'Damoh', 'Dang', 'Darbhanga', 'Darjeeling', 'Darrang', 'Datia', 'Dausa', 'Davanagere', 'Dehradun', 'Deogarh', 'Deoghar', 'Dewas', 'Dhalai', 'Dhamtari', 'Dhanbad', 'Dhar', 'Dharmapuri', 'Dharmavaram', 'Dharwad', 'Dhemaji', 'Dhenkanal', 'Dhubri', 'Dhule', 'Dibang Valley', 'Dibrugarh', 'Dima Hasao', 'Dimapur', 'Dindigul', 'Dindori', 'Diu', 'Doda', 'Dumka', 'Dungarpur', 'Durg', 'East Champaran (Motihari)', 'East Delhi', 'East Garo Hills', 'East Godavari', 'East Jaintia Hills', 'East Kameng', 'East Khasi Hills', 'East Siang', 'East Singhbhum', 'Eluru', 'Ernakulam', 'Ernakulam', 'Etah', 'Etawah', 'Faizabad', 'Faridabad', 'Faridkot', 'Farrukhabad', 'Fatehabad', 'Fatehgarh Sahib', 'Fazilka', 'Ferozepur', 'Firozabad', 'Gadag', 'Gadchiroli', 'Gajapati', 'Ganderbal', 'Gandhinagar', 'Ganganagar', 'Ganjam', 'Garhwa', 'Gariyaband', 'Gautam Buddha Nagar', 'Gaya', 'Ghaziabad', 'Ghazipur', 'Gir Somnath', 'Giridih', 'Goa', 'Goalpara', 'Godda', 'Golaghat', 'Gomati', 'Gondia', 'Gopalganj', 'Gorakhpur', 'Gulbarga', 'Guna', 'Guntur', 'Gurgaon', 'Gurugram', 'Guwahati', 'Gwalior', 'Hamirpur', 'Hanumangarh', 'Harda', 'Hardoi', 'Haridwar', 'Hassan', 'Hathras', 'Haveri', 'Hazaribag', 'Hingoli', 'Hisar', 'Hooghly', 'Hoshangabad', 'Hoshiarpur', 'Howrah', 'Hyderabad', 'Idukki', 'Imphal East', 'Imphal West', 'Indore', 'Itanagar Capital Complex', 'Jabalpur', 'Jaffna', 'Jaipur', 'Jaisalmer', 'Jajpur', 'Jalandhar', 'Jalaun', 'Jalgaon', 'Jalna', 'Jalore', 'Jalpaiguri', 'Jammu', 'Jamnagar', 'Jamtara', 'Jamui', 'Jangaon', 'Jangareddygudem', 'Janjgir-Champa', 'Jashpur', 'Jaunpur', 'Jayashankar Bhupalapally', 'Jehanabad', 'Jhabua', 'Jhajjar', 'Jhalawar', 'Jhansi', 'Jhargram', 'Jharsuguda', 'Jhunjhunu', 'Jind', 'Jodhpur', 'Jorhat', 'Junagadh', 'Kabirdham (Kawardha)', 'Kadapa', 'Kadapa', 'Kaimur (Bhabua)', 'Kaithal', 'Kakinada', 'Kalaburagi (Gulbarga)', 'Kalahandi', 'Kamareddy', 'Kamjong', 'Kamrup Metropolitan', 'Kancheepuram', 'Kandhamal', 'Kangpokpi', 'Kangra', 'Kannauj', 'Kannur', 'Kanpur', 'Kanpur Dehat', 'Kanshiram Nagar (Kasganj)', 'Kanyakumari', 'Kapurthala', 'Karauli', 'Karbi Anglong', 'Kargil', 'Karimnagar', 'Karnal', 'Karur', 'Kasaragod', 'Kasargod', 'Kathua', 'Katihar', 'Katni', 'Kaushambi', 'Kendrapara', 'Kendujhar (Keonjhar)', 'Keshod', 'Khagaria', 'Khammam', 'Khandwa', 'Khargone', 'Kheda (Nadiad)', 'Khordha', 'Khowai', 'Khunti', 'Kinnaur', 'Kiphire', 'Kishanganj', 'Kishtwar', 'Koderma', 'Kohima', 'Kokrajhar', 'Kolar', 'Kolasib', 'Kolhapur', 'Kollam', 'Kondagaon', 'Koppal', 'Koraput', 'Korba', 'Koriya', 'Kota', 'Kottayam', 'Kozhikode', 'Krishna', 'Krishnagiri', 'Kulgam', 'Kullu', 'Kupwara', 'Kurnool', 'Kurukshetra', 'Kushinagar (Padrauna)', 'Kutch', 'Kutch', 'Lahaul & Spiti', 'Lakhimpur - Kheri', 'Lakhimpur', 'Lakhisarai', 'Lalitpur', 'Latur', 'Lawngtlai', 'Leh', 'Lohardaga', 'Lohit', 'Longding', 'Longleng', 'Lower Dibang Valley', 'Lower Siang', 'Lower Subansiri', 'Lucknow', 'Ludhiana', 'Lunglei', 'Machilipatnam', 'Madhepura', 'Madhubani', 'Madurai', 'Mahabubabad', 'Mahabubnagar', 'Maharajganj', 'Maharajganj', 'Mahasamund', 'Mahe', 'Mahendragarh', 'Mahesana', 'Mainpuri', 'Malappuram', 'Malda', 'Malkangiri', 'Mallapuram', 'Mamit', 'Mancherial', 'Mandi', 'Mandla', 'Mandsaur', 'Mandya', 'Mansa', 'Marigaon', 'Mathura', 'Mau', 'Mayurbhanj', 'Medak', 'Medchal', 'Meerut', 'Mehsana', 'Mewat', 'Mirzapur', 'Moga', 'Mokokchung', 'Mon', 'Moradabad', 'Morbi', 'Morena', 'Morigaon', 'Muktsar', 'Mumbai City', 'Mumbai Suburban', 'Munger (Monghyr)', 'Murshidabad', 'Muzaffarnagar', 'Muzaffarpur', 'Mysuru (Mysore)', 'Nabarangpur', 'Nadia', 'Nagaon', 'Nagapattinam', 'Nagaur', 'Nagpur', 'Nainital', 'Nalanda', 'Nalbari', 'Nalgonda', 'Namakkal', 'Namsai', 'Nanded', 'Nandurbar', 'Narayanpur', 'Narmada', 'Narsinghpur', 'Nashik', 'Navsari', 'Nawada', 'Nayagarh', 'Neemuch', 'Nicobar', 'Nilgiris', 'Nirmal', 'Nizamabad', 'North 24 Parganas', 'North Delhi', 'North East Delhi', 'North Garo Hills', 'North Goa', 'North Middle Andaman', 'North Sikkim', 'North Tripura', 'North West Delhi', 'Nuapada', 'Nuh', 'Osmanabad', 'Other State', 'Pakur', 'Palakkad', 'Palamu', 'Pali', 'Palwal', 'Panchkula', 'Panchmahal', 'Panipat', 'Panna', 'Papum Pare', 'Parbhani', 'Paschim Medinipur (West Medinipur)', 'Patan', 'Pathanamthitta', 'Pathankot', 'Patiala', 'Patna', 'Pauri Garhwal', 'Perambalur', 'Peren', 'Phek', 'Pilibhit', 'Pithoragarh', 'Poonch', 'Porbandar', 'Prakasam', 'Pratapgarh', 'Pratapgarh', 'Puducherry', 'Pudukkottai', 'Pulwama', 'Pune', 'Purba Champaran (East Champaran)', 'Purbi Singhbhum (East Singhbhum)', 'Purnia (Purnea)', 'Purulia', 'Raebareli', 'Raichur', 'Raigad', 'Raigarh', 'Raipur', 'Raisen', 'Rajanna Sircilla', 'Rajgarh', 'Rajkot', 'Rajnandgaon', 'Rajouri', 'Rajsamand', 'Ramanagara', 'Ramanathapuram', 'Ramban', 'Ramgarh', 'Rampur', 'Ranchi', 'Ranga Reddy', 'Ratlam', 'Ratnagiri', 'Rayagada', 'Reasi', 'Rewa', 'Rewari', 'Ri-Bhoi', 'Rohtak', 'Rohtas', 'Rudraprayag', 'Rupnagar', 'Sabarkantha', 'Sagar', 'Saharanpur', 'Saharsa', 'Sahibganj', 'Saiha', 'Salem', 'Samastipur', 'Samba', 'Sambalpur', 'Sangareddy', 'Sangli', 'Sangrur', 'Sant Kabir Nagar', 'Sant Ravidas Nagar', 'Saraikela-Kharsawan (Seraikela-Kharsawan)', 'Saran', 'Satara', 'Satna', 'Sawai Madhopur', 'Sehore', 'Senapati', 'Seoni', 'Serchhip', 'Shahdol', 'Shahjahanpur', 'Shajapur', 'Shamli', 'Sheikhpura', 'Sheohar', 'Sheopur', 'Shi Yomi', 'Shivamogga (Shimoga)', 'Shopian', 'Shrawasti', 'Siddharthnagar', 'Sidhi', 'Sikar', 'Simdega', 'Sindhudurg', 'Singrauli', 'Sirmaur (Sirmour)', 'Sirohi', 'Sirsa', 'Sitamarhi', 'Sitapur', 'Sivaganga', 'Siwan', 'Solan', 'Solapur', 'Sonbhadra', 'Sonipat', 'Sonitpur', 'South 24 Parganas', 'South Andaman', 'South Delhi', 'South East Delhi', 'South Garo Hills', 'South Goa', 'South Salmara Mankachar', 'South Sikkim', 'South Tripura', 'South West Delhi', 'Sri Ganganagar', 'Sri Muktsar Sahib', 'Srikakulam', 'Srinagar', 'Subarnapur (Sonepur)', 'Sukma', 'Sultanpur', 'Sundargarh', 'Supaul', 'Surat', 'Surendranagar', 'Surguja', 'Tamenglong', 'Tapi', 'Tarn Taran', 'Tawang', 'Tehri Garhwal', 'Tenkasi', 'Thane', 'Thanjavur', 'Theni', 'Thiruvananthapuram', 'Thoothukudi', 'Thoubal', 'Thrissur', 'Tikamgarh', 'Tinsukia', 'Tirap', 'Tiruchirappalli', 'Tirunelveli', 'Tirupattur', 'Tiruppur', 'Tiruvallur', 'Tiruvannamalai', 'Tiruvarur', 'Tonk', 'Tuensang', 'Tumakuru (Tumkur)', 'Udaipur', 'Udalguri', 'Udham Singh Nagar', 'Udhampur', 'Udupi', 'Ujjain', 'Ukhrul', 'Umaria', 'Una', 'Unakoti', 'Unnao', 'Upper Siang', 'Upper Subansiri', 'Uttara Kannada (Karwar)', 'Uttarkashi', 'Uttar Dinajpur (North Dinajpur)', 'Vadodara', 'Vaishali', 'Valsad', 'Varanasi', 'Vellore', 'Vidisha', 'Vijayapura (Bijapur)', 'Viluppuram', 'Virudhunagar', 'Visakhapatnam', 'Vizianagaram', 'Vyara', 'Warangal Rural', 'Warangal Urban', 'Wardha', 'Washim', 'Wayanad', 'West Champaran', 'West Delhi', 'West Garo Hills', 'West Godavari', 'West Jaintia Hills', 'West Kameng', 'West Khasi Hills', 'West Siang', 'West Singhbhum', 'West Tripura', 'Wokha', 'Yadgir', 'Yadgir', 'Yamunanagar', 'Yavatmal', 'Zunheboto']





const value={
    isLogged,setIsLogged,
    user,setUser,
    token1,setToken1,
    donorPosts,setDonorPosts
    ,Districts,
    currentPostEdit,setCurrentPostEdit,
    backendUrl,
    click,setClick,
    ct,setCt
   
}
return <AppContext.Provider value={value}>
    {children}
</AppContext.Provider>
}


