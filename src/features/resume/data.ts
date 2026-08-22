export interface Education {
  degree: string
  school: string
  meta: string
}

/**
 * Only lived as prose inside About/Skills before this page needed it
 * structured for four different layouts.
 */
export const education: Education[] = [
  {
    degree: "PG Diploma, Software Development",
    school: "IIIT Bangalore",
    meta: "GPA 3.8 / 4.0",
  },
]
