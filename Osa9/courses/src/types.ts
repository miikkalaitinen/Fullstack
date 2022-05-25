export type HeaderProps = {
  courseName: string;
};

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CoursePartDescription {
  type: 'normal';
}

interface CourseProjectPart extends CoursePartBase {
  type: 'groupProject';
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartDescription {
  type: 'submission';
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartDescription {
  requirements: string[];
  type: 'special';
}

export type coursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | CourseSpecialPart;

export type ContentProps = {
  courses: coursePart[];
};

export type PartProps = {
  part: coursePart;
};

export type FooterProps = {
  courses: Pick<coursePart, 'exerciseCount'>[];
};
