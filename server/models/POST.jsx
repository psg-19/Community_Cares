const mongoose=require('mongoose');
const mailSender=require('../utils/mailSender.jsx')
const postSchema=new mongoose.Schema({
    email:{
        type:String,
        trim:true,
        required:true
    },
    title:{
        type:String,
        trim:true,
        required:true
    },
    description:{
        type:String,
        trim:true,
        required:true
    },
    imageUrl:{
        type:String,
        trim:true,
        required:true
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now()
    },
    status:{
        type:Boolean,
        default:false,
        required:true,
    },
    expiresAt:{
        type:Date,
        required:true,
       default:new Date(new Date(new Date()).getTime()+(24+7-new Date((Date.now())).getHours())*60*60*1000 -(new Date((Date.now())).getMinutes()*60*1000)).getTime()
        // default:new Date(Date.now()).getTime()
            },
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ],
    address:{
        type:String,
        required:true,
        trim:true
    },
    district:{
        type:String,
        trim:true,
        required:true,
        enum: ['Agar Malwa', 'Agatti', 'Agra', 'Ahmedabad', 'Ahmednagar', 'Aizawl', 'Ajmer', 'Akola', 'Alappuzha', 'Aligarh', 'Alipurduar', 'Alirajpur', 'Allahabad', 'Almora', 'Alwar', 'Ambedkar Nagar', 'Amethi (Chatrapati Sahuji Mahraj Nagar)', 'Amravati', 'Amreli', 'Amritsar', 'Anand', 'Anantapur', 'Anjaw', 'Anuppur', 'Araria', 'Aravalli', 'Ariyalur', 'Ashoknagar', 'Auraiya', 'Aurangabad', 'Azamgarh', 'Bagalkot', 'Bageshwar', 'Baghpat', 'Bahraich', 'Balaghat', 'Balangir', 'Balasore', 'Ballari (Bellary)', 'Ballia', 'Balod', 'Baloda Bazar', 'Balrampur', 'Banda', 'Bandipore', 'Banka', 'Bankura', 'Banswara', 'Barabanki', 'Baramulla', 'Baran', 'Bardhaman (Burdwan)', 'Bareilly', 'Bargarh', 'Barmer', 'Barnala', 'Barpeta', 'Barwani', 'Bastar', 'Bathinda', 'Begusarai', 'Belagavi (Belgaum)', 'Bemetara', 'Bengaluru (Bangalore) Rural', 'Bengaluru (Bangalore) Urban', 'Betul', 'Bhadrak', 'Bhagalpur', 'Bhandara', 'Bharatpur', 'Bharuch', 'Bhavnagar', 'Bhilwara', 'Bhind', 'Bhiwani', 'Bhojpur', 'Bhopal', 'Bidar', 'Bijapur', 'Bijapur', 'Bijnor', 'Bikaner', 'Bilaspur', 'Bilaspur', 'Birbhum', 'Bishnupur', 'Bokaro', 'Botad', 'Boudh', 'Budaun', 'Budgam', 'Bulandshahr', 'Bundi', 'Buxar', 'Central Delhi', 'Chamarajanagar', 'Chamba', 'Chamoli', 'Champawat', 'Champhai', 'Chandauli', 'Chandel', 'Chandigarh', 'Charkhi Dadri', 'Chatra', 'Chengalpattu', 'Chennai', 'Chhatarpur', 'Chhindwara', 'Chhota Udepur', 'Chikkamagaluru (Chikmagalur)', 'Chitradurga', 'Chittorgarh', 'Chittoor', 'Chittorgarh', 'Churachandpur', 'Churu', 'Coimbatore', 'Cooch Behar', 'Cuddalore', 'Cuttack', 'Dadra & Nagar Haveli', 'Dahod', 'Dakshina Kannada', 'Dakshin Dinajpur (South Dinajpur)', 'Daman', 'Daman & Diu', 'Damoh', 'Dang', 'Darbhanga', 'Darjeeling', 'Darrang', 'Datia', 'Dausa', 'Davanagere', 'Dehradun', 'Deogarh', 'Deoghar', 'Dewas', 'Dhalai', 'Dhamtari', 'Dhanbad', 'Dhar', 'Dharmapuri', 'Dharmavaram', 'Dharwad', 'Dhemaji', 'Dhenkanal', 'Dhubri', 'Dhule', 'Dibang Valley', 'Dibrugarh', 'Dima Hasao', 'Dimapur', 'Dindigul', 'Dindori', 'Diu', 'Doda', 'Dumka', 'Dungarpur', 'Durg', 'East Champaran (Motihari)', 'East Delhi', 'East Garo Hills', 'East Godavari', 'East Jaintia Hills', 'East Kameng', 'East Khasi Hills', 'East Siang', 'East Singhbhum', 'Eluru', 'Ernakulam', 'Ernakulam', 'Etah', 'Etawah', 'Faizabad', 'Faridabad', 'Faridkot', 'Farrukhabad', 'Fatehabad', 'Fatehgarh Sahib', 'Fazilka', 'Ferozepur', 'Firozabad', 'Gadag', 'Gadchiroli', 'Gajapati', 'Ganderbal', 'Gandhinagar', 'Ganganagar', 'Ganjam', 'Garhwa', 'Gariyaband', 'Gautam Buddha Nagar', 'Gaya', 'Ghaziabad', 'Ghazipur', 'Gir Somnath', 'Giridih', 'Goa', 'Goalpara', 'Godda', 'Golaghat', 'Gomati', 'Gondia', 'Gopalganj', 'Gorakhpur', 'Gulbarga', 'Guna', 'Guntur', 'Gurgaon', 'Gurugram', 'Guwahati', 'Gwalior', 'Hamirpur', 'Hanumangarh', 'Harda', 'Hardoi', 'Haridwar', 'Hassan', 'Hathras', 'Haveri', 'Hazaribag', 'Hingoli', 'Hisar', 'Hooghly', 'Hoshangabad', 'Hoshiarpur', 'Howrah', 'Hyderabad', 'Idukki', 'Imphal East', 'Imphal West', 'Indore', 'Itanagar Capital Complex', 'Jabalpur', 'Jaffna', 'Jaipur', 'Jaisalmer', 'Jajpur', 'Jalandhar', 'Jalaun', 'Jalgaon', 'Jalna', 'Jalore', 'Jalpaiguri', 'Jammu', 'Jamnagar', 'Jamtara', 'Jamui', 'Jangaon', 'Jangareddygudem', 'Janjgir-Champa', 'Jashpur', 'Jaunpur', 'Jayashankar Bhupalapally', 'Jehanabad', 'Jhabua', 'Jhajjar', 'Jhalawar', 'Jhansi', 'Jhargram', 'Jharsuguda', 'Jhunjhunu', 'Jind', 'Jodhpur', 'Jorhat', 'Junagadh', 'Kabirdham (Kawardha)', 'Kadapa', 'Kadapa', 'Kaimur (Bhabua)', 'Kaithal', 'Kakinada', 'Kalaburagi (Gulbarga)', 'Kalahandi', 'Kamareddy', 'Kamjong', 'Kamrup Metropolitan', 'Kancheepuram', 'Kandhamal', 'Kangpokpi', 'Kangra', 'Kannauj', 'Kannur', 'Kanpur', 'Kanpur Dehat', 'Kanshiram Nagar (Kasganj)', 'Kanyakumari', 'Kapurthala', 'Karauli', 'Karbi Anglong', 'Kargil', 'Karimnagar', 'Karnal', 'Karur', 'Kasaragod', 'Kasargod', 'Kathua', 'Katihar', 'Katni', 'Kaushambi', 'Kendrapara', 'Kendujhar (Keonjhar)', 'Keshod', 'Khagaria', 'Khammam', 'Khandwa', 'Khargone', 'Kheda (Nadiad)', 'Khordha', 'Khowai', 'Khunti', 'Kinnaur', 'Kiphire', 'Kishanganj', 'Kishtwar', 'Koderma', 'Kohima', 'Kokrajhar', 'Kolar', 'Kolasib', 'Kolhapur', 'Kollam', 'Kondagaon', 'Koppal', 'Koraput', 'Korba', 'Koriya', 'Kota', 'Kottayam', 'Kozhikode', 'Krishna', 'Krishnagiri', 'Kulgam', 'Kullu', 'Kupwara', 'Kurnool', 'Kurukshetra', 'Kushinagar (Padrauna)', 'Kutch', 'Kutch', 'Lahaul & Spiti', 'Lakhimpur - Kheri', 'Lakhimpur', 'Lakhisarai', 'Lalitpur', 'Latur', 'Lawngtlai', 'Leh', 'Lohardaga', 'Lohit', 'Longding', 'Longleng', 'Lower Dibang Valley', 'Lower Siang', 'Lower Subansiri', 'Lucknow', 'Ludhiana', 'Lunglei', 'Machilipatnam', 'Madhepura', 'Madhubani', 'Madurai', 'Mahabubabad', 'Mahabubnagar', 'Maharajganj', 'Maharajganj', 'Mahasamund', 'Mahe', 'Mahendragarh', 'Mahesana', 'Mainpuri', 'Malappuram', 'Malda', 'Malkangiri', 'Mallapuram', 'Mamit', 'Mancherial', 'Mandi', 'Mandla', 'Mandsaur', 'Mandya', 'Mansa', 'Marigaon', 'Mathura', 'Mau', 'Mayurbhanj', 'Medak', 'Medchal', 'Meerut', 'Mehsana', 'Mewat', 'Mirzapur', 'Moga', 'Mokokchung', 'Mon', 'Moradabad', 'Morbi', 'Morena', 'Morigaon', 'Muktsar', 'Mumbai City', 'Mumbai Suburban', 'Munger (Monghyr)', 'Murshidabad', 'Muzaffarnagar', 'Muzaffarpur', 'Mysuru (Mysore)', 'Nabarangpur', 'Nadia', 'Nagaon', 'Nagapattinam', 'Nagaur', 'Nagpur', 'Nainital', 'Nalanda', 'Nalbari', 'Nalgonda', 'Namakkal', 'Namsai', 'Nanded', 'Nandurbar', 'Narayanpur', 'Narmada', 'Narsinghpur', 'Nashik', 'Navsari', 'Nawada', 'Nayagarh', 'Neemuch', 'Nicobar', 'Nilgiris', 'Nirmal', 'Nizamabad', 'North 24 Parganas', 'North Delhi', 'North East Delhi', 'North Garo Hills', 'North Goa', 'North Middle Andaman', 'North Sikkim', 'North Tripura', 'North West Delhi', 'Nuapada', 'Nuh', 'Osmanabad', 'Other State', 'Pakur', 'Palakkad', 'Palamu', 'Pali', 'Palwal', 'Panchkula', 'Panchmahal', 'Panipat', 'Panna', 'Papum Pare', 'Parbhani', 'Paschim Medinipur (West Medinipur)', 'Patan', 'Pathanamthitta', 'Pathankot', 'Patiala', 'Patna', 'Pauri Garhwal', 'Perambalur', 'Peren', 'Phek', 'Pilibhit', 'Pithoragarh', 'Poonch', 'Porbandar', 'Prakasam', 'Pratapgarh', 'Pratapgarh', 'Puducherry', 'Pudukkottai', 'Pulwama', 'Pune', 'Purba Champaran (East Champaran)', 'Purbi Singhbhum (East Singhbhum)', 'Purnia (Purnea)', 'Purulia', 'Raebareli', 'Raichur', 'Raigad', 'Raigarh', 'Raipur', 'Raisen', 'Rajanna Sircilla', 'Rajgarh', 'Rajkot', 'Rajnandgaon', 'Rajouri', 'Rajsamand', 'Ramanagara', 'Ramanathapuram', 'Ramban', 'Ramgarh', 'Rampur', 'Ranchi', 'Ranga Reddy', 'Ratlam', 'Ratnagiri', 'Rayagada', 'Reasi', 'Rewa', 'Rewari', 'Ri-Bhoi', 'Rohtak', 'Rohtas', 'Rudraprayag', 'Rupnagar', 'Sabarkantha', 'Sagar', 'Saharanpur', 'Saharsa', 'Sahibganj', 'Saiha', 'Salem', 'Samastipur', 'Samba', 'Sambalpur', 'Sangareddy', 'Sangli', 'Sangrur', 'Sant Kabir Nagar', 'Sant Ravidas Nagar', 'Saraikela-Kharsawan (Seraikela-Kharsawan)', 'Saran', 'Satara', 'Satna', 'Sawai Madhopur', 'Sehore', 'Senapati', 'Seoni', 'Serchhip', 'Shahdol', 'Shahjahanpur', 'Shajapur', 'Shamli', 'Sheikhpura', 'Sheohar', 'Sheopur', 'Shi Yomi', 'Shivamogga (Shimoga)', 'Shopian', 'Shrawasti', 'Siddharthnagar', 'Sidhi', 'Sikar', 'Simdega', 'Sindhudurg', 'Singrauli', 'Sirmaur (Sirmour)', 'Sirohi', 'Sirsa', 'Sitamarhi', 'Sitapur', 'Sivaganga', 'Siwan', 'Solan', 'Solapur', 'Sonbhadra', 'Sonipat', 'Sonitpur', 'South 24 Parganas', 'South Andaman', 'South Delhi', 'South East Delhi', 'South Garo Hills', 'South Goa', 'South Salmara Mankachar', 'South Sikkim', 'South Tripura', 'South West Delhi', 'Sri Ganganagar', 'Sri Muktsar Sahib', 'Srikakulam', 'Srinagar', 'Subarnapur (Sonepur)', 'Sukma', 'Sultanpur', 'Sundargarh', 'Supaul', 'Surat', 'Surendranagar', 'Surguja', 'Tamenglong', 'Tapi', 'Tarn Taran', 'Tawang', 'Tehri Garhwal', 'Tenkasi', 'Thane', 'Thanjavur', 'Theni', 'Thiruvananthapuram', 'Thoothukudi', 'Thoubal', 'Thrissur', 'Tikamgarh', 'Tinsukia', 'Tirap', 'Tiruchirappalli', 'Tirunelveli', 'Tirupattur', 'Tiruppur', 'Tiruvallur', 'Tiruvannamalai', 'Tiruvarur', 'Tonk', 'Tuensang', 'Tumakuru (Tumkur)', 'Udaipur', 'Udalguri', 'Udham Singh Nagar', 'Udhampur', 'Udupi', 'Ujjain', 'Ukhrul', 'Umaria', 'Una', 'Unakoti', 'Unnao', 'Upper Siang', 'Upper Subansiri', 'Uttara Kannada (Karwar)', 'Uttarkashi', 'Uttar Dinajpur (North Dinajpur)', 'Vadodara', 'Vaishali', 'Valsad', 'Varanasi', 'Vellore', 'Vidisha', 'Vijayapura (Bijapur)', 'Viluppuram', 'Virudhunagar', 'Visakhapatnam', 'Vizianagaram', 'Vyara', 'Warangal Rural', 'Warangal Urban', 'Wardha', 'Washim', 'Wayanad', 'West Champaran', 'West Delhi', 'West Garo Hills', 'West Godavari', 'West Jaintia Hills', 'West Kameng', 'West Khasi Hills', 'West Siang', 'West Singhbhum', 'West Tripura', 'Wokha', 'Yadgir', 'Yadgir', 'Yamunanagar', 'Yavatmal', 'Zunheboto']

        
    },
    quantity:{
        type:Number,
        required:true,
        trim:true
    },
    connectedTo:{
        type:String,
        required:true,
        default:'none'
    },
    userName:{
        type:String,
        required:true,
        
    }
});

postSchema.post('save',async function(){
    try {

        const  mailResponse=await mailSender(this.email,'POST CREATED SUCCESSFULLY !!! @Community Cares',`Your Post </br> <h4>${this.title} - ${this.description}</h4> </br> was created successfully on our platform !!!`);
        console.log('email for post creation sent successfully',mailResponse);
    
        
    } catch (error) {
        console.log('error occured while sending post creation mail : ',error);
        throw error;
    }
})

module.exports=mongoose.model('Post',postSchema);