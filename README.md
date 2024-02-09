<H1>SOEN 341</H1>
<h2>Objective</h2>
Develop a car rental web application.
<h2>Project Description</h2>
<p>When traveling, it is common for people to rent a vehicle for a short period of time. In this project, our aim is to craft a user-friendly car rental application. Without the need for immediate login, users can browse available vehicles across diverse locations for their desired duration. Creating an account enhances their experience, enabling them to reserve, view, modify, and cancel bookings. Additionally, they can curate a list of favorite vehicles.</p>
<h2>Team Members</h2>
<ul>
  <li>Ambrose McLaughlin – Team Leader, Backend Development</li>
  <li>Philippe Rebeiro – Frontend Development</li>
  <li>Vinisha Manek – Documentation, Frontend Development, Backend Development</li>
  <li>Christopher Mezzacappa - Backend Development</li>
  <li>Michael Mezzacappa - Frontend Development, Backend Development</li>
</ul>
<h2>Technologies</h2>
<ul>
  <li>React</li>
  <li>MongoDB</li>
  <li>NodeJS</li>
  <li>ExpressJS</li>
</ul>

Install instructions:
<h2>Installation Instructions</h2>
<p>To set up this project locally, follow these steps:</p>
<h3>Prerequisites</h3>
<ul>
  <li>Node.js installed on your system</li>
  <li>npm (Node Package Manager), which comes with Node.js</li>
  <li>MongoDB set up for the database</li>
</ul>
<h3>Setup</h3>
<ol>
  <li>Clone the repository to your local machine:</li>
  <pre>git clone https://github.com/Ambrose821/SOEN341</pre>
  <li>Navigate to the repository folder:</li>
  <pre>cd [repository name]</pre>
  <li>To set up the backend API, run the following commands:</li>
  <pre>cd api<br>npm install</pre>
  <li>To set up the React front-end, open a new terminal and run:</li>
  <pre>cd react-client<br>npm install<br>npm start</pre>
</ol>
<p>This will start both the API server and the React development server. By default, the API will be available at <code>http://localhost:9000</code> and the React application will be available at <code>http://localhost:3000</code>. </p>




<h2>Repository Management with Git</h2>
<p>Here are some common Git commands to manage the repository:</p>
<h3>Branch Management</h3>
<ul>
  <li>Creating a new branch:</li>
  <pre>git branch [branch-name]</pre>
  <li>Switching to a branch:</li>
  <pre>git checkout [branch-name]</pre>
  <li>Creating a new branch and switching to it:</li>
  <pre>git checkout -b [branch-name]</pre>
</ul>
<h3>Code Changes</h3>
<ul>
  <li>Adding changes to the staging area:</li>
  <pre>git add .</pre>
  <li>Committing changes:</li>
  <pre>git commit -m "[commit message]"</pre>
  <li>Pushing changes to a remote repository:</li>
  <pre>git push origin [branch-name]</pre>
</ul>
<h3>Merging Changes</h3>
<ul>
  <li>Before merging, ensure you're on the branch you want to merge into:</li>
  <pre>git checkout [target-branch]</pre>
  <li>To merge changes from another branch into the current branch:</li>
  <pre>git merge [source-branch]</pre>
</ul>
<p>Remember to regularly pull changes from the remote repository to keep your local copy up to date:</p>
<pre>git pull origin [branch-name]</pre>
