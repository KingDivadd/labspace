
export const footerLinks = [
  {
    title: "About",
    links: [
      { title: "How it works", url: "/" },
      { title: "Featured", url: "/" },
      { title: "Partnership", url: "/" },
      { title: "Bussiness Relation", url: "/" },
    ],
  },
  {
    title: "Company",
    links: [
      { title: "Events", url: "/" },
      { title: "Blog", url: "/" },
      { title: "Podcast", url: "/" },
      { title: "Invite a friend", url: "/" },
    ],
  },
  {
    title: "Socials",
    links: [
      { title: "Discord", url: "/" },
      { title: "Instagram", url: "/" },
      { title: "Twitter", url: "/" },
      { title: "Facebook", url: "/" },
    ],
  },
];


export const notificationExample = [
  {title: 'High Priority Task Overdue', details: 'Task Submit Permit Application is overdue.', dateTime: 'June 13, 2024 12:45', status: 'error'},
  {title: 'New Appointment Scheduled', details: 'Appointment with John Doe on June 12, 2024.', dateTime: 'June 10, 2024 10:35', status: 'success'},
  {title: 'Sales Target Achieved', details: 'Sales team has achieved the monthly target.', dateTime: 'June 14, 2024 08:45', status: 'success'},
  {title: 'New Lead Added', details: 'A new lead has been added by Sales Rep Mike Smith.', dateTime: 'June 15, 2024 11:35', status: 'primary'},
  {title: 'Engineering Document Uploaded', details: 'New engineering drawings have been uploaded for Project #456.', dateTime: 'June 17, 2024 15:10', status: 'primary'},
  {title: 'Payment Received', details: 'Payment of $5,000 received from Jane Smith for Project #123.', dateTime: 'June 15, 2024 15:30', status: 'success'},
  {title: 'Service Ticket Raised', details: 'Service ticket "Network Issue" raised by customer John Doe.', dateTime: 'June 15, 2024 11:25', status: 'success'},
]

export const emailNotificationToggle = [
  {title: 'Lead Assignment Notification', description: 'Notifies sales or operations team members when a new lead is assigned to them.', toggle: true},
  {title: 'Appointment Reminders', description: 'Sends reminders to customers and team members about upcoming appointments.', toggle: false},
  {title: 'Task Completion Updates', description: 'Notifies users when tasks or milestones are completed.', toggle: true},
  {title: 'Daily Summary Reports', description: 'Sends daily summaries of activities, leads, sales, and other relevant metrics.', toggle: true},
  {title: 'Payment Receipts', description: 'Sends payment receipts to customers upon transaction completion.', toggle: 'true'}
]

export const pushNotificationToggle =[
  {title: 'Real-Time Lead Alerts', description: 'Instant notifications for new leads assigned to sales or operations team members.', toggle: true},
  {title: 'Task Deadlines', description: 'Alerts users about approaching deadlines for tasks or projects.', toggle: false},
  {title: 'Project Updates', description: 'Alerts for any updates or changes in ongoing projects.', toggle: true},
  {title: 'New Feedback Received', description: 'Instant notifications when new customer feedback is received.', toggle: true}
]

export const adminLogTabs = [
  {title: 'User Activity', id: 'userActivity'}, {title: 'System Logs', id: 'systemLogs'}, {title: 'Data Access Logs', id: 'dataAccessLogs'}, {title: 'API Access Logs', id: 'apiAccessLogs'}, {title: 'Audit Logs', id: 'auditLogs'}
]

export const timeZone = ['Western European Time (UTC+0)', 'Central European Time (UTC+2)', 'Eastern European Time (UTC+2)', 'Kalingrad Time (UTC+2)','Further-Eastern European Time (UTC+3)', 'Azores Time (UTC-1)', 'Armenia Time (UTC+4)', 'Kazakhstan Time (UTC+5)']

export const paymentRoute = ['PayPal', 'Stripe']

