## Trillion EPA Data Visualization Platform

Trillion Technology Solutions, Inc. [(Trillion)] (http://www.ttsiglobal.com) has implemented a prototype – “Trillion OpenEPA Data Visualization Platform” [(ODV Platform)] (http://epaci.ttsiglobal.com) - in response to EPA/OEI Environmental Digital Services that leverages industry leading open source technology stacks and developed using Agile development methodology.
## Methodology Approach
Trillion leveraged several years of Agile experience in commercial and government sectors this experience to create a compact set of Agile sprints for development a solution for the challenge posed by EPA/OEI.  Our team was self-organizing, cross-functional, and participated in flushing out user stories, design and development, unit and integration testing.  A conference room was barricaded off from the rest of the company and was used exclusively by the ODV Platform Agile team for [daily Scrums, discussions and collaborative team development.](https://github.com/trilliongit/epa/blob/e6376c0d1da4d4b373f37768df9cd14cd074b2f7/doc/WorkeringSessions.pdf)

Sprint 0 comprised of understanding and detailing the requirements presented in the RFQ and creating a few skeleton user stories that created a bare bone structure of the prototype including wireframes, AWS setup and GitHub among others.  Core development was during Sprint 1 and Sprint 2, each lasting 5 days. We had 5 days of hardening where we did integration testing. User stories with acceptance criteria were created after discussion among the team and with the product owner.  Daily Scrum meetings provided everyone to come together formally to discuss work done the previous day and the plan for that day in addition to bringing up impediments if any.  The last day of each sprint included sprint retrospective and review followed by sprint planning for the next sprint.  A product backlog was created by the product owner from which user stories were chosen for each sprint which went into the sprint backlog.  An open source Agile Lifecycle Management Taiga (ALM) tool was used for capturing all Agile artifacts.  End of the sprint deployments were done on the Amazon instance and a demo was provided to the product owner with feedback taken that was loaded back into the product backlog.  The product owner resolved the user stories to show acceptance of the deliverables.
## Design and Development Approach
The ODV Platform leans on a human centered design to provide an intuitive web based graphical user interface for citizens to view data provided by the government for consumption by the general public. We used [EPA Water Quility Data Set](http://www.waterqualitydata.us/) to develop our prototype.  The prototype was implemented using a technology stack that is pluggable and requires minimal changes to substitute technology libraries.  Several years of experience with DevOps in the government and commercial sectors and associated lessons learned were useful in quickly putting together the DevOps platform for the ODV Platform.  Trillion used several tools for DevOps including GitHub for code repository, [AWS](https://github.com/trilliongit/epa/blob/master/doc/amazon.png) for Linux instances, Jenkins for Continuous Integration, Jasmine for testing, Docker  for deployment, WAVE for 508 testing, Istanbul for code coverage and Datadog for continuous monitoring. We used Amazon Virtual Private Cloud (VPC) PaaS services to create Web DMZ Zone Architecture allowing only 80 through Apache to connect to ODV Platform.
The technical stack used in shown in the [logical architecture diagram.](https://github.com/trilliongit/epa/blob/master/doc/EPAArchitecture.JPG)
Our [deployment architecture](https://github.com/trilliongit/epa/blob/master/doc/EPADeploymet.jpg) shows how the technology stack is laid out across the environments.

##ODV Features and Usage
ODV Platform provides users an interactive interface that implements a drill down method to accessing recall information provided by the government. Hierarchical information access works as follows:
* At the top level is the [home page] which takes the user to an interactive map of United States.  Water Quality information is available for each state – Drugs, Devices and Food.
* The users can click on each state for 3 year of the map to obtain a bar graph of annual historical color coded Lead information, for each of the categories per US state.  Some states did not have any Lead related information. For those states the application shows empty graph.  

##Continuous Integration Environment
http://epaci.ttsiglobal.com:8080/view/All/builds

##ODV Continuous Monitoring Environment
https://p.datadoghq.com/sb/wHi387-a97451cc32


## Production URL
http://epaci.ttsiglobal.com


### Installation
See our [Installation Guide](INSTALL.md)
