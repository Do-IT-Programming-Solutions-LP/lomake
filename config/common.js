/**
 * Insert application wide common items here
 */

const inProduction = process.env.NODE_ENV === 'production'

const basePath = process.env.BASE_PATH || '/'

const degreeLevels = [
  'Bachelor´s level (1. cycle)',
  'Master´s level (2. cycle)',
  'Doctoral level (3. cycle)',
]

const faculties = [
  'Faculty of Agriculture and Forestry',
  'Faculty of Arts',
  'Faculty of Biological and Environmental Sciences',
  'Faculty of Educational Sciences',
  'Faculty of Law',
  'Faculty of Medicine',
  'Faculty of Pharmacy',
  'Faculty of Science',
  'Faculty of Social Sciences',
  'Faculty of Theology',
  'Faculty of Veterinary Medicine',
  'Swedish School of Social Science',
].sort((a, b) => a.localeCompare(b))

const requiredFormIds = [
  'faculty',
  'degree_level',
  'programme',
  'review_of_last_years_situation_report',
  'student_admissions_light',
  'student_admissions_text',
  'language_environment_light',
  'language_environment_text',
  'programme_identity_light',
  'programme_identity_text',
  'employability_light',
  'employability_text',
  'learning_outcomes_light',
  'learning_outcomes_text',
  'curriculum_light',
  'curriculum_text',
  'guidance_light',
  'guidance_text',
  'student_feedback_light',
  'student_feedback_text',
  'community_wellbeing_light',
  'community_wellbeing_text',
  'teacher_skills_light',
  'teacher_skills_text',
  'management_light',
  'management_text',
  'teaching_resources_light',
  'teaching_resources_text',
  'recruitment_influence_light',
  'recruitment_influence_text',
  'resourcing_light',
  'resourcing_text',
  'successes_and_development_needs_text',
  'measures_1_text',
]

const SUPERADMINS = ['markokos', 'tgtapio', 'jehelen', 'mluukkai', 'admin']

const isSuperAdmin = (uid) => {
  return SUPERADMINS.includes(uid)
}

const cypressUsers = [
  {
    uid: 'cypressUser',
    firstname: 'cyp',
    lastname: 'res',
    email: 'cypressUser',
    admin: false,
    access: {},
    irrelevant: false,
  },
  {
    uid: 'cypressUser2',
    firstname: 'cyp2',
    lastname: 'res2',
    email: 'cypressUser2',
    admin: false,
    access: {},
    irrelevant: false,
  },
  {
    uid: 'cypressAdminUser',
    firstname: 'cypress',
    lastname: 'admin',
    email: 'cypressAdminUser',
    admin: true,
    irrelevant: false,
  },
]

const testProgrammeName = 'TOSKA101'

module.exports = {
  inProduction,
  basePath,
  faculties,
  degreeLevels,
  requiredFormIds,
  isSuperAdmin,
  cypressUsers,
  testProgrammeName,
}
