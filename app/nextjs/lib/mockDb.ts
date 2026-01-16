import { User } from '@/types'

/**
 * Mock user database with realistic profile data
 * Contains 25 diverse user profiles for development and testing purposes
 */

export const mockUsers: User[] = [
  {
    id: 'usr_1a2b3c4d5e6f',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=random',
    role: 'Engineering Manager',
    department: 'Engineering',
    location: 'San Francisco',
    bio: 'Engineering leader with 10+ years of experience building scalable systems. Passionate about team growth and technical excellence. Former tech lead at major tech companies.',
    joinDate: '2022-03-15',
    status: 'active'
  },
  {
    id: 'usr_2b3c4d5e6f7g',
    name: 'Michael Chen',
    email: 'michael.chen@company.com',
    avatar: 'https://ui-avatars.com/api/?name=Michael+Chen&background=random',
    role: 'Full Stack Developer',
    department: 'Engineering',
    location: 'New York',
    bio: 'Full-stack engineer specializing in React and Node.js. Love working on complex problems and mentoring junior developers. Open source contributor and tech blogger.',
    joinDate: '2023-01-20',
    status: 'active'
  },
  {
    id: 'usr_3c4d5e6f7g8h',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@company.com',
    avatar: 'https://ui-avatars.com/api/?name=Emily+Rodriguez&background=random',
    role: 'Product Designer',
    department: 'Design',
    location: 'London',
    bio: 'Creative product designer focused on user-centered design and accessibility. Experience in both B2B and consumer products. Design systems enthusiast.',
    joinDate: '2022-07-10',
    status: 'active'
  },
  {
    id: 'usr_4d5e6f7g8h9i',
    name: 'James Wilson',
    email: 'james.wilson@company.com',
    avatar: 'https://ui-avatars.com/api/?name=James+Wilson&background=random',
    role: 'Backend Developer',
    department: 'Engineering',
    location: 'Austin',
    bio: 'Backend specialist with expertise in microservices architecture and cloud infrastructure. Strong focus on performance optimization and scalability. AWS certified solutions architect.',
    joinDate: '2023-05-12',
    status: 'active'
  },
  {
    id: 'usr_5e6f7g8h9i0j',
    name: 'Priya Patel',
    email: 'priya.patel@company.com',
    avatar: 'https://ui-avatars.com/api/?name=Priya+Patel&background=random',
    role: 'Product Manager',
    department: 'Product',
    location: 'Singapore',
    bio: 'Product manager with a technical background and strong analytical skills. Expert in data-driven decision making and agile methodologies. Led multiple successful product launches.',
    joinDate: '2022-09-01',
    status: 'active'
  },
  {
    id: 'usr_6f7g8h9i0j1k',
    name: 'David Kim',
    email: 'david.kim@company.com',
    avatar: 'https://ui-avatars.com/api/?name=David+Kim&background=random',
    role: 'Frontend Developer',
    department: 'Engineering',
    location: 'Tokyo',
    bio: 'Frontend engineer passionate about creating beautiful and performant user interfaces. Expert in React, TypeScript, and modern CSS. Contributor to several popular open-source UI libraries.',
    joinDate: '2023-02-14',
    status: 'active'
  },
  {
    id: 'usr_7g8h9i0j1k2l',
    name: 'Lisa Anderson',
    email: 'lisa.anderson@company.com',
    avatar: 'https://ui-avatars.com/api/?name=Lisa+Anderson&background=random',
    role: 'UX Researcher',
    department: 'Design',
    location: 'Berlin',
    bio: 'User experience researcher with a psychology background. Specialized in qualitative and quantitative research methods. Advocate for inclusive design practices.',
    joinDate: '2022-11-20',
    status: 'active'
  },
  {
    id: 'usr_8h9i0j1k2l3m',
    name: 'Carlos Martinez',
    email: 'carlos.martinez@company.com',
    avatar: 'https://ui-avatars.com/api/?name=Carlos+Martinez&background=random',
    role: 'DevOps Engineer',
    department: 'Engineering',
    location: 'Madrid',
    bio: 'DevOps engineer focused on CI/CD automation and infrastructure as code. Kubernetes expert with experience in multi-cloud environments. Strong advocate for security best practices.',
    joinDate: '2023-04-05',
    status: 'active'
  },
  {
    id: 'usr_9i0j1k2l3m4n',
    name: 'Anna Kowalski',
    email: 'anna.kowalski@company.com',
    avatar: 'https://ui-avatars.com/api/?name=Anna+Kowalski&background=random',
    role: 'QA Engineer',
    department: 'Engineering',
    location: 'Toronto',
    bio: 'Quality assurance engineer with expertise in test automation and performance testing. Detail-oriented problem solver with a passion for ensuring software quality. Selenium and Cypress expert.',
    joinDate: '2023-06-18',
    status: 'active'
  },
  {
    id: 'usr_0j1k2l3m4n5o',
    name: 'Robert Taylor',
    email: 'robert.taylor@company.com',
    avatar: 'https://ui-avatars.com/api/?name=Robert+Taylor&background=random',
    role: 'Data Analyst',
    department: 'Data & Analytics',
    location: 'Sydney',
    bio: 'Data analyst specializing in business intelligence and data visualization. Proficient in SQL, Python, and Tableau. Helps teams make data-driven decisions through actionable insights.',
    joinDate: '2022-08-25',
    status: 'active'
  },
  {
    id: 'usr_1k2l3m4n5o6p',
    name: 'Michelle Lee',
    email: 'michelle.lee@company.com',
    avatar: 'https://ui-avatars.com/api/?name=Michelle+Lee&background=random',
    role: 'Marketing Manager',
    department: 'Marketing',
    location: 'Los Angeles',
    bio: 'Marketing professional with a focus on digital marketing and brand strategy. Experienced in growth marketing and customer acquisition. Data-driven approach to campaign optimization.',
    joinDate: '2023-03-10',
    status: 'active'
  },
  {
    id: 'usr_2l3m4n5o6p7q',
    name: 'Ahmed Hassan',
    email: 'ahmed.hassan@company.com',
    avatar: 'https://ui-avatars.com/api/?name=Ahmed+Hassan&background=random',
    role: 'UI/UX Designer',
    department: 'Design',
    location: 'Dubai',
    bio: 'Designer with a strong focus on interaction design and visual communication. Skilled in Figma, Sketch, and prototyping tools. Believes in the power of design to solve complex problems.',
    joinDate: '2022-10-12',
    status: 'inactive'
  },
  {
    id: 'usr_3m4n5o6p7q8r',
    name: 'Jennifer Brown',
    email: 'jennifer.brown@company.com',
    avatar: 'https://ui-avatars.com/api/?name=Jennifer+Brown&background=random',
    role: 'HR Manager',
    department: 'HR',
    location: 'Chicago',
    bio: 'Human resources professional focused on talent acquisition and employee development. Passionate about building inclusive workplace cultures. Strong believer in continuous learning and growth.',
    joinDate: '2022-05-20',
    status: 'active'
  },
  {
    id: 'usr_4n5o6p7q8r9s',
    name: 'Thomas Schmidt',
    email: 'thomas.schmidt@company.com',
    avatar: 'https://ui-avatars.com/api/?name=Thomas+Schmidt&background=random',
    role: 'Sales Director',
    department: 'Sales',
    location: 'Amsterdam',
    bio: 'Sales leader with extensive experience in SaaS and enterprise sales. Expert in building high-performing sales teams. Focus on consultative selling and long-term customer relationships.',
    joinDate: '2023-01-08',
    status: 'active'
  },
  {
    id: 'usr_5o6p7q8r9s0t',
    name: 'Rachel Green',
    email: 'rachel.green@company.com',
    avatar: 'https://ui-avatars.com/api/?name=Rachel+Green&background=random',
    role: 'Customer Success Manager',
    department: 'Customer Success',
    location: 'Seattle',
    bio: 'Customer success professional dedicated to ensuring client satisfaction and retention. Expert in onboarding, training, and relationship management. Strong communicator and problem solver.',
    joinDate: '2023-07-15',
    status: 'active'
  },
  {
    id: 'usr_6p7q8r9s0t1u',
    name: 'Kevin Nguyen',
    email: 'kevin.nguyen@company.com',
    avatar: 'https://ui-avatars.com/api/?name=Kevin+Nguyen&background=random',
    role: 'Data Scientist',
    department: 'Data & Analytics',
    location: 'San Francisco',
    bio: 'Data scientist with expertise in machine learning and predictive analytics. PhD in Computer Science with focus on AI. Experienced in deploying ML models to production at scale.',
    joinDate: '2022-06-30',
    status: 'active'
  },
  {
    id: 'usr_7q8r9s0t1u2v',
    name: 'Sophie Martin',
    email: 'sophie.martin@company.com',
    avatar: 'https://ui-avatars.com/api/?name=Sophie+Martin&background=random',
    role: 'Frontend Developer',
    department: 'Engineering',
    location: 'Paris',
    bio: 'Frontend developer with a keen eye for design and performance. Specialized in building accessible and responsive web applications. Enthusiastic about modern web technologies and best practices.',
    joinDate: '2023-08-20',
    status: 'active'
  },
  {
    id: 'usr_8r9s0t1u2v3w',
    name: 'Daniel Wright',
    email: 'daniel.wright@company.com',
    avatar: 'https://ui-avatars.com/api/?name=Daniel+Wright&background=random',
    role: 'Finance Manager',
    department: 'Finance',
    location: 'New York',
    bio: 'Finance professional with strong analytical and strategic planning skills. CPA with experience in financial reporting and budget management. Focus on operational efficiency and cost optimization.',
    joinDate: '2022-04-10',
    status: 'active'
  },
  {
    id: 'usr_9s0t1u2v3w4x',
    name: 'Maria Garcia',
    email: 'maria.garcia@company.com',
    avatar: 'https://ui-avatars.com/api/?name=Maria+Garcia&background=random',
    role: 'Operations Manager',
    department: 'Operations',
    location: 'Barcelona',
    bio: 'Operations manager focused on process improvement and efficiency. Expert in project management and cross-functional collaboration. Lean Six Sigma certified with proven track record of success.',
    joinDate: '2023-09-05',
    status: 'active'
  },
  {
    id: 'usr_0t1u2v3w4x5y',
    name: 'William Davis',
    email: 'william.davis@company.com',
    avatar: 'https://ui-avatars.com/api/?name=William+Davis&background=random',
    role: 'Backend Developer',
    department: 'Engineering',
    location: 'Boston',
    bio: 'Backend developer specializing in API design and database optimization. Strong background in distributed systems and message queues. Advocate for clean code and test-driven development.',
    joinDate: '2022-12-01',
    status: 'inactive'
  },
  {
    id: 'usr_1u2v3w4x5y6z',
    name: 'Olivia Thompson',
    email: 'olivia.thompson@company.com',
    avatar: 'https://ui-avatars.com/api/?name=Olivia+Thompson&background=random',
    role: 'Product Manager',
    department: 'Product',
    location: 'London',
    bio: 'Product manager with a focus on user experience and market research. MBA graduate with technical background. Successfully launched products that achieved significant market traction.',
    joinDate: '2023-02-28',
    status: 'active'
  },
  {
    id: 'usr_2v3w4x5y6z7a',
    name: 'Alex Turner',
    email: 'alex.turner@company.com',
    avatar: 'https://ui-avatars.com/api/?name=Alex+Turner&background=random',
    role: 'Security Engineer',
    department: 'Engineering',
    location: 'Austin',
    bio: 'Security engineer passionate about application security and threat modeling. CISSP certified with experience in penetration testing and security audits. Regular speaker at security conferences.',
    joinDate: '2023-10-15',
    status: 'active'
  },
  {
    id: 'usr_3w4x5y6z7a8b',
    name: 'Natalie Wilson',
    email: 'natalie.wilson@company.com',
    avatar: 'https://ui-avatars.com/api/?name=Natalie+Wilson&background=random',
    role: 'Content Strategist',
    department: 'Marketing',
    location: 'Portland',
    bio: 'Content strategist with expertise in content marketing and SEO. Skilled writer and editor with a talent for storytelling. Focuses on creating compelling content that drives engagement.',
    joinDate: '2022-07-22',
    status: 'active'
  },
  {
    id: 'usr_4x5y6z7a8b9c',
    name: 'Christopher Lee',
    email: 'christopher.lee@company.com',
    avatar: 'https://ui-avatars.com/api/?name=Christopher+Lee&background=random',
    role: 'Mobile Developer',
    department: 'Engineering',
    location: 'Seoul',
    bio: 'Mobile developer with expertise in iOS and Android development. Proficient in Swift, Kotlin, and React Native. Focus on creating smooth and intuitive mobile experiences.',
    joinDate: '2023-11-01',
    status: 'active'
  },
  {
    id: 'usr_5y6z7a8b9c0d',
    name: 'Isabella Rossi',
    email: 'isabella.rossi@company.com',
    avatar: 'https://ui-avatars.com/api/?name=Isabella+Rossi&background=random',
    role: 'Business Analyst',
    department: 'Product',
    location: 'Milan',
    bio: 'Business analyst bridging the gap between business needs and technical solutions. Expert in requirements gathering and process mapping. Strong problem-solving and communication skills.',
    joinDate: '2022-09-18',
    status: 'inactive'
  }
]

/**
 * Get a user by their ID
 * @param id - The unique user identifier
 * @returns The user object or undefined if not found
 */
export function getUserById(id: string): User | undefined {
  return mockUsers.find(user => user.id === id)
}

/**
 * Get all users with a specific role
 * @param role - The role to filter by
 * @returns Array of users with the specified role
 */
export function getUsersByRole(role: string): User[] {
  return mockUsers.filter(user => user.role === role)
}

/**
 * Get all users in a specific department
 * @param department - The department to filter by
 * @returns Array of users in the specified department
 */
export function getUsersByDepartment(department: string): User[] {
  return mockUsers.filter(user => user.department === department)
}

/**
 * Get all active users
 * @returns Array of active users
 */
export function getActiveUsers(): User[] {
  return mockUsers.filter(user => user.status === 'active')
}

/**
 * Get all users in a specific location
 * @param location - The location to filter by
 * @returns Array of users in the specified location
 */
export function getUsersByLocation(location: string): User[] {
  return mockUsers.filter(user => user.location === location)
}
