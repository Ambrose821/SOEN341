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

<h2>Project Approach</h3>

  <h3><strong>Frontend</strong></h3>
  <ul>
    <li><u>EJs</u>
      <ul>
        <li>Pros:
          <ul>
            <li>Simple syntax for embedding JavaScript into HTML</li>
            <li>Integrates easily with Node.js</li>
          </ul>
        </li>
        <li>Cons:
          <ul>
            <li>Limited functionality compared to more modern frameworks</li>
          </ul>
        </li>
      </ul>
    </li>
    <li><u>React</u>
      <ul>
        <li>Pros:
          <ul>
            <li>Component-based; can re-use components</li>
            <li>Virtual DOM rendering for responsiveness</li>
            <li>Good documentation</li>
          </ul>
        </li>
        <li>Cons:
          <ul>
            <li>Steep learning curve</li>
            <li>Requires additional tools for server-side rendering</li>
          </ul>
        </li>
      </ul>
    </li>
    <li><u>Flutter</u>
      <ul>
        <li>Pros:
          <ul>
            <li>Single codebase for all types of applications</li>
            <li>Super fast and responsive</li>
            <li>A lot of predefined widgets</li>
          </ul>
        </li>
        <li>Cons:
          <ul>
            <li>Mainly used for mobile (although it is multiplatform)</li>
            <li>Still new therefore not much documentation and still developing</li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>

  <h3><strong>Backend</strong></h3>
  <ul>
    <li><u>Node.js</u>
      <ul>
        <li>Pros:
          <ul>
            <li>Huge amount of documentation</li>
            <li>Works well with other JavaScript frameworks/libs</li>
          </ul>
        </li>
        <li>Cons:
          <ul>
            <li>Scalability issues</li>
            <li>Inconsistent standard library for naming conventions</li>
          </ul>
        </li>
      </ul>
    </li>
    <li><u>PHP</u>
      <ul>
        <li>Pros:
          <ul>
            <li>Strongly typed therefore increases readability</li>
            <li>A lot of documentation</li>
          </ul>
        </li>
        <li>Cons:
          <ul>
            <li>Older language therefore slower technology and outdated</li>
            <li>Takes a long time to set up an environment compared to other backend languages</li>
          </ul>
        </li>
      </ul>
    </li>
    <li><u>Java</u>
      <ul>
        <li>Pros:
          <ul>
            <li>Strongly typed so it is very good for readability</li>
            <li>A lot of good frameworks like Spring</li>
            <li>Good scalability</li>
            <li>Uses JVM so very portable</li>
          </ul>
        </li>
        <li>Cons:
          <ul>
            <li>Leads to boilerplate code</li>
            <li>Long to set up environment</li>
            <li>No Asynchronous programming</li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>

  <h3><strong>Database</strong></h3>
  <ul>
    <li><u>MongoDB</u>
      <ul>
        <li>Pros:
          <ul>
            <li>NoSQL therefore flexible data modeling</li>
            <li>Scalable for high-performance apps</li>
            <li>JSON formatted documents</li>
          </ul>
        </li>
        <li>Cons:
          <ul>
            <li>Data consistency can be challenging</li>
          </ul>
        </li>
      </ul>
    </li>
    <li><u>Firebase</u>
      <ul>
        <li>Pros:
          <ul>
            <li>Easy to setup and integrate into a project</li>
            <li>Has authentication libraries for you</li>
          </ul>
        </li>
        <li>Cons:
          <ul>
            <li>Limited query capabilities</li>
            <li>Have to pay for more access</li>
          </ul>
        </li>
      </ul>
    </li>
    <li><u>MySQL</u>
      <ul>
        <li>Pros:
          <ul>
            <li>Readable and widely used relational database</li>
            <li>Mature tooling and a lot of documentation</li>
          </ul>
        </li>
        <li>Cons:
          <ul>
            <li>Not flexible for modeling data</li>
            <li>Migrating databases can be complex</li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
<h3> Detailed Explination </h3>
  <p>We decided to choose React in the frontend, Node.js for backend, and MongoDB for our database. We chose Node.js since we are all familiar with JavaScript and there is a lot of documentation on the language and especially Node.js. Also, there is an abundance of frameworks for it, and we are going with Express.js to implement the MVC design pattern. Secondly, it is a lightweight, easy to setup backend language which is perfect for this project since we do not want to spend a lot of our time and resources setting up the backend. Secondly, we chose React since it integrates nicely with Node.js and it has a big community and documentation behind it in case of us getting stuck. We chose this over Flutter or EJs because of the amount of documentation it provides us. Lastly, we chose to go with a Non-Relational Database, MongoDB since we want flexible data modeling. If we were to choose a relational database such as MySQL, it would have been hard to change the data tables if we needed to.
  </p>