export const userResponsibilities = {
  admin: [
      'Add, edit, delete users and assign roles and permissions.', 'Configure and manage CRM settings and integrations.', 'Ensure the security of the CRM system, including data protection and user access controls.', 'Generate and view detailed reports on various metrics.', 'Monitor user activities and system usage.', 'Set up and manage system-wide alerts and notifications.', 'Oversee database integrity and perform regular backups.', 'Address and resolve system issues and bugs.'
  ],
  
  sales: ['View, manage, and follow up on leads.', 'Track the progress of leads through the sales pipeline.', 'Maintain communication with potential and existing customers.', 'Prepare and manage sales contracts and related documents.', 'Monitor sales targets and achievements.', 'Schedule and manage customer appointments using Google Calendar integration.', 'Generate sales reports and metrics.', 'Train and mentor new sales team members.'],
  
  operation: ['Oversee and track the progress of projects through various stages.', 'Coordinate workflows for HOA, engineering, permitting, and installation.', 'Assign and manage crews for different installation phases.', 'Track materials ordered, received, and delivered.', 'Set up and manage task notifications for project updates.', 'Ensure quality and compliance with project standards.', 'Address and resolve operational issues and bottlenecks.', 'Maintain detailed records of project activities and updates.',],
  
  designer: ['View and manage associated leads and sold jobs.', 'Upload and manage design contracts and related documents.', 'Communicate with customers regarding design updates and changes.', 'Receive and respond to task notifications for design-related tasks.', 'Update design specifications based on customer feedback and project requirements.', 'Collaborate with sales, operations, and engineering teams.', 'Ensure design quality and adherence to standards.', 'Generate design progress reports.'],
  
  customer: ['View the status of HOA, permits, and payments.', 'Submit and track service tickets and upload photos.', 'Access and upload payment receipts.', 'Receive notifications for stage completions and warranty information.', 'Access project-related documents and receipts.', 'Communicate with the support team regarding project updates.', 'Provide feedback and reviews for services received.', 'Manage personal account information and settings.'],
  
  technician: ['Access job details, installation dates, and project instructions.', 'Execute assigned tasks and installation phases.', 'Upload regimented photos of job progress.', 'Upload and manage bill sheets for each job.', 'Manage tools and equipment required for installations.', 'Ensure installation quality and adherence to specifications.', 'Report on job completion and any issues encountered.', 'Interact with customers on-site for service tickets and updates.'],
  
  finance: ['Monitor profit/loss for each project and track financial performance.', 'Manage bills, invoices, and receipts.', 'Handle payroll for employees and contractors.', 'Prepare and manage project budgets.', 'Track and manage project expenses and costs.', 'Generate financial reports: Monthly, quarterly, and fiscal.', 'Ensure financial compliance with relevant laws and regulations.', 'Prepare financial forecasts and projections.']
  
  }


export const userArray = [{lastName: "Iroegbu", firstName: "David", email: 'ireugbudavid@gmail.com', phone: '07044907610', role: 'Sales', status: 'active',password: 'user1password' }, {lastName: "Ayeni", firstName: "Peace", email: 'ayenipeace@gmail.com', phone: '09026030392', role: 'Technician', status: 'inactive', password: 'user2password'}, {lastName: "Ayeni", firstName: "Peace", email: 'ayenipeace@gmail.com', phone: '09026030392', role: 'Technician', status: 'inactive', password: 'user2password'}, {lastName: "Ayeni", firstName: "Peace", email: 'ayenipeace@gmail.com', phone: '09026030392', role: 'Technician', status: 'inactive', password: 'user2password'}, {lastName: "Ayeni", firstName: "Peace", email: 'ayenipeace@gmail.com', phone: '09026030392', role: 'Technician', status: 'inactive', password: 'user2password'}, {lastName: "Ayeni", firstName: "Peace", email: 'ayenipeace@gmail.com', phone: '09026030392', role: 'Technician', status: 'inactive', password: 'user2password'}, {lastName: "Ayeni", firstName: "Peace", email: 'ayenipeace@gmail.com', phone: '09026030392', role: 'Technician', status: 'inactive', password: 'user2password'}]


export const salesTasksArray = [
  {taskId: 'TS1001', taskTitle: 'Contract Signing', description: 'Send Contract for signing', dueDate: 'June 12, 2024', priority: 'High', assignedTo: 'John Doe', status: 'pending'},
  {taskId: 'TS1001', taskTitle: 'Contract Signing', description: 'Send Contract for signing', dueDate: 'June 12, 2024', priority: 'High', assignedTo: 'John Doe', status: 'pending'},
  {taskId: 'TS1001', taskTitle: 'Contract Signing', description: 'Send Contract for signing', dueDate: 'June 12, 2024', priority: 'High', assignedTo: 'John Doe', status: 'pending'},
  {taskId: 'TS1001', taskTitle: 'Contract Signing', description: 'Send Contract for signing', dueDate: 'June 12, 2024', priority: 'High', assignedTo: 'John Doe', status: 'pending'},
]

export const taskDetailsArray= [
  {title: 'Task Creation Date', value: 'June 11, 2024'},
  {title: ''}
]

export const pipelineBasicInfo = [
  {title: "Lead ID:", value: "LD100023"}, {title: "Customer Name:", value: "John Doe"}, {title: "Customer Address:", value: "123 Main Street"},
  {title: "Email:", value: "john.doe@email.com"}, {title: "Appointment Date:", value: "June 12, 2024"}, {title: "Disposition:", value: "sold"}, 
  {title: "Contract Amount:", value: "$25,000"}, {title: "Project Type:", value: "Lattice"}, {title: "Project Status:", value: "New"},
  {title: "Sales Person Assigned:", value: "Monica Sales"}
]

