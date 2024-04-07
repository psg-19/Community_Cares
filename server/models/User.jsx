const mongoose=require('mongoose');
const mailSender=require('../utils/mailSender.jsx')

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        trim:true,
        required:true
    },
    lastName:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:true
    },
    phoneNo:{
        type:String,
        trim:true,
        required:true
    },
   
    password:{
        type:String,
        trim:true,
        required:true
    },
    role:{
        type:String,
        enum:['Donor','Reciever']
    },
    posts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Post'
        }
    ],
    profileUrl:{
        type:String,
        trim:true,
        
    },
    address:{
        type:String,
    
        trim:true,
        default:''
    },
    district:{
        type:String,
        trim:true,
        required:true,
        enum: [
            'Ujjain', 'Gorakhpur', 'Mumbai', 'Chennai', 'Kolkata', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Pune', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur', 'Patna', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Agra', 'Ghaziabad', 'Ludhiana', 'Coimbatore', 'Madurai', 'Nashik', 'Faridabad', 'Meerut', 'Rajkot', 'Varanasi', 'Srinagar', 'Aurangabad', 'Dhanbad', 'Amritsar', 'Allahabad', 'Howrah', 'Gwalior', 'Vadodara', 'Ranchi', 'Raipur', 'Jodhpur', 'Guwahati', 'Chandigarh', 'Mysore', 'Tiruchirappalli', 'Bhubaneswar', 'Salem', 'Warangal', 'Kota', 'Jalandhar', 'Jamshedpur', 'Bhilai', 'Gurgaon', 'Bareilly', 'Aligarh', 'Jammu', 'Moradabad', 'Kolhapur', 'Durgapur', 'Ajmer', 'Gulbarga', 'Jamnagar', 'Ujjain', 'Loni', 'Siliguri', 'Jhansi', 'Ulhasnagar', 'Nellore', 'Jammu', 'Sangli-Miraj & Kupwad', 'Belgaum', 'Mangalore', 'Ambattur', 'Tirunelveli', 'Malegaon', 'Gaya', 'Jalgaon', 'Udaipur', 'Maheshtala', 'Tirupur', 'Davanagere', 'Kozhikode', 'Akola', 'Kurnool', 'Bokaro Steel City', 'Rajahmundry', 'Ballari', 'Agartala', 'Bhagalpur', 'Latur', 'Dhule', 'Korba', 'Bhilwara', 'Brahmapur', 'Mysore', 'Muzaffarpur', 'Ahmednagar', 'Kollam', 'Raghunathganj', 'Bilaspur', 'Shahjahanpur', 'Thrissur', 'Alwar', 'Kakinada', 'Nizamabad', 'Sagar', 'Tumkur', 'Hisar', 'Rohtak', 'Panipat', 'Darbhanga', 'Kharagpur', 'Aizawl', 'Ichalkaranji', 'Tirupati', 'Karnal', 'Bathinda', 'Rampur', 'Shivamogga', 'Ratlam', 'Modinagar', 'Durg', 'Shillong', 'Imphal', 'Hapur', 'Ranipet', 'Anantapur', 'Arrah', 'Karimnagar', 'Parbhani', 'Etawah', 'Bharatpur', 'Begusarai', 'New Delhi', 'Chhapra', 'Kadapa', 'Ramagundam', 'Pali', 'Satna', 'Vizianagaram', 'Katihar', 'Hardwar', 'Sonipat', 'Nagercoil', 'Thanjavur', 'Murwara (Katni)', 'Naihati', 'Sambhal', 'Nadiad', 'Yamunanagar', 'English Bazar', 'Eluru', 'Munger', 'Panchkula', 'Raayachuru', 'Panvel', 'Deoghar', 'Ongole', 'Nandyal', 'Morena', 'Bhiwani', 'Porbandar', 'Palakkad', 'Anand', 'Purnia', 'Baharampur', 'Barmer', 'Morvi', 'Orai', 'Bahraich', 'Sikar', 'Vellore', 'Kumbakonam', 'Pudukkottai', 'Hazaribagh', 'Nalgonda', 'Godhra', 'Madanapalle', 'Haldia', 'Sasaram', 'Hajipur', 'Bhimavaram', 'Karwar', 'Suryapet', 'Jind', 'Tonk', 'Vellore', 'Adoni', 'Giridih', 'Bhuj', 'Alappuzha', 'Karaikudi', 'Khammam', 'Kaithal', 'Malegaon', 'Machilipatnam', 'Shimla', 'Phagwara', 'Rajapalayam', 'Batala', 'Kapurthala', 'Chilakaluripet', 'Bargarh', 'Pathankot', 'Proddatur', 'Sirkali', 'Pilibhit', 'Dimapur', 'Rajnandgaon', 'Godda', 'Vizianagaram', 'Palanpur', 'Kullu', 'Sirsaganj', 'Baripada', 'Puducherry', 'Sawai Madhopur', 'Navsari', 'Srikakulam', 'Sangamner', 'Bijnor', 'Tiruvannamalai', 'Parbhani', 'Siwan', 'Kamareddy', 'Rishikesh', 'Dhaulpur', 'Narasaraopet', 'Kothagudem', 'Thiruvalla', 'Madikeri', 'Firozpur', 'Adilabad', 'Sehore', 'Alibag', 'Narnaul', 'Nawada',
            
        ]
    }


})

userSchema.post('save',async function(){
    try {

        const  mailResponse=await mailSender(this.email,'ACCOUNT CREATED SUCCESSFULLY !!! @Community Cares',`Dear ${this.firstName} <br/> Welcome to Community Cares ! We're thrilled to have you join our community and embark on this exciting journey with us`);
        console.log('email for account creation sent successfully',mailResponse);
    
        
    } catch (error) {
        console.log('error occured while sending account creation mail : ',error);
        throw error;
    }
})

module.exports=mongoose.model('User',userSchema);