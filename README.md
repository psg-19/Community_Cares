Welcome to <h3>Community Care's</h3> where every plate tells a story of compassion and sustainability!
Join us in our mission to transform leftover food from restaurants into a lifeline for those in need.
Together, we're not just reducing wastage; we're nourishing souls and building a brighter, more equitable future. 
Let's turn every meal into a beacon of hope for those who face hunger daily. Together, we can make a difference, one plate at a time.

<h5><a href="https://community-cares-9y35.vercel.app/">Live Link</a></h5>
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
