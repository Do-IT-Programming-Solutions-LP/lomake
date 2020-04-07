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

const programmes = [
  "Bachelor's Programme in Biology",
  "Bachelor's Programme in Food Sciences",
  "Bachelor's Programme in Veterinary Medicine",
  "Bachelor's Programme in Pharmacy",
  "Bachelor's Programme in Philosophy",
  "Bachelor's Programme in Physical Sciences",
  "Bachelor's Programme in Geosciences",
  "Bachelor's Programme in History",
  "Bachelor's Programme in Education",
  "Bachelor's Programme in Chemistry",
  "Bachelor's Programme in Languages",
  "Bachelor's Programme in the Languages and Literatures of Finland",
  "Bachelor's Programme in Cultural Studies",
  "Bachelor's Programme in Logopedics",
  "Bachelor's Programme in Geography",
  "Bachelor's Programme in Agricultural Sciences",
  "Bachelor's Programme in Mathematical Sciences",
  "Bachelor's Programme for Teachers of Mathematics, Physics and Chemistry",
  "Bachelor's Programme in Forest Sciences",
  "Bachelor's Programme in Molecular Biosciences",
  "Bachelor's Programme in Law",
  "Bachelor's Programme in Politics, Media and Communication",
  "Bachelor's Programme in Psychology",
  "Bachelor's Programme in Social Research",
  "Bachelor's Programme in Art Studies",
  "Bachelor's Programme in Economics",
  "Bachelor's Programme in Theology and Religious Studies",
  "Bachelor's Programme in Computer Science",
  "Bachelor's Programme in Society and Change",
  'Kandidatprogrammet i samhällsvetenskaper',
  "Bachelor's Programme in Environmental and Food Economics",
  "Bachelor's Programme in Environmental Sciences",
  'Bachelor´s Programme in Science (since 2019)',
  "Master's Programme in Particle Physics and Astrophysical Sciences",
  "Master's Programme in Area and Cultural Studies",
  "Master's Programme in Data Science",
  'Master’s programme Linguistic Diversity in the Digital Age',
  "Master's Programme in Ecology and Evolutionary Biology",
  'Degree Programme in Veterinary Medicine',
  'Master’s Program in Food Economy and Consumption',
  "Master's Programme in Food Sciences",
  "Master's Programme in Life Science Informatics",
  "Master's Programme in English Studies",
  "Master's Programme in European and Nordic Studies",
  'Master´s Programme in Philosophy',
  "Master's Programme in Genetics and Molecular Biosciences",
  "Master's Programme in Geology and Geophysics",
  "Master's Programme in Global Politics and Communication",
  'Degree Programme in Dentistry',
  "Master's Programme in History",
  "Master's Programme in Human Nutrition and Food Behaviour",
  "Master's Programme in Atmospheric Sciences",
  "Master's Programme in Intercultural Encounters",
  "Master's Programme in International Business Law",
  "Master's Programme in Translation and Interpreting",
  'Master´s Programme in Education',
  "Master's Programme in Plant Biology",
  "Master's Programme in Urban Studies and Planning",
  "Master's Programme in Chemistry and Molecular Sciences",
  "Master's Programme in Languages",
  "Master's Programme in Literary Studies",
  "Master's Programme in Culture and Communication (in Swedish)",
  "Master's Programme in Cultural Heritage",
  "Master's Programme in Logopedics",
  'Degree Programme in Medicine',
  "Master's Programme in Geography",
  "Master's Programme in Agricultural, Environmental and Resource Economics",
  "Master's Programme in Agricultural Sciences",
  'Master´s Programme in Changing Education (2020 lähtien)',
  'Master´s Programme in Global Governance Law (2020 lähtien)',
  "Master's Programme in Mathematics and Statistics",
  "Master's Programme for Teachers of Mathematics, Physics and Chemistry",
  "Master's Programme in Materials Research",
  'Master´s Programme in Forest Sciences',
  'Master´s Programme in Microbiology and Microbial Biotechnology',
  "Master's Programme in Neuroscience",
  "Master's Programme in Contemporary Societies",
  "Master's Programme in Law",
  "Master's Programme in Scandinavian Languages and Literature",
  "Master's Programme in Politics, Media and Communication",
  "Master's Programme in Pharmacy",
  "Master's Programme in Psychology",
  "Master's Programme in Social Research",
  "Master's Programme in Gender Studies",
  "Master's Programme in Finnish and Finno-Ugrian Languages and Cultures",
  "Master's Programme in Art Studies",
  "Master's Programme in Economics",
  "Master's Programme in Theology and Religious Studies",
  "Master's Programme in Theoretical and Computational Methods",
  "Master's Programme in Computer Science",
  "Master's Programme in Translational Medicine",
  "Master's Programme in Russian Studies",
  "Master's Programme in Society and Change",
  "Master's Programme in Social Sciences (in Swedish)",
  "Master's Programme in Environmental Change and Global Sustainability",
  'Doctoral Programme Brain & Mind',
  'Doctoral Programme in Particle Physics and Universe Sciences',
  'Doctoral Programme in Biomedicine',
  'Doctoral Programme in Philosophy, Arts and Society',
  'Doctoral Programme in Geosciences',
  'Doctoral Programme in History and Cultural Heritage',
  'Doctoral Programme in Atmospheric Sciences',
  'Doctoral Programme in Integrative Life Science',
  'Doctoral Programme in Plant Sciences',
  'Doctoral Programme in Chemistry and Molecular Sciences',
  'Doctoral Programme in Language Studies',
  'Doctoral Programme in Clinical Research',
  'Doctoral Programme in Clinical Veterinary Medicine',
  'Doctoral Programme in School, Education, Society and Culture',
  'Doctoral Programme in Wildlife Biology',
  'Doctoral Programme in Drug Research',
  'Doctoral Programme in Mathematics and Statistics',
  'Doctoral Programme in Materials Research and Nanoscience',
  'Doctoral Programme in Microbiology and Biotechnology',
  'Doctoral Programme in Law',
  'Doctoral Programme in Political, Societal and Regional Changes',
  'Doctoral Programme in Psychology, Learning and Communication',
  'Doctoral Programme in Food Chain and Health',
  'Doctoral Programme in Social Sciences',
  'Doctoral Programme in Gender, Culture and Society',
  'Doctoral Programme in Oral Sciences',
  'Doctoral Programme in Economics',
  'Doctoral Programme in Theology and Religious Studies',
  'Doctoral Programme in Computer Science',
  'Doctoral Programme in Sustainable Use of Renewable Natural Resources',
  'Doctoral Programme in Population Health',
  'Doctoral Programme in Interdisciplinary Environmental Sciences',
].sort((a, b) => a.localeCompare(b))

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

const allLightIds = [
  'review_of_last_years_situation_report_light',
  'student_admissions_light',
  'language_environment_light',
  'programme_identity_light',
  'employability_light',
  'learning_outcomes_light',
  'curriculum_light',
  'guidance_light',
  'student_feedback_light',
  'community_wellbeing_light',
  'teacher_skills_light',
  'management_light',
  'teaching_resources_light',
  'recruitment_influence_light',
  'resourcing_light',
  'cooperation_success_light',
]

const SUPERADMINS = ['markokos', 'tgtapio', 'jehelen', 'mluukkai', 'admin']

const isSuperAdmin = (uid) => {
  return SUPERADMINS.includes(uid)
}

module.exports = {
  inProduction,
  basePath,
  faculties,
  programmes,
  degreeLevels,
  requiredFormIds,
  allLightIds,
  isSuperAdmin,
}