export const pipelineProjectInfo = [
  {title: "Job Number:", value: "JOB871223"}, {title: "Contract Date:", value: "June 12, 2024"}, {title: "HOA:", value: "No HOA"},
  {title: "Engineering:", value: "Submitted, Received, $500 " }, {title: "Permit Sent Date", value: "June 12, 2024"},  {title: "Permit Number", value: "102345"},  {title: "Permit Received Date", value: "June 13, 2024"},  {title: "Permit", value: "$300"}
]

export const pipelineApprovalInfo = [
  {title: "HOA Send Date:", value: "June 13, 2024"}, {title: "HOA Approved Date:", value: "June 14, 2024"},
  {title: "Engineering Submitted Date:", value: "June 13, 2024 "}, {title: "Engineering Received Date", value: "June 13, 2024"},
  {title: "Permit Number:", value: "12345"}, {title: "Permit Sent Date:", value: "June 14, 2024"}, {title: "Approved Date:", value: "June 15,2024"}
]

export const pipelineLeadComment = [
  {title: "June 11, 2023", value: "Followed up with the client on June 11, 2023"},
  {title: "June 13, 2023", value: "Submitted lead for HOA approval"},
  {title: "June 14, 2023", value: "HOA approved lead on June 14, 2024"},
  {title: "June 15, 2023", value: "Submitted lead for Engineering Approval"},
  {title: "June 16, 2023", value: "Received Approval from Engineering"},
  
]

export const jobListBasicInfo = [
  {title: "Job Number", value: "JB1000123"}, {title: "Customer Name", value: "Mark Tyson"}, {title: "Address", value: "123, Main St, Springfield"}, {title: "Phone", value: "(123)-456-789"}, {title: "Designer", value: "Marry Jane"}, {title: "Gate Code", value: "234567"}, {title: "Appointment Date", value: "June 21, 2024"}
]

export const jobListProjectInfo = [
  {title: "Attached/Freestanding", value: 'Attached'}, {title: "IRP/Lattice/Combo/Flat Pan/Louver/Hybrid", value: 'IRP'}, {title: 'Cover Size', value: "10x20 feet"}, {title: "End Cap Style", value: "Standard"}, {title: "Cover Color", value:"blue"}, {title: "Trim Color", value: 'white'}
]

export const jobListScheduleInfo = [
  {title:"Footings Date", value: "June 21, 2024" }, {title: 'Set Post Date', value: "June 23, 2024"}, {title: "Demo Date", value: "June 25, 2024"}, {title: "Install Date", value: "June 26, 2024"}, {title: "Electrical Date", value: "June 28, 2024"}, {title: "Electrical Date", value: "June 29, 2024"}, {title: "Inspection Date", value: "June 29, 2024"}, {title: "Inspection Result", value: "Pass"}
]

export const jobListMaterialsInfo = [
  {title: "Materials Ordered", value: "Yes"}, {title: "Materials", value: "$1,500"}, {title: "Material Received Date", value: "June 18, 2024"}, {title: "Material Delivered to Customer Date", value: "June 20, 2024"}
]

export const jobListPayementInfo = [
  {title: "Deposit", value: "$500"}, {title: 'Scheduling', value: "$450"}, {title: 'Delivery', value: '$500'}, {title: 'Construction Completion', value: "$500"}, {title: "Electrical Completion", value: '$250'}
]

export const authentications  = [
  {email: 'admin@yopmail.com', password: 'adminPassword'},
  {email: 'sales@yopmail.com', password: 'salesPassword'},
  {email: 'ops@yopmail.com',   password: 'opsPassword'},
  {email: 'installer@yopmail.com', password: 'installerPassword'},
  {email: 'permit@yopmail.com', password: 'permitPassword'},
]

// ------------------------------------------------------------------------------------------------------------------------------------------------

export const signup_user_role = [
  {
    title: 'Single User', 
    description: ['User will have access to features and functionality related to their own credit report, dispute letters, etc',],
    id: 'single_user'
  },
  {
    title: 'Business User', 
    description: ['User will have access to features and functionality related to managing multiple profiles (clients), credit reports, dispute letters, and credit education resources for their business.'], id: 'business_user'
  },
]

export const dash_item = [
  {title: 'All client', amount: 23, icon: ''},
  {title: 'Active client', amount: 10, icon: ''},
  {title: 'All Leads', amount: 27, icon: ''},
  {title: 'Active Leads', amount: 13, icon: ''},
  {title: 'Pending Invoices', amount: 9, icon: ''},
  {title: 'Invoice Paid', amount: 19, icon: ''},
]

