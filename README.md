<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="author" content="Philippe Rebeiro">
</head>
<body>
<H1>SOEN 341</H1>
<h2>Objective</h2>
Develop a car rental web application.
<h2>Project Description</h2>
<p>When traveling, it is common for people to rent a vehicle for a short period of time. In this project, our aim is to craft a user-friendly car rental application. Without the need for immediate login, users can browse available vehicles across diverse locations for their desired duration. Creating an account enhances their experience, enabling them to reserve, view, modify, and cancel bookings. Additionally, they can curate a list of favorite vehicles.</p>
<h2>Team Members</h2>
<Table>
  <tr>
    <Th>
      Members
    </Th>
    <Th>
      GitHub
    </Th>
    <Th>
      Roles
    </Th>
    <Th>
      Background
    </Th>
  </tr>
  <tr>
    <td>
      Ambrose McLaughlin
    </td>
    <td>
      <a href="https://github.com/Ambrose821">Ambrose821</a>
    </td>
    <td>
      Team Leader, Backend Development
    </td>
    <td>
      2nd year Software Engineering student at Concordia University with experience in
    </td>
  </tr>
   <tr>
    <td>
      Philippe Rebeiro
    </td>
    <td>
      <a href="https://github.com/Cheese5teak">Cheese5teak</a>
    </td>
    <td>
      Frontend Development, Documentation
    </td>
    <td>
      2nd year Software Engineering student at Concordia University with experience in front end development, C# and Java programming
    </td>
  </tr>
  <tr>
    <td>
      Vinisha Manek
    </td>
    <td>
      <a href="https://github.com/vinishamanek">vinishamanek</a>
    </td>
    <td>
      Documentation, Frontend Development, Backend Development
    </td>
    <td>
      2nd year Software Engineering student at Concordia University with experience in app development using SwiftUI, and web development using Node.js.
    </td>
  </tr>
  <tr>
    <td>
      Christopher Mezzacappa
    </td>
    <td>
      <a href="https://github.com/Christopher-Mezzacappa">Christopher-Mezzacappa</a>
    </td>
    <td>
      Backend Development
    </td>
    <td>
      2nd year Software Engineering student at Concordia University with experience in full stack development at Genetec. Worked on custom customer plugins for Genetec products. Worked with C# specifically the WPF frameworks and the MVVM design pattern for development.
    </td>
  </tr>
  <tr>
    <td>
      Michael Mezzacappa
    </td>
    <td>
      <a href="https://github.com/Michael-Mezzacappa">Michael-Mezzacappa</a>
    </td>
    <td>
      Frontend Development, Backend Development
    </td>
    <td>
      2nd year Software Engineering student at Concordia University with experience in frontend development and backend web development, specifically in HTML, CSS and Javascript.
    </td>
  </tr>
</Table>

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
</body>
</html>
