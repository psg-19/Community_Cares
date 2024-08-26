Welcome to <h3>Community Care's</h3> where every plate tells a story of compassion and sustainability!
Join us in our mission to transform leftover food from restaurants into a lifeline for those in need.
Together, we're not just reducing wastage; we're nourishing souls and building a brighter, more equitable future. 
Let's turn every meal into a beacon of hope for those who face hunger daily. Together, we can make a difference, one plate at a time.

<h5><a href="https://community-cares-9y35.vercel.app/">Live Link</a></h5>
</br>
<h2>Features Of Commumity Care's</h2>

<pre><b>i) </b><i>Basically, the website caters to two types of audiences: donors and receivers.
  There are two pages: one shows posts from restaurants that have leftover food and want to donate,
  while the other page features posts from organizations that need food for that day.
</i></pre>
<pre><b>ii) </b><i>Donors can only donate within their district and only if the food capacity of
  their post is greater than the recipient's post requirement.</i></pre>

<pre><b>iii)</b> <i>This project uses JWT authentication, OTP verification, 
     and cookies to persist a user session when the website reloads.</i></pre>

<pre><b>iv)</b> <i>User can edit or delete posts according to their requirement,
  users can also edit their profile. </i></pre>

<pre><b>v)</b> <i>Once a donor donates to a receiver, the details of both posts will be visible on
  the connected posts page. An email containing the details of both the donor and the receiver will
  be sent to each party so they can coordinate and ensure the safe delivery of the food.</i></pre>

<pre><b>vi)</b> <i>If user forgets his/her password then it can be changed via OTP verification.</i></pre>
 

<pre><b>vi)</b> <i> This is fully responsive website which can also be accessed on Mobile phone
  without any problem by this url :- <p><a href="https://community-cares-9y35.vercel.app/">Live Link</a></p>
</i></pre>


<pre><b>3)</b> <i> 
NOTE:- To look upon all features of website , try to signup with a donor type account and create
  a donor post and click on donate on a reciever post.
If gives any pop-up like quantity not sufficient or district not same then you can edit your
  post according to receiver post requirements.
</i></pre>
<pre><b>3)</b> <i> 
NOTE:- All the posts created will be deleted automatically, from Donor posts/Reciever post page,
  at 7:00 AM the next day ,but user can see the posts created by them in the Your Posts page which
  can be accessed from profile section by clicking on profile picture.
</i></pre>
</br>
</br>
</br>
<h2>Installation</h2>
<pre><b>1) </b><i>git clone https://github.com/psg-19/Community_Cares.git</i></pre>
<pre><b>2)</b> <i>cd community_cares</i></pre>
<pre><b>3)</b> <i>cd server</i></pre>
<pre><b>4)</b> <i>npm install</i></pre>
<pre><b>5)</b> <i>Create a .env file in root directory of server and add following </i>
<p>
  DATABASE_URL=<mongo db url>
    
#smtp mail sender setup 
MAIL_HOST=smtp.gmail.com
MAIL_USER=<your email>
MAIL_PASS=<mail pass created by enabling two step verification and app in gmail settings>



FRONTEND_URL=http://localhost:3000
PORT=4000


JWT_SECRET=<your secret>

#Cloudinary setup
CLOUD_NAME=
API_KEY=
API_SECRET=
FOLDER_NAME=

     
</p>
</pre>
<pre><b>6)</b> <i>cd ..</i></pre>
<pre><b>7)</b> <i>cd client</i></pre>
<pre><b>8)</b> <i>npm install</i></pre>
<pre><b>9)</b> <i>Create a .env file in root directory of client and add following </i></pre>
<pre><b>10)</b> <i>REACT_APP_BACKEND_URL=http://localhost:4000/api/v1</i></pre>
<pre><b>11)</b> <i>npm run dev</i></pre>


<h4>TEAM MEMBERS</h4>
Pratush Shyam Gupt</br>
Ashwini Kumar Singh
