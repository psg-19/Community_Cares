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
        enum: [
            'Ujjain', 'Gorakhpur', 'Mumbai', 'Chennai', 'Kolkata', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Pune', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur', 'Patna', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Agra', 'Ghaziabad', 'Ludhiana', 'Coimbatore', 'Madurai', 'Nashik', 'Faridabad', 'Meerut', 'Rajkot', 'Varanasi', 'Srinagar', 'Aurangabad', 'Dhanbad', 'Amritsar', 'Allahabad', 'Howrah', 'Gwalior', 'Vadodara', 'Ranchi', 'Raipur', 'Jodhpur', 'Guwahati', 'Chandigarh', 'Mysore', 'Tiruchirappalli', 'Bhubaneswar', 'Salem', 'Warangal', 'Kota', 'Jalandhar', 'Jamshedpur', 'Bhilai', 'Gurgaon', 'Bareilly', 'Aligarh', 'Jammu', 'Moradabad', 'Kolhapur', 'Durgapur', 'Ajmer', 'Gulbarga', 'Jamnagar', 'Ujjain', 'Loni', 'Siliguri', 'Jhansi', 'Ulhasnagar', 'Nellore', 'Jammu', 'Sangli-Miraj & Kupwad', 'Belgaum', 'Mangalore', 'Ambattur', 'Tirunelveli', 'Malegaon', 'Gaya', 'Jalgaon', 'Udaipur', 'Maheshtala', 'Tirupur', 'Davanagere', 'Kozhikode', 'Akola', 'Kurnool', 'Bokaro Steel City', 'Rajahmundry', 'Ballari', 'Agartala', 'Bhagalpur', 'Latur', 'Dhule', 'Korba', 'Bhilwara', 'Brahmapur', 'Mysore', 'Muzaffarpur', 'Ahmednagar', 'Kollam', 'Raghunathganj', 'Bilaspur', 'Shahjahanpur', 'Thrissur', 'Alwar', 'Kakinada', 'Nizamabad', 'Sagar', 'Tumkur', 'Hisar', 'Rohtak', 'Panipat', 'Darbhanga', 'Kharagpur', 'Aizawl', 'Ichalkaranji', 'Tirupati', 'Karnal', 'Bathinda', 'Rampur', 'Shivamogga', 'Ratlam', 'Modinagar', 'Durg', 'Shillong', 'Imphal', 'Hapur', 'Ranipet', 'Anantapur', 'Arrah', 'Karimnagar', 'Parbhani', 'Etawah', 'Bharatpur', 'Begusarai', 'New Delhi', 'Chhapra', 'Kadapa', 'Ramagundam', 'Pali', 'Satna', 'Vizianagaram', 'Katihar', 'Hardwar', 'Sonipat', 'Nagercoil', 'Thanjavur', 'Murwara (Katni)', 'Naihati', 'Sambhal', 'Nadiad', 'Yamunanagar', 'English Bazar', 'Eluru', 'Munger', 'Panchkula', 'Raayachuru', 'Panvel', 'Deoghar', 'Ongole', 'Nandyal', 'Morena', 'Bhiwani', 'Porbandar', 'Palakkad', 'Anand', 'Purnia', 'Baharampur', 'Barmer', 'Morvi', 'Orai', 'Bahraich', 'Sikar', 'Vellore', 'Kumbakonam', 'Pudukkottai', 'Hazaribagh', 'Nalgonda', 'Godhra', 'Madanapalle', 'Haldia', 'Sasaram', 'Hajipur', 'Bhimavaram', 'Karwar', 'Suryapet', 'Jind', 'Tonk', 'Vellore', 'Adoni', 'Giridih', 'Bhuj', 'Alappuzha', 'Karaikudi', 'Khammam', 'Kaithal', 'Malegaon', 'Machilipatnam', 'Shimla', 'Phagwara', 'Rajapalayam', 'Batala', 'Kapurthala', 'Chilakaluripet', 'Bargarh', 'Pathankot', 'Proddatur', 'Sirkali', 'Pilibhit', 'Dimapur', 'Rajnandgaon', 'Godda', 'Vizianagaram', 'Palanpur', 'Kullu', 'Sirsaganj', 'Baripada', 'Puducherry', 'Sawai Madhopur', 'Navsari', 'Srikakulam', 'Sangamner', 'Bijnor', 'Tiruvannamalai', 'Parbhani', 'Siwan', 'Kamareddy', 'Rishikesh', 'Dhaulpur', 'Narasaraopet', 'Kothagudem', 'Thiruvalla', 'Madikeri', 'Firozpur', 'Adilabad', 'Sehore', 'Alibag', 'Narnaul', 'Nawada',
            
        ]
        
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