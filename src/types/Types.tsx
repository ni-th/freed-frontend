export interface Paper {
  uploadID: number;
  level: string;
  paperType: string;
  part: string;
  subjectOrCourseName: string;
  year: number;
  medium: string;
  url: string;
  uploadTime: string; // LocalDateTime will come as string
}

export interface Course {
  subjectID: number;
  level: string;
  subjectOrCourseName: string;
}
